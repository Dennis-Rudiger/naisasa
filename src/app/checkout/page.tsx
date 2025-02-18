'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { paymentSchema, type PaymentFormData } from '@/lib/validations/payment'
import { processPayment, PaymentError } from '@/lib/payment'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { state: cart, clearCart } = useCart()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema)
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty')
      router.push('/')
    }
  }, [cart.items.length, router])

  // Handle authentication
  useEffect(() => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/checkout')
    }
  }, [session, router])

  if (!session || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setIsProcessing(true)
      
      const result = await processPayment(data, cart.total)
      
      if (result.success) {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.items,
            total: cart.total,
            transactionId: result.transactionId
          })
        })

        clearCart()
        toast.success('Payment successful!')
        router.push('/orders')
      }
    } catch (error) {
      if (error instanceof PaymentError) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
        console.error(error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                  {item.image && (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-primary font-medium">KES {item.price}</p>
                  </div>
                </div>
              ))}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>KES {cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Payment Details</h2>
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    {...register('cardNumber')}
                    type="text"
                    className={`input ${errors.cardNumber ? 'border-red-500' : ''}`}
                    placeholder="1234 5678 9012 3456"
                    disabled={isProcessing}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      {...register('expiryDate')}
                      type="text"
                      className={`input ${errors.expiryDate ? 'border-red-500' : ''}`}
                      placeholder="MM/YY"
                      disabled={isProcessing}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      {...register('cvc')}
                      type="text"
                      className={`input ${errors.cvc ? 'border-red-500' : ''}`}
                      placeholder="123"
                      disabled={isProcessing}
                    />
                    {errors.cvc && (
                      <p className="mt-1 text-sm text-red-500">{errors.cvc.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5" />
                    <span>Pay KES {cart.total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

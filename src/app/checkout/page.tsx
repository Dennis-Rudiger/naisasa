'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { PhoneIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const checkoutSchema = z.object({
  phone: z.string()
    .regex(/^254[17]\d{8}$/, 'Please enter a valid Safaricom number starting with 254')
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { state: cart, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  })

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsProcessing(true)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart.items,
          phone: data.phone,
          total: cart.total
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Payment failed')
      }

      toast.success('Check your phone to complete MPesa payment')
      router.push(`/payment/status?id=${result.paymentId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed')
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

          {/* MPesa Payment */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">MPesa Payment</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Safaricom M-PESA Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="254712345678"
                      className={`pl-10 input ${errors.phone ? 'border-red-500' : ''}`}
                      disabled={isProcessing}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
                  <p>You will receive an MPesa prompt on your phone to complete the payment.</p>
                  <p className="mt-2 font-medium">Amount: KES {cart.total.toFixed(2)}</p>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    'Pay with MPesa'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import {
  LockClosedIcon,
  ShieldCheckIcon,
  TicketIcon,
  PhoneIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// Form validation schema
const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions'
  })
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { state: { items }, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    setValue
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: session?.user?.email || '',
      name: session?.user?.name || '',
      phone: '',
      agreeToTerms: false
    }
  })

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <TicketIcon className="h-24 w-24 mx-auto text-primary/50" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mt-2 text-gray-600">Looks like you haven't added any tickets to your cart yet.</p>
            <Link href="/events" className="btn-primary mt-6 inline-block">
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="mt-2 text-gray-600 mb-6">Your order has been confirmed and tickets sent to your email.</p>
            
            <div className="bg-gray-50 rounded-xl p-6 text-left mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-700 font-medium">Order Number:</span>
                <span className="text-gray-900">#NE{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700 font-medium">Amount Paid:</span>
                <span className="text-gray-900 font-bold">KES {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Payment Method:</span>
                <span className="text-gray-900">M-Pesa</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-primary flex-1">
                View My Tickets
              </Link>
              <Link href="/events" className="btn-secondary flex-1">
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    
    try {
      // Process payment logic would go here

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Payment successful!')
      setOrderComplete(true)
      clearCart()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Pricing calculations
  const subtotal = total
  const fees = total * 0.05 // 5% service fee
  const grandTotal = subtotal + fees

  // Step 3: Payment - Simplified to only use M-Pesa
  const renderPaymentStep = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      
      <div className="space-y-4">
        <div className="bg-white border border-primary rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center mr-4">
              <div className="text-green-600 font-bold text-sm">M-PESA</div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">M-Pesa</h3>
              <p className="text-gray-500 text-sm">Pay using your M-Pesa mobile money</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">To complete your purchase:</p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Enter your M-Pesa registered phone number above</li>
                <li>Click "Complete Payment" below</li>
                <li>Wait for the M-Pesa prompt on your phone</li>
                <li>Enter your M-Pesa PIN to authorize payment</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="rounded text-primary focus:ring-primary border-gray-300 mt-1"
              {...register('agreeToTerms')}
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <Link href="/terms" className="text-primary hover:text-primary-dark">Terms and Conditions</Link> and <Link href="/privacy" className="text-primary hover:text-primary-dark">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-600 text-xs mt-1">{errors.agreeToTerms.message}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg flex items-start mt-4">
          <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
          <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          type="button" 
          className="btn-secondary"
          onClick={() => setCurrentStep(2)}
        >
          Back
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="btn-primary relative"
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Complete Payment</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : (
            'Complete M-Pesa Payment'
          )}
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link href="/cart" className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase to secure your tickets</p>
        </div>

        {/* Checkout progress */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-xs sm:text-sm">Review</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-xs sm:text-sm">Details</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-xs sm:text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Review Order */}
              {currentStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                >
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                        <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                          <Image 
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <div className="text-gray-500 text-sm">Quantity: {item.quantity}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">
                            KES {(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm hover:text-red-700 mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Details
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Customer Details */}
              {currentStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                >
                  <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`input w-full ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`input w-full ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="e.g. 0712345678"
                        className={`input w-full ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg flex items-start">
                      <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p>Your information is only used for order confirmation and ticket delivery. We never share it with third parties.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => setCurrentStep(3)}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Payment - Replace with new simplified M-Pesa only version */}
              {currentStep === 3 && renderPaymentStep()}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>KES {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>KES {fees.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">KES {grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <TicketIcon className="h-5 w-5 text-primary mr-2" />
                  <span>E-tickets will be sent to your email</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Secure payment via encrypted connection</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Need help?</h3>
                <p className="text-sm text-gray-600 mb-2">Have questions or need assistance?</p>
                <Link href="/help" className="text-primary text-sm font-medium hover:text-primary-dark">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

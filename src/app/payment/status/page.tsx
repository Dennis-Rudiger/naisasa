'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function PaymentStatusPage() {
  const [status, setStatus] = useState<'pending' | 'completed' | 'failed'>('pending')
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentId = searchParams.get('id')

  useEffect(() => {
    if (!paymentId) return

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payments/${paymentId}`)
        const data = await response.json()
        
        if (data.status === 'COMPLETED') {
          setStatus('completed')
          setTimeout(() => router.push('/tickets'), 3000)
        } else if (data.status === 'FAILED') {
          setStatus('failed')
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
      }
    }

    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [paymentId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          {status === 'pending' && (
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">
                Waiting for Payment
              </h2>
              <p className="text-gray-600">
                Please complete the payment on your phone...
              </p>
            </div>
          )}

          {status === 'completed' && (
            <div className="text-success">
              <CheckCircleIcon className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600">
                Redirecting to your tickets...
              </p>
            </div>
          )}

          {status === 'failed' && (
            <div className="text-red-500">
              <XCircleIcon className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-600 mb-4">
                The payment could not be completed.
              </p>
              <button
                onClick={() => router.back()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

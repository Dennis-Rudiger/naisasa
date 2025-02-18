'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, TicketIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { state, removeItem, updateQuantity } = useCart()
  const { data: session } = useSession()
  const router = useRouter()

  const handleCheckout = () => {
    if (!session) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>Please sign in to complete your purchase</p>
          <div className="flex gap-2">
            <Link 
              href="/auth/login?callbackUrl=/checkout" 
              className="btn-primary text-sm flex-1 text-center"
              onClick={() => {
                toast.dismiss(t.id)
                onClose()
              }}
            >
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="btn-secondary text-sm flex-1 text-center"
              onClick={() => {
                toast.dismiss(t.id)
                onClose()
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      ), {
        duration: 5000,
      })
      return
    }
    onClose()
    router.push('/checkout')
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                          <TicketIcon className="h-6 w-6 text-primary" />
                          Your Tickets
                        </Dialog.Title>
                        <button
                          onClick={onClose}
                          className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      {state.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-96">
                          <TicketIcon className="h-16 w-16 text-gray-300 mb-4" />
                          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                          <button
                            onClick={onClose}
                            className="btn-primary"
                          >
                            Continue Browsing
                          </button>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {state.items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  {item.image && (
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>
                                  )}
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.title}</h3>
                                        <p className="ml-4">KES {item.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                          className="px-2 py-1 text-gray-600 hover:text-primary"
                                        >
                                          -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="px-2 py-1 text-gray-600 hover:text-primary"
                                        >
                                          +
                                        </button>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="font-medium text-primary hover:text-primary-dark"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {state.items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                          <p className="text-lg">Total</p>
                          <p className="text-2xl font-display font-bold text-primary">
                            KES {state.total.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                          <LockClosedIcon className="h-5 w-5" />
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

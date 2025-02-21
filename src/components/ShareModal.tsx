'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

const ShareButtons = dynamic(() => import('./ShareButtons'), {
  ssr: false,
})

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: string
    title: string
    description?: string
  }
}

export default function ShareModal({ isOpen, onClose, event }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(`${window.location.origin}/events/${event.id}`)
  }, [event.id])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex justify-between items-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Share Event
                  </h3>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </Dialog.Title>

                {shareUrl && (
                  <>
                    <ShareButtons url={shareUrl} title={event.title} />
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Or copy link:</p>
                      <div className="flex">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          className="flex-1 p-2 border rounded-l-lg text-sm"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(shareUrl)
                          }}
                          className="px-4 py-2 bg-primary text-white rounded-r-lg text-sm hover:bg-primary-dark"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

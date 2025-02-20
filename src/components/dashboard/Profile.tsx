'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function Profile() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
    }
  })

  const onSubmit = async (data: ProfileForm) => {
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      await update({ name: data.name })
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative h-24 w-24 rounded-full overflow-hidden">
            <Image
              src={session?.user?.image || '/images/default-avatar.png'}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">
              {session?.user?.name}
            </h2>
            <p className="text-gray-600">
              Member since {new Date(session?.user?.createdAt || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 input"
                disabled={!isEditing}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 input"
                disabled={!isEditing}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone (Optional)
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 input"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

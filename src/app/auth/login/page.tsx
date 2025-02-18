'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import LoginCharacter from '@/components/LoginCharacter'
import Input from '@/components/ui/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
        return
      }

      toast.success('Logged in successfully')
      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [activeField, setActiveField] = useState<'email' | 'password' | null>(null)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()

  const handleInputFocus = useCallback((field: 'email' | 'password' | null) => {
    setActiveField(field)
    setIsTyping(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true)
    
    if (typingTimeout) clearTimeout(typingTimeout)
    const timeout = setTimeout(() => setIsTyping(false), 300)
    setTypingTimeout(timeout)
  }, [typingTimeout])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout)
    }
  }, [typingTimeout])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="w-full max-w-md p-8">
        {/* Character Container - Adjusted positioning and size */}
        <div className="mb-8 pt-12">
          <LoginCharacter 
            isTyping={isTyping} 
            isPassword={activeField === 'password'}
            showPassword={showPassword}
          />
        </div>

        {/* Form Card */}
        <div className="relative backdrop-blur-xl bg-white/80 rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register('email')}
                label="Email address"
                type="email"
                autoComplete="email"
                required
                onFocus={() => handleInputFocus('email')}
                onBlur={() => handleInputFocus(null)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Input
                {...register('password')}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                onFocus={() => handleInputFocus('password')}
                onBlur={() => handleInputFocus(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

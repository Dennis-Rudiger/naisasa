'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import LoginCharacter from '@/components/LoginCharacter'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [activeField, setActiveField] = useState<'email' | 'password' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add login logic here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setIsTyping(true)
    // Reset typing state after a delay
    setTimeout(() => setIsTyping(false), 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="w-full max-w-md p-8">
        {/* Character */}
        <LoginCharacter 
          isTyping={isTyping} 
          isPassword={activeField === 'password'} 
        />

        {/* Form Card */}
        <div className="mt-[-2rem] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl" />
          <div className="relative backdrop-blur-xl bg-white/80 rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-600">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                autoComplete="email"
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
                  autoComplete="current-password"
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
              >
                Sign in
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
    </div>
  )
}

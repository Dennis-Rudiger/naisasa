import { memo } from 'react'
import Image from 'next/image'

interface LoginCharacterProps {
  isTyping: boolean
  isPassword: boolean
  showPassword?: boolean
}

const LoginCharacter = memo(function LoginCharacter({ 
  isTyping, 
  isPassword,
  showPassword = false
}: LoginCharacterProps) {
  const getCharacterState = () => {
    if (isPassword) {
      return showPassword ? '/src/img/peak_bear_1.png' : '/src/img/hide_bear_1.png'
    }
    return isTyping ? '/src/img/watch_bear_2.png' : '/src/img/watch_bear_1.png'
  }

  return (
    <div className="relative w-40 h-40 mx-auto transform-gpu">
      <div className={`
        absolute inset-0 transition-all duration-300 ease-out
        ${isTyping ? 'scale-105' : 'scale-100'}
      `}>
        <Image
          src={getCharacterState()}
          alt="Login character"
          width={160}
          height={160}
          className="object-contain drop-shadow-xl"
          priority
        />
      </div>
    </div>
  )
})

LoginCharacter.displayName = 'LoginCharacter'

export default LoginCharacter

import { memo } from 'react'
import Image from 'next/image'

interface LoginCharacterProps {
  isTyping: boolean
  isPassword: boolean
}

const LoginCharacter = memo(function LoginCharacter({ 
  isTyping, 
  isPassword 
}: LoginCharacterProps) {
  const getCharacterState = () => {
    if (isPassword) return '/src/img/hide_bear_1.png'
    if (isTyping) return '/src/img/watch_bear_1.png'
    return '/src/img/watch_bear_2.png'
  }

  return (
    <div className="relative w-32 h-32 mx-auto">
      <Image
        src={getCharacterState()}
        alt="Login character"
        fill
        className="object-contain transition-all duration-300"
        priority
      />
    </div>
  )
})

export default LoginCharacter

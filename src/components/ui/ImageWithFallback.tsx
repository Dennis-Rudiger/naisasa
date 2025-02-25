'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { getPlaceholderImage } from '@/utils/imageUtils'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string | null
  category?: string
}

export default function ImageWithFallback({ 
  src, 
  category,
  alt,
  ...rest 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || getPlaceholderImage(category))

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || ''}
      onError={() => setImgSrc(getPlaceholderImage(category))}
    />
  )
}

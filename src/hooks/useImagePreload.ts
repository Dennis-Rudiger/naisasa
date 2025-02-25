import { useEffect } from 'react'

export function useImagePreload(imageSrc: string | string[]) {
  useEffect(() => {
    const images = Array.isArray(imageSrc) ? imageSrc : [imageSrc]
    images.forEach(src => {
      if (src) {
        const img = new Image()
        img.src = src
      }
    })
  }, [imageSrc])
}

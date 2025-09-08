// src/components/SmartImage.tsx
import React from 'react'
import { DEFAULT_SIZES, makeSrcSet } from '@/lib/images'

type SmartImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  eager?: boolean                // true => loading="eager"
  priority?: 'low'|'auto'|'high' // fetchPriority
  sizes?: string                 // sizes responsivo
  draggable?: boolean
  /** Solo activa srcset si REALMENTE tienes foo@480/foo@960/foo@1440 */
  responsive?: boolean
}

export default function SmartImage({
  src, alt, width, height,
  className,
  eager = false,
  priority = 'auto',
  sizes = DEFAULT_SIZES,
  draggable = false,
  responsive = false, // ⬅️ AHORA OFF por defecto
}: SmartImageProps) {
  const srcSet = responsive ? makeSrcSet(src) : undefined
  const finalSizes = responsive && srcSet ? sizes : undefined

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority as any}
      draggable={draggable}
      sizes={finalSizes}
      srcSet={srcSet}
    />
  )
}


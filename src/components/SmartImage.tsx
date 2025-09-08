import React from 'react';
import { DEFAULT_SIZES, makeSrcSet } from '@/lib/images';

type SmartImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  priority?: 'low' | 'auto' | 'high';
  sizes?: string;
  draggable?: boolean;
  responsive?: boolean;
  dataSrc?: string; // Nueva prop para soportar lazy loading
};

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  eager = false,
  priority = 'auto',
  sizes = DEFAULT_SIZES,
  draggable = false,
  responsive = false,
  dataSrc,
}: SmartImageProps) {
  const srcSet = responsive ? makeSrcSet(src) : undefined;
  const finalSizes = responsive && srcSet ? sizes : undefined;

  return (
    <img
      src={src}
      data-src={dataSrc} // Pasamos data-src al elemento <img>
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
  );
}


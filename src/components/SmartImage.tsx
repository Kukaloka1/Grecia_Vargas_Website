import React, { useEffect, useRef } from 'react';
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
  dataSrc?: string;
  onError?: (event: Event) => void; // Añadido para manejar errores
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
  onError,
}: SmartImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const srcSet = responsive ? makeSrcSet(src) : undefined;
  const finalSizes = responsive && srcSet ? sizes : undefined;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleError = (event: Event) => {
      console.warn(`Error cargando imagen: ${src}`);
      onError?.(event);
    };

    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('error', handleError);
    };
  }, [src, onError]);

  return (
    <img
      ref={imgRef}
      src={src}
      data-src={dataSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority}
      draggable={draggable}
      sizes={finalSizes}
      srcSet={srcSet}
      style={{ willChange: 'opacity', transition: 'opacity 0.2s' }}
    />
  );
}
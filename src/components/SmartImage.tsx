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
  onError?: (event: Event) => void;
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

    const handleLoad = () => {
      console.log(`Imagen cargada: ${img.src}`);
    };
    const handleError = (event: Event) => {
      console.error(`Error cargando imagen: ${img.src}`);
      onError?.(event);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, dataSrc, onError]);

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
    />
  );
}
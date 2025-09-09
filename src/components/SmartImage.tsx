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
  /** 🔒 Si true, desactiva cualquier animación/transform y evita repaints al scrollear */
  freeze?: boolean;
  /** Permite pasar estilos inline sin perder el blindaje de freeze */
  style?: React.CSSProperties;
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
  freeze = false,
  style,
}: SmartImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const srcSet = responsive ? makeSrcSet(src) : undefined;
  const finalSizes = responsive && srcSet ? sizes : undefined;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // 🔒 Blindaje anti-AOS/animaciones/transforms en este <img>
    if (freeze) {
      try {
        img.removeAttribute('data-aos');
        img.classList.remove('aos-init', 'aos-animate');
        img.style.setProperty('transition', 'none', 'important');
        img.style.setProperty('transform', 'none', 'important');
        img.style.setProperty('opacity', '1', 'important');
        img.style.setProperty('backface-visibility', 'hidden');
        img.style.setProperty('will-change', 'auto');
      } catch {}
    }

    const handleLoad = () => {
      // console.log(`Imagen cargada: ${img.currentSrc || img.src}`);
    };
    const handleError = (event: Event) => {
      console.error(`Error cargando imagen: ${img.currentSrc || img.src}`);
      onError?.(event);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, dataSrc, onError, freeze]);

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
      // 🔒 Inline styles: prevalecen sobre cualquier CSS externo
      style={{
        ...(freeze
          ? { transition: 'none', transform: 'none', opacity: 1, backfaceVisibility: 'hidden', willChange: 'auto' }
          : {}),
        ...style,
      }}
    />
  );
}

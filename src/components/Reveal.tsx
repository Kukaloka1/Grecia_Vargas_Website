import React from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'

type RevealProps = {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  delay?: number // ms
  durationMs?: number // ms
}

export default function Reveal({
  as: Comp = 'div',
  children,
  className = '',
  delay = 0,
  durationMs = 500,
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>()

  return (
    <Comp
      ref={ref as any}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${durationMs}ms`,
      }}
      className={[
        // estados base
        'will-change-[opacity,transform]',
        'transition-opacity transition-transform ease-out',
        // animación elegante
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        className,
      ].join(' ')}
    >
      {children}
    </Comp>
  )
}

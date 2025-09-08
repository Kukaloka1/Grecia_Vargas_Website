import { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'whatsapp'
type Size = 'md' | 'lg'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  className?: string
}) {
  const classes = ['btn']
  if (variant === 'primary') classes.push('btn-primary')
  else if (variant === 'ghost') classes.push('btn-ghost')
  else if (variant === 'whatsapp') classes.push('btn-whatsapp')
  if (size === 'lg') classes.push('btn-lg')
  if (className) classes.push(className)
  const cls = classes.join(' ')
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button className={cls} onClick={onClick}>{children}</button>
}

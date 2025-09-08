import React from 'react'

// mini util para clases
function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type Variant = 'primary' | 'ghost' | 'whatsapp'
type Size = 'base' | 'lg'
type Common = {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

// Si hay href => <a>, si no => <button>
type AnchorProps = Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type NativeButtonProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type Props = AnchorProps | NativeButtonProps

export default function Button(props: Props) {
  const { variant = 'primary', size = 'base', className, children, ...rest } = props as any
  const base = 'btn'
  const vcls =
    variant === 'primary' ? 'btn-primary'
    : variant === 'ghost' ? 'btn-ghost'
    : variant === 'whatsapp' ? 'btn-whatsapp'
    : ''
  const scls = size === 'lg' ? 'btn-lg' : ''
  const cls = cx(base, vcls, scls, className)

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
    // target / rel (y cualquier otro attr) pasan directo al <a>
    return (
      <a href={props.href} {...anchorRest} className={cls}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" {...buttonRest} className={cls}>
      {children}
    </button>
  )
}

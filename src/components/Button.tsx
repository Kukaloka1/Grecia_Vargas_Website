import { ReactNode } from 'react'
export default function Button({ children, variant='primary', href, onClick }: { children: ReactNode, variant?: 'primary'|'ghost', href?: string, onClick?: ()=>void }){
  const cls = variant==='primary' ? 'btn btn-primary' : 'btn btn-ghost'
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button className={cls} onClick={onClick}>{children}</button>
}

import { ReactNode, useEffect } from 'react'
export default function Modal({ open, onClose, children }: { open: boolean, onClose: ()=>void, children: ReactNode }){
  useEffect(()=>{
    const esc=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', esc)
    return ()=>document.removeEventListener('keydown', esc)
  },[onClose])
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl">
        {children}
      </div>
    </div>
  )
}

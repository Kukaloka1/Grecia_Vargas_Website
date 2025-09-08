import { useEffect, useRef, useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { setLang, useLang, t } from '../lib/i18n'

const FOCUSABLE = 'a, button, select, input, textarea, [tabindex]:not([tabindex="-1"])'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light'|'dark'>((localStorage.getItem('theme') as any) || 'light')
  const panelRef = useRef<HTMLDivElement>(null)
  const lang = useLang()

  // Persistencia de tema
  useEffect(()=>{ document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) },[theme])

  // Sombra al hacer scroll
  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  // Cerrar con ESC + focus-trap en panel móvil
  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (open && e.key === 'Tab' && panelRef.current){
        const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)) as HTMLElement[]
        if (focusables.length === 0) return
        const first = focusables[0], last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return ()=>document.removeEventListener('keydown', onKey)
  },[open])

  // Bloquear scroll al abrir
  useEffect(()=>{
    document.body.classList.toggle('overflow-hidden', open)
    if (open) {
      setTimeout(()=>{
        const first = panelRef.current?.querySelector(FOCUSABLE) as HTMLElement | null
        first?.focus()
      }, 0)
    }
  },[open])

  const NAV = [
    { href: '#about', label: t('nav.about', lang) },
    { href: '#experiences', label: t('nav.experiences', lang) },
    { href: '#menus', label: t('nav.menus', lang) },
    { href: '#gallery', label: t('nav.gallery', lang) },
    { href: '#contact', label: t('nav.contact', lang) },
  ]

  return (
    <>
      {/* Skip link accesible */}
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:m-2 focus:rounded focus:bg-[--color-primary] focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Header FIXED (siempre visible) */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 header-blur ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="header-wrap">
          {/* Logo grande (sin texto al lado) */}
          <a href="#home" aria-label="Grecia Vargas — Home" className="flex items-center min-w-0">
            <img
              src="/images/logo1.png"
              alt="Grecia Vargas • Private Chef"
              className="h-[56px] w-auto md:h-[60px] lg:h-[64px] rounded-[2px]"
              loading="eager"
              decoding="sync"
            />
          </a>

          {/* Nav desktop (desde lg) */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {NAV.map(i=> (
              <a key={i.href} href={i.href} className="text-sm opacity-80 hover:opacity-100">{i.label}</a>
            ))}
            <button aria-label="Switch theme" onClick={()=>setTheme(theme==='light'?'dark':'light')} className="opacity-80 hover:opacity-100">
              {theme==='light'? <Moon size={18}/> : <Sun size={18}/>}
            </button>
            <select aria-label="Language" className="bg-transparent text-sm" value={lang} onChange={(e)=>setLang(e.target.value as any)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </nav>

          {/* Burger (mobile + tablet) */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={()=>setOpen(true)}
          >
            <Menu />
          </button>
        </div>

        {/* Overlay */}
        {open && <div className="fixed inset-0 z-40 bg-black/50" onClick={()=>setOpen(false)} aria-hidden />}

        {/* Panel móvil */}
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 z-50 h-[100svh] w-[min(22rem,90vw)] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 p-6 pt-safe transition-transform duration-300 will-change-transform outline-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between mb-6">
            <a href="#home" aria-label="Grecia Vargas — Home" onClick={()=>setOpen(false)} className="flex items-center">
              <img src="/images/logo.png" alt="" className="h-[56px] w-auto md:h-[60px] rounded-[2px]" />
            </a>
            <button aria-label="Close menu" onClick={()=>setOpen(false)} className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV.map(i=> (
              <a key={i.href} href={i.href} onClick={()=>setOpen(false)} className="text-base">{i.label}</a>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <button className="btn btn-ghost" onClick={()=>setTheme(theme==='light'?'dark':'light')}>
              {theme==='light'? 'Dark' : 'Light'}
            </button>
            <select className="btn btn-ghost" value={lang} onChange={(e)=>setLang(e.target.value as any)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          <a href="#contact" onClick={()=>setOpen(false)} className="mt-6 btn btn-primary w-full text-center">
            {t('hero.cta.availability', lang)}
          </a>
        </div>
      </header>
    </>
  )
}

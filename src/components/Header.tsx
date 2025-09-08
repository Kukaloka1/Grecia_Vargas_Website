import { useEffect, useRef, useState } from 'react'
import { Menu, X, Moon, Sun, Info, Sparkles, Briefcase, BookOpenCheck, Image, Mail } from 'lucide-react'
import { setLang, useLang, t } from '../lib/i18n'

const FOCUSABLE = 'a, button, select, input, textarea, [tabindex]:not([tabindex="-1"])'

function getHeaderOffset(): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  const n = parseInt(v || '0', 10)
  return Number.isFinite(n) && n > 0 ? n : 80
}

function smoothScrollToId(hash: string){
  const id = hash.replace('#','')
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Header(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light'|'dark'>((localStorage.getItem('theme') as any) || 'light')
  const panelRef = useRef<HTMLDivElement>(null)
  const lang = useLang()

  // Leer ?lang= de la URL al cargar (URL > localStorage)
  useEffect(()=>{
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang) setLang(urlLang as any)
  },[])

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

  // Actualiza ?lang= en URL sin romper hash actual
  const onLangChange = (value: string) => {
    setLang(value as any)
    const u = new URL(window.location.href)
    u.searchParams.set('lang', value)
    // mantén el hash si existe (excepto home)
    const keepHash = window.location.hash && window.location.hash !== '#home'
    history.replaceState({}, '', u.pathname + u.search + (keepHash ? window.location.hash : ''))
  }

  // Click en logo: URL limpia (sin hash) + scroll top suave
  const onHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setOpen(false)
    const u = new URL(window.location.href)
    history.replaceState({}, '', u.pathname + u.search) // sin hash
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Click en nav: smooth scroll + hash visible
  const onNavClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    smoothScrollToId(hash)
    const u = new URL(window.location.href)
    history.pushState({}, '', u.pathname + u.search + hash)
  }

  const NAV = [
    { href: '#about',      label: t('nav.about', lang),        icon: <Info size={16}/> },
    { href: '#experiences',label: t('nav.experiences', lang),  icon: <Sparkles size={16}/> },
    { href: '#services',   label: t('services.title', lang),   icon: <Briefcase size={16}/> },
    { href: '#menus',      label: t('nav.menus', lang),        icon: <BookOpenCheck size={16}/> },
    { href: '#gallery',    label: t('nav.gallery', lang),      icon: <Image size={16}/> },
    { href: '#contact',    label: t('nav.contact', lang),      icon: <Mail size={16}/> },
  ]

  return (
    <>
      {/* Skip link accesible */}
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:m-2 focus:rounded focus:bg-[--color-primary] focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Header FIXED oscuro (texto blanco) */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-neutral-800 ${scrolled ? 'shadow-sm' : ''} backdrop-blur bg-neutral-950/70 text-white`}>
        <div className="header-wrap">
          {/* Logo grande */}
          <a href="/" onClick={onHomeClick} aria-label="Grecia Vargas — Home" className="flex items-center min-w-0">
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
              <a
                key={i.href}
                href={i.href}
                onClick={onNavClick(i.href)}
                className="group inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition"
              >
                <span className="opacity-80 group-hover:opacity-100">{i.icon}</span>
                <span>{i.label}</span>
              </a>
            ))}
            <button
              aria-label="Switch theme"
              onClick={()=>setTheme(theme==='light'?'dark':'light')}
              className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/5"
            >
              {theme==='light'? <Moon size={18}/> : <Sun size={18}/>}
            </button>
            <select
              aria-label="Language"
              className="bg-transparent text-sm text-white/90 hover:text-white outline-none"
              value={lang}
              onChange={(e)=>onLangChange(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </nav>

          {/* Burger (mobile + tablet) */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/5"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={()=>setOpen(true)}
          >
            <Menu />
          </button>
        </div>

        {/* Overlay */}
        {open && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={()=>setOpen(false)} aria-hidden />}

        {/* Panel móvil dark pro */}
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 z-50 h-[100svh] w-[min(22rem,90vw)] bg-neutral-950 text-white border-l border-neutral-800 p-6 pt-safe transition-transform duration-300 will-change-transform outline-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between mb-6">
            <a href="/" aria-label="Grecia Vargas — Home" onClick={onHomeClick} className="flex items-center">
              <img src="/images/logo1.png" alt="" className="h-[56px] w-auto rounded-[2px]" />
            </a>
            <button aria-label="Close menu" onClick={()=>setOpen(false)} className="rounded-md p-2 hover:bg-white/5">
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV.map(i=> (
              <a
                key={i.href}
                href={i.href}
                onClick={onNavClick(i.href)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-white/95 hover:bg-white/5"
              >
                <span className="text-white/80">{i.icon}</span>
                <span>{i.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <button className="btn btn-ghost text-white/90 hover:text-white" onClick={()=>setTheme(theme==='light'?'dark':'light')}>
              {theme==='light'? 'Dark' : 'Light'}
            </button>
            <select className="btn btn-ghost text-white/90 hover:text-white bg-transparent" value={lang} onChange={(e)=>onLangChange(e.target.value)}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          <a href="#contact" onClick={onNavClick('#contact')} className="mt-6 btn btn-primary w-full text-center">
            {t('hero.cta.availability', lang)}
          </a>
        </div>
      </header>
    </>
  )
}

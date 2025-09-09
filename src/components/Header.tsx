import { useEffect, useRef, useState } from 'react'
import { Menu, X, Info, Sparkles, Briefcase, BookOpenCheck, Image, Mail, Instagram } from 'lucide-react'
import { setLang, useLang, t } from '../lib/i18n'
import { useScrollSpy } from '../hooks/useScrollSpy'

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
  const panelRef = useRef<HTMLDivElement>(null)
  const lang = useLang()

  const SECTION_IDS = ['about','experiences','services','menus','gallery','contact'] as const
  const scrollSpyActive = useScrollSpy(SECTION_IDS as unknown as string[], getHeaderOffset())
  const [active, setActive] = useState<string>(scrollSpyActive || '')

  // Email (usa VITE_PUBLIC_EMAIL si existe; si no, va a #contact)
  const EMAIL = (import.meta as any)?.env?.VITE_PUBLIC_EMAIL as string | undefined
  const subject = lang === 'es' ? 'Consulta de disponibilidad — Grecia Vargas' : 'Availability inquiry — Grecia Vargas'
  const mailHref = EMAIL ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : '#contact'

  useEffect(() => { 
    const newActive = scrollSpyActive || ''
    if (window.scrollY < getHeaderOffset() / 2) setActive('')
    else setActive(newActive)
  }, [scrollSpyActive])

  useEffect(() => {
    const header = document.querySelector('header')
    const update = () => {
      const h = header?.getBoundingClientRect().height ?? 80
      document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`)
    }
    update()
    let ro: ResizeObserver | null = null
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => update())
      if (header) ro.observe(header)
    }
    window.addEventListener('resize', update)
    return () => {
      if (ro && header) ro.unobserve(header)
      ro?.disconnect?.()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 2)
        ticking = false
      })
      ticking = true
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key === 'Tab') {
        if (!panelRef.current) return
        const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)) as HTMLElement[]
        if (focusables.length === 0) return
        const first = focusables[0], last = focusables[focusables.length - 1]
        const act = document.activeElement as HTMLElement | null
        if (e.shiftKey && act === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && act === last) { e.preventDefault(); first.focus() }
      }
    }
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  useEffect(() => {
    const onHashOrPop = () => { if (window.location.hash) smoothScrollToId(window.location.hash) }
    if (window.location.hash) setTimeout(() => smoothScrollToId(window.location.hash), 0)
    window.addEventListener('hashchange', onHashOrPop)
    window.addEventListener('popstate', onHashOrPop)
    return () => {
      window.removeEventListener('hashchange', onHashOrPop)
      window.removeEventListener('popstate', onHashOrPop)
    }
  }, [])

  const onHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setOpen(false)
    const u = new URL(window.location.href)
    history.replaceState({}, '', u.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActive('')
  }

  const onNavClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const id = hash.replace('#','')
    const el = document.getElementById(id)
    if (!el) {
      if (window.location.hash !== hash) window.location.hash = hash
      return
    }
    smoothScrollToId(hash)
    const u = new URL(window.location.href)
    if (u.hash !== hash) history.pushState({}, '', u.pathname + hash)
  }

  const NAV = [
    { href: '#about',       label: t('nav.about', lang),        icon: <Info size={16}/> },
    { href: '#experiences', label: t('nav.experiences', lang),  icon: <Sparkles size={16}/> },
    { href: '#services',    label: t('services.title', lang),   icon: <Briefcase size={16}/> },
    { href: '#menus',       label: t('nav.menus', lang),        icon: <BookOpenCheck size={16}/> },
    { href: '#gallery',     label: t('nav.gallery', lang),      icon: <Image size={16}/> },
    { href: '#contact',     label: t('nav.contact', lang),      icon: <Mail size={16}/> },
  ]

  return (
    <>
      {/* Skip link */}
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:z-[1000] focus:m-2 focus:rounded focus:bg-[--color-primary] focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* HEADER */}
      <header className={`fixed inset-x-0 top-0 z-[900] h-16 md:h-20 border-b border-neutral-800 bg-neutral-950 text-white transition-all duration-300 ease-out overflow-hidden shadow-sm ${scrolled ? 'shadow-md ring-1 ring-white/10' : ''}`}>
        <div className="header-wrap h-full flex items-center justify-between px-4">
          {/* Logo */}
          <a href="/" onClick={onHomeClick} aria-label="Grecia Vargas — Home" className="flex items-center min-w-0 flex-shrink-0 transition-transform duration-300 hover:scale-105 max-w-[100px] md:max-w-none">
            <img
              src="/images/logo1.png"
              alt="Grecia Vargas • Private Chef"
              className="h-[40px] w-auto md:h-[48px] lg:h-[52px] rounded-[2px] object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </a>

          {/* Nav escritorio */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {NAV.map(i=> {
              const isActive = active === i.href.slice(1)
              return (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={onNavClick(i.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'group relative inline-flex items-center gap-2 text-sm px-2 py-1 transition-all duration-300 ease-out hover:scale-105 hover:text-white',
                    isActive
                      ? 'text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-purple-400 after:to-purple-600 after:rounded-full'
                      : 'text-white/90 hover:text-white'
                  ].join(' ')}
                >
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">{i.icon}</span>
                  <span>{i.label}</span>
                </a>
              )
            })}
            <select
              aria-label="Language"
              title="Select language"
              className="bg-transparent text-sm text-white/90 hover:text-white outline-none transition-colors duration-200"
              value={lang}
              onChange={(e)=>setLang(e.target.value as any)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </nav>

          {/* Burger SOLO móviles */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors duration-200 flex-shrink-0"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={()=>setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[980] bg-black/70 backdrop-blur-sm"
          onClick={()=>setOpen(false)}
          aria-hidden
        />
      )}

      {/* Panel móvil */}
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[990] h-[100svh] w-[min(22rem,90vw)] bg-neutral-950/95 backdrop-blur-md text-white border-l border-neutral-800 p-6 pt-safe transition-transform duration-300 ease-out outline-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-6">
          <a href="/" aria-label="Grecia Vargas — Home" onClick={onHomeClick} className="flex items-center transition-transform duration-300 hover:scale-105">
            <img src="/images/logo1.png" alt="" className="h-[56px] w-auto rounded-[2px]" />
          </a>
          <button aria-label="Close menu" onClick={()=>setOpen(false)} className="rounded-md p-2 hover:bg-white/10 transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* NAV móvil */}
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {NAV.map(i=> {
            const isActive = active === i.href.slice(1)
            return (
              <a
                key={i.href}
                href={i.href}
                onClick={onNavClick(i.href)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all duration-300 ease-out hover:bg-white/5',
                  isActive ? 'text-white bg-white/10 ring-1 ring-white/10' : 'text-white/95 hover:text-white'
                ].join(' ')}
              >
                <span className="text-white/80">{i.icon}</span>
                <span>{i.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Selector de idioma — segmented control */}
        <div className="mt-6">
          <div className="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-1 grid grid-cols-2 gap-1">
            <button
              type="button"
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en' as any)}
              className={[
                'flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-all',
                lang === 'en' ? 'bg-black text-white ring-1 ring-white/10' : 'text-white/80 hover:text-white'
              ].join(' ')}
            >
              <span role="img" aria-label="English">🇬🇧</span><span>EN</span>
            </button>
            <button
              type="button"
              aria-pressed={lang === 'es'}
              onClick={() => setLang('es' as any)}
              className={[
                'flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-all',
                lang === 'es' ? 'bg-black text-white ring-1 ring-white/10' : 'text-white/80 hover:text-white'
              ].join(' ')}
            >
              <span role="img" aria-label="Español">🇪🇸</span><span>ES</span>
            </button>
          </div>
        </div>

        {/* CTAs — 3 icon-only en línea: Mail, WhatsApp, Instagram */}
        <div className="mt-6 grid grid-cols-3 gap-4 place-items-center">
          {/* Mail */}
          <a
            href={mailHref}
            onClick={(e) => { if (!EMAIL) onNavClick('#contact')(e as any) }}
            aria-label={t('hero.cta.availability', lang)}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full
                       bg-neutral-900 text-white ring-1 ring-white/10 hover:bg-neutral-800 hover:ring-white/20
                       transition-all duration-200 shadow-sm"
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="sr-only">{t('hero.cta.availability', lang)}</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/34611619968"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('hero.cta.whatsapp', lang)}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full
                       bg-neutral-900 text-white ring-1 ring-white/10 hover:bg-neutral-800 hover:ring-white/20
                       transition-all duration-200 shadow-sm"
          >
            {/* brand-like simple glyph */}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7">
              <path d="M20.52 3.48A11.7 11.7 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.51 5.83L0 24l6.32-1.64A11.92 11.92 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 01-5.06-1.37l-.36-.21-3.75.97 1-3.65-.24-.37A9.91 9.91 0 1122 12c0 5.52-4.48 10-10 10zm5.23-7.04c-.29-.15-1.71-.84-1.98-.93-.27-.1-.47-.15-.67.15-.2.31-.77.93-.95 1.12-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.31-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.31-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.1 4.52.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.56-.35z"/>
            </svg>
            <span className="sr-only">{t('hero.cta.whatsapp', lang)}</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/chefgreciavargas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full
                       bg-neutral-900 text-white ring-1 ring-white/10 hover:bg-neutral-800 hover:ring-white/20
                       transition-all duration-200 shadow-sm"
          >
            <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </>
  )
}


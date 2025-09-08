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

/** Icono WhatsApp (SVG, hereda currentColor) */
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.7 11.7 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.51 5.83L0 24l6.32-1.64A11.92 11.92 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22a9.9 9.9 0 01-5.06-1.37l-.36-.21-3.75.97 1-3.65-.24-.37A9.91 9.91 0 1122 12c0 5.52-4.48 10-10 10zm5.23-7.04c-.29-.15-1.71-.84-1.98-.93-.27-.1-.47-.15-.67.15-.2.31-.77.93-.95 1.12-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.31-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.31-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.1 4.52.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.56-.35z"/>
    </svg>
  )
}

export default function Header(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const lang = useLang()

  const active = useScrollSpy(
    ['about','experiences','services','menus','gallery','contact'],
    getHeaderOffset()
  )

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (open && e.key === 'Tab' && panelRef.current){
        const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)) as HTMLElement[]
        if (focusables.length === 0) return
        const first = focusables[0], last = focusables[focusables.length - 1]
        const act = document.activeElement as HTMLElement | null
        if (e.shiftKey && act === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && act === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return ()=>document.removeEventListener('keydown', onKey)
  },[open])

  useEffect(()=>{
    document.body.classList.toggle('overflow-hidden', open)
    if (open) {
      setTimeout(()=>{
        const first = panelRef.current?.querySelector(FOCUSABLE) as HTMLElement | null
        first?.focus()
      }, 0)
    }
  },[open])

  useEffect(()=>{
    const onPop = () => {
      const h = window.location.hash
      if (h) smoothScrollToId(h)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  },[])

  const onHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setOpen(false)
    const u = new URL(window.location.href)
    history.replaceState({}, '', u.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onNavClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    smoothScrollToId(hash)
    const u = new URL(window.location.href)
    history.pushState({}, '', u.pathname + hash)
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

      {/* ===== HEADER (panel y overlay van FUERA) ===== */}
      <header className={`fixed inset-x-0 top-0 z-[900] border-b border-neutral-800 backdrop-blur bg-neutral-950/70 text-white ${scrolled ? 'shadow-sm ring-1 ring-white/10' : ''}`}>
        <div className="header-wrap">
          {/* Logo */}
          <a href="/" onClick={onHomeClick} aria-label="Grecia Vargas — Home" className="flex items-center min-w-0">
            <img
              src="/images/logo1.png"
              alt="Grecia Vargas • Private Chef"
              className="h-[56px] w-auto md:h-[60px] lg:h-[64px] rounded-[2px]"
              loading="eager"
              decoding="sync"
            />
          </a>

          {/* Nav escritorio (solo lg+) */}
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
                    'group inline-flex items-center gap-2 text-sm transition',
                    isActive ? 'text-white' : 'text-white/90 hover:text-white'
                  ].join(' ')}
                >
                  <span className="opacity-80 group-hover:opacity-100">{i.icon}</span>
                  <span>{i.label}</span>
                  {isActive && <span className="ml-1 h-[2px] w-2 rounded-full bg-white/90" aria-hidden />}
                </a>
              )
            })}
            <select
              aria-label="Language"
              className="bg-transparent text-sm text-white/90 hover:text-white outline-none"
              value={lang}
              onChange={(e)=>setLang(e.target.value as any)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </nav>

          {/* Burger SOLO móviles (<lg) */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={()=>setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* ===== Overlay y Panel FUERA del header ===== */}
      {open && (
        <div
          className="fixed inset-0 z-[980] bg-black/60 backdrop-blur-sm"
          onClick={()=>setOpen(false)}
          aria-hidden
        />
      )}

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[990] h-[100svh] w-[min(22rem,90vw)] bg-neutral-950 text-white border-l border-neutral-800 p-6 pt-safe transition-transform duration-300 will-change-transform outline-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-6">
          <a href="/" aria-label="Grecia Vargas — Home" onClick={onHomeClick} className="flex items-center">
            <img src="/images/logo1.png" alt="" className="h-[56px] w-auto rounded-[2px]" />
          </a>
          <button aria-label="Close menu" onClick={()=>setOpen(false)} className="rounded-md p-2 hover:bg-white/5">
            <X className="h-6 w-6" />
          </button>
        </div>

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
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-base',
                  isActive ? 'text-white bg-white/5' : 'text-white/95 hover:bg-white/5'
                ].join(' ')}
              >
                <span className="text-white/80">{i.icon}</span>
                <span>{i.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="mt-6 flex items-center gap-3">
          <select className="btn btn-ghost text-white/90 hover:text-white bg-transparent" value={lang} onChange={(e)=>setLang(e.target.value as any)}>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>

        {/* CTAs alineadas y consistentes */}
        <a
          href="#contact"
          onClick={onNavClick('#contact')}
          className="mt-6 btn btn-primary w-full inline-flex items-center justify-center gap-2 text-center"
        >
          {t('hero.cta.availability', lang)}
        </a>

        <a
          href="https://wa.me/0000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 btn btn-whatsapp w-full inline-flex items-center justify-center gap-2 text-center"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span>{t('hero.cta.whatsapp', lang)}</span>
        </a>

        {/* Instagram — pro, moderno y en armonía */}
        <a
          href="https://instagram.com/chefgreciavargas"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 text-center text-white rounded-xl px-5 py-3 text-sm font-semibold transition bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
          <span>@chefgreciavargas</span>
        </a>
      </div>
    </>
  )
}



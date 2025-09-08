// src/lib/images.ts
export const DEFAULT_SIZES =
  '(min-width:1536px) 20vw, (min-width:1280px) 25vw, (min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw'

// Genera srcset a partir del nombre base: foo.webp -> foo@480.webp, foo@960.webp, foo@1440.webp
export function makeSrcSet(src: string): string | undefined {
  const m = src.match(/\.(webp|jpg|jpeg|png)$/i)
  if (!m) return undefined
  const ext = m[0] // ".webp"
  const base = src.slice(0, -ext.length)
  return `${base}@480${ext} 480w, ${base}@960${ext} 960w, ${base}@1440${ext} 1440w`
}

// ¿Cuántas "eager" por arriba del fold (2 filas)?
export function calcEagerCount(w: number) {
  if (w >= 1024) return 8 // 2 x 4
  if (w >= 768) return 6  // 2 x 3
  return 4                // 2 x 2
}

// Preload selectivo (devuelve cleanup)
export function preloadImages(urls: string[], highCount = 4) {
  const links = urls.map((src, i) => {
    const l = document.createElement('link')
    l.rel = 'preload'
    l.as = 'image'
    l.href = src
    if (i < highCount) (l as any).fetchpriority = 'high'
    document.head.appendChild(l)
    return l
  })
  return () => links.forEach(l => document.head.removeChild(l))
}

// Pre-decode en idle para dejar las imágenes "calientes"
export function predecodeImages(urls: string[], fetchPriority: 'low'|'auto'|'high' = 'low') {
  const queue = urls.slice()
  const step = () => {
    const src = queue.shift()
    if (!src) return
    const img = new Image() as HTMLImageElement & { fetchPriority?: string }
    img.fetchPriority = fetchPriority
    img.decoding = 'async'
    img.loading = 'eager' as any
    img.src = src
    img.decode?.().catch(()=>{})
    if (queue.length) schedule()
  }
  const schedule = () => {
    ;(window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(step, { timeout: 400 })
      : setTimeout(step, 60)
  }
  schedule()
}

export function enableSmoothAnchors(){
  const header = document.querySelector('header')
  const headerH = header ? (header as HTMLElement).offsetHeight : 0
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || ''
      if(href.length>1){
        e.preventDefault()
        const el = document.querySelector(href)
        if(el){
          const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - (headerH+8)
          window.scrollTo({ top: y, behavior: 'smooth' })
          history.pushState(null, '', href)
        }
      }
    })
  })
}

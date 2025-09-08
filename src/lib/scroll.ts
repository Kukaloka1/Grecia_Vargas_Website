export function enableSmoothAnchors() {
  const header = document.querySelector('header');
  let headerH = header ? (header as HTMLElement).offsetHeight : 0;

  // Actualiza headerH en resize para manejar cambios dinámicos
  const updateHeaderHeight = () => {
    headerH = header ? (header as HTMLElement).offsetHeight : 0;
  };

  window.addEventListener('resize', updateHeaderHeight, { passive: true });

  const links = document.querySelectorAll('a[href^="#"]');
  const handleClick = (e: Event) => {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '';
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - (headerH + 8);
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.pushState(null, '', href);
      }
    }
  };

  links.forEach((a) => {
    a.addEventListener('click', handleClick, { passive: true });
  });

  // Limpieza de event listeners
  return () => {
    links.forEach((a) => {
      a.removeEventListener('click', handleClick);
    });
    window.removeEventListener('resize', updateHeaderHeight);
  };
}
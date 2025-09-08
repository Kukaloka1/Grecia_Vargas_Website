import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAOS(policy: 'min' | 'smart' | 'off' | undefined = 'min') {
  if (policy === 'off') {
    console.log('AOS desactivado');
    return () => {};
  }

  console.log('Inicializando AOS con policy:', policy);
  AOS.init({
    once: true,
    duration: 400,
    easing: 'ease-out',
    offset: 60,
    disable: () => {
      const isSlow =
        (navigator as any).connection?.saveData ||
        ['2g', 'slow-2g'].includes((navigator as any).connection?.effectiveType) ||
        window.innerWidth < 768;
      return isSlow;
    },
  });

  setTimeout(() => {
    AOS.refresh();
    console.log('AOS refrescado, elementos observados:', document.querySelectorAll('[data-aos]').length);
  }, 100);

  return () => {
    console.log('Limpiando AOS');
    AOS.refreshHard();
  };
}
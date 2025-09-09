import AOS from "aos";
import "aos/dist/aos.css";

export type AOSPolicy = "min" | "off" | "smart";

/**
 * Inicializa AOS según política y devuelve un cleanup (() => void).
 * - "off": no inicia (respeta manualmente)
 * - "smart": si el usuario prefiere reduced motion, no inicia
 * - "min" (default): inicia normal
 */
export function initAOS(policy: AOSPolicy = "min"): () => void {
  // Guards SSR
  if (typeof window === "undefined") return () => {};

  if (policy === "off") return () => {};

  if (
    policy === "smart" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
  ) {
    return () => {};
  }

  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    offset: 24,                // margen razonable
    once: false,               // re-animar al re-entrar
    mirror: true,              // anima al salir (scroll up)
    anchorPlacement: "top-bottom",
    // Nota: cuando inicializas programáticamente, startEvent es opcional
    // startEvent: "DOMContentLoaded",
  });

  // Recalcula después de que carguen fuentes/imágenes
  const onLoad = () => {
    try {
      AOS.refreshHard();
    } catch {}
  };
  window.addEventListener("load", onLoad, { once: true });

  // Pequeño refresh tras el primer paint
  const tid = window.setTimeout(() => {
    try {
      AOS.refresh();
    } catch {}
  }, 350);

  // Cleanup seguro
  return () => {
    window.removeEventListener("load", onLoad);
    clearTimeout(tid);
    // AOS no tipa disable() oficialmente: protegemos con try
    try {
      // @ts-expect-error - método no declarado en tipos
      AOS.disable?.();
    } catch {}
  };
}

import AOS from 'aos'
import 'aos/dist/aos.css'
export function initAOS(policy: 'min'|'off' = 'min'){
  if(policy==='off') return
  AOS.init({ once: true, duration: 500, easing: 'ease-out', offset: 40 })
}

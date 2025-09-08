import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import WhyUs from './sections/Experiences'
import Problem from './sections/SampleMenu'
import Solution from './sections/HowItWorks'
import Products from './sections/Products'
import Gallery from './sections/Gallery'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import { initAOS } from './lib/aos'

export default function App(){
  useEffect(()=>{ initAOS('min') },[])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Problem />
        <Solution />
        <Products />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

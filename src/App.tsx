import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import WhyUs from './sections/WhyUs'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
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

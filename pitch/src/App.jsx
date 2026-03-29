import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Pipeline from './sections/Pipeline'
import Showdown from './sections/Showdown'
import SocialProof from './sections/SocialProof'
import CTA from './sections/CTA'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    return () => ScrollTrigger.killAll()
  }, [])

  return (
    <div className="app">
      <Hero />
      <Problem />
      <Pipeline />
      <Showdown />
      <SocialProof />
      <CTA />
    </div>
  )
}

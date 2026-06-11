import { useCallback } from 'react'
import Rail from './components/Rail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Strategy from './components/Strategy'
import HowItWorks from './components/HowItWorks'
import Performance from './components/Performance'
import Calculator from './components/Calculator'
import Safeguards from './components/Safeguards'
import Invest from './components/Invest'
import Footer from './components/Footer'
import InvestOrb from './components/InvestOrb'
import { goInvest, useAlicAnimations } from './hooks/useAlicAnimations'

export default function App() {
  const handleInvestClick = useCallback(() => {
    goInvest()
  }, [])

  useAlicAnimations()

  return (
    <>
      <Rail />
      <Nav />
      <Hero onInvestClick={handleInvestClick} />
      <Strategy />
      <HowItWorks />
      <Performance />
      <Calculator />
      <Safeguards />
      <Invest />
      <Footer />
      <InvestOrb onClick={handleInvestClick} />
    </>
  )
}

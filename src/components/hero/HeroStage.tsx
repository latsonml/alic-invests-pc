import { useRef } from 'react'
import { useHeroAnimations } from '../../hooks/useHeroAnimations'
import HeroPayCard from './HeroPayCard'
import HeroTagBox from './HeroTagBox'

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null)

  useHeroAnimations(stageRef)

  return (
    <div className="stage" ref={stageRef}>
      <img id="coin" src="/coin.webp" alt="" aria-hidden="true" />
      <div className="hero-assets-m">
        <HeroTagBox variant="tag-pos" label="Position 02-4815">
          Balance $100,000
          <br />
          Status&nbsp;&nbsp;Performing
        </HeroTagBox>
        <HeroTagBox variant="tag-remit" label="Weekly remit">
          $7,500 · Every Wed
          <br />
          UCC-1 Secured
        </HeroTagBox>
        <HeroPayCard />
      </div>
    </div>
  )
}

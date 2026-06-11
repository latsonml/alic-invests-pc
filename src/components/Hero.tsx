import Ticker from './Ticker'
import HeroCta from './hero/HeroCta'
import HeroStage from './hero/HeroStage'
import HeroSubtext from './hero/HeroSubtext'

type HeroProps = {
  onInvestClick: () => void
}

export default function Hero({ onInvestClick }: HeroProps) {
  return (
    <div className="panel hero" id="top">
      <span className="hero-eyebrow reveal-now">
        <i />
        Asset-backed · Distributions every week
      </span>
      <h1 id="headline">
        <span className="line">
          <span>
            <span className="hero-hl">Outstanding yield,</span>
          </span>
        </span>
        <span className="line">
          <span>built for total return</span>
        </span>
      </h1>

      <HeroStage />
      <HeroSubtext />
      <HeroCta onClick={onInvestClick} />
      <Ticker />
    </div>
  )
}

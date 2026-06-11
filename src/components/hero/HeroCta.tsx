type HeroCtaProps = {
  onClick: () => void
}

export default function HeroCta({ onClick }: HeroCtaProps) {
  return (
    <button className="hero-cta" id="hero-cta" type="button" onClick={onClick}>
      Start your allocation
      <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  )
}

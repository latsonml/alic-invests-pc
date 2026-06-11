type InvestOrbProps = {
  onClick: () => void
}

export default function InvestOrb({ onClick }: InvestOrbProps) {
  return (
    <button className="invest-orb" id="orb" type="button" aria-label="I want to invest — go to the allocation form" onClick={onClick}>
      <span className="orb-label">
        I want
        <br />
        to invest
      </span>
    </button>
  )
}

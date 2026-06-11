export default function HeroPayCard() {
  return (
    <div className="pay-card float" aria-hidden="true">
      <div className="pay-icon">
        <svg viewBox="0 0 24 24">
          <path d="M4 10l1.2-5h13.6L20 10M4 10v9h16v-9M4 10c0 1.4 1.2 2.5 2.7 2.5S9.3 11.4 9.3 10c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1.2 2.5 2.7 2.5S20 11.4 20 10M9.5 19v-5h5v5" />
        </svg>
      </div>
      <div>
        <div className="pay-name">Riverside Bakery</div>
        <div className="pay-time">2026-06-10 09:00:14</div>
      </div>
      <div className="pay-amt">+$7,500</div>
    </div>
  )
}

export default function Nav() {
  return (
    <header className="nav" id="nav">
      <a className="brand" href="#top" aria-label="Alic — home">
        <span className="brand-mark">Alic<sup>®</sup></span>
        <span className="brand-tag">Private Credit</span>
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#strategy">strategy</a>
        <a href="#performance">performance</a>
        <a href="#calculator">calculator</a>
        <a href="#safeguards">safeguards</a>
        <a className="nav-pill" href="#invest">Invest now</a>
      </nav>
    </header>
  )
}

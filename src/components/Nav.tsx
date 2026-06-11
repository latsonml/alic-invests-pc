import { useCallback, useEffect, useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 641px)').matches) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`nav${menuOpen ? ' is-open' : ''}`} id="nav">
      <a className="brand" href="#top" aria-label="Alic — home">
        <span className="brand-mark">Alic<sup>®</sup></span>
        <span className="brand-tag">Private Credit</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      {menuOpen && <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={closeMenu} />}

      <nav className="nav-links" id="nav-menu" aria-label="Main">
        <a className="nav-desktop-only" href="#strategy">
          strategy
        </a>
        <a className="nav-desktop-only" href="#performance">
          performance
        </a>
        <a className="nav-desktop-only" href="#calculator">
          calculator
        </a>
        <a className="nav-desktop-only" href="#safeguards">
          safeguards
        </a>
        <a className="nav-login" href="https://investors.alicinvestments.com" onClick={closeMenu}>
          Log in
        </a>
        <a className="nav-pill" href="#invest" onClick={closeMenu}>
          Invest now
        </a>
      </nav>
    </header>
  )
}

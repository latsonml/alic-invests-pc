import { useCallback, useState, type FormEvent } from 'react'
import gsap from 'gsap'

export default function Invest() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setSubmitted(true)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const done = document.getElementById('form-done')
    if (done && !prefersReduced) {
      gsap.from(done, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' })
    }
  }, [])

  return (
    <div className="panel invest" id="invest">
      <section>
        <div className="sec-head reveal">
          <span className="mono">06 — Your allocation</span>
          <h2>Start here</h2>
        </div>
        <div className="invest-grid">
          <div className="reveal">
            <h2 className="big">
              Put idle capital on a <em>weekly</em> schedule.
            </h2>
            <p className="invest-sub">
              Tell us a little about yourself and we&apos;ll send the offering documents, the current performance letter, and a calendar link for a call with the portfolio team. No commitment, no pressure.
            </p>
          </div>
          {!submitted && (
            <form id="invest-form" className="reveal" noValidate onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="f-name">Full name</label>
                <input id="f-name" name="name" type="text" placeholder="Jordan Ellis" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="f-amount">Intended allocation</label>
                <select id="f-amount" name="amount" required defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>$50K – $100K</option>
                  <option>$100K – $250K</option>
                  <option>$250K – $1M</option>
                  <option>$1M+</option>
                </select>
              </div>
              <button className="submit" type="submit">
                Request the offering documents
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </form>
          )}
          {submitted && (
            <div className="form-done" id="form-done" role="status" style={{ display: 'block' }}>
              <span className="mono">Request received</span>
              Thank you — the offering documents are on their way to your inbox, along with a link to book time with the portfolio team.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

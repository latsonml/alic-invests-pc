const STEPS = [
  {
    step: 'Step 1',
    title: 'We underwrite the business, not the story',
    description:
      'Live bank-account data, revenue history, and existing payment behavior. Only profitable operators carrying expensive short-term debt qualify.',
    glyph: (
      <svg viewBox="0 0 120 56">
        <line x1="4" y1="10" x2="76" y2="10" />
        <line x1="4" y1="24" x2="76" y2="24" />
        <line x1="4" y1="38" x2="76" y2="38" />
        <circle className="accent" cx="98" cy="24" r="13" />
        <line className="accent" x1="107" y1="33" x2="116" y2="42" />
      </svg>
    ),
  },
  {
    step: 'Step 2',
    title: 'We retire the pile, set one payment',
    description:
      'Alic pays down the stack of obligations and replaces it with a single restructured payment on terms the business can sustain for the full term.',
    glyph: (
      <svg viewBox="0 0 120 56">
        <path d="M4 8 C 40 8, 50 28, 86 28" />
        <path d="M4 28 L 86 28" />
        <path d="M4 48 C 40 48, 50 28, 86 28" />
        <path className="accent" d="M86 28 L 116 28" />
      </svg>
    ),
  },
  {
    step: 'Step 3',
    title: 'You collect, every single week',
    description:
      'Performing repayments flow into the fund and out to investors on a weekly cadence — backed by hundreds of positions, not a single bet.',
    glyph: (
      <svg viewBox="0 0 120 56">
        <line className="accent" x1="4" y1="44" x2="116" y2="44" />
        <line x1="14" y1="44" x2="14" y2="30" />
        <line x1="34" y1="44" x2="34" y2="26" />
        <line x1="54" y1="44" x2="54" y2="30" />
        <line x1="74" y1="44" x2="74" y2="22" />
        <line x1="94" y1="44" x2="94" y2="26" />
        <line x1="114" y1="44" x2="114" y2="18" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <div className="panel how-it-works">
      <section aria-label="How your money works">
        <div className="sec-head reveal">
          <span className="mono">02 — The mechanics</span>
          <h2>How your money works</h2>
        </div>
        <div className="steps">
          {STEPS.map((item) => (
            <article className="step reveal" key={item.step}>
              <span className="mono">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="step-glyph" aria-hidden="true">
                {item.glyph}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

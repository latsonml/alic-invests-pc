export default function GrowthCurve() {
  return (
    <div className="curve-wrap reveal">
      <div className="curve-head">
        <span className="mono">Growth of $100,000 · illustrative</span>
        <span className="curve-note">Weekly distributions, reinvested</span>
      </div>
      <svg
        id="curve"
        viewBox="0 0 1000 380"
        role="img"
        aria-label="Illustrative chart comparing growth of one hundred thousand dollars in Alic versus a bank deposit over thirty-six months"
      >
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#49C5B6" stopOpacity=".26" />
            <stop offset="100%" stopColor="#49C5B6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line className="grid-line" x1="0" y1="40" x2="1000" y2="40" />
        <line className="grid-line" x1="0" y1="130" x2="1000" y2="130" />
        <line className="grid-line" x1="0" y1="220" x2="1000" y2="220" />
        <line className="grid-line" x1="0" y1="310" x2="1000" y2="310" />
        <text className="axis-lbl" x="0" y="32">
          $145K
        </text>
        <text className="axis-lbl" x="0" y="122">
          $130K
        </text>
        <text className="axis-lbl" x="0" y="212">
          $115K
        </text>
        <text className="axis-lbl" x="0" y="302">
          $100K
        </text>
        <text className="axis-lbl" x="60" y="340">
          MO 0
        </text>
        <text className="axis-lbl" x="480" y="340">
          MO 18
        </text>
        <text className="axis-lbl end" x="1000" y="340">
          MO 36
        </text>
        <path className="c-fill" d="M60 310 C 320 295, 600 220, 940 64 L 940 310 Z" />
        <path className="c-alic" d="M60 310 C 320 295, 600 220, 940 64" />
        <path className="c-bank" d="M60 310 C 350 306, 650 300, 940 288" />
      </svg>
      <div className="curve-legend">
        <span className="k-alic">
          <i />
          Alic, distributions reinvested
        </span>
        <span className="k-bank">
          <i />
          Typical bank deposit
        </span>
      </div>
    </div>
  )
}

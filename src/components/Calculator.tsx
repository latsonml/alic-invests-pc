import { useCallback, useMemo, useState, type ChangeEvent } from 'react'

const BAL = 100000
const BASE_WKS = 10
const OLD_WK = BAL / BASE_WKS
const RESTRUCTURED_TOTAL = 115000
const INVESTED_CAPITAL = 45000
const RETURNS_AMOUNT = 15000

function fmt$(n: number, dec = 0) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

function fmtX(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '\u00D7'
}

function paintTrack(input: HTMLInputElement) {
  const pct = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100
  input.style.setProperty('--fill', pct + '%')
}

export default function Calculator() {
  const [savePct, setSavePct] = useState(25)

  const results = useMemo(() => {
    const s = savePct / 100
    const newWeekly = OLD_WK * (1 - s)
    const keep = OLD_WK * s
    const capitalAtRisk = keep * BASE_WKS
    const term = RESTRUCTURED_TOTAL / newWeekly
    const cycles = 52 / term
    const multipleOnCapital = INVESTED_CAPITAL / capitalAtRisk
    const returnsPct = (RETURNS_AMOUNT / capitalAtRisk) * 100

    return {
      newWeekly: Math.round(newWeekly),
      keep: Math.round(keep),
      capitalAtRisk: Math.round(capitalAtRisk),
      term: term.toFixed(1),
      cycles: cycles.toFixed(1) + '\u00D7',
      multipleOnCapital: fmtX(multipleOnCapital),
      returnsPct: returnsPct.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 }),
      barWidth: (1 - s) * 100,
    }
  }, [savePct])

  const handleSaveChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSavePct(Number(e.target.value))
    paintTrack(e.target)
  }, [])

  const saveRef = useCallback((node: HTMLInputElement | null) => {
    if (node) paintTrack(node)
  }, [savePct])

  return (
    <div className="panel" id="calculator">
      <section aria-label="Return calculator">
        <div className="sec-head reveal">
          <span className="mono">04 — Run your own numbers</span>
          <h2>Model a cycle</h2>
        </div>

        <div className="calc-grid reveal">
          <div className="calc-controls">
            <div className="ctl">
              <div className="ctl-row">
                <span className="mono">Borrower savings</span>
                <span className="ctl-val" id="v-save">
                  {savePct}%
                </span>
              </div>
              <input
                ref={saveRef}
                type="range"
                id="s-save"
                min={10}
                max={40}
                step={1}
                value={savePct}
                onChange={handleSaveChange}
                aria-label="Borrower savings percentage, adjusts the business's weekly payment"
              />
              <p className="ctl-cap">
                How much payment relief the business gets each week. More relief lowers their weekly bill and extends the repayment period.
              </p>
            </div>
            <div className="ctl">
              <div className="ctl-row">
                <span className="mono">Capital at risk</span>
                <span className="ctl-val" id="v-cap">
                  {fmt$(results.capitalAtRisk)}
                </span>
              </div>
              <p className="ctl-cap">
                The capital Alic puts to work on this position, based on the weekly savings the business keeps over a {BASE_WKS}-week term.
              </p>
            </div>
            <div className="calc-basis">
              Example position — {fmt$(BAL)} balance
              <br />
              {fmt$(OLD_WK)}/week before restructuring
              <br />
              Illustrative investor allocation — {fmt$(INVESTED_CAPITAL)}
            </div>
          </div>

          <div className="calc-outs">
            <div className="out">
              <div className="o-label">The business now pays</div>
              <div className="o-num">
                <span id="o-pay">{fmt$(results.newWeekly)}</span>
                <small>/wk</small>
              </div>
              <p className="o-sub">
                Down from <b>{fmt$(OLD_WK)}/week</b>. The business keeps an extra <b id="o-keep">{fmt$(results.keep)}</b> in cash each week.
              </p>
              <div className="bars" aria-hidden="true">
                <div className="bar-row">
                  <span className="mono">old</span>
                  <div className="bar old">
                    <i />
                  </div>
                </div>
                <div className="bar-row">
                  <span className="mono">new</span>
                  <div className="bar new">
                    <i id="bar-new" style={{ width: `${results.barWidth}%` }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="out">
              <div className="o-label">Restructured term</div>
              <div className="o-num">
                <span id="o-term">{results.term}</span>
                <small>&nbsp;weeks</small>
              </div>
              <p className="o-sub">
                How long this repayment stream runs at the new weekly rate. Your capital can recycle <b id="o-cycles">{results.cycles}</b> times per year.
              </p>
            </div>
            <div className="out hero-out">
              <div className="o-label">Multiple on Invested Capital</div>
              <div className="o-num">
                <span id="o-weekly">{results.multipleOnCapital}</span>
              </div>
              <p className="o-sub">
                How your {fmt$(INVESTED_CAPITAL)} allocation compares to the capital at risk in this cycle.
              </p>
            </div>
            <div className="out">
              <div className="o-label">Returns</div>
              <div className="o-num">
                <span id="o-cycle">{results.returnsPct}</span>
                <small>%</small>
              </div>
              <p className="o-sub">
                Your return on the capital at risk in this position, based on a {fmt$(RETURNS_AMOUNT)} profit target on a {fmt$(BAL)} balance.
              </p>
            </div>
          </div>
        </div>
        <p className="calc-disc reveal">
          This is an illustrative example for one position. Real fund returns come from a diversified portfolio of hundreds of loans and are subject to fees. Projections are not guarantees.
        </p>
      </section>
    </div>
  )
}

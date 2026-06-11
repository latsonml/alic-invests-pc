import type { ReactNode } from 'react'

type HeroTagBoxProps = {
  variant: 'tag-pos' | 'tag-remit'
  label: string
  children: ReactNode
}

export default function HeroTagBox({ variant, label, children }: HeroTagBoxProps) {
  return (
    <div className={`tag-box ${variant} float`} aria-hidden="true">
      <div className="t-label">{label}</div>
      <div className="t-body">{children}</div>
    </div>
  )
}

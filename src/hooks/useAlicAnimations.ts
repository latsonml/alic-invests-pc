import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function drawContours() {
  const c = document.getElementById('contours') as HTMLCanvasElement | null
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx || !c.parentElement) return

  const rect = c.parentElement.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = rect.width * dpr
  c.height = rect.height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const cx = rect.width * 0.82
  const cy = rect.height * 0.2
  const rings = 26
  const SEG = 140

  for (let r = 0; r < rings; r++) {
    const base = 50 + r * 34
    ctx.beginPath()
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2
      const wob =
        Math.sin(a * 3 + r * 0.9) * (7 + r * 1.6) + Math.sin(a * 7 + r * 1.7) * (4 + r * 0.7)
      const rad = base + wob
      const x = cx + Math.cos(a) * rad
      const y = cy + Math.sin(a) * rad * 0.85
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = `rgba(73,197,182,${0.16 - r * 0.0045})`
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

export function useAlicAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const ctx = gsap.context(() => {
      const track = document.getElementById('ticker-track')
      if (track && !prefersReduced) {
        gsap.to(track, { x: -track.scrollWidth / 3, duration: 44, ease: 'none', repeat: -1 })
      }

      if (!prefersReduced) {
        document.querySelectorAll('.reveal').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          })
        })
      } else {
        document.querySelectorAll('.reveal').forEach((el) => {
          const node = el as HTMLElement
          node.style.opacity = '1'
          node.style.transform = 'none'
        })
      }

      ScrollTrigger.create({
        trigger: '#performance',
        start: 'top 72px',
        end: 'bottom 72px',
        onToggle: (self) => {
          document.getElementById('nav')?.classList.toggle('is-dark', self.isActive)
        },
      })

      document.querySelectorAll('.count').forEach((el) => {
        const node = el as HTMLElement
        const target = parseFloat(node.dataset.target || '0')
        const dec = parseInt(node.dataset.decimals || '0', 10) || 0
        const setFinal = () => {
          node.textContent = target.toLocaleString('en-US', {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          })
        }
        if (!prefersReduced) {
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onUpdate: () => {
              node.textContent = obj.v.toLocaleString('en-US', {
                minimumFractionDigits: dec,
                maximumFractionDigits: dec,
              })
            },
            onComplete: setFinal,
          })
        } else {
          setFinal()
        }
      })

      const alic = document.querySelector('#curve .c-alic') as SVGPathElement | null
      const bank = document.querySelector('#curve .c-bank')
      const fill = document.querySelector('#curve .c-fill') as SVGPathElement | null
      if (prefersReduced) {
        if (fill) fill.style.opacity = '1'
      } else {
        if (alic && typeof alic.getTotalLength === 'function') {
          const len = alic.getTotalLength()
          alic.style.strokeDasharray = String(len)
          alic.style.strokeDashoffset = String(len)
          gsap.to(alic, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '#curve', start: 'top 80%' },
          })
        }
        if (bank) {
          gsap.from(bank, {
            opacity: 0,
            duration: 1.4,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: { trigger: '#curve', start: 'top 80%' },
          })
        }
        if (fill) {
          gsap.to(fill, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.8,
            scrollTrigger: { trigger: '#curve', start: 'top 80%' },
          })
        }
      }
    })

    const orb = document.getElementById('orb')
    let qx: gsap.QuickToFunc | undefined
    let qy: gsap.QuickToFunc | undefined
    let qs: gsap.QuickToFunc | undefined

    const onPointerMove = (e: PointerEvent) => {
      if (!orb || !qx || !qy || !qs) return
      const r = orb.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      const radius = 180
      if (dist < radius) {
        const pull = (1 - dist / radius) * 0.35
        qx(dx * pull)
        qy(dy * pull)
        qs(1.06)
      } else {
        qx(0)
        qy(0)
        qs(1)
      }
    }

    if (!prefersReduced && fineMouse && orb) {
      qx = gsap.quickTo(orb, 'x', { duration: 0.4, ease: 'power3.out' })
      qy = gsap.quickTo(orb, 'y', { duration: 0.4, ease: 'power3.out' })
      qs = gsap.quickTo(orb, 'scale', { duration: 0.35, ease: 'power2.out' })
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    drawContours()
    window.addEventListener('resize', drawContours)

    return () => {
      ctx.revert()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', drawContours)
    }
  }, [])
}

export function goInvest() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('invest')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
  setTimeout(
    () => {
      document.getElementById('f-name')?.focus({ preventScroll: true })
    },
    prefersReduced ? 0 : 700,
  )
}

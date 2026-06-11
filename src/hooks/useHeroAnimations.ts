import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function useHeroAnimations(stageRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = stage.closest('.hero')
    if (!hero) return

    const ctx = gsap.context(() => {
      const coin = stage.querySelector('#coin')
      const floats = stage.querySelectorAll('.float')
      const headline = hero.querySelectorAll('#headline .line > span')
      const extras = hero.querySelectorAll('.hero-eyebrow, .hero-sub, .hero-cta')
      const cards = stage.querySelectorAll('.tag-box, .pay-card')

      if (prefersReduced) {
        headline.forEach((el) => {
          ;(el as HTMLElement).style.transform = 'none'
        })
        return
      }

      gsap.to(headline, {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.15,
      })

      gsap.from(extras, {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.55,
        clearProps: 'opacity,transform',
      })

      gsap.from(cards, {
        opacity: 0,
        y: 26,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.8,
        clearProps: 'opacity,transform',
      })

      floats.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 9 : -9,
          duration: 2.8 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.8,
        })
      })

      if (coin) {
        gsap.from(coin, {
          opacity: 0,
          y: 34,
          scale: 0.97,
          duration: 1.3,
          ease: 'power3.out',
          delay: 0.45,
          clearProps: 'opacity',
        })
        gsap.to(coin, {
          y: 14,
          duration: 4.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.9,
        })
        gsap.to(coin, {
          rotation: 1.2,
          duration: 6.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.9,
        })
      }
    }, hero)

    return () => ctx.revert()
  }, [stageRef])
}

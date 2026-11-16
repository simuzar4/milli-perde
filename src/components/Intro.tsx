import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HOLD_MS = 1100
const FLY_MS = 1000

/**
 * Opening animation: the logo appears large in the middle of the screen, then shrinks and flies to its
 * place in the header. The header logo is hidden until the flight lands, so there is only ever one logo.
 * Skipped for reduced-motion users; a click or key press also skips it.
 */
export function Intro() {
  const [done, setDone] = useState(() => prefersReducedMotion())
  const overlay = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (done) return
    let cancelled = false
    let stop: (() => void) | undefined

    const start = (): (() => void) | undefined => {
      const target = document.querySelector<HTMLElement>('header [data-site-logo]')
      const overlayEl = overlay.current
      const markEl = mark.current
      if (!target || !overlayEl || !markEl) {
        setDone(true)
        return undefined
      }

      // Put the clone exactly over the header logo, then start it big and centred.
      const t = target.getBoundingClientRect()
      markEl.style.left = `${t.left}px`
      markEl.style.top = `${t.top}px`
      const m = markEl.getBoundingClientRect()
      const scale = Math.min(window.innerWidth * 0.82, 620) / m.width
      const cx = (window.innerWidth - m.width * scale) / 2 - t.left
      const cy = (window.innerHeight - m.height * scale) / 2 - t.top
      const big = `translate(${cx}px, ${cy}px) scale(${scale})`

      target.style.opacity = '0'
      // Hold the page still without touching overflow: hiding the scrollbar would shift the layout by its width.
      const hold = (e: Event) => e.preventDefault()
      window.addEventListener('wheel', hold, { passive: false })
      window.addEventListener('touchmove', hold, { passive: false })

      const appear = markEl.animate(
        [
          { transform: `translate(${cx}px, ${cy}px) scale(${scale * 0.9})`, opacity: 0 },
          { transform: big, opacity: 1 },
        ],
        { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
      )
      let fly: Animation | undefined
      let fade: Animation | undefined

      const restore = () => {
        // Hide the cover first: cancelling its fade removes the "faded out" state, and for one frame the
        // opaque cover would flash back until React unmounts it.
        overlayEl.style.display = 'none'
        window.clearTimeout(timer)
        window.removeEventListener('keydown', finish)
        window.removeEventListener('wheel', hold)
        window.removeEventListener('touchmove', hold)
        appear.cancel()
        fly?.cancel()
        fade?.cancel()
        target.style.opacity = ''
        target.style.transition = ''
      }
      const finish = () => {
        restore()
        setDone(true)
      }

      // Landing: the real logo fades in under the flying copy, which fades out, so there is no hard swap.
      const land = () => {
        target.style.transition = 'opacity 160ms linear'
        target.style.opacity = '1'
        markEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'linear', fill: 'forwards' }).onfinish = finish
      }

      // Hold the big logo for a beat, then fly it home while the dark cover fades away.
      const timer = window.setTimeout(() => {
        fly = markEl.animate([{ transform: big }, { transform: 'translate(0px, 0px) scale(1)' }], {
          duration: FLY_MS,
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          fill: 'forwards',
        })
        fade = overlayEl.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: FLY_MS - 200,
          delay: 250,
          easing: 'ease-out',
          fill: 'forwards',
        })
        fly.onfinish = land
      }, HOLD_MS)

      window.addEventListener('keydown', finish, { once: true })
      overlayEl.addEventListener('pointerdown', finish, { once: true })
      return restore
    }

    // Measure only after the fonts are loaded: the wordmark gets wider once Oswald arrives.
    document.fonts.ready.then(() => {
      if (!cancelled) stop = start()
    })
    return () => {
      cancelled = true
      stop?.()
    }
  }, [done])

  if (done) return null

  return (
    <div ref={overlay} aria-hidden="true" className="fixed inset-0 z-[100] bg-background">
      <div
        ref={mark}
        className="fixed flex min-h-11 origin-top-left items-center gap-space-sm opacity-0"
        style={{ left: 0, top: 0 }}
      >
        <img src="/logo.svg" alt="" width={44} height={44} className="h-10 w-10 shrink-0 md:h-11 md:w-11" />
        <span className="font-display text-headline-lg uppercase tracking-wider text-on-surface">
          Milli <span className="text-primary-container">Pərdə</span>
        </span>
      </div>
    </div>
  )
}

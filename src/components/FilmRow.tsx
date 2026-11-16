import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Film } from '../types'
import { FilmCard } from './FilmCard'

interface Props {
  title: string
  hint?: string
  films: Film[]
}

export function FilmRow({ title, hint, films }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const page = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section aria-label={title} className="flex flex-col">
      <div className="mb-space-sm flex items-end justify-between gap-space-md px-margin md:px-margin-desktop">
        <div className="flex min-w-0 flex-col md:flex-row md:items-baseline md:gap-space-md">
          <h2 className="text-headline-xl-mobile font-headline-xl-mobile uppercase text-on-surface md:text-headline-xl md:font-headline-xl">
            {title}
          </h2>
          {hint && <p className="truncate text-body-sm text-secondary">{hint}</p>}
        </div>
        <div className="hidden shrink-0 gap-space-xs md:flex">
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label={`${title}: əvvəlki filmlər`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-primary-container"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            aria-label={`${title}: sonrakı filmlər`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-primary-container"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-margin gap-space-md overflow-x-auto px-margin pb-space-md pt-3 md:scroll-px-margin-desktop md:px-margin-desktop"
      >
        {films.map((film) => (
          <FilmCard key={film.id} film={film} fixedWidth />
        ))}
      </div>
    </section>
  )
}

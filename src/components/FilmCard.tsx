import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { linkKindLabel } from '../lib/linkKind'
import type { Film } from '../types'

/** A real frame from the film's YouTube video; falls back to a title card if it fails to load. */
export function Still({
  film,
  className = '',
  sizes = '(min-width: 1024px) 320px, 288px',
  priority = false,
}: {
  film: Film
  className?: string
  /** The `sizes` hint for srcset: how wide the frame is displayed. */
  sizes?: string
  /** True for the one image that is the page's largest visible element. */
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (!film.image || failed) {
    return (
      <div
        className={`flex h-full w-full items-end bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-space-md ${className}`}
      >
        <span className="font-display text-headline-lg uppercase leading-none text-on-surface">{film.title}</span>
      </div>
    )
  }
  return (
    <img
      src={film.image}
      alt=""
      srcSet={film.imageSmall ? `${film.imageSmall} 320w, ${film.image} 1280w` : undefined}
      sizes={film.imageSmall ? sizes : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

interface Props {
  film: Film
  /** Fixed width for carousel rows; omit inside grids. */
  fixedWidth?: boolean
  /** Heading level of the title, so a page's outline stays h1 > h2 > h3. */
  as?: 'h2' | 'h3'
}

/** Opens the film's page on this site, where the video plays. YouTube itself is one button away. */
export function FilmCard({ film, fixedWidth = false, as: Heading = 'h3' }: Props) {
  const kind = linkKindLabel[film.linkKind]
  return (
    <article className={`group relative shrink-0 snap-start ${fixedWidth ? 'w-64 sm:w-72 lg:w-80' : 'w-full'}`}>
      <Link
        to={`/film/${film.id}`}
        aria-label={`${film.title} (${film.year}): filmə bax`}
        className="block overflow-hidden rounded-xl bg-surface-container-high ring-1 ring-white/5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_18px_32px_-12px_rgba(0,0,0,0.8)] focus-visible:-translate-y-1"
      >
        <div className="relative aspect-video overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
            <Still film={film} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-lg transition-transform duration-300 group-hover:scale-100">
              <Play size={22} fill="currentColor" aria-hidden="true" />
            </span>
          </div>
          {kind && (
            <span className="absolute left-2 top-2 rounded bg-surface-container-highest/90 px-1.5 py-0.5 text-[12px] font-semibold leading-4 text-tertiary">
              {kind}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-0.5 p-space-sm sm:p-space-md">
          <Heading className="truncate font-label-lg text-label-lg font-bold text-on-surface transition-colors group-hover:text-primary">
            {film.title}
          </Heading>
          <p className="truncate text-label-md text-secondary">
            {film.year}
            {film.genres[0] ? ` • ${film.genres[0]}` : ''}
          </p>
        </div>
      </Link>
    </article>
  )
}

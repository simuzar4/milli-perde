import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import { FilmRow } from '../components/FilmRow'
import { aboutText, eraLabels, eraOf, eraRange, FEATURED_ID, films, homeRows } from '../data/films'
import { formatRuntime } from '../lib/text'
import { usePageTitle } from '../lib/usePageTitle'
import type { Era } from '../types'

const eras = Object.keys(eraLabels) as Era[]

function EraBand() {
  return (
    <section aria-label="Dövr üzrə kəşf et" className="px-margin md:px-margin-desktop">
      <h2 className="mb-space-sm font-display text-headline-xl-mobile uppercase text-on-surface md:text-headline-xl">
        Dövr üzrə kəşf et
      </h2>
      <ul className="grid gap-space-md md:grid-cols-3">
        {eras.map((era) => {
          const count = films.filter((f) => eraOf(f.year) === era).length
          return (
            <li key={era}>
              <Link
                to={`/filmler?dovr=${era}`}
                className="group flex h-full items-center justify-between gap-space-md rounded-xl bg-surface-container-low p-space-md transition-colors hover:bg-primary-container md:items-end md:p-space-lg"
              >
                <span>
                  <span className="block font-display text-headline-xl-mobile uppercase leading-none text-on-surface group-hover:text-on-primary-container md:text-headline-xl">
                    {eraLabels[era]}
                  </span>
                  <span className="mt-space-sm block text-body-md text-secondary group-hover:text-on-primary-container">
                    {eraRange[era]} · {count} film
                  </span>
                </span>
                <ArrowRight
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-on-primary-container"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function About() {
  return (
    <section aria-labelledby="about" className="px-margin md:px-margin-desktop">
      <div className="grid gap-space-lg rounded-xl bg-surface-container-low p-space-lg md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:p-space-xl">
        <h2 id="about" className="font-display text-headline-xl-mobile uppercase leading-none text-on-surface md:text-headline-xl">
          Azərbaycan kinosu haqqında
        </h2>
        <p className="max-w-[62ch] text-body-lg text-secondary">{aboutText}</p>
      </div>
    </section>
  )
}

export function Home() {
  usePageTitle()
  const featured = films.find((f) => f.id === FEATURED_ID) ?? films[0]
  const rows = homeRows()
  const runtime = formatRuntime(featured.runtimeMinutes)

  return (
    <>
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden lg:min-h-[90vh]">
        {featured.image && (
          <img
            src={featured.image}
            alt=""
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/75 to-transparent md:w-3/4" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background/80 to-transparent" />

        <div className="flex w-full max-w-5xl flex-col items-start px-margin pb-space-2xl pt-32 md:px-margin-desktop lg:pb-24">
          <h1 className="rise font-display text-display-hero-mobile uppercase text-on-surface drop-shadow-2xl md:text-display-hero-xl">
            {featured.title}
          </h1>
          <p className="rise rise-1 my-space-md flex flex-wrap items-center gap-x-space-sm gap-y-1 text-label-md text-secondary">
            <span className="font-bold text-on-surface">{featured.year}</span>
            {featured.genres.map((g) => (
              <span key={g} className="rounded bg-surface-container-highest px-space-sm py-0.5 text-on-surface">
                {g}
              </span>
            ))}
            {runtime && <span>{runtime}</span>}
          </p>
          <p className="rise rise-2 mb-space-xl max-w-[56ch] text-body-lg text-secondary line-clamp-4 md:line-clamp-none">
            {featured.synopsis}
          </p>
          <div className="rise rise-3 flex flex-wrap items-center gap-space-md">
            <Link
              to={`/film/${featured.id}?oynat=1`}
              className="flex min-h-12 items-center gap-space-sm rounded-lg bg-primary-container px-space-xl py-3.5 text-label-lg text-on-primary-container shadow-xl transition-[background-color,transform] duration-200 hover:bg-primary-hover active:scale-[0.98]"
            >
              <Play size={20} fill="currentColor" aria-hidden="true" />
              İzlə
            </Link>
            <a
              href={featured.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-space-sm rounded-lg border border-outline-variant bg-surface-container-high/70 px-space-lg py-3.5 text-label-lg text-on-surface backdrop-blur-sm transition-colors hover:bg-surface-container-highest"
            >
              <ExternalLink size={18} aria-hidden="true" />
              YouTube-da aç
            </a>
          </div>
        </div>
      </section>

      <nav
        aria-label="Bölmələrə keç"
        className="sticky top-16 z-40 bg-surface-container-lowest/90 backdrop-blur-md md:top-20"
      >
        <ul className="no-scrollbar flex gap-space-sm overflow-x-auto px-margin py-space-sm md:px-margin-desktop">
          {rows.map((row) => (
            <li key={row.id} className="shrink-0">
              <a
                href={`#${row.id}`}
                className="flex min-h-10 items-center rounded-full bg-surface-container-high px-space-lg text-label-md text-secondary transition-colors hover:bg-surface-container-highest hover:text-on-surface"
              >
                {row.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-space-xl py-space-xl">
        {rows.map((row, i) => (
          <Fragment key={row.id}>
            <div id={row.id} className="scroll-mt-40">
              <FilmRow title={row.title} hint={row.hint} films={row.films} />
            </div>
            {i === 0 && <EraBand />}
          </Fragment>
        ))}
        <About />
      </div>
    </>
  )
}

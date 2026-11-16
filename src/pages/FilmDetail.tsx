import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Play } from 'lucide-react'
import { FilmRow } from '../components/FilmRow'
import { Still } from '../components/FilmCard'
import { linkKindLabel } from '../lib/linkKind'
import { Avatar } from '../components/Monogram'
import { byId, directorsOf, eraLabels, eraOf, personByName, similarTo } from '../data/films'
import { formatRuntime } from '../lib/text'
import { usePageTitle } from '../lib/usePageTitle'
import type { Film } from '../types'

function YouTubeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded bg-surface-container-highest px-space-sm py-1 text-label-md text-on-surface">
      <svg viewBox="0 0 24 24" width="16" height="12" aria-hidden="true" className="text-primary-container">
        <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
      YouTube
    </span>
  )
}

/**
 * YouTube player. The frame and a play button show first; the iframe loads on click (or when the page is
 * opened with ?oynat=1), so the page never shows an empty black box while YouTube loads.
 */
function Player({ film, autoplay }: { film: Film; autoplay: boolean }) {
  const [started, setStarted] = useState(autoplay)

  if (!film.youtubeId) {
    return (
      <a
        href={film.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden rounded-xl bg-surface-container-high"
      >
        <Still film={film} />
        <span className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest/60 text-label-lg text-on-surface">
          YouTube-da axtar
        </span>
      </a>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_24px_40px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
      {started ? (
        <iframe
          title={`${film.title} (${film.year}): YouTube pleyeri`}
          src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setStarted(true)}
          aria-label={`${film.title} filmini oynat`}
          className="group absolute inset-0 block h-full w-full"
        >
          <Still film={film} sizes="(min-width: 1152px) 1100px, 100vw" priority />
          <span className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
              <Play size={30} fill="currentColor" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export function FilmDetail() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const film = id ? byId(id) : undefined
  usePageTitle(film ? `${film.title} (${film.year})` : 'Film tapılmadı')

  if (!film) {
    return (
      <div className="flex min-h-[70vh] flex-col items-start justify-center gap-space-md px-margin md:px-margin-desktop">
        <h1 className="font-display text-headline-xl uppercase text-on-surface">Film tapılmadı</h1>
        <p className="text-body-lg text-secondary">Bu ünvanda film yoxdur. Kataloqa qayıdıb axtara bilərsiniz.</p>
        <Link
          to="/filmler"
          className="rounded-lg bg-primary-container px-space-lg py-3 text-label-lg text-on-primary-container"
        >
          Filmlərə bax
        </Link>
      </div>
    )
  }

  const runtime = formatRuntime(film.runtimeMinutes)
  const kind = linkKindLabel[film.linkKind]
  const similar = similarTo(film)
  const directors = directorsOf(film)

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {film.image && (
          <img
            src={film.image}
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover blur-2xl"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/85 to-background/60" />
        <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-margin pb-space-xl pt-24 md:px-margin-desktop md:pt-32">
          <Link
            to="/filmler"
            className="inline-flex min-h-11 items-center gap-1.5 self-start text-label-lg text-secondary transition-colors hover:text-on-surface"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Bütün filmlər
          </Link>
          <Player key={film.id} film={film} autoplay={params.get('oynat') === '1'} />
          <div className="flex flex-col items-start gap-space-md">
            <h1 className="text-balance font-display text-display-hero-mobile uppercase text-on-surface md:text-display-hero">
              {film.title}
            </h1>
            <p className="flex flex-wrap items-center gap-x-space-sm gap-y-1 text-label-md text-secondary">
              <span className="font-bold text-on-surface">{film.year}</span>
              {runtime && <span>{runtime}</span>}
              <span>{eraLabels[eraOf(film.year)]}</span>
              {film.genres.map((g) => (
                <Link
                  key={g}
                  to={`/filmler?janr=${encodeURIComponent(g)}`}
                  className="inline-flex min-h-8 items-center rounded bg-surface-container-highest px-space-sm text-on-surface transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                  {g}
                </Link>
              ))}
            </p>
            <p className="max-w-[62ch] text-body-lg text-secondary">{film.synopsis}</p>
            <div className="flex flex-wrap items-center gap-space-md">
              <a
                href={film.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-space-sm rounded-lg border border-outline-variant bg-surface-container-high/70 px-space-lg py-3 text-label-lg text-on-surface transition-colors hover:bg-surface-container-highest"
              >
                <ExternalLink size={18} aria-hidden="true" />
                YouTube-da aç (yeni tabda)
              </a>
              <YouTubeBadge />
              {kind && <span className="text-label-md text-tertiary">{kind}</span>}
              {film.channel && film.linkKind !== 'search' && (
                <span className="text-body-sm text-secondary">Kanal: {film.channel}</span>
              )}
            </div>
            <p className="max-w-[62ch] text-body-sm text-secondary">
              Video açılmırsa, brauzeriniz üçüncü tərəf məzmununu bloklaya bilər. Bu halda “YouTube-da aç” düyməsindən istifadə edin.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-space-xl px-margin md:px-margin-desktop">
        {film.overview && (
          <section aria-labelledby="overview">
            <h2 id="overview" className="mb-space-sm font-display text-headline-lg uppercase text-on-surface">
              İcmal
            </h2>
            <p className="max-w-[62ch] text-body-lg text-secondary">{film.overview}</p>
          </section>
        )}

        {directors.length > 0 && (
          <section aria-labelledby="director">
            <h2 id="director" className="mb-space-sm font-display text-headline-lg uppercase text-on-surface">
              {directors.length > 1 ? 'Rejissorlar' : 'Rejissor'}
            </h2>
            <ul className="flex flex-wrap gap-space-sm">
              {directors.map((name) => (
                <li key={name}>
                  <Link
                    to={`/rejissorlar?q=${encodeURIComponent(name)}`}
                    className="inline-flex items-center gap-space-md rounded-xl bg-surface-container-low p-space-sm pr-space-lg transition-colors hover:bg-surface-container"
                  >
                    <Avatar name={name} photo={personByName(name)?.photo} />
                    <span className="text-label-lg text-on-surface">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {film.cast.length > 0 && (
          <section aria-labelledby="cast">
            <h2 id="cast" className="mb-space-sm font-display text-headline-lg uppercase text-on-surface">
              Aktyorlar
            </h2>
            <ul className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-3">
              {film.cast.map((c) => (
                <li key={c.name}>
                  <Link
                    to={`/aktyorlar?q=${encodeURIComponent(c.name)}`}
                    className="flex items-center gap-space-md rounded-xl bg-surface-container-low p-space-sm transition-colors hover:bg-surface-container"
                  >
                    <Avatar name={c.name} photo={personByName(c.name)?.photo} />
                    <span className="min-w-0">
                      <span className="block truncate text-label-lg text-on-surface">{c.name}</span>
                      {c.role && <span className="block truncate text-body-sm text-secondary">{c.role}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {similar.length > 0 && (
        <div className="mt-space-xl">
          <FilmRow title="Bənzər filmlər" films={similar} />
        </div>
      )}
    </>
  )
}

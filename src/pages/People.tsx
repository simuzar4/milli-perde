import { useId, useMemo } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { Avatar } from '../components/Monogram'
import { actors, directors } from '../data/films'
import { fold } from '../lib/text'
import { usePageTitle } from '../lib/usePageTitle'
import type { Person } from '../types'

function PersonRow({ person }: { person: Person }) {
  return (
    <Link
      to={`/filmler?q=${encodeURIComponent(person.name)}`}
      className="group flex min-w-0 items-center gap-space-md rounded-xl bg-surface-container-low p-space-sm pr-space-md transition-colors hover:bg-surface-container"
    >
      <Avatar name={person.name} photo={person.photo} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-label-lg text-on-surface">{person.name}</span>
        <span className="block truncate text-body-sm text-secondary">
          {person.films.length} film · {person.films.map((f) => f.title).slice(0, 2).join(', ')}
          {person.films.length > 2 ? '…' : ''}
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 text-label-md text-primary">
        <span className="hidden sm:inline">Filmlərə bax</span>
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  )
}

export function People({ role }: { role: 'director' | 'actor' }) {
  usePageTitle(role === 'director' ? 'Rejissorlar' : 'Aktyorlar')
  const [params, setParams] = useSearchParams()
  const inputId = useId()
  const q = params.get('q') ?? ''
  const list = role === 'director' ? directors : actors

  const results = useMemo(() => {
    const needle = fold(q.trim())
    return needle ? list.filter((p) => fold(p.name).includes(needle)) : list
  }, [list, q])

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center justify-center rounded-lg px-space-lg text-center text-label-lg transition-colors ${
      isActive ? 'bg-primary-container text-on-primary-container' : 'text-secondary hover:text-on-surface'
    }`

  return (
    <div className="mx-auto max-w-6xl px-margin pb-space-xl pt-24 md:px-margin-desktop md:pt-32">
      <h1 className="font-display text-headline-xl-mobile uppercase text-on-surface md:text-headline-xl">
        Rejissorlar və aktyorlar
      </h1>

      <div className="mt-space-lg flex flex-col gap-space-md md:flex-row md:items-center md:justify-between">
        <nav aria-label="Bölmə" className="grid w-full grid-cols-2 gap-1 rounded-xl bg-surface-container-lowest p-1 md:w-auto">
          <NavLink to="/rejissorlar" className={tabClass}>
            Rejissorlar ({directors.length})
          </NavLink>
          <NavLink to="/aktyorlar" className={tabClass}>
            Aktyorlar ({actors.length})
          </NavLink>
        </nav>
        <div className="relative w-full md:max-w-sm">
          <label htmlFor={inputId} className="sr-only">
            Ada görə axtarın
          </label>
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            id={inputId}
            type="search"
            value={q}
            onChange={(e) => {
              const next = new URLSearchParams(params)
              if (e.target.value) next.set('q', e.target.value)
              else next.delete('q')
              setParams(next, { replace: true })
            }}
            placeholder={role === 'director' ? 'Rejissor axtarın...' : 'Aktyor axtarın...'}
            className="w-full rounded-xl bg-surface-container-high py-3 pl-10 pr-10 text-body-md text-on-surface outline-none transition-colors focus:bg-surface-container-highest focus-visible:ring-2 focus-visible:ring-primary"
          />
          {q && (
            <button
              type="button"
              onClick={() => setParams({}, { replace: true })}
              aria-label="Axtarışı təmizlə"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-space-lg text-body-md text-secondary" aria-live="polite">
        <strong className="font-semibold text-on-surface">{results.length}</strong>{' '}
        {role === 'director' ? 'rejissor' : 'aktyor'} göstərilir
      </p>

      {results.length > 0 ? (
        <ul className="mt-space-md grid grid-cols-1 gap-space-sm md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug} className="min-w-0">
              <PersonRow person={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-space-lg rounded-xl bg-surface-container-low p-space-lg">
          <p className="text-headline-md font-headline-md text-on-surface">Heç kim tapılmadı</p>
          <p className="mt-1 text-body-md text-secondary">Adın yazılışını yoxlayın və ya axtarışı təmizləyin.</p>
        </div>
      )}
    </div>
  )
}

import { useId, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListFilter, Search, X } from 'lucide-react'
import { FilmCard } from '../components/FilmCard'
import { allGenres, eraLabels, eraOf, films } from '../data/films'
import { fold } from '../lib/text'
import { usePageTitle } from '../lib/usePageTitle'
import type { Era, Film } from '../types'

const eras = Object.keys(eraLabels) as Era[]

type Sort = 'il-artan' | 'il-azalan' | 'ad'
const sorts: { value: Sort; label: string }[] = [
  { value: 'il-artan', label: 'Köhnədən yeniyə' },
  { value: 'il-azalan', label: 'Yenidən köhnəyə' },
  { value: 'ad', label: 'Əlifba sırası' },
]

function Chip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean
  count?: number
  onClick: () => void
  children: ReactNode
}) {
  const empty = count === 0 && !active
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      disabled={empty}
      className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-space-lg text-label-md transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'bg-primary-container text-on-primary-container'
          : 'bg-surface-container-high text-secondary hover:bg-surface-container-highest hover:text-on-surface disabled:hover:bg-surface-container-high disabled:hover:text-secondary'
      }`}
    >
      {children}
      {count !== undefined && <span className="tabular-nums opacity-75">{count}</span>}
    </button>
  )
}

export function Films() {
  usePageTitle('Filmlər və axtarış')
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const inputId = useId()
  const q = params.get('q') ?? ''
  const genre = params.get('janr') ?? ''
  const era = (params.get('dovr') ?? '') as Era | ''
  const sort = (params.get('sirala') ?? 'il-artan') as Sort

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const clearAll = () => setParams({}, { replace: true })

  const matchesQuery = (f: Film) => {
    const needle = fold(q.trim())
    if (!needle) return true
    return fold([f.title, f.director, ...f.cast.map((c) => c.name), ...f.genres].join(' ')).includes(needle)
  }

  const results = useMemo(() => {
    const list = films.filter(
      (f) => matchesQuery(f) && (!genre || f.genres.includes(genre)) && (!era || eraOf(f.year) === era),
    )
    const byTitle = (a: Film, b: Film) => a.title.localeCompare(b.title, 'az')
    if (sort === 'ad') return list.sort(byTitle)
    if (sort === 'il-azalan') return list.sort((a, b) => b.year - a.year || byTitle(a, b))
    return list.sort((a, b) => a.year - b.year || byTitle(a, b))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, genre, era, sort])

  // Chip counts answer "how many films would this give me?" with the other filters already applied.
  const genreCount = (g: string) =>
    films.filter((f) => matchesQuery(f) && f.genres.includes(g) && (!era || eraOf(f.year) === era)).length
  const eraCount = (e: Era) =>
    films.filter((f) => matchesQuery(f) && eraOf(f.year) === e && (!genre || f.genres.includes(genre))).length

  const activeFilters = [
    q && { key: 'q', label: `"${q}"` },
    genre && { key: 'janr', label: genre },
    era && { key: 'dovr', label: eraLabels[era] },
  ].filter(Boolean) as { key: string; label: string }[]
  const filterCount = [genre, era].filter(Boolean).length

  return (
    <div className="px-margin pb-space-xl pt-24 md:px-margin-desktop md:pt-32">
      <h1 className="font-display text-headline-xl-mobile uppercase text-on-surface md:text-headline-xl">
        Filmlər və axtarış
      </h1>

      <div className="mt-space-lg flex flex-col gap-space-md">
        <div className="relative max-w-3xl">
          <label htmlFor={inputId} className="sr-only">
            Film, rejissor və ya aktyor axtarın
          </label>
          <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            id={inputId}
            type="search"
            value={q}
            onChange={(e) => set('q', e.target.value)}
            placeholder="Film, rejissor və ya aktyor axtarın..."
            className="w-full rounded-xl bg-surface-container-high py-3.5 pl-12 pr-12 text-body-lg text-on-surface outline-none transition-colors focus:bg-surface-container-highest focus-visible:ring-2 focus-visible:ring-primary"
          />
          {q && (
            <button
              type="button"
              onClick={() => set('q', '')}
              aria-label="Axtarışı təmizlə"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface"
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-space-md md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex min-h-11 items-center gap-space-sm rounded-lg bg-surface-container-high px-space-lg text-label-lg text-on-surface"
          >
            <ListFilter size={18} aria-hidden="true" />
            Filtrlər{filterCount > 0 ? ` (${filterCount})` : ''}
          </button>
          <SortSelect value={sort} onChange={(v) => set('sirala', v === 'il-artan' ? '' : v)} />
        </div>

        <div id={panelId} className={`${open ? 'flex' : 'hidden'} flex-col gap-space-md md:flex`}>
          <fieldset className="min-w-0">
            <legend className="mb-space-xs text-label-md text-secondary">Janr</legend>
            <div className="flex flex-wrap gap-space-sm">
              <Chip active={!genre} onClick={() => set('janr', '')}>
                Hamısı
              </Chip>
              {allGenres.map((g) => (
                <Chip key={g} active={genre === g} count={genreCount(g)} onClick={() => set('janr', genre === g ? '' : g)}>
                  {g}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="mb-space-xs text-label-md text-secondary">Dövr</legend>
            <div className="flex flex-wrap gap-space-sm">
              <Chip active={!era} onClick={() => set('dovr', '')}>
                Bütün dövrlər
              </Chip>
              {eras.map((e) => (
                <Chip key={e} active={era === e} count={eraCount(e)} onClick={() => set('dovr', era === e ? '' : e)}>
                  {eraLabels[e]}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-space-xl flex flex-wrap items-center justify-between gap-space-md" aria-live="polite">
        <p className="text-body-md text-secondary">
          <strong className="font-semibold text-on-surface">{results.length}</strong> film tapıldı
        </p>
        <div className="flex items-center gap-space-md">
          <div className="hidden md:block">
            <SortSelect value={sort} onChange={(v) => set('sirala', v === 'il-artan' ? '' : v)} />
          </div>
          {activeFilters.length > 0 && (
            <button type="button" onClick={clearAll} className="min-h-11 text-label-lg text-primary hover:text-on-surface">
              Hamısını təmizlə
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="mt-space-md grid grid-cols-1 gap-x-space-md gap-y-space-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {results.map((f) => (
            <li key={f.id}>
              <FilmCard film={f} as="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-space-lg flex flex-col items-start gap-space-sm rounded-xl bg-surface-container-low p-space-lg">
          <p className="text-headline-md font-headline-md text-on-surface">Bu birləşmə heç nə tapmadı</p>
          <p className="text-body-md text-secondary">Axtarışı genişləndirmək üçün filtrlərdən birini götürün:</p>
          <div className="mt-space-xs flex flex-wrap gap-space-sm">
            {activeFilters.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => set(a.key, '')}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-primary-container px-space-lg text-label-lg text-on-primary-container"
              >
                <X size={16} aria-hidden="true" />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SortSelect({ value, onChange }: { value: Sort; onChange: (v: Sort) => void }) {
  const id = useId()
  return (
    <div className="flex items-center gap-space-sm">
      <label htmlFor={id} className="sr-only md:not-sr-only md:text-label-md md:text-secondary">
        Sıralama
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Sort)}
        className="min-h-11 rounded-lg bg-surface-container-high px-space-md text-label-md text-on-surface outline-none focus:bg-surface-container-highest focus-visible:ring-2 focus-visible:ring-primary"
      >
        {sorts.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  )
}

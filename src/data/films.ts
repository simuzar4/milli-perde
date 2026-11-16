import raw from './films.json'
import peopleData from './people.json'
import about from './about.json'
import { fold, slugify } from '../lib/text'
import type { Era, Film, Person } from '../types'

export const films: Film[] = raw as Film[]

export const aboutText: string = about.text

const photos = peopleData as Record<string, { photo: string; page: string }>

/** The film shown in the home hero. It is left out of the first row so it does not appear twice. */
export const FEATURED_ID = 'nesimi'

export const byId = (id: string): Film | undefined => films.find((f) => f.id === id)

export function eraOf(year: number): Era {
  if (year < 1991) return 'sovet'
  if (year <= 2010) return 'mustaqillik'
  return 'muasir'
}

export const eraLabels: Record<Era, string> = {
  sovet: 'Sovet dövrü',
  mustaqillik: 'Müstəqillik dövrü',
  muasir: 'Müasir dövr',
}

export const eraRange: Record<Era, string> = {
  sovet: 'Klassik dövr (1991-dək)',
  mustaqillik: '1991–2010',
  muasir: '2011-dən',
}

/** All genres that appear in the catalogue, most common first. */
export const allGenres: string[] = (() => {
  const count = new Map<string, number>()
  for (const f of films) for (const g of f.genres) count.set(g, (count.get(g) ?? 0) + 1)
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'az')).map(([g]) => g)
})()

export const years: number[] = [...new Set(films.map((f) => f.year))].sort((a, b) => b - a)

export function similarTo(film: Film, limit = 8): Film[] {
  const score = (f: Film) =>
    f.genres.filter((g) => film.genres.includes(g)).length * 3 +
    (f.director === film.director ? 4 : 0) +
    (eraOf(f.year) === eraOf(film.year) ? 1 : 0)
  return films
    .filter((f) => f.id !== film.id)
    .map((f) => [f, score(f)] as const)
    .sort((a, b) => b[1] - a[1] || a[0].year - b[0].year)
    .slice(0, limit)
    .map(([f]) => f)
}

/** A film can credit several directors in one string. */
export const directorsOf = (film: Film): string[] =>
  film.director
    .split(/\s*(?:,|&|\sv[əe]\s)\s*/i)
    .map((d) => d.trim())
    .filter(Boolean)

function collectPeople(): Person[] {
  const map = new Map<string, Person>()
  const add = (name: string, role: Person['role'], film: Film) => {
    const key = `${role}:${fold(name)}`
    const existing = map.get(key)
    if (existing) {
      if (!existing.films.includes(film)) existing.films.push(film)
    } else {
      const p = photos[fold(name).replace(/[^a-z0-9]+/g, ' ').trim()]
      map.set(key, { slug: slugify(name), name, role, films: [film], photo: p?.photo ?? null, photoPage: p?.page ?? null })
    }
  }
  for (const f of films) {
    for (const d of directorsOf(f)) add(d, 'director', f)
    for (const c of f.cast) add(c.name, 'actor', f)
  }
  return [...map.values()].sort(
    (a, b) => b.films.length - a.films.length || a.name.localeCompare(b.name, 'az'),
  )
}

export const people: Person[] = collectPeople()
export const directors = people.filter((p) => p.role === 'director')
export const actors = people.filter((p) => p.role === 'actor')

export interface Row {
  id: string
  title: string
  hint: string
  films: Film[]
}

/** Home page rows. All grouping comes from real data fields, not invented metrics. */
export function homeRows(): Row[] {
  const sorted = (list: Film[]) => [...list].sort((a, b) => a.year - b.year)
  const rows: Row[] = [
    {
      id: 'secilmis',
      title: 'Ən çox izlənənlər',
      hint: 'Tam filmi YouTube-da açılanlar',
      films: films.filter((f) => f.linkKind === 'full' && f.id !== FEATURED_ID).slice(0, 12),
    },
    {
      id: 'sovet',
      title: 'Sovet dövrü klassikləri',
      hint: '1991-ə qədər çəkilmiş filmlər',
      films: sorted(films.filter((f) => eraOf(f.year) === 'sovet')),
    },
    {
      id: 'mustaqillik',
      title: 'Müstəqillik dövrü filmləri',
      hint: '1991–2010',
      films: sorted(films.filter((f) => eraOf(f.year) === 'mustaqillik')),
    },
    {
      id: 'muasir',
      title: 'Müasir Azərbaycan kinosu',
      hint: '2011-dən sonrakı filmlər',
      films: sorted(films.filter((f) => eraOf(f.year) === 'muasir')),
    },
    {
      id: 'komediya',
      title: 'Komediyalar',
      hint: 'Gülüş və musiqi',
      films: sorted(films.filter((f) => f.genres.some((g) => fold(g).includes('komediy')))),
    },
  ]
  return rows.filter((r) => r.films.length > 0)
}

/** Finds a collected person by name (any role), so cast rows can show a photo. */
export const personByName = (name: string): Person | undefined =>
  people.find((p) => fold(p.name) === fold(name))

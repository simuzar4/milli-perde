// Merges researched film data (one JSON file per research batch) with the Stitch poster map
// and writes src/data/films.json. Usage: node scripts/build-films.mjs <research-dir>
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
if (!dir) throw new Error('Pass the folder that holds films-A.json, films-B.json, films-C.json')

const fold = (s) =>
  s
    .toLocaleLowerCase('az')
    .replace(/i̇/g, 'i')
    .replace(/[əıöüşçğ]/g, (c) => ({ ə: 'e', ı: 'i', ö: 'o', ü: 'u', ş: 's', ç: 'c', ğ: 'g' })[c])
    .replace(/[^a-z0-9]+/g, '')

// URL slug from the title, e.g. "Həm ziyarət, həm ticarət" -> "hem-ziyaret-hem-ticaret"
const slug = (s) =>
  s
    .toLocaleLowerCase('az')
    .replace(/i̇/g, 'i')
    .replace(/[əıöüşçğ]/g, (c) => ({ ə: 'e', ı: 'i', ö: 'o', ü: 'u', ş: 's', ç: 'c', ğ: 'g' })[c])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Stitch spells a few titles differently from the real film titles.
// Research notes carry free-form genres ("Lirik-psixoloji dram"). Collapse them into a short,
// stable set so the catalogue filter stays usable.
const GENRE_RULES = [
  ['komediy', 'Komediya'],
  ['tarixi', 'Tarixi'],
  ['epik', 'Tarixi'],
  ['hərbi', 'Hərbi'],
  ['müharibə', 'Hərbi'],
  ['bioqrafik', 'Bioqrafik'],
  ['musiqili', 'Musiqili'],
  ['melodram', 'Melodram'],
  ['romantik', 'Melodram'],
  ['macəra', 'Macəra'],
  ['cinayət', 'Cinayət'],
  ['dram', 'Dram'],
  ['psixoloji', 'Dram'],
  ['sosial', 'Dram'],
]
const canonicalGenres = (genres) => {
  const out = []
  for (const g of genres) {
    const low = g.toLocaleLowerCase('az')
    for (const [needle, label] of GENRE_RULES) {
      if (low.includes(needle) && !out.includes(label)) out.push(label)
    }
  }
  return out.length ? out : ['Dram']
}

// Real frame from the film itself. maxres2 is the automatic 1280x720 frame taken from the middle of the video,
// so unlike the uploader's custom thumbnail it carries no baked-in title text. Fall back to the custom
// thumbnail, then to the small 320x180 frame.
const thumbFor = async (id) => {
  if (!id) return null
  for (const name of ['maxres2', 'maxresdefault']) {
    const url = `https://i.ytimg.com/vi/${id}/${name}.jpg`
    try {
      const r = await fetch(url, { method: 'HEAD' })
      if (r.ok) return url
    } catch {}
  }
  return `https://i.ytimg.com/vi/${id}/mq2.jpg`
}

const overviews = new Map()
for (const part of ['A', 'B', 'C']) {
  const file = join(dir, `overview-${part}.json`)
  if (!existsSync(file)) continue
  for (const o of JSON.parse(readFileSync(file, 'utf8'))) overviews.set(`${fold(o.title)}|${o.year}`, o.overview)
}

const out = []
const dropped = []
for (const part of ['A', 'B', 'C']) {
  const file = join(dir, `films-${part}.json`)
  if (!existsSync(file)) {
    console.warn(`missing ${file}`)
    continue
  }
  for (const f of JSON.parse(readFileSync(file, 'utf8'))) {
    if (f.status === 'not_found') {
      dropped.push(`${f.title} (${f.year}): ${f.notes ?? ''}`)
      continue
    }
    const exact = f.youtubeUrl && f.oembedStatus === 200 && f.kind !== 'none'
    const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${f.title} ${f.year} film`)}`
    out.push({
      id: slug(f.title),
      title: f.title,
      year: f.year,
      director: f.director ?? '',
      genres: canonicalGenres(f.genres ?? []),
      runtimeMinutes: f.runtimeMinutes || null,
      cast: (f.cast ?? []).map((c) => ({ name: c.name, role: c.role ?? '' })),
      synopsis: f.synopsis ?? '',
      overview: overviews.get(`${fold(f.title)}|${f.year}`) ?? null,
      image: exact ? await thumbFor(f.youtubeId) : null,
      // 320x180 frame of the same video, used in srcset so small cards do not download the 1280px one.
      imageSmall: exact ? `https://i.ytimg.com/vi/${f.youtubeId}/mq2.jpg` : null,
      youtubeUrl: exact ? f.youtubeUrl : search,
      youtubeId: exact ? f.youtubeId : null,
      linkKind: exact ? f.kind : 'search',
      channel: exact ? f.channel ?? null : null,
    })
  }
}

writeFileSync('src/data/films.json', JSON.stringify(out, null, 2) + '\n')
console.log(`wrote ${out.length} films; exact YouTube links: ${out.filter((f) => f.linkKind !== 'search').length}`)
console.log(`thumbnails: ${out.filter((f) => f.image).length}/${out.length}, overviews: ${out.filter((f) => f.overview).length}/${out.length}`)
if (dropped.length) console.log('dropped (not found):\n- ' + dropped.join('\n- '))

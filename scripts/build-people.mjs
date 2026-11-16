// Looks up a lead photo on Wikipedia for every director and actor in src/data/films.json.
// Only accepts a page whose title matches the person's name and whose short description
// says it is a film/theatre person. Result: src/data/people.json  { "<folded name>": { name, photo, page, desc } }
import { readFileSync, writeFileSync } from 'node:fs'

const films = JSON.parse(readFileSync('src/data/films.json', 'utf8'))
const fold = (s) =>
  s
    .toLocaleLowerCase('az')
    .replace(/i̇/g, 'i')
    .replace(/[əıöüşçğ]/g, (c) => ({ ə: 'e', ı: 'i', ö: 'o', ü: 'u', ş: 's', ç: 'c', ğ: 'g' })[c])
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const names = new Set()
for (const f of films) {
  for (const d of f.director.split(/\s*(?:,|&|\sv[əe]\s)\s*/i)) if (d.trim()) names.add(d.trim())
  for (const c of f.cast) names.add(c.name)
}

const ROLE = /aktyor|aktris|rejissor|artist|kino|film|ssenarist|teatr|bəstəkar|actor|actress|director|screenwriter|theatre|composer|актёр|актер|актриса|режиссёр|режиссер/i
const UA = 'MilliPerdeSiteBuilder/1.0 (educational film catalogue)'

async function lookup(lang, name) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages|description` +
    `&piprop=thumbnail&pithumbsize=480&titles=${encodeURIComponent(name)}`
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!r.ok) return null
  const j = await r.json()
  const page = Object.values(j.query?.pages ?? {})[0]
  if (!page || page.missing !== undefined) return null
  const same = fold(page.title) === fold(name)
  const desc = page.description ?? ''
  return {
    ok: same && page.thumbnail && ROLE.test(desc),
    title: page.title,
    desc,
    photo: page.thumbnail?.source ?? null,
    page: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
    lang,
  }
}

// Wikidata fallback: free-licensed Commons photo (P18) for a person whose description fits.
// Wikidata rate-limits parallel callers, so every call waits its turn and pauses between requests.
let wdQueue = Promise.resolve()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function wdJson(url) {
  for (let tries = 0; tries < 4; tries++) {
    await sleep(600)
    const r = await fetch(url, { headers: { "User-Agent": UA } })
    const t = await r.text()
    try { return JSON.parse(t) } catch { await sleep(4000) }
  }
  return {}
}
const wikidata = (name) => (wdQueue = wdQueue.then(() => wikidataOnce(name), () => wikidataOnce(name)))
async function wikidataOnce(name) {
  const api = "https://www.wikidata.org/w/api.php"
  for (const lang of ["az", "en"]) {
    const sr = await wdJson(`${api}?action=wbsearchentities&format=json&language=${lang}&uselang=${lang}&limit=6&search=${encodeURIComponent(name)}`)
    for (const cand of sr.search ?? []) {
      if (fold(cand.label ?? "") !== fold(name) && !(cand.aliases ?? []).some((a) => fold(a) === fold(name))) continue
      const ent = await wdJson(`${api}?action=wbgetentities&format=json&props=claims|descriptions&ids=${cand.id}`)
      const e = ent.entities?.[cand.id]
      const descs = Object.values(e?.descriptions ?? {}).map((d) => d.value).join(" ; ")
      const file = e?.claims?.P18?.[0]?.mainsnak?.datavalue?.value
      if (!file || !ROLE.test(descs + " " + (cand.description ?? ""))) continue
      return {
        ok: true,
        title: cand.label,
        desc: cand.description ?? descs,
        photo: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=480`,
        page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`,
        lang: "wikidata",
      }
    }
  }
  return null
}

const out = {}
const report = { found: [], none: [] }
const list = [...names]
let i = 0
async function worker() {
  while (i < list.length) {
    const name = list[i++]
    let hit = null
    for (const lang of ['az', 'en', 'ru']) {
      try {
        const res = await lookup(lang, name)
        if (res?.ok) {
          hit = res
          break
        }
      } catch {}
    }
    if (!hit) { try { hit = await wikidata(name) } catch {} }
    if (hit) {
      out[fold(name)] = { name, photo: hit.photo, page: hit.page, desc: hit.desc, lang: hit.lang }
      report.found.push(`${name} -> ${hit.lang}:${hit.title} (${hit.desc})`)
    } else report.none.push(name)
  }
}
await Promise.all(Array.from({ length: 4 }, worker))

writeFileSync('src/data/people.json', JSON.stringify(out, null, 2) + '\n')
console.log(`names: ${list.length}, with photo: ${report.found.length}`)
console.log(report.found.sort().join('\n'))
console.log('--- no photo ---\n' + report.none.sort().join(', '))

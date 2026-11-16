const MAP: Record<string, string> = {
  ə: 'e',
  ı: 'i',
  ö: 'o',
  ü: 'u',
  ş: 's',
  ç: 'c',
  ğ: 'g',
}

/** Lower-case and fold Azerbaijani letters so "Nesimi" finds "Nəsimi". */
export function fold(input: string): string {
  return input
    .toLocaleLowerCase('az')
    .replace(/i̇/g, 'i')
    .replace(/[əıöüşçğ]/g, (c) => MAP[c] ?? c)
}

export function slugify(input: string): string {
  return fold(input)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatRuntime(minutes: number | null): string | null {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} dəq`
  return m === 0 ? `${h} saat` : `${h} saat ${m} dəq`
}

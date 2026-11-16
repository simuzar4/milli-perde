import { useState } from 'react'

/** Circular initials avatar, used when no photo of the person was found. */
export function Monogram({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toLocaleUpperCase('az'))
    .join('')
  const dim = size === 'lg' ? 'h-20 w-20 text-headline-xl' : 'h-12 w-12 text-headline-lg'
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-display font-semibold leading-none tracking-wider text-on-surface ring-1 ring-white/10 ${dim}`}
    >
      {initials}
    </span>
  )
}

/** Real photo when we have one (Wikipedia / Wikimedia Commons), otherwise the monogram. */
export function Avatar({ name, photo, size = 'md' }: { name: string; photo?: string | null; size?: 'md' | 'lg' }) {
  const [failed, setFailed] = useState(false)
  if (!photo || failed) return <Monogram name={name} size={size} />
  const dim = size === 'lg' ? 'h-20 w-20' : 'h-12 w-12'
  return (
    <img
      src={photo}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${dim} shrink-0 rounded-full bg-surface-container-high object-cover object-top`}
    />
  )
}

import { ExternalLink } from 'lucide-react'
import { people } from '../data/films'
import { usePageTitle } from '../lib/usePageTitle'

/** Attribution for third-party images. Required by CC BY / CC BY-SA, useful for everyone else. */
export function Credits() {
  usePageTitle('Şəkil mənbələri')
  // A person who is both director and actor appears twice in `people`; list each photo once.
  const withPhoto = people.filter(
    (p, i, all) => p.photo && p.photoPage && all.findIndex((q) => q.photo === p.photo) === i,
  )

  return (
    <div className="mx-auto max-w-4xl px-margin pb-space-xl pt-24 md:px-margin-desktop md:pt-32">
      <h1 className="font-display text-headline-xl-mobile uppercase text-on-surface md:text-headline-xl">
        Şəkil mənbələri
      </h1>
      <div className="mt-space-lg flex max-w-[62ch] flex-col gap-space-md text-body-lg text-secondary">
        <p>
          <strong className="font-semibold text-on-surface">Film kadrları</strong> filmlərin YouTube videolarından
          götürülür (<code className="text-on-surface">i.ytimg.com</code>). Müəllif hüquqları film və kanal sahiblərinə
          məxsusdur, filmlər YouTube-da rəsmi kanallarda açılır.
        </p>
        <p>
          <strong className="font-semibold text-on-surface">Şəxslərin fotoları</strong> Vikipediyadan və Wikimedia
          Commons-dan götürülüb. Hər şəklin müəllifi və lisenziyası aşağıdakı mənbə səhifəsində göstərilir (əksəriyyəti
          CC BY və ya CC BY-SA). Siyahıda olmayan şəxslərdə baş hərflər göstərilir, çünki pulsuz lisenziyalı şəkil
          tapılmayıb.
        </p>
      </div>

      <h2 className="mt-space-xl font-display text-headline-lg uppercase text-on-surface">
        Fotoları olan şəxslər ({withPhoto.length})
      </h2>
      <ul className="mt-space-md grid gap-space-xs sm:grid-cols-2">
        {withPhoto.map((p) => (
          <li key={`${p.role}-${p.slug}`}>
            <a
              href={p.photoPage ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-between gap-space-md rounded-lg bg-surface-container-low px-space-md text-label-lg text-on-surface transition-colors hover:bg-surface-container"
            >
              <span className="truncate">{p.name}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-label-md text-primary">
                Mənbə və lisenziya
                <ExternalLink size={14} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

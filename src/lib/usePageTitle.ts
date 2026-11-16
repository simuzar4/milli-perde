import { useEffect } from 'react'

const SITE = 'Milli Pərdə'

/** Sets document.title per route so history, tabs and screen readers can tell pages apart. */
export function usePageTitle(title?: string | null) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Azərbaycan kinosu`
  }, [title])
}

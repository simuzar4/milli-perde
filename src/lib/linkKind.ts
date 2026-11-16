import type { Film } from '../types'

export const linkKindLabel: Record<Film['linkKind'], string | null> = {
  full: null,
  trailer: 'Treyler',
  clip: 'Fraqment',
  search: 'YouTube axtarışı',
}

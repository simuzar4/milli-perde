export type LinkKind = 'full' | 'trailer' | 'clip' | 'search'

export interface CastMember {
  name: string
  role: string
}

export interface Film {
  id: string
  title: string
  year: number
  director: string
  genres: string[]
  runtimeMinutes: number | null
  cast: CastMember[]
  synopsis: string
  /** Real frame from the YouTube video (i.ytimg.com), 16:9. */
  image: string | null
  /** 320px-wide version of the same frame, for srcset. */
  imageSmall: string | null
  /** Short written overview (research/overview-*.json). */
  overview: string | null
  /** The URL that opens when a film is clicked. Always a YouTube URL. */
  youtubeUrl: string
  youtubeId: string | null
  /** 'search' means no verified video was found and the link is a YouTube search. */
  linkKind: LinkKind
  channel: string | null
}

export type Era = 'sovet' | 'mustaqillik' | 'muasir'

export interface Person {
  slug: string
  name: string
  role: 'director' | 'actor'
  films: Film[]
  /** Wikipedia / Wikimedia Commons photo, when one was found. */
  photo: string | null
  /** Page that credits the photo. */
  photoPage: string | null
}

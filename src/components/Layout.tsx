import { useEffect, useId, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Intro } from './Intro'
import { Clapperboard, Home, Megaphone, Search, UserRound, X } from 'lucide-react'

const nav = [
  { to: '/', label: 'Ana səhifə', icon: Home, end: true },
  { to: '/filmler', label: 'Filmlər', icon: Clapperboard, end: false },
  { to: '/rejissorlar', label: 'Rejissorlar', icon: Megaphone, end: false },
  { to: '/aktyorlar', label: 'Aktyorlar', icon: UserRound, end: false },
]

/** The Milli Pərdə emblem from the Stitch design, stored locally in /public/logo.svg. */
function Emblem() {
  return <img src="/logo.svg" alt="" width={44} height={44} className="h-10 w-10 shrink-0 md:h-11 md:w-11" />
}

function Logo({ header = false }: { header?: boolean }) {
  return (
    <Link
      to="/"
      data-site-logo={header ? '' : undefined}
      className="flex min-h-11 items-center gap-space-sm"
      aria-label="Milli Pərdə, ana səhifə"
    >
      <Emblem />
      <span className="font-display text-headline-lg uppercase tracking-wider text-on-surface">
        Milli <span className="text-primary-container">Pərdə</span>
      </span>
    </Link>
  )
}

function SearchBox({ className = '', autoFocus = false, onDone }: { className?: string; autoFocus?: boolean; onDone?: () => void }) {
  const navigate = useNavigate()
  const inputId = useId()
  const [q, setQ] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = q.trim()
    navigate(value ? `/filmler?q=${encodeURIComponent(value)}` : '/filmler')
    onDone?.()
  }
  return (
    <form role="search" onSubmit={submit} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Film, rejissor və ya aktyor axtarın
      </label>
      <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
      <input
        id={inputId}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
        autoComplete="off"
        placeholder="Film, rejissor və ya aktyor axtarın..."
        className="w-full rounded-full bg-surface-container-high py-2.5 pl-10 pr-4 text-body-sm text-on-surface outline-none transition-[background-color,width,box-shadow] duration-300 focus:bg-surface-container-highest focus-visible:ring-2 focus-visible:ring-primary md:w-56 md:focus:w-72 xl:w-72 xl:focus:w-80"
      />
    </form>
  )
}

function Header() {
  const [solid, setSolid] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`pt-safe fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid || mobileSearch
          ? 'bg-surface-container-lowest/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md'
          : 'bg-gradient-to-b from-surface-container-lowest/90 via-surface-container-lowest/40 to-transparent'
      }`}
    >
      <div className="flex h-16 items-center justify-between gap-space-lg px-margin md:h-20 md:px-margin-desktop">
        <Logo header />
        <nav aria-label="Əsas menyu" className="hidden items-center gap-space-xs lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-space-md py-space-sm text-label-lg transition-colors ${
                  isActive
                    ? 'bg-primary-container font-bold text-on-primary-container'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <SearchBox className="hidden md:block" />
        <button
          type="button"
          onClick={() => setMobileSearch((v) => !v)}
          aria-label={mobileSearch ? 'Axtarışı bağla' : 'Axtarış'}
          aria-expanded={mobileSearch}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-high/80 text-on-surface md:hidden"
        >
          {mobileSearch ? <X size={20} aria-hidden="true" /> : <Search size={20} aria-hidden="true" />}
        </button>
      </div>
      {mobileSearch && (
        <div className="px-margin pb-space-md md:hidden">
          <SearchBox autoFocus onDone={() => setMobileSearch(false)} />
        </div>
      )}
    </header>
  )
}

function MobileNav() {
  return (
    <nav
      aria-label="Mobil menyu"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 bg-surface-container-lowest/95 shadow-[0_-8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid h-16 grid-cols-4">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5 text-label-md transition-colors ${
                  isActive ? 'text-primary' : 'text-secondary hover:text-on-surface'
                }`
              }
            >
              <Icon size={22} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="mt-space-2xl bg-surface-container-lowest px-margin py-space-xl pb-28 md:px-margin-desktop lg:pb-space-xl">
      <div className="flex flex-col gap-space-lg md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-md flex-col gap-space-sm">
          <Logo />
          <p className="text-body-sm text-secondary">
            Azərbaycan kinosunun filmləri, rejissorları və aktyorları. Filmlər rəsmi YouTube kanallarında açılır.
          </p>
        </div>
        <nav aria-label="Alt menyu" className="flex flex-wrap gap-x-space-lg gap-y-space-sm text-label-lg text-on-surface-variant">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="inline-flex min-h-11 items-center transition-colors hover:text-on-surface">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-space-xl max-w-[62ch] text-body-sm text-secondary">
        Filmlərin müəllif hüquqları sahiblərinə məxsusdur. Kadrlar YouTube videolarından, şəxslərin fotoları Vikipediya və Wikimedia Commons-dan götürülüb.{' '}
        <Link to="/menbeler" className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline">
          Şəkil mənbələri və lisenziyalar
        </Link>
      </p>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-primary-container px-space-md py-space-sm text-label-lg text-on-primary-container focus:not-sr-only focus:fixed focus:left-space-md focus:top-space-md"
      >
        Məzmuna keç
      </a>
      <Header key={pathname} />
      <Intro />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export function NotFound() {
  usePageTitle('Səhifə tapılmadı')
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-center gap-space-md px-margin md:px-margin-desktop">
      <h1 className="font-display text-display-hero-mobile uppercase text-on-surface md:text-display-hero">
        Səhifə tapılmadı
      </h1>
      <p className="max-w-xl text-body-lg text-secondary">
        Bu ünvanda səhifə yoxdur. Ana səhifəyə qayıdın və ya filmlər arasında axtarın.
      </p>
      <div className="flex flex-wrap gap-space-md">
        <Link to="/" className="rounded-lg bg-primary-container px-space-lg py-3 text-label-lg text-on-primary-container">
          Ana səhifə
        </Link>
        <Link to="/filmler" className="rounded-lg bg-surface-container-high px-space-lg py-3 text-label-lg text-on-surface">
          Filmlərə bax
        </Link>
      </div>
    </div>
  )
}

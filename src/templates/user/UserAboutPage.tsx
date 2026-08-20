import { useLanguage } from '../../lib/LanguageContext'
import {
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '../../components/icons'

export default function UserAboutPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            {t('whoWeAre')}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t('aboutUs')}
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            <p>{t('aboutP1')}</p>
            <p>{t('aboutP2')}</p>
            <p>{t('aboutP3')}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-emerald-600 hover:bg-white hover:shadow-lg">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <ShieldCheckIcon className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-slate-900">
                {t('proDrivers')}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {t('proDriversDesc')}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-emerald-600 hover:bg-white hover:shadow-lg">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <ClockIcon className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-slate-900">
                {t('cleanCars')}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {t('cleanCarsDesc')}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-emerald-600 hover:bg-white hover:shadow-lg">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-700">
                <UsersIcon className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-slate-900">
                {t('support247')}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {t('support247Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
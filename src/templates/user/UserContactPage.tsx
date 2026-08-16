import { useContactInfos } from '../../hooks/useContactInfos'
import { useDefaultWhatsappNumber } from '../../hooks/useDefaultWhatsappNumber'
import { MailIcon, PhoneIcon, WhatsAppIcon } from '../../components/icons'

export default function UserContactPage() {
  const { items, loading } = useContactInfos()
  const whatsapp = useDefaultWhatsappNumber()

  const whatsappLink = whatsapp
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
        'Assalamu Alaikum, I want to book a car. Please share details.'
      )}`
    : null

  const isLoading = loading

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Get In Touch
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
            For bookings and inquiries, contact us directly — we are available
            24/7.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
          ) : items.length === 0 && !whatsappLink ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
              Contact information coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) =>
                item.type === 'phone' ? (
                  <a
                    key={item.id}
                    href={`tel:${item.value.replace(/\s/g, '')}`}
                    className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl"
                  >
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 transition group-hover:scale-105">
                      <PhoneIcon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-base font-bold text-slate-900">
                      Phone
                    </p>
                    <p
                      className="mt-1 text-sm font-semibold text-slate-600"
                      dir="ltr"
                    >
                      {item.value}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      Tap to call us directly
                    </p>
                  </a>
                ) : (
                  <a
                    key={item.id}
                    href={`mailto:${item.value}`}
                    className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl"
                  >
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 transition group-hover:scale-105">
                      <MailIcon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-base font-bold text-slate-900">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-600">
                      {item.value}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      Tap to send us an email
                    </p>
                  </a>
                )
              )}

              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#128C42] hover:shadow-xl"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#128C42] text-white shadow-lg shadow-[#128C42]/25 transition group-hover:scale-105">
                    <WhatsAppIcon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-base font-bold text-slate-900">
                    WhatsApp
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600" dir="ltr">
                    +{whatsapp?.number}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    Tap to chat on WhatsApp
                  </p>
                </a>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
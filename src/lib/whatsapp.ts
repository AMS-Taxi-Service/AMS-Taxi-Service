import type { Car } from '../types/car'
import type { Language } from './translations'

export function buildCarWhatsappLink(
  number: string,
  car: Car,
  lang: Language = 'en'
): string {
  const message =
    lang === 'ar'
      ? [
          'السلام عليكم،',
          'أريد حجز هذه السيارة:',
          '',
          `السيارة: ${car.name}`,
          `الفئة: ${car.category}`,
          `المقاعد: ${car.seats}`,
          '',
          'يرجى مشاركة التوفر.',
        ].join('\n')
      : [
          'Assalamu Alaikum,',
          'I want to book this car:',
          '',
          `Car: ${car.name}`,
          `Category: ${car.category}`,
          `Seats: ${car.seats}`,
          `Price: SAR ${car.price_per_day}/day`,
          '',
          'Please share availability.',
        ].join('\n')

  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`
}
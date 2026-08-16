import type { Car } from '../types/car'

export function buildCarWhatsappLink(number: string, car: Car): string {
  const message = [
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

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
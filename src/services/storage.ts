import type { Booking, Dish, Preferences } from '../types'
import { initialDishes } from '../data/restaurant'

const keys = { bookings: 'voyage.bookings.v1', dishes: 'voyage.dishes.v1', preferences: 'voyage.preferences.v1' } as const
function load<T>(key: string, fallback: T, validate: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return validate(parsed) ? parsed : fallback
  } catch { return fallback }
}
function save<T>(key: string, value: T): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false }
}
const isBookingList = (value: unknown): value is Booking[] => Array.isArray(value) && value.every((x) => x && typeof x.id === 'string' && typeof x.name === 'string' && typeof x.status === 'string')
const isDishList = (value: unknown): value is Dish[] => Array.isArray(value) && value.every((x) => x && typeof x.id === 'string' && typeof x.name === 'string' && typeof x.price === 'number')
const isPreferences = (value: unknown): value is Preferences => !!value && typeof value === 'object' && 'compactAdmin' in value && 'showSeasonalFirst' in value && 'showDishPhotos' in value
export const storage = {
  getBookings: () => load<Booking[]>(keys.bookings, [], isBookingList),
  setBookings: (value: Booking[]) => save(keys.bookings, value),
  getDishes: () => load<Dish[]>(keys.dishes, initialDishes, isDishList),
  setDishes: (value: Dish[]) => save(keys.dishes, value),
  getPreferences: () => load<Preferences>(keys.preferences, { compactAdmin: false, showSeasonalFirst: false, showDishPhotos: true }, isPreferences),
  setPreferences: (value: Preferences) => save(keys.preferences, value),
  clearDemoData: () => { try { Object.values(keys).forEach((key) => localStorage.removeItem(key)); return true } catch { return false } },
}

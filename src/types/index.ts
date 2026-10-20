export type Category = 'Закуски' | 'Салаты' | 'Супы' | 'Горячие блюда' | 'Рыба и морепродукты' | 'Мясные блюда' | 'Гарниры' | 'Десерты' | 'Напитки'
export const categories: Category[] = ['Закуски', 'Салаты', 'Супы', 'Горячие блюда', 'Рыба и морепродукты', 'Мясные блюда', 'Гарниры', 'Десерты', 'Напитки']

export interface Dish {
  id: string; name: string; category: Category; description: string; ingredients: string; weight: string;
  price: number; image: string; popular: boolean; seasonal: boolean
}
export interface Hall {
  id: string; name: string; capacity: number; purpose: string; description: string; image: string;
  features: string[]; rental: string; gallery: string[]
}
export interface Booking {
  id: string; name: string; phone: string; date: string; time: string; guests: number; hallId: string;
  comment: string; status: BookingStatus; createdAt: string
}
export type BookingStatus = 'Новая' | 'В обработке' | 'Подтверждена' | 'Отменена' | 'Завершена'
export interface Preferences { compactAdmin: boolean; showSeasonalFirst: boolean; showDishPhotos: boolean }

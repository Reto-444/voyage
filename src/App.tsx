import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { AdminPage } from './components/AdminPage'
import { BookingPage } from './components/BookingForm'
import { Footer, Header, type Page } from './components/Chrome'
import { Modal } from './components/Modal'
import { AboutPage, ContactsPage, EventsPage, HallsPage, HomePage, MenuPage } from './Content'
import { initialDishes } from './data/restaurant'
import { storage } from './services/storage'
import type { Booking, BookingStatus, Dish, Hall, Preferences } from './types'
import './styles.css'

const validPages: Page[] = ['home', 'menu', 'halls', 'events', 'about', 'contacts', 'booking', 'admin']
const getPage = (): Page => { const route = window.location.hash.replace(/^#\/?/, '').split('/')[0] as Page; return validPages.includes(route) ? route : 'home' }
const money = (price: number) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
type BookingPrefill = { hallId?: string; comment?: string }
export default function App() {
 const [page, setPage] = useState<Page>(getPage), [dishes, setDishes] = useState<Dish[]>(() => storage.getDishes()), [bookings, setBookings] = useState<Booking[]>(() => storage.getBookings()), [preferences, setPreferences] = useState<Preferences>(() => storage.getPreferences())
 const [selectedDish, setSelectedDish] = useState<Dish | null>(null), [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string } | null>(null), [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({})
 useEffect(() => { const onHash = () => { setPage(getPage()); window.scrollTo({ top: 0, behavior: 'smooth' }) }; window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
 useEffect(() => { const names: Record<Page, string> = { home: 'Искусство наслаждаться моментом', menu: 'Меню', halls: 'Залы', events: 'Мероприятия', about: 'О ресторане', contacts: 'Контакты', booking: 'Бронирование', admin: 'Демо-панель' }; document.title = `${names[page]} — ВОЯЖ` }, [page])
 const navigate = (to: Page) => { if (to === 'booking') setBookingPrefill({}); if (page === to && getPage() === to) { window.scrollTo({ top: 0, behavior: 'smooth' }); return } if (window.location.hash === `#${to}`) { setPage(to); return } window.location.hash = to }
 const navigateWithPrefill = (prefill: BookingPrefill) => { setBookingPrefill(prefill); if (window.location.hash === '#booking') setPage('booking'); else window.location.hash = 'booking' }
 const addBooking = (booking: Booking) => { const next = [...bookings, booking]; if (!storage.setBookings(next)) return false; setBookings(next); return true }
 const changeStatus = (id: string, status: BookingStatus) => { const next = bookings.map((item) => item.id === id ? { ...item, status } : item); if (storage.setBookings(next)) setBookings(next) }
 const deleteBooking = (id: string) => { const next = bookings.filter((item) => item.id !== id); if (storage.setBookings(next)) setBookings(next) }
 const saveDish = (dish: Dish) => { const index = dishes.findIndex((item) => item.id === dish.id); const next = index < 0 ? [dish, ...dishes] : dishes.map((item) => item.id === dish.id ? dish : item); if (storage.setDishes(next)) setDishes(next) }
 const deleteDish = (id: string) => { const next = dishes.filter((item) => item.id !== id); if (storage.setDishes(next)) setDishes(next) }
 const updatePreferences = (value: Preferences) => { if (storage.setPreferences(value)) setPreferences(value) }
 const resetDemo = () => { storage.clearDemoData(); setBookings([]); setDishes(initialDishes); const defaults = { compactAdmin: false, showSeasonalFirst: false, showDishPhotos: true }; storage.setDishes(initialDishes); storage.setPreferences(defaults); setPreferences(defaults) }
 return <><Header page={page} onNavigate={navigate} />
  {page === 'home' && <HomePage dishes={dishes} onNavigate={navigate} onDish={setSelectedDish} onPhoto={(src, title) => setSelectedPhoto({ src, title })} />}
  {page === 'menu' && <MenuPage dishes={dishes} onDish={setSelectedDish} showSeasonalFirst={preferences.showSeasonalFirst} />}
  {page === 'halls' && <HallsPage onApply={(hall: Hall) => navigateWithPrefill({ hallId: hall.id })} onPhoto={(src, title) => setSelectedPhoto({ src, title })} />}
  {page === 'events' && <EventsPage onApply={(eventTitle, hallName) => navigateWithPrefill({ comment: `Повод: ${eventTitle}. Рекомендуемое пространство: ${hallName}.` })} />}
  {page === 'about' && <AboutPage onNavigate={navigate} />}{page === 'contacts' && <ContactsPage onNavigate={navigate} />}
  {page === 'booking' && <BookingPage key={`${bookingPrefill.hallId ?? ''}-${bookingPrefill.comment ?? ''}`} onSave={addBooking} initialHallId={bookingPrefill.hallId} initialComment={bookingPrefill.comment} />}
  {page === 'admin' && <AdminPage bookings={bookings} dishes={dishes} preferences={preferences} onStatus={changeStatus} onDeleteBooking={deleteBooking} onSaveDish={saveDish} onDeleteDish={deleteDish} onPreferences={updatePreferences} onReset={resetDemo} />}
  <Footer onNavigate={navigate} />
  {selectedDish && <Modal title={selectedDish.name} onClose={() => setSelectedDish(null)} wide><div className="dish-detail"><img src={selectedDish.image} alt={selectedDish.name} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=75' }} /><div className="dish-detail__copy"><span className="eyebrow">{selectedDish.category.toUpperCase()} {selectedDish.seasonal ? '· СЕЗОННОЕ' : ''}</span><p>{selectedDish.description}</p><div><span>СОСТАВ</span><b>{selectedDish.ingredients}</b></div><div><span>ВЕС ПОРЦИИ</span><b>{selectedDish.weight}</b></div><div className="dish-detail__price">{money(selectedDish.price)}<small>ДЕМОНСТРАЦИОННАЯ ЦЕНА</small></div><button className="button button--dark" onClick={() => { setSelectedDish(null); navigate('booking') }}>Забронировать стол <ArrowUpRight size={16} /></button></div></div></Modal>}
  {selectedPhoto && <Modal title={selectedPhoto.title} onClose={() => setSelectedPhoto(null)} wide><div className="photo-lightbox"><img src={selectedPhoto.src} alt={selectedPhoto.title} /><span><Clock3 size={14} /> Атмосфера ВОЯЖ · концептуальный интерьер</span></div></Modal>}
 </>
}

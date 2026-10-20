import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react'

export type Page = 'home' | 'menu' | 'halls' | 'events' | 'about' | 'contacts' | 'booking' | 'admin'
export const navigation: { id: Page; title: string }[] = [
  { id: 'menu', title: 'Меню' }, { id: 'halls', title: 'Залы' }, { id: 'events', title: 'События' }, { id: 'about', title: 'О ресторане' }, { id: 'contacts', title: 'Контакты' }
]
interface HeaderProps { page: Page; onNavigate: (page: Page) => void }
export function Header({ page, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const go = (next: Page) => { setOpen(false); onNavigate(next) }
  return <header className={`site-header ${page === 'home' ? 'site-header--hero' : ''}`}>
    <button className="brand" onClick={() => go('home')} aria-label="ВОЯЖ — на главную"><span className="brand__word">ВОЯЖ</span><span className="brand__latin">VOYAGE · MOSCOW</span></button>
    <nav className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Основная навигация">
      {navigation.map((item) => <button key={item.id} className={`nav-link ${page === item.id ? 'is-active' : ''}`} onClick={() => go(item.id)}>{item.title}</button>)}
      <button className="mobile-book" onClick={() => go('booking')}>Забронировать <ArrowUpRight size={15} /></button>
    </nav>
    <button className="header-book" onClick={() => go('booking')}>Забронировать <ArrowUpRight size={15} /></button>
    <button className="mobile-menu icon-button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <MenuIcon />}</button>
  </header>
}
interface FooterProps { onNavigate: (page: Page) => void }
export function Footer({ onNavigate }: FooterProps) {
  return <footer className="site-footer">
    <div className="footer__top"><div className="footer__brand"><button className="brand brand--footer" onClick={() => onNavigate('home')}><span className="brand__word">ВОЯЖ</span><span className="brand__latin">VOYAGE · MOSCOW</span></button><p>Место, где вечер становится<br />воспоминанием.</p></div>
      <div className="footer__col"><span className="eyebrow">ОТКРЫТЬ</span>{navigation.slice(0, 4).map((item) => <button key={item.id} onClick={() => onNavigate(item.id)}>{item.title}</button>)}</div>
      <div className="footer__col"><span className="eyebrow">МЫ ЗДЕСЬ</span><p>Москва, Большая Никитская, 24</p><a href="tel:+74950000000">+7 (495) 000-00-00</a><a href="mailto:hello@example.ru">hello@example.ru</a></div>
      <button className="footer__to-top" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Наверх <ArrowUpRight size={16} /></button></div>
    <div className="footer__bottom"><span>© ВОЯЖ · Концептуальный проект</span><span>Меню, цены и контакты приведены для демонстрации.</span><button onClick={() => onNavigate('admin')}>Демо-панель ↗</button></div>
  </footer>
}
export function SectionHeading({ kicker, title, text, light = false }: { kicker: string; title: string; text?: string; light?: boolean }) {
 return <div className={`section-heading ${light ? 'section-heading--light' : ''}`}><span className="eyebrow">{kicker}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}
export function TextLink({ children, onClick, dark = false }: { children: React.ReactNode; onClick: () => void; dark?: boolean }) {
 return <button className={`text-link ${dark ? 'text-link--light' : ''}`} onClick={onClick}>{children} <ArrowDownRight size={17} /></button>
}

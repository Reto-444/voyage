import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface ModalProps { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }
export function Modal({ title, children, onClose, wide = false }: ModalProps) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; previous?.focus() }
  }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className={`modal ${wide ? 'modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={box}>
      <div className="modal__top"><span className="eyebrow">ВОЯЖ · МОСКВА</span><button className="icon-button" aria-label="Закрыть окно" onClick={onClose}><X size={20} /></button></div>
      <h2 className="modal__title">{title}</h2>{children}
    </section>
  </div>
}

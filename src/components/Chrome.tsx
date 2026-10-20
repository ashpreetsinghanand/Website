import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { contactEmail, footerPages, layers, nav, notes, rail, socials } from '../data/content.ts'
import { LogoMark, Wordmark } from './Art.tsx'
import { CutButton } from './motion.tsx'

type Ui = {
  openBook: () => void
  openVideo: () => void
  openNote: (index: number) => void
}

const UiContext = createContext<Ui | null>(null)

export function useUi() {
  const value = useContext(UiContext)
  if (!value) throw new Error('useUi must be used inside UiProvider')
  return value
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [bookOpen, setBookOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [note, setNote] = useState<number | null>(null)

  useEffect(() => {
    const open = bookOpen || videoOpen || note !== null
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [bookOpen, videoOpen, note])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setBookOpen(false)
      setVideoOpen(false)
      setNote(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <UiContext.Provider value={{ openBook: () => setBookOpen(true), openVideo: () => setVideoOpen(true), openNote: setNote }}>
      {children}
      {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
      {note !== null && <NoteModal index={note} onClose={() => setNote(null)} />}
    </UiContext.Provider>
  )
}

export function Header() {
  const { openBook } = useUi()
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[60px] border-b border-line bg-[rgb(36_36_36/0.8)] backdrop-blur-md">
      <div className="frame grid h-full grid-cols-[120px_1fr] grid-rows-[60px] gap-x-10 lg:grid-cols-[180px_1fr]">
        <a href="#top" aria-label="Krsi home" className="cut-b relative grid h-[76px] place-items-start justify-center bg-leaf pt-4 lg:pt-5">
          <LogoMark className="size-7" />
          <span className="dots absolute inset-x-0 bottom-0 h-4 [--dot:rgb(38_38_38/0.55)]" />
        </a>
        <div className="flex items-center justify-end lg:grid lg:grid-cols-2 lg:gap-x-10">
          <span className="hidden lg:block" />
          <div className="flex h-full items-center justify-end gap-4 lg:justify-between">
            <nav className="hidden h-full items-center gap-[clamp(24px,4.5vw,88px)] md:flex">
              {nav.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[14px] leading-[18px] transition-colors hover:text-cream ${index === 0 ? 'text-cream' : 'text-sand'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <CutButton onClick={openBook} shape="" className="h-[59px] min-w-[157px]">
              Book a call
            </CutButton>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Sticky numbered index on the left of the long content column. */
export function Rail() {
  const [active, setActive] = useState<string>(rail[0].id)

  useEffect(() => {
    const nodes = rail.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Sections" className="sticky top-[60px] pt-[81px]">
      <ol className="border-t border-line">
        {rail.map((item, index) => {
          const on = active === item.id
          return (
            <li key={item.id} className="border-b border-line">
              <a href={`#${item.id}`} className="flex h-[37px] items-center text-[14px] leading-[21px]">
                <span className={`w-9 pl-2 transition-colors ${on ? 'text-leaf' : 'text-sand/65'}`}>{String(index + 1).padStart(2, '0')}</span>
                <span className={`transition-colors ${on ? 'text-cream' : 'text-sand hover:text-cream'}`}>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function Eyebrow({ label, tone = 'ink' }: { label: string; tone?: 'ink' | 'sand' }) {
  const color = tone === 'ink' ? 'text-ink [--hatch:rgb(29_29_29/0.55)]' : 'text-sand [--hatch:rgb(209_194_165/0.55)]'
  return (
    <div className={color}>
      <div className="h-px bg-current opacity-25" />
      <div className="flex items-center gap-3 py-[9px]">
        <span className="size-[9px] shrink-0 rounded-full bg-current" />
        <p className="shrink-0 font-mono text-[14px] leading-[21px]">{label}</p>
        <span className="hatch h-[15px] min-w-0 flex-1" />
      </div>
      <div className="h-px bg-current opacity-25" />
    </div>
  )
}

export function Footer() {
  const { openBook } = useUi()
  return (
    <footer className="bg-deep pt-20 pb-6">
      <div className="frame grid gap-x-10 lg:grid-cols-[180px_1fr]">
        <a href="#top" className="hidden h-10 items-center justify-center gap-2 self-start font-mono text-[14px] text-sand lg:flex">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true" className="opacity-50">
            <path d="M10.5 16V5M5.5 10l5-5 5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          Back to top
        </a>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="pt-10">
            <Eyebrow label="Ready to grow with Krsi" tone="sand" />
            <h2 className="mt-[33px] text-[clamp(40px,3.125vw,60px)] leading-[1.2] tracking-[-0.05em]">
              <span className="block text-cream">Store smarter.</span>
              <span className="block text-sand">Finance faster.</span>
            </h2>
            <p className="mt-6 max-w-[598px] text-[16px] leading-6 text-sand">
              Bring your warehouse, your lenders, and your buyers onto one trusted record, and let Krsi handle the paperwork while you stay in control.
            </p>
            <CutButton onClick={openBook} tone="tan" className="mt-[112px] h-[53px] w-full">
              Book a call
            </CutButton>
          </div>
          <div className="relative min-h-[300px]">
            <div className="dots absolute inset-x-0 top-0 h-[185px] [--dot:rgb(227_216_197/0.22)]" />
            <div className="relative grid gap-10 px-9 pt-[221px] sm:grid-cols-2">
              <LinkList title="Pages" links={footerPages} />
              {socials.length > 0 && <LinkList title="Social" links={socials} />}
            </div>
          </div>
        </div>
      </div>

      <div className="frame mt-10 grid gap-y-4 lg:grid-cols-[180px_1fr]">
        <div className="cut relative hidden min-h-[445px] place-items-center bg-forest lg:grid">
          <span className="hatch absolute inset-0 [--hatch:rgb(28_28_28/0.55)]" />
          <LogoMark className="relative size-[72px]" />
        </div>
        <div className="cut relative flex min-h-[445px] flex-col overflow-hidden bg-leaf text-ink">
          <div className="grid gap-8 px-9 pt-10 pb-6 lg:grid-cols-2 lg:gap-10">
            <div className="grid grid-cols-2 gap-6">
              <Stat value="ONLINE" label="Platform status" />
              <Stat value="INDIA" label="First market" />
            </div>
            <p className="font-mono text-[14px] leading-[21px] text-[#0f2f20]">
              Krsi is the infrastructure layer for agricultural commodities. It verifies stored produce, turns it into trusted digital receipts, and connects it to finance and trade.
            </p>
          </div>
          <div className="mt-auto h-[clamp(140px,16vw,306px)]">
            <Wordmark />
          </div>
        </div>
      </div>

      <div className="frame mt-[30px] grid items-center gap-x-10 gap-y-3 text-[14px] leading-[21px] lg:grid-cols-[180px_1fr]">
        <p className="text-cream">© Krsi Agro Tech, 2026</p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          <span className="plus-row hidden h-[15px] flex-1 lg:block" />
          <p className="text-cream">All rights reserved</p>
          <a href="#contact" className="text-sand transition-colors hover:text-cream">
            Contact
          </a>
          <span className="plus-row hidden h-[15px] w-[220px] lg:block" />
          <span className="size-6 bg-leaf" />
        </div>
      </div>
    </footer>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong className="block text-[24px] leading-[32.4px] font-semibold tracking-[-0.02em]">{value}</strong>
      <p className="text-[16px] leading-6">{label}</p>
    </div>
  )
}

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[16px] leading-6 text-cream uppercase">{title}</p>
      <ul className="mt-[26px]">
        {links.map((link, index) => (
          <li key={link.label} className={index ? 'border-t border-line' : ''}>
            <a href={link.href} className={`block py-[9px] text-[16px] leading-[21px] transition-colors hover:text-cream ${index === 0 ? 'text-cream' : 'text-sand'}`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Overlay({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="cut max-h-[90vh] w-full max-w-[640px] overflow-auto bg-paper p-6 text-ink"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

/** Turns the form into a mail draft to the Krsi inbox; nothing is sent until the visitor sends it. */
export function draftMail(form: HTMLFormElement, subject: string) {
  const data = new FormData(form)
  const body = [...data.entries()].map(([key, value]) => `${key}: ${String(value)}`).join('\n')
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function BookModal({ onClose }: { onClose: () => void }) {
  return (
    <Overlay onClose={onClose} label="Book a call">
      <div className="mb-3 flex justify-end">
        <button type="button" onClick={onClose} className="cursor-pointer font-mono text-[14px]" aria-label="Close">
          Close
        </button>
      </div>
      <GetInTouchForm title="Book a call" subject="Book a call with Krsi" />
    </Overlay>
  )
}

function FormField({ label, name, type = 'text' }: { label: string; name: string; type?: string }) {
  return (
    <label className="block text-[18px] leading-7 text-ink/80">
      {label}
      <input required name={name} type={type} className="mt-1 block h-[50px] w-full rounded-[4px] border border-ink/30 bg-transparent px-3 text-[16px] text-ink outline-none focus:border-leaf" />
    </label>
  )
}

/** The bordered "Get in touch" form, shared by the Contact section and the Book a call dialog. */
export function GetInTouchForm({ title = 'Get in touch', subject, className = '' }: { title?: string; subject: string; className?: string }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    draftMail(event.currentTarget, subject)
  }
  return (
    <form onSubmit={submit} className={`border border-ink/25 p-[18px] text-ink ${className}`}>
      <h3 className="text-[clamp(34px,2.3vw,44px)] leading-[1.1] tracking-[-0.02em]">{title}</h3>
      <p className="mt-1 text-[18px] leading-7 text-ink/80">Tell us how we can help.</p>
      <div className="mt-9 space-y-[14px]">
        <FormField label="Full Name" name="name" />
        <FormField label="Work Email" name="email" type="email" />
        <FormField label="Company or Organization Name" name="organization" />
        <label className="block text-[18px] leading-7 text-ink/80">
          Message
          <textarea name="message" rows={3} className="mt-1 block w-full resize-none rounded-[4px] border border-ink/30 bg-transparent px-3 py-2 text-[16px] text-ink outline-none focus:border-leaf" />
        </label>
      </div>
      <CutButton type="submit" tone="soft" shape="cut-diag" className="mt-5 h-[50px] w-full">
        Send a message
      </CutButton>
    </form>
  )
}

function VideoModal({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % layers.length), 1600)
    return () => window.clearInterval(timer)
  }, [])

  const layer = layers[index]

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Krsi layers" className="cut w-full max-w-[860px] bg-deep text-cream" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between px-8 py-5 font-mono text-[14px] text-sand">
          <span>Krsi / infrastructure</span>
          <button type="button" onClick={onClose} className="cursor-pointer" aria-label="Close video">
            Close
          </button>
        </div>
        <div className="grid gap-8 px-8 pb-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="font-mono text-[14px] text-leaf">{String(index + 1).padStart(2, '0')}</p>
            <h2 className="mt-3 text-[42px] leading-none tracking-[-0.04em]">{layer.title}</h2>
            <ul className="mt-5 space-y-2 text-[14px] text-sand">
              {layer.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <ol className="space-y-1">
            {layers.map((item, itemIndex) => (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  className={`flex w-full cursor-pointer gap-3 px-3 py-2 text-left text-[14px] ${itemIndex === index ? 'bg-white/10 text-cream' : 'text-sand/70'}`}
                >
                  <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="h-[2px] bg-white/10">
          <div className="h-full bg-leaf transition-all duration-500" style={{ width: `${((index + 1) / layers.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function NoteModal({ index, onClose }: { index: number; onClose: () => void }) {
  const note = notes[index]
  if (!note) return null
  return (
    <Overlay onClose={onClose} label={note.title}>
      <p className="font-mono text-[14px] text-ink/70">
        {note.tag} · {note.date}
      </p>
      <h2 className="mt-3 text-[32px] leading-[1.1] tracking-[-0.03em]">{note.title}</h2>
      <p className="mt-5 text-[15px] leading-7 text-ink/80">{note.body}</p>
      <button type="button" onClick={onClose} className="mt-6 cursor-pointer font-mono text-[14px]">
        Close
      </button>
    </Overlay>
  )
}

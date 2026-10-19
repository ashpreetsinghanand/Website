import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Lenis from 'lenis'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085 })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest('a[href^="#"]')
      const id = link?.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!(target instanceof HTMLElement)) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: id === '#top' ? -200 : -60 })
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
  return null
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function MaskLine({ children, delay = 0, className = '' }: { children: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Paragraph whose words brighten as it scrolls through the viewport. */
export function ScrollText({ words, className = '' }: { words: { text: string; bright?: boolean }[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} bright={word.bright}>
          {word.text}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range, bright }: { children: string; progress: MotionValue<number>; range: [number, number]; bright?: boolean }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className={bright ? 'text-cream' : 'text-sand'}>
      {children}{' '}
    </motion.span>
  )
}

/** Cut-corner button whose letters roll up one after another on hover. */
export function CutButton({
  children,
  onClick,
  href,
  tone = 'leaf',
  className = '',
  type = 'button',
  shape = 'cut',
}: {
  children: string
  onClick?: () => void
  href?: string
  tone?: 'leaf' | 'tan' | 'soft'
  className?: string
  type?: 'button' | 'submit'
  shape?: 'cut' | 'cut-sm' | 'cut-diag' | ''
}) {
  const colors = {
    leaf: 'bg-leaf text-cream hover:bg-[#23995f]',
    soft: 'bg-leaf/65 text-paper hover:bg-leaf',
    tan: 'bg-tan text-ink hover:bg-[#ece2d1]',
  }[tone]
  const classes = `${shape} group inline-flex cursor-pointer items-center justify-center px-8 text-[14px] leading-[21px] font-bold uppercase transition-colors duration-300 ${colors} ${className}`
  const label = (
    <span className="flex overflow-hidden" aria-label={children}>
      {[...children].map((char, index) => (
        <span key={index} aria-hidden="true" className="relative inline-block whitespace-pre">
          <span
            className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 18}ms` }}
          >
            {char}
          </span>
          <span
            className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 18}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  )
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {label}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  )
}

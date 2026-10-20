import { useState, type ReactNode } from 'react'
import {
  capabilities,
  faqs,
  integrationGroups,
  integrationTraits,
  layers,
  loanCopy,
  notes,
  pillars,
  systems,
  workflow,
} from '../data/content.ts'
import { HeroArt, LayersMark } from './Art.tsx'
import { Eyebrow, GetInTouchForm, useUi } from './Chrome.tsx'
import { CutButton, MaskLine, Reveal, ScrollText } from './motion.tsx'

/* ---------- small shared pieces ---------- */

/** L-shaped bracket marks on the four corners of a frame. */
function Corners({ color = 'border-sand' }: { color?: string }) {
  return (
    <>
      {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((spot) => (
        <span key={spot} className={`pointer-events-none absolute size-2 ${color} ${spot}`} />
      ))}
    </>
  )
}

function Plus({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

const icons: Record<string, ReactNode> = {
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  house: <path d="M4 11 12 4l8 7v9H4v-9Zm6 9v-5h4v5" />,
  coin: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v8m-3-5.5c0-1 1.3-2 3-2s3 .8 3 2-1.3 1.7-3 2-3 1-3 2 1.3 2 3 2 3-1 3-2" />,
  check: <path d="m5 12 4 4 10-10" />,
  swap: <path d="M4 8h14l-3-3m5 11H6l3 3" />,
}

function Icon({ name, size = 24 }: { name: keyof typeof icons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {icons[name]}
    </svg>
  )
}

/** Cream section card heading: eyebrow, large title on the left, short copy on the right. */
function CardHead({ label, title, copy, top = 'pt-[60px]' }: { label: string; title: string; copy?: string; top?: string }) {
  return (
    <div className={`px-5 lg:px-9 ${top}`}>
      <Eyebrow label={label} />
      <div className="mt-[60px] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <h2 className="max-w-[560px] text-[clamp(34px,2.5vw,48px)] leading-[1.2] tracking-[-0.05em] text-ink lg:pl-9">{title}</h2>
        {copy && <p className="max-w-[300px] text-[14px] leading-[21px] text-ink/80">{copy}</p>}
      </div>
    </div>
  )
}

/* ---------- hero ---------- */

export function Hero() {
  const { openBook } = useUi()
  const [open, setOpen] = useState(0)

  return (
    <section id="top" className="rules rules-full">
      <div className="frame grid lg:grid-cols-[180px_1fr] lg:gap-x-10">
        <aside className="hidden flex-col border-x border-line pt-[60px] lg:flex">
          <div className="flex-1" />
          <p className="pb-[52px] text-center font-mono text-[14px] leading-[21px] text-sand">Incubated By:</p>
          {/* shortcut: these marks come from the Figma rail; swap in real incubator logos when you have them. */}
          {[0, 1, 2].map((mark) => (
            <div key={mark} className="grid h-[158px] place-items-center border-t border-line text-tan opacity-50">
              {mark === 0 ? <span className="hatch h-4 w-10 [--hatch:currentColor]" /> : <LayersMark className="h-9 w-10" />}
            </div>
          ))}
        </aside>

        <div className="grid border-x border-line pt-[60px] lg:grid-cols-2 lg:gap-x-10">
          <div className="border-line px-5 pt-9 pb-9 lg:border-r lg:pl-9 lg:pr-9">
            <Eyebrow label="AI Support, automated" tone="sand" />
            <h1 className="mt-7 text-[clamp(52px,4.17vw,80px)] leading-none tracking-[-0.05em]">
              <MaskLine className="text-sand">Infra Layer</MaskLine>
              <MaskLine className="text-sand" delay={0.08}>for Global</MaskLine>
              <MaskLine className="text-cream" delay={0.16}>Agriculture</MaskLine>
              <MaskLine className="text-cream" delay={0.24}>Commodities</MaskLine>
            </h1>
            <p className="mt-6 max-w-[598px] text-[16px] leading-6 text-sand">
              Empowering farmers worldwide with intelligent storage, seamless financing, and global market access through one trusted platform.
            </p>

            <div className="mt-14 border-t border-line">
              {layers.map((layer, index) => {
                const isOpen = open === index
                return (
                  <div key={layer.title} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      className="flex h-[52px] w-full cursor-pointer items-center text-left text-[16px] leading-6"
                    >
                      <span className="w-9 text-sand/65">{String(index + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-cream">{layer.title}</span>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={`text-sand transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="m9 12 5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <ul className="overflow-hidden">
                        {layer.points.map((point, pointIndex) => (
                          <li key={point} className={`flex items-center gap-4 text-[14px] leading-[21px] text-sand ${pointIndex === layer.points.length - 1 ? 'pb-5' : 'pb-2'}`}>
                            <Plus />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>

            <CutButton onClick={openBook} className="mt-9 h-[53px] w-full">
              Book a call
            </CutButton>
          </div>

          <div className="dots hidden items-center px-6 [--dot:rgb(204_189_159/0.1)] lg:flex">
            <HeroArt active={open} onPick={setOpen} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- intro: video, overview, workflow ---------- */

const overview = [
  'Krsi *connects farmers, producers, cooperatives, warehouses, financial institutions, traders, and global buyers through a *single *intelligent *infrastructure.',
  'By *digitizing *post-harvest operations, Krsi creates a *trusted ecosystem where *agricultural *commodities can be *stored, *managed, *financed, *and *traded with confidence.',
]

const toWords = (text: string) =>
  text.split(' ').map((word) => (word.startsWith('*') ? { text: word.slice(1), bright: true } : { text: word }))

const stepIcons = ['verified', 'warehouse', 'receipt', 'bars']
const pillarIcons = ['people', 'warehouse', 'accounts', 'ai']
const groupIcons = ['user', 'house', 'coin', 'swap'] as const

export function Intro() {
  const { openVideo } = useUi()
  return (
    <section id="about" className="scroll-mt-[60px] bg-deep">
      <div className="frame grid lg:grid-cols-[180px_1fr] lg:gap-x-10">
        <div className="hidden border-x border-line lg:block" />
        <div className="border-x border-line py-20">
          <div className="rules px-5 py-9 lg:px-9">
            <div className="relative bg-deep/80 p-5 lg:p-9">
              <Corners />
              <button type="button" onClick={openVideo} aria-label="Play video" className="group relative grid aspect-[1236/695] w-full cursor-pointer place-items-center overflow-hidden bg-[#3a2f1c]">
                <span className="hatch absolute inset-0 opacity-40 [--hatch:rgb(240_232_218/0.06)]" />
                <span className="relative bg-deep/65 p-2">
                  <Corners />
                  <span className="cut-sm block bg-tan px-6 py-3 text-[14px] leading-[21px] font-bold text-ink uppercase transition-transform duration-500 group-hover:scale-105">
                    Play video
                  </span>
                </span>
              </button>
            </div>

            <div className="mt-[104px] grid gap-12 lg:grid-cols-[630fr_638fr] lg:gap-10">
              <div className="flex flex-col justify-between gap-[60px]">
                <Eyebrow label="Overview" tone="sand" />
                <div className="space-y-10">
                  {overview.map((paragraph) => (
                    <ScrollText key={paragraph} words={toWords(paragraph)} className="text-[clamp(24px,1.67vw,32px)] leading-[1.25] tracking-[-0.03em]" />
                  ))}
                </div>
              </div>

              <Reveal className="relative self-start bg-deep px-5 py-16 lg:px-10">
                <span className="hatch absolute inset-0 [--hatch:rgb(240_232_218/0.1)]" />
                <Corners />
                <div className="relative flex items-center gap-4 text-[14px] leading-[21px]">
                  <p className="whitespace-nowrap text-cream">Workflow Card</p>
                  <span className="h-px min-w-6 flex-1 bg-sand/65" />
                  <p className="truncate text-sand/65">Agricultural Commodity Workflow</p>
                </div>
                <ol className="relative mt-4">
                  {workflow.map((step, index) => (
                    <li key={step}>
                      {index > 0 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative mx-auto my-[10px] text-cream">
                          <path d="M12 5v14m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                      )}
                      <div className="relative flex h-[69px] items-center border border-sand/15 bg-deep px-6 text-[14px] uppercase">
                        <Corners color="border-sand/70" />
                        <span className="w-9 font-semibold text-sand/65">{String(index + 1).padStart(2, '0')}</span>
                        <span className="flex-1 text-center text-sand">{step}</span>
                        <img src={`/assets/icons/${stepIcons[index]}.webp`} alt="" width="20" height="20" className="size-5 shrink-0" />
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <div className="mt-20 grid gap-10 border-t border-line pt-16 sm:grid-cols-2 xl:grid-cols-4">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 0.06}>
                  <img src={`/assets/icons/${pillarIcons[index]}.webp`} alt="" width="24" height="24" className="size-6" />
                  <strong className="mt-[26px] block font-inter text-[14px] leading-[17px] text-cream uppercase">{pillar.title}</strong>
                  <p className="mt-[6px] max-w-[260px] text-[14px] leading-[21px] text-sand">{pillar.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- infrastructure ---------- */

export function Capabilities() {
  const [active, setActive] = useState(0)
  return (
    <section id="infrastructure" className="rules scroll-mt-[60px]">
      <div className="cut bg-tan pb-9 text-ink">
        <CardHead
          label="Infrastructure"
          title="Seven Layers. One Trusted Infrastructure."
          copy="Krsi's protocol transforms agricultural commodities into verifiable, financeable, and globally tradable digital assets"
        />
        <div className="hatch mx-5 mt-9 bg-[rgb(46_46_46/0.1)] p-2 [--hatch:rgb(46_46_46/0.9)] lg:mx-9 lg:p-4">
          <img src="/assets/architecture.webp" alt="Seven layers, one infrastructure to store, finance and trade: inputs, the seven Krsi layers, and outputs and impact." className="block aspect-video w-full bg-deep object-cover" />
        </div>
        <div className="mx-5 mt-12 grid gap-6 sm:grid-cols-2 lg:mx-9 xl:grid-cols-4 xl:gap-0">
          {capabilities.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setActive(index)} className="cursor-pointer pr-6 text-left">
              <span className="block h-[2px] bg-ink/10">
                {active === index && (
                  <span key={active} className="block h-full origin-left animate-[grow_6s_linear_forwards] bg-ink" onAnimationEnd={() => setActive((active + 1) % capabilities.length)} />
                )}
              </span>
              <strong className="mt-6 block font-inter text-[14px] leading-[17px] uppercase">{item.title}</strong>
              <span className={`mt-[6px] block max-w-[303px] text-[14px] leading-[21px] transition-colors ${active === index ? 'text-ink' : 'text-ink/80'}`}>{item.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- core systems ---------- */

export function Systems() {
  return (
    <section id="systems" className="rules scroll-mt-[60px] text-ink">
      <div className="cut bg-paper pb-9">
        <CardHead label="Core systems" title="Core systems that power every workflow" copy="Real time performance across warehouse receipt finance workflow and automation delivering speed, accuracy and trust." />
      </div>
      <div className="mt-px grid gap-px lg:grid-cols-3">
        {systems.map((system, index) => (
          <Reveal key={system.title} delay={index * 0.08} className="flex flex-col gap-px">
            <article className="cut bg-paper px-5 pt-[60px] pb-9 lg:px-9">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[24px] leading-[32.4px] tracking-[-0.02em]">{system.title}</h3>
                <span className="font-mono text-[14px] leading-[21px]">{system.code}</span>
              </div>
              <div className="hatch mt-1 grid aspect-square place-items-center bg-paper [--hatch:rgb(29_29_29/0.12)]">
                <img src={system.image} alt="" className="w-[92%] object-contain" />
              </div>
            </article>
            <p className="cut flex-1 bg-tan px-5 py-[30px] text-[14px] leading-[21px] lg:px-9">{system.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- features bento ---------- */

// Images fill the space left under the text (so they never cover it); `pinned` keeps one absolutely placed instead.
function Tile({
  title,
  text,
  image,
  imageClass = '',
  place = 'items-end justify-center',
  pinned = false,
  textClass = 'max-w-[340px]',
  className = '',
}: {
  title: string
  text: string
  image?: string
  imageClass?: string
  place?: string
  pinned?: boolean
  textClass?: string
  className?: string
}) {
  return (
    <article className={`relative flex min-h-[320px] flex-col overflow-hidden bg-paper p-6 lg:min-h-0 lg:p-7 ${className}`}>
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className={textClass}>
          <strong className="block text-[14px] leading-[18px] font-semibold text-ink uppercase">{title}</strong>
          <p className="mt-1 text-[14px] leading-[21px] text-ink/75">{text}</p>
        </div>
        <LayersMark className="h-[18px] w-5 shrink-0 text-ink" />
      </div>
      {image && pinned && <img src={image} alt="" className={`pointer-events-none absolute ${imageClass}`} />}
      {image && !pinned && (
        <div className={`mt-3 flex min-h-0 flex-1 ${place}`}>
          <img src={image} alt="" className={`max-h-full max-w-full object-contain ${imageClass}`} />
        </div>
      )}
    </article>
  )
}

export function Features() {
  return (
    <section id="features" className="rules scroll-mt-[60px]">
      <div className="cut bg-paper pb-9 text-ink">
        <CardHead label="Features" title="Integrating the advantages of Blockchain & AI." copy="Clear visibility into execution, automation, and throughput improvements." />
        <div className="hatch mx-5 mt-9 grid gap-2 bg-tan p-2 [--hatch:rgb(74_72_68/0.14)] lg:mx-9 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-2">
            <Tile
              className="lg:flex-[452]"
              title="Blockchain powered"
              text="Blockchain to prevent fraud with tamper proof collateral records, while smart contracts automate approvals, margin calls and loan transfer seamlessly."
              image="/assets/cubes.webp"
              place="items-center justify-center pb-6" imageClass="w-[384px]"
            />
            <Tile
              className="lg:flex-[324]"
              title="DePIN network"
              text="DePIN powered warehouse receipts, tokenized storage, real time crop data, and trustless agriculture finance."
              image="/assets/house.webp"
              imageClass="w-[297px]"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-rows-[repeat(3,minmax(248px,auto))]">
            <Tile title="No guarantors" text={loanCopy} image="/assets/shield.webp" place="items-end justify-end pr-2" imageClass="h-[150px]" />
            <Tile
              title="Instant approval"
              text="No waiting, no worry: our instant approval process gets you from application to approval in record time."
              image="/assets/clock.webp"
              place="items-end justify-end" imageClass="h-[150px]"
            />
            <Tile
              title="Real Time Monitoring"
              text="Lenders risk fraud relying on agencies for collateral reports; our AI solution offers real-time monitoring, reducing the risk."
              image="/assets/chart.webp" place="items-end justify-end" imageClass="w-[187px]" />
            <Tile title="Social impact" text={loanCopy} image="/assets/people.webp" imageClass="w-[268px]" />
            <Tile
              className="min-h-[360px] sm:col-span-2 lg:min-h-0"
              textClass="sm:ml-[calc(50%+32px)]"
              title="Low interest rates"
              text="Secure affordable loans with our platform's low interest rates, designed to make your financial journey smooth and stress free."
              image="/assets/percent.webp"
              pinned
              imageClass="bottom-6 left-1/2 w-[467px] max-w-[80%] -translate-x-1/2 sm:left-1/4 sm:max-w-[42%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- integrations ---------- */

export function Integrations() {
  const [group, setGroup] = useState(0)
  const current = integrationGroups[group]
  return (
    <section id="integrations" className="rules scroll-mt-[60px]">
      <div className="cut bg-paper pb-9 text-ink">
        <CardHead
          label="Integrations"
          title="Connect AI to the tools your team already uses"
          copy="Our platform integrates directly with your core infrastructure so it can retrieve data, trigger workflows and act in real time."
        />
        <div className="hatch mx-5 mt-9 grid gap-2 bg-tan p-2 lg:mx-9 lg:grid-cols-[321fr_964fr]">
          <div className="flex flex-col justify-between gap-10 bg-paper p-7">
            <ul className="pt-6">
              {integrationGroups.map((item, index) => (
                <li key={item.name}>
                  <button type="button" onClick={() => setGroup(index)} className="block w-full cursor-pointer pt-[26px] text-left first:pt-0">
                    <strong className={`font-inter text-[14px] leading-[17px] uppercase ${index === group ? 'text-ink' : 'text-ink/80'}`}>{item.name}</strong>
                    <span className="mt-[26px] block h-px bg-ink/10">
                      {index === group && (
                        <span key={group} className="block h-full origin-left animate-[grow_7s_linear_forwards] bg-ink" onAnimationEnd={() => setGroup((group + 1) % integrationGroups.length)} />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <ul className="pl-4">
              {integrationTraits.map((trait) => (
                <li key={trait} className="flex items-center justify-between text-[14px] leading-[21px] text-ink/80">
                  {trait}
                  <span className="opacity-75">
                    <Icon name="check" size={20} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {current.tools.map((tool) => (
              <article key={tool.name} className="flex min-h-[220px] flex-col justify-between bg-paper p-7 lg:min-h-[309px]">
                <span className="grid h-10 w-[72px] place-items-center bg-ink/65 text-paper">
                  <Icon name={groupIcons[group]} size={20} />
                </span>
                <div>
                  <strong className="block font-inter text-[14px] leading-[17px] text-ink/80 uppercase">{tool.name}</strong>
                  <p className="mt-[2px] text-[14px] leading-[21px] text-ink/80">{tool.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- insights ---------- */

export function Insights() {
  const { openNote } = useUi()
  return (
    <section id="insights" className="rules scroll-mt-[60px] text-ink">
      <div className="cut bg-paper pb-[60px]">
        <CardHead
          top="pt-9"
          label="Blog"
          title="Articles, notes, updates, and latest case studies"
          copy="Insights on warehouse receipts, agri finance, and the systems behind trusted commodity trade."
        />
      </div>
      <div className="mt-px grid gap-px lg:grid-cols-3">
        {notes.map((note, index) => (
          <Reveal key={note.title} delay={index * 0.08}>
            <button type="button" onClick={() => openNote(index)} className="cut group flex h-full w-full cursor-pointer flex-col bg-paper px-5 pt-9 pb-9 text-left lg:px-9">
              <span className="hatch grid aspect-[387/290] w-full place-items-center overflow-hidden bg-tan [--hatch:rgb(29_29_29/0.1)]">
                <img src={note.image} alt="" className="w-[80%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              </span>
              <span className="mt-6 text-[24px] leading-[32.4px] tracking-[-0.02em]">{note.title}</span>
              <span className="mt-auto flex items-center justify-between pt-[71px] text-[14px] leading-[21px]">
                <span>{note.tag}</span>
                <time className="text-ink/80">{note.date}</time>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="rules scroll-mt-[60px]">
      <div className="cut bg-paper px-5 pt-9 pb-9 text-ink lg:px-9">
        <Eyebrow label="FAQ" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-9">
          <div className="flex flex-col justify-between gap-10">
            <h2 className="text-[clamp(34px,2.5vw,48px)] leading-[1.2] tracking-[-0.05em]">Frequently asked questions</h2>
            <div>
              <strong className="block text-[14px] leading-[21px] font-semibold uppercase">Still have questions?</strong>
              <strong className="block text-[14px] leading-[21px] font-semibold uppercase">We're here to help</strong>
              <div className="mt-4 h-px bg-ink/25" />
              <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
                <p className="max-w-[437px] text-[14px] leading-[21px] text-ink/80">If you handle storage, finance, or trade at scale, or need a custom setup, our team can help.</p>
                <CutButton href="#contact" tone="tan" shape="cut-sm" className="h-[45px] px-6">
                  Contact us
                </CutButton>
              </div>
            </div>
          </div>
          <div className="hatch flex flex-col gap-2 bg-tan p-2 [--hatch:rgb(46_46_46/0.85)]">
            {faqs.map((item, index) => {
              const isOpen = open === index
              return (
                <div key={item.q} className="bg-paper px-7 py-7">
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full cursor-pointer items-center justify-between gap-4 text-left">
                    <strong className="text-[16px] leading-6 font-medium">{item.q}</strong>
                    <span className={`grid size-[34px] shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-bg text-cream' : 'bg-tan'}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d={isOpen ? 'M2 7h10' : 'M7 2v10M2 7h10'} stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <p className="overflow-hidden pr-12 text-[14px] leading-[21px] text-ink/80">
                      <span className="block pt-[14px]">{item.a}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */

export function Contact() {
  return (
    <section id="contact" className="rules scroll-mt-[60px]">
      <div className="cut bg-paper px-5 pt-9 pb-9 text-ink lg:px-9">
        <Eyebrow label="Contact" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-9">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h2 className="max-w-[420px] text-[clamp(34px,2.5vw,48px)] leading-[1.15] tracking-[-0.05em]">Let's build a better agricultural future.</h2>
              <p className="mt-3 max-w-[400px] text-[18px] leading-7 text-ink/80">Questions about storage, finance, or trading? Our team is here to help.</p>
            </div>
            <div>
              <strong className="block text-[14px] leading-5 font-semibold uppercase">Still have questions?</strong>
              <strong className="block text-[14px] leading-5 font-semibold uppercase">We're here to help</strong>
              <div className="mt-6 h-px bg-ink/25" />
              <p className="mt-6 max-w-[260px] text-[14px] leading-5 text-ink/80">If you handle storage, finance, or trade at scale, or need a custom setup, our team can help.</p>
            </div>
          </div>
          <GetInTouchForm subject="Enquiry from krsi website" className="lg:mt-[38px]" />
        </div>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'

const SAND = '#d1c2a5'
const TAN = '#e3d8c5'
const FACE = '#2c2c2c'
const SIDE = '#202020'
const SHADE = '#1a1a1a'
const CX = 335

const rhombus = (cx: number, cy: number, w: number, h: number) =>
  `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`

/** Isometric box; `cy` is the centre of the top face. */
function Box({ cy, w, h, d, top }: { cy: number; w: number; h: number; d: number; top: string }) {
  const l = CX - w / 2
  const r = CX + w / 2
  return (
    <>
      <polygon points={`${l},${cy} ${CX},${cy + h / 2} ${CX},${cy + h / 2 + d} ${l},${cy + d}`} fill={SIDE} />
      <polygon points={`${CX},${cy + h / 2} ${r},${cy} ${r},${cy + d} ${CX},${cy + h / 2 + d}`} fill={SHADE} />
      <polygon points={rhombus(CX, cy, w, h)} fill={top} />
    </>
  )
}

/** Vertical cylinder; `y` is the centre of the top ellipse. */
function Cylinder({ y, rx, ry, h, top }: { y: number; rx: number; ry: number; h: number; top: string }) {
  return (
    <>
      <path d={`M${CX - rx},${y} v${h} a${rx},${ry} 0 0 0 ${rx * 2},0 v${-h} Z`} fill={SIDE} />
      <ellipse cx={CX} cy={y} rx={rx} ry={ry} fill={top} />
    </>
  )
}

function hexPrism(cy: number, top: string) {
  const R = 78
  const r = 42
  const d = 28
  const v = Array.from({ length: 6 }, (_, k) => [CX + R * Math.cos((k * Math.PI) / 3), cy + r * Math.sin((k * Math.PI) / 3)])
  const sides = v
    .map((a, k) => {
      const b = v[(k + 1) % 6]
      return { mid: (a[1] + b[1]) / 2, pts: `${a[0]},${a[1]} ${b[0]},${b[1]} ${b[0]},${b[1] + d} ${a[0]},${a[1] + d}` }
    })
    .sort((m, n) => m.mid - n.mid)
  return (
    <>
      {sides.map((side) => (
        <polygon key={side.pts} points={side.pts} fill={SIDE} />
      ))}
      <polygon points={v.map((p) => p.join(',')).join(' ')} fill={top} />
      <ellipse cx={CX} cy={cy} rx={26} ry={14} fill={SHADE} />
    </>
  )
}

/** One shape per Krsi layer, drawn around the layer's centre line `cy`. */
const shapes: ((cy: number, top: string) => ReactNode)[] = [
  // Asset origination: inverted pyramid
  (cy, top) => (
    <>
      <polygon points={`${CX - 65},${cy - 20} ${CX},${cy + 12} ${CX},${cy + 64}`} fill={SIDE} />
      <polygon points={`${CX},${cy + 12} ${CX + 65},${cy - 20} ${CX},${cy + 64}`} fill={SHADE} />
      <polygon points={rhombus(CX, cy - 20, 130, 64)} fill={top} />
    </>
  ),
  // Tokenization: cube
  (cy, top) => <Box cy={cy - 36} w={116} h={66} d={62} top={top} />,
  // Oracle & data: hemisphere
  (cy, top) => (
    <>
      <path d={`M${CX - 72},${cy - 14} a72,72 0 0 0 144,0 Z`} fill={SIDE} />
      <ellipse cx={CX} cy={cy - 14} rx={72} ry={38} fill={top} />
      <ellipse cx={CX} cy={cy - 14} rx={28} ry={15} fill={SHADE} />
    </>
  ),
  // Credit: stacked coins
  (cy, top) => (
    <>
      <Cylinder y={cy + 22} rx={60} ry={30} h={14} top={FACE} />
      <Cylinder y={cy + 4} rx={60} ry={30} h={14} top={FACE} />
      <Cylinder y={cy - 14} rx={60} ry={30} h={14} top={top} />
    </>
  ),
  // Liquidation: hexagonal prism with a hole
  (cy, top) => hexPrism(cy - 14, top),
  // Settlement: stepped plates
  (cy, top) => (
    <>
      <Box cy={cy + 22} w={156} h={90} d={12} top={FACE} />
      <Box cy={cy} w={118} h={68} d={12} top={FACE} />
      <Box cy={cy - 22} w={80} h={46} d={12} top={top} />
    </>
  ),
  // Governance & treasury: column on a base
  (cy, top) => (
    <>
      <Cylinder y={cy + 30} rx={64} ry={33} h={12} top={FACE} />
      <Cylinder y={cy - 34} rx={34} ry={18} h={64} top={top} />
    </>
  ),
]

const labels = ['ORIGINATION', 'TOKENIZATION', 'ORACLE & DATA', 'CREDIT', 'LIQUIDATION', 'SETTLEMENT', 'GOVERNANCE']
const FIRST = 110
const STEP = 150

/** Right-hand hero column: the seven Krsi layers as stacked isometric plates. Clicking a shape opens its layer. */
export function HeroArt({ active = -1, onPick }: { active?: number; onPick?: (index: number) => void }) {
  const last = FIRST + STEP * (labels.length - 1)
  return (
    <svg viewBox={`0 0 670 ${last + 150}`} className="h-auto w-full" role="img" aria-label="The seven Krsi layers, from origination to governance">
      <line x1={CX} y1="24" x2={CX} y2={last + 120} stroke={SAND} strokeOpacity="0.35" />
      <circle cx={CX} cy="24" r="3.5" fill={TAN} />
      <circle cx={CX} cy={last + 120} r="3.5" fill={TAN} />
      {labels.map((label, index) => {
        const cy = FIRST + index * STEP
        const on = index === active
        return (
          <g key={label} onClick={() => onPick?.(index)} className={onPick ? 'cursor-pointer' : ''}>
            <polygon points={rhombus(CX, cy + 40, 380, 216)} fill="none" stroke={SAND} strokeOpacity={on ? 0.55 : 0.22} className="transition-[stroke-opacity] duration-500" />
            <g
              className="float"
              style={{ animationDelay: `${-index * 0.85}s` }}
              stroke={on ? '#f0e7da' : SAND}
              strokeOpacity={on ? 1 : 0.65}
              strokeLinejoin="round"
            >
              {shapes[index](cy, on ? TAN : FACE)}
            </g>
            <circle cx={CX} cy={cy} r="3.5" fill={TAN} />
            <line x1={CX + 3} y1={cy} x2="499" y2={cy} stroke={TAN} strokeOpacity={on ? 1 : 0.7} />
            <circle cx="502" cy={cy} r="3.5" fill={TAN} />
            <text x="516" y={cy + 5} fill={on ? '#f0e7da' : SAND} fontFamily="IBM Plex Mono, monospace" fontSize="14">
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <rect width="28" height="28" fill="#121212" />
      <path d="M14 6 22 14 14 22 6 14Z" fill="#f0e7da" />
      <path d="M14 10.5 17.5 14 14 17.5 10.5 14Z" fill="#121212" />
    </svg>
  )
}

/** Oversized dotted wordmark used in the footer card. */
export function Wordmark() {
  return (
    <svg viewBox="0 0 1380 306" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <defs>
        <pattern id="wordmark-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.4" fill="#0f2f20" />
        </pattern>
      </defs>
      <text x="690" y="392" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="600" fontSize="460" letterSpacing="-24" fill="url(#wordmark-dots)">
        KRSI
      </text>
    </svg>
  )
}

/** Stacked-layers mark from the Figma hero rail (TkfZkaC1V.svg), recoloured via currentColor. */
export function LayersMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 18" fill="none" className={className} aria-hidden="true">
      <path
        d="M18.7923 8.70825L9.62565 13.2916L0.458984 8.70825M18.7923 12.3749L9.62565 16.9583L0.458984 12.3749M0.458984 5.04159L9.62565 0.458252L18.7923 5.04159L9.62565 9.62492L0.458984 5.04159Z"
        stroke="currentColor"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

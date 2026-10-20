import type { ReactNode } from 'react'

const SAND = '#d1c2a5'
const TAN = '#e3d8c5'
// Dispatch's palette: dark wireframe faces, thin sand edges, solid plates.
const FACE = '#353535'
const LIT = '#474747'
const SIDE = '#262626'
const SHADE = '#1c1c1c'
const PLATE = '#272727'
const CX = 335

const rhombus = (cx: number, cy: number, w: number, h: number) =>
  `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`

/** Isometric box; `top` is the centre of its top face. */
function Box({ top, w, d, fill }: { top: number; w: number; d: number; fill: string }) {
  const h = w * 0.577
  const l = CX - w / 2
  const r = CX + w / 2
  return (
    <>
      <polygon points={`${l},${top} ${CX},${top + h / 2} ${CX},${top + h / 2 + d} ${l},${top + d}`} fill={SIDE} />
      <polygon points={`${CX},${top + h / 2} ${r},${top} ${r},${top + d} ${CX},${top + h / 2 + d}`} fill={SHADE} />
      <polygon points={rhombus(CX, top, w, h)} fill={fill} />
    </>
  )
}

/** Vertical cylinder; `top` is the centre of its top ellipse. */
function Cylinder({ top, rx, h, fill }: { top: number; rx: number; h: number; fill: string }) {
  const ry = rx * 0.577
  return (
    <>
      <path d={`M${CX - rx},${top} v${h} a${rx},${ry} 0 0 0 ${rx * 2},0 v${-h} Z`} fill={SIDE} />
      <ellipse cx={CX} cy={top} rx={rx} ry={ry} fill={fill} />
    </>
  )
}

type Shape = { focus: number; draw: (base: number, fill: string) => ReactNode }

/* Each shape is drawn around its plate centre (`base`); `focus` is its centre point, which HeroArt places on the label line. */
const shapes: Shape[] = [
  {
    // Asset origination: inverted pyramid, apex on the plate
    focus: -100,
    draw: (b, fill) => (
      <>
        <polygon points={`${CX - 75},${b - 100} ${CX},${b - 57} ${CX},${b}`} fill={SIDE} />
        <polygon points={`${CX},${b - 57} ${CX + 75},${b - 100} ${CX},${b}`} fill={SHADE} />
        <polygon points={rhombus(CX, b - 100, 150, 86)} fill={fill} />
      </>
    ),
  },
  { focus: -70, draw: (b, fill) => <Box top={b - 70} w={120} d={70} fill={fill} /> },
  {
    // Oracle & data: open bowl
    focus: -84,
    draw: (b, fill) => (
      <>
        <path d={`M${CX - 72},${b - 84} a72,72 0 0 0 144,0 Z`} fill={SIDE} />
        <ellipse cx={CX} cy={b - 84} rx={72} ry={42} fill={fill} />
        <ellipse cx={CX} cy={b - 84} rx={30} ry={17} fill={SHADE} />
      </>
    ),
  },
  {
    // Credit: stacked coins
    focus: -52,
    draw: (b, fill) => (
      <>
        <Cylinder top={b - 16} rx={75} h={16} fill={FACE} />
        <Cylinder top={b - 34} rx={75} h={16} fill={FACE} />
        <Cylinder top={b - 52} rx={75} h={16} fill={fill} />
      </>
    ),
  },
  {
    // Liquidation: hexagonal prism with a hole
    focus: -60,
    draw: (b, fill) => {
      const top = b - 60
      const v = Array.from({ length: 6 }, (_, k) => [CX + 85 * Math.cos((k * Math.PI) / 3), top + 49 * Math.sin((k * Math.PI) / 3)])
      const sides = v
        .map((a, k) => {
          const n = v[(k + 1) % 6]
          return { mid: (a[1] + n[1]) / 2, pts: `${a[0]},${a[1]} ${n[0]},${n[1]} ${n[0]},${n[1] + 32} ${a[0]},${a[1] + 32}` }
        })
        .sort((m, n) => m.mid - n.mid)
      return (
        <>
          {sides.map((side) => (
            <polygon key={side.pts} points={side.pts} fill={SIDE} />
          ))}
          <polygon points={v.map((p) => p.join(',')).join(' ')} fill={fill} />
          <ellipse cx={CX} cy={top} rx={28} ry={16} fill={SHADE} />
        </>
      )
    },
  },
  {
    // Settlement: stepped plates
    focus: -62,
    draw: (b, fill) => (
      <>
        <Box top={b - 14} w={170} d={12} fill={FACE} />
        <Box top={b - 38} w={128} d={12} fill={FACE} />
        <Box top={b - 62} w={86} d={12} fill={fill} />
      </>
    ),
  },
  {
    // Governance & treasury: column on a base
    focus: -92,
    draw: (b, fill) => (
      <>
        <Cylinder top={b - 12} rx={80} h={12} fill={FACE} />
        <Cylinder top={b - 92} rx={38} h={80} fill={fill} />
      </>
    ),
  },
]

const labels = ['ORIGINATION', 'TOKENIZATION', 'ORACLE & DATA', 'CREDIT', 'LIQUIDATION', 'SETTLEMENT', 'GOVERNANCE']
const SCALE = 1.1
const STEP = 185
const PLATE_W = 420
const PLATE_H = PLATE_W * 0.577
// As in Dispatch, every label point sits on the bottom corner of the sheet above its shape.
const TOP_DOT = 20
const FIRST = 235
const STEM = 65
const CORNER = 18
// a rounded corner's tip sits half the corner's vertical cut above the sharp vertex
const LIFT = STEP - PLATE_H / 2 + (CORNER * (PLATE_H / 2)) / Math.hypot(PLATE_W / 2, PLATE_H / 2) / 2

/** Sheet outline: the plate rhombus with its four corners rounded. */
function sheet(cy: number) {
  const pts = [
    [CX, cy - PLATE_H / 2],
    [CX + PLATE_W / 2, cy],
    [CX, cy + PLATE_H / 2],
    [CX - PLATE_W / 2, cy],
  ]
  const toward = ([x, y]: number[], [tx, ty]: number[]) => {
    const len = Math.hypot(tx - x, ty - y)
    return `${x + ((tx - x) / len) * CORNER},${y + ((ty - y) / len) * CORNER}`
  }
  return (
    pts.map((p, i) => `${i ? 'L' : 'M'}${toward(p, pts[(i + 3) % 4])} Q${p.join(',')} ${toward(p, pts[(i + 1) % 4])}`).join(' ') + ' Z'
  )
}

/**
 * Right-hand hero column: the seven Krsi layers as stacked isometric sheets.
 * Sheets are solid against the dotted background but see-through over the shape beneath them,
 * so a shape's top shows behind the sheet above it, as in Dispatch. Clicking a shape or label opens that layer.
 */
export function HeroArt({ active = -1, onPick }: { active?: number; onPick?: (index: number) => void }) {
  const base = (index: number) => FIRST + index * STEP
  // the top shape has no sheet above it, so it sits on its own sheet with the pyramid tip at the centre
  const point = (index: number) => (index === 0 ? base(0) + shapes[0].focus * SCALE : base(index) - LIFT)
  const lastEdge = base(labels.length - 1) + PLATE_H / 2
  const bottomDot = lastEdge + STEM
  const order = [...labels.keys()].reverse()
  const pick = (index: number) => () => onPick?.(index)
  const cursor = onPick ? 'cursor-pointer' : ''
  return (
    <svg viewBox={`0 0 670 ${bottomDot + 12}`} className="mx-auto h-auto w-full max-w-[560px]" role="img" aria-label="The seven Krsi layers, from origination to governance">
      {order.map((index) => (
        <path key={index} d={sheet(base(index))} fill={PLATE} />
      ))}

      {order.map((index) => {
        const b = base(index)
        const on = index === active
        const anchor = b + shapes[index].focus
        return (
          <g key={index} onClick={pick(index)} className={cursor}>
            <path d={sheet(b)} fill={PLATE} fillOpacity="0.6" stroke={SAND} strokeOpacity={on ? 0.55 : 0.3} />
            <line x1={CX} y1={b - PLATE_H / 2} x2={CX} y2={b + PLATE_H / 2} stroke={SAND} strokeOpacity="0.4" />
            <g
              transform={`translate(${CX} ${point(index)}) scale(${SCALE}) translate(${-CX} ${-anchor})`}
              stroke={on ? '#f0e7da' : SAND}
              strokeOpacity={on ? 0.95 : 0.6}
              strokeWidth={1 / SCALE}
              strokeLinejoin="round"
            >
              {shapes[index].draw(b, on ? LIT : FACE)}
            </g>
          </g>
        )
      })}

      {/* the axis: a stem into the top shape and one out of the bottom sheet */}
      <line x1={CX} y1={TOP_DOT} x2={CX} y2={point(0)} stroke={TAN} strokeOpacity="0.8" />
      <circle cx={CX} cy={TOP_DOT} r="3.5" fill={TAN} />
      <line x1={CX} y1={lastEdge} x2={CX} y2={bottomDot} stroke={SAND} strokeOpacity="0.5" />
      <circle cx={CX} cy={bottomDot} r="3.5" fill={TAN} />

      {labels.map((label, index) => {
        const y = point(index)
        const on = index === active
        return (
          <g key={label} onClick={pick(index)} className={cursor}>
            <circle cx={CX} cy={y} r="3.5" fill={TAN} />
            <line x1={CX + 3} y1={y} x2="499" y2={y} stroke={TAN} strokeOpacity={on ? 1 : 0.8} />
            <circle cx="502" cy={y} r="3.5" fill={TAN} />
            <text x="516" y={y + 5} fill={on ? '#f0e7da' : SAND} fontFamily="IBM Plex Mono, monospace" fontSize="14">
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

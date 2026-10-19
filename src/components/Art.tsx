const SAND = '#d1c2a5'
const TAN = '#e3d8c5'
const DARK = '#262626'

const rhombus = (cx: number, cy: number, w: number, h: number) =>
  `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`

function Plate({ cy }: { cy: number }) {
  return (
    <g>
      <polygon points={rhombus(335, cy, 426, 246)} fill="none" stroke={SAND} strokeOpacity="0.28" />
      <polygon points={rhombus(335, cy, 240, 138)} fill="none" stroke={SAND} strokeOpacity="0.18" strokeDasharray="3 5" />
    </g>
  )
}

/** Isometric box: top face, left face, right face. */
function Block({ cy, w, h, depth, light = 'top' }: { cy: number; w: number; h: number; depth: number; light?: 'top' | 'left' }) {
  const top = rhombus(335, cy, w, h)
  const left = `${335 - w / 2},${cy} ${335},${cy + h / 2} ${335},${cy + h / 2 + depth} ${335 - w / 2},${cy + depth}`
  const right = `${335},${cy + h / 2} ${335 + w / 2},${cy} ${335 + w / 2},${cy + depth} ${335},${cy + h / 2 + depth}`
  return (
    <g stroke={SAND} strokeWidth="1" strokeLinejoin="round">
      <polygon points={left} fill={light === 'left' ? TAN : DARK} />
      <polygon points={right} fill={DARK} />
      <polygon points={top} fill={light === 'top' ? TAN : DARK} />
    </g>
  )
}

function Label({ y, text }: { y: number; text: string }) {
  return (
    <g>
      <circle cx="335" cy={y} r="3.5" fill={TAN} />
      <line x1="338" y1={y} x2="499" y2={y} stroke={TAN} />
      <circle cx="502" cy={y} r="3.5" fill={TAN} />
      <text x="516" y={y + 5} fill="#f0e7da" fontFamily="IBM Plex Mono, monospace" fontSize="14">
        {text}
      </text>
    </g>
  )
}

/** Right-hand hero column: the Krsi layers drawn as stacked isometric plates. */
export function HeroArt() {
  return (
    <svg viewBox="0 0 670 1000" className="h-auto w-full" role="img" aria-label="Krsi infrastructure layers: origination, tokenization, oracle and data, analysis">
      <line x1="335" y1="40" x2="335" y2="960" stroke={SAND} strokeOpacity="0.35" />
      <circle cx="335" cy="40" r="3.5" fill={TAN} />
      <circle cx="335" cy="960" r="3.5" fill={TAN} />

      <Plate cy={180} />
      <g stroke={SAND} strokeLinejoin="round">
        <polygon points="335,70 400,150 335,186" fill={TAN} />
        <polygon points="335,70 270,150 335,186" fill={DARK} />
        <polygon points="270,150 335,186 400,150 335,118" fill="none" strokeOpacity="0.5" />
      </g>
      <Label y={150} text="ORIGINATION" />

      <Plate cy={400} />
      <Block cy={346} w={150} h={86} depth={70} light="left" />
      <Label y={360} text="TOKENIZATION" />

      <Plate cy={620} />
      {[512, 548, 584].map((cy) => (
        <Block key={cy} cy={cy} w={170} h={98} depth={18} />
      ))}
      <Label y={590} text="ORACLE & DATA" />

      <Plate cy={840} />
      <g stroke={SAND}>
        <path d="M245,790 v40 a90,52 0 0 0 180,0 v-40" fill={DARK} />
        <ellipse cx="335" cy="790" rx="90" ry="52" fill={TAN} />
        <ellipse cx="335" cy="790" rx="34" ry="20" fill={DARK} />
      </g>
      <Label y={820} text="ANALYZE" />
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

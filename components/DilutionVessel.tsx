"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  solution: number;
  water: number;
  target: number;
  abv: number;
};

const MAX = 50; // cylinder capacity in litres
const TOP = 74;
const BOTTOM = 384;
const SPAN = BOTTOM - TOP;
const LEFT = 82;
const RIGHT = 186;

/** Hand-drawn graduated cylinder: the %96 solution and the distilled water stack
 *  into the target volume as the sliders move. */
export default function DilutionVessel({ solution, water, target, abv }: Props) {
  const reduce = useReducedMotion();
  const scale = SPAN / MAX;
  const waterH = Math.max(0, Math.min(SPAN, water * scale));
  const solH = Math.max(0, Math.min(SPAN - waterH, solution * scale));
  const solY = BOTTOM - waterH - solH;
  const targetY = BOTTOM - Math.min(SPAN, target * scale);

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.8 };

  const ticks = Array.from({ length: 11 }, (_, i) => i * 5);

  return (
    <svg viewBox="0 0 268 440" className="w-full max-w-[320px] mx-auto" role="img"
      aria-label={`Seyreltme kabı: ${solution} litre %96 çözelti ve ${water} litre su`}>
      <defs>
        <linearGradient id="dl-amber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a2470f" />
          <stop offset="38%" stopColor="#c2571b" />
          <stop offset="72%" stopColor="#e08a3c" />
          <stop offset="100%" stopColor="#a2470f" />
        </linearGradient>
        <linearGradient id="dl-water" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b9c6bd" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#e8efe6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a9b8ad" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="dl-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#191410" stopOpacity="0.1" />
          <stop offset="16%" stopColor="#191410" stopOpacity="0.03" />
          <stop offset="88%" stopColor="#191410" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#191410" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id="dl-clip">
          <path d={`M${LEFT} ${TOP} H${RIGHT} V${BOTTOM - 16} A16 16 0 0 1 ${RIGHT - 16} ${BOTTOM} H${LEFT + 16} A16 16 0 0 1 ${LEFT} ${BOTTOM - 16} Z`} />
        </clipPath>
      </defs>

      {/* base shadow on the paper */}
      <ellipse cx="134" cy="410" rx="86" ry="11" fill="#191410" opacity="0.14" />

      {/* spout */}
      <path d="M82 74 L62 58" stroke="#191410" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M186 74 L206 58" stroke="#191410" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />

      {/* liquid stack */}
      <g clipPath="url(#dl-clip)">
        <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={SPAN + 16} fill="#191410" opacity="0.04" />
        <motion.rect
          x={LEFT}
          width={RIGHT - LEFT}
          initial={false}
          animate={{ y: BOTTOM - waterH, height: waterH }}
          transition={spring}
          fill="url(#dl-water)"
        />
        <motion.rect
          x={LEFT}
          width={RIGHT - LEFT}
          initial={false}
          animate={{ y: solY, height: solH }}
          transition={spring}
          fill="url(#dl-amber)"
        />
        {/* meniscus */}
        <motion.ellipse
          cx={(LEFT + RIGHT) / 2}
          rx={(RIGHT - LEFT) / 2}
          ry="6"
          initial={false}
          animate={{ cy: solY, opacity: solH > 2 ? 1 : 0 }}
          transition={spring}
          fill="#e9a05c"
          opacity="0.85"
        />
        {/* glass highlight */}
        <rect x={LEFT + 12} y={TOP} width="10" height={SPAN} fill="#ffffff" opacity="0.18" />
      </g>

      {/* cylinder outline */}
      <path
        d={`M${LEFT} ${TOP} H${RIGHT} V${BOTTOM - 16} A16 16 0 0 1 ${RIGHT - 16} ${BOTTOM} H${LEFT + 16} A16 16 0 0 1 ${LEFT} ${BOTTOM - 16} Z`}
        fill="none"
        stroke="#191410"
        strokeWidth="2.6"
      />
      <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={SPAN + 16} fill="url(#dl-glass)" pointerEvents="none" />
      <path d={`M${LEFT} ${TOP} H${RIGHT}`} stroke="#191410" strokeWidth="2.6" />

      {/* graduations */}
      {ticks.map((t) => {
        const y = BOTTOM - t * scale;
        const major = t % 10 === 0;
        return (
          <g key={t}>
            <line
              x1={LEFT}
              x2={LEFT + (major ? 34 : 20)}
              y1={y}
              y2={y}
              stroke="#191410"
              strokeWidth={major ? 1.6 : 1}
              opacity="0.55"
            />
            {major && (
              <text
                x={LEFT + 40}
                y={y + 4}
                fontFamily="IBM Plex Mono, monospace"
                fontSize="11"
                fill="#7a6b57"
              >
                {t}
              </text>
            )}
          </g>
        );
      })}

      {/* target line */}
      <motion.g initial={false} animate={{ y: 0 }} transition={spring}>
        <line
          x1={LEFT - 14}
          x2={RIGHT + 26}
          y1={targetY}
          y2={targetY}
          stroke="#123f2c"
          strokeWidth="1.4"
          strokeDasharray="6 5"
          opacity="0.8"
        />
        <text
          x={RIGHT + 30}
          y={targetY - 6}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          letterSpacing="1.5"
          fill="#123f2c"
        >
          HEDEF
        </text>
        <text
          x={RIGHT + 30}
          y={targetY + 12}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="14"
          fontWeight="600"
          fill="#123f2c"
        >
          {target} L
        </text>
      </motion.g>

      {/* %96 label on the amber column */}
      <text
        x={(LEFT + RIGHT) / 2}
        y={solY + solH / 2 + 4}
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="13"
        fontWeight="600"
        letterSpacing="1"
        fill="#f7e7d2"
        opacity={solH > 26 ? 0.95 : 0}
      >
        %{abv} · {solution} L
      </text>
      <text
        x={(LEFT + RIGHT) / 2}
        y={BOTTOM - waterH / 2 + 4}
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="12"
        letterSpacing="1"
        fill="#2b3a31"
        opacity={waterH > 24 ? 0.85 : 0}
      >
        SU · {water} L
      </text>
    </svg>
  );
}

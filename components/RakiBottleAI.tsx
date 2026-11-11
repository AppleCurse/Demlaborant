type RakiBottleAIProps = {
  className?: string;
  speaking?: boolean;
};

export default function RakiBottleAI({ className = "h-24 w-14", speaking = false }: RakiBottleAIProps) {
  return (
    <svg
      viewBox="0 0 100 180"
      className={className}
      role="img"
      aria-label={speaking ? "Konuşan DEMLAB yapay zekâ şişesi" : "DEMLAB yapay zekâ şişesi"}
    >
      <title>DEMLAB rakı şişesi biçimli yapay zekâ asistanı</title>
      <defs>
        <linearGradient id="ai-glass" x1="0" x2="1">
          <stop offset="0" stopColor="#fff7e8" stopOpacity=".18" />
          <stop offset=".45" stopColor="#fff7e8" stopOpacity=".55" />
          <stop offset="1" stopColor="#e59840" stopOpacity=".14" />
        </linearGradient>
        <linearGradient id="ai-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3bd68" stopOpacity=".35" />
          <stop offset="1" stopColor="#b86d1f" stopOpacity=".72" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="173" rx="32" ry="4" fill="#000" opacity=".35" />
      <rect x="36" y="4" width="28" height="14" rx="3" fill="#d8892f" stroke="#ffd79a" strokeWidth="1.5" />
      <path d="M39 18h22v37c0 7 13 17 17 26 2 5 2 11 2 18v58c0 10-7 15-17 15H37c-10 0-17-5-17-15V99c0-7 0-13 2-18 4-9 17-19 17-26V18Z" fill="url(#ai-glass)" stroke="#f3bd68" strokeWidth="2" />
      <path d="M23 109h54v48c0 8-5 12-14 12H37c-9 0-14-4-14-12v-48Z" fill="url(#ai-liquid)" />
      <path d="M30 25v29c0 12-8 19-9 29" fill="none" stroke="#fff" strokeOpacity=".52" strokeWidth="3" strokeLinecap="round" />
      <rect x="26" y="91" width="48" height="51" rx="7" fill="#f5e7cf" stroke="#d8892f" strokeWidth="1.5" />
      <text x="50" y="103" textAnchor="middle" fill="#6f3c16" fontSize="7" fontWeight="800" fontFamily="Arial, sans-serif">DEMLAB</text>
      <circle cx="40" cy="116" r="3" fill="#2d180d" />
      <circle cx="60" cy="116" r="3" fill="#2d180d" />
      <circle cx="39" cy="115" r=".8" fill="#fff" />
      <circle cx="59" cy="115" r=".8" fill="#fff" />
      <path d="M41 126c5 6 13 6 18 0" fill="none" stroke="#6f3c16" strokeWidth="2.2" strokeLinecap="round" />
      <text x="50" y="139" textAnchor="middle" fill="#9e591b" fontSize="6" fontWeight="900" fontFamily="Arial, sans-serif">AI • 9</text>
      <g className={speaking ? "animate-pulse" : undefined} fill="none" stroke="#f3bd68" strokeWidth="2.5" strokeLinecap="round">
        <path d="M82 106c5 5 5 13 0 18" />
        <path d="M87 101c9 9 9 21 0 30" opacity={speaking ? 1 : 0.35} />
      </g>
    </svg>
  );
}

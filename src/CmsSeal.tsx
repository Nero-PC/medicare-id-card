/** Approximate SAMPLE CMS/HHS-style seal (stylized, not an official trademark). */
export function CmsSeal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <title>SAMPLE CMS seal (approximate)</title>
      <circle cx="50" cy="50" r="48.5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.85" />

      <defs>
        <path id="seal-arc-top" d="M 20,52 A 30,30 0 0 1 80,52" fill="none" />
        <path id="seal-arc-bot" d="M 78,56 A 28,28 0 0 1 22,56" fill="none" />
      </defs>
      <text
        fill="#fff"
        fontSize="6.5"
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontWeight="600"
        letterSpacing="0.8"
      >
        <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
          DEPT. OF HEALTH &amp; HUMAN SERVICES
        </textPath>
      </text>
      <text
        fill="#fff"
        fontSize="6"
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontWeight="600"
        letterSpacing="1.5"
      >
        <textPath href="#seal-arc-bot" startOffset="50%" textAnchor="middle">
          · USA · SAMPLE ·
        </textPath>
      </text>

      {/* Stylized eagle facing right — approximate, SAMPLE only */}
      <g fill="#fff" transform="translate(50 54) scale(0.92)">
        {/* Left wing */}
        <path d="M-4,-2 C-18,-16 -30,-14 -28,2 C-26,8 -16,6 -8,4 C-12,-2 -8,-4 -4,-2Z" />
        {/* Right wing */}
        <path d="M6,-4 C16,-18 30,-12 26,4 C22,10 12,6 6,2 C10,-2 8,-4 6,-4Z" />
        {/* Body */}
        <ellipse cx="1" cy="2" rx="8" ry="11" />
        {/* Tail */}
        <path d="M-3,11 L-8,22 L1,15 L8,22 L4,11Z" />
        {/* Head */}
        <circle cx="11" cy="-9" r="6.8" />
        {/* Beak */}
        <path d="M16.5,-10.5 L26,-8.5 L16.5,-5.8Z" />
        {/* Eye */}
        <circle cx="12.5" cy="-10.5" r="1.15" fill="#0B2B5B" />
        {/* Shield hint on chest */}
        <path
          d="M1,-2 L5,0 L5,6 L1,9 L-3,6 L-3,0Z"
          fill="#0B2B5B"
          opacity="0.35"
        />
      </g>
    </svg>
  )
}

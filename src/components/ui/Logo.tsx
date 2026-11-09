interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Símbolo próprio: "P" geométrico com corte diagonal em amarelo, sugerindo movimento. */
export function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#7b2cd9" data-keep-bg />
      <path
        data-keep-bg
        fill="#fff"
        d="M16 13h20c9.4 0 15 5.6 15 13.5S45.400 40 36 40h-8v11H16V13Zm12 10v7h7.500c3 0 4.500-1.300 4.500-3.500S38.500 23 35.500 23H28Z"
        fillRule="evenodd"
      />
      <path data-keep-bg fill="#ffd60a" d="M33 51 46 38h8L41 51h-8Z" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      <span className="whitespace-nowrap font-display text-[1.7rem] font-bold leading-none tracking-tight" aria-hidden="true">
        purple<span className="text-volt">fit</span>
      </span>
      <span className="sr-only">Purple Fit</span>
    </span>
  );
}

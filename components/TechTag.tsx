import { TECH_ICONS } from '@/lib/tech-icons';

function WompiIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#e63319" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="6" cy="15" r="1.2" fill="#e63319" stroke="none" />
      <circle cx="10" cy="15" r="1.2" fill="#e63319" stroke="none" />
    </svg>
  );
}

function LenisIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9c2.5-3.5 5-3.5 7 0s4.5 3.5 7 0" />
      <path d="M2 15c2.5-3.5 5-3.5 7 0s4.5 3.5 7 0" />
    </svg>
  );
}

export default function TechTag({ tag, size = 'sm' }: { tag: string; size?: 'sm' | 'lg' }) {
  const tech = TECH_ICONS[tag];
  const isWompi = tag === 'Wompi';
  const isLenis = tag === 'Lenis';

  return (
    <span className={`tag tag-${size}${(tech || isWompi || isLenis) ? ' has-ico' : ''}`}>
      {isWompi ? (
        <span className="tag-ico"><WompiIcon /></span>
      ) : isLenis ? (
        <span className="tag-ico"><LenisIcon /></span>
      ) : tech ? (
        <span className="tag-ico">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            decoding="async"
            className={tech.invertable ? 'invertable' : ''}
            src={tech.src ?? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
            alt=""
          />
        </span>
      ) : null}
      <span>{tag}</span>
    </span>
  );
}

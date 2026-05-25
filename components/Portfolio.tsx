'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { I18N, type Lang } from '@/lib/i18n';
import { PROJECTS, type Project, type Bilingual } from '@/lib/projects';
import TechTag from '@/components/TechTag';

const FEATURED = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
const SECONDARY = PROJECTS.filter((p) => !p.featured);

type StackTileDef = {
  idx: string;
  name: string;
  icon?: string;
  invertable?: boolean;
  text?: string;
};

const STACK_TILES: { front: StackTileDef[]; back: StackTileDef[]; db: StackTileDef[] } = {
  front: [
    { idx: '01', name: 'React', icon: 'react/react-original.svg' },
    { idx: '02', name: 'Next.js', icon: 'nextjs/nextjs-original.svg', invertable: true },
    { idx: '03', name: 'TypeScript', icon: 'typescript/typescript-original.svg' },
    { idx: '04', name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
    { idx: '05', name: 'Tailwind', icon: 'tailwindcss/tailwindcss-original.svg' },
    { idx: '06', name: 'Bootstrap', icon: 'bootstrap/bootstrap-original.svg' },
    { idx: '07', name: 'HTML5', icon: 'html5/html5-original.svg' },
    { idx: '08', name: 'CSS3', icon: 'css3/css3-original.svg' },
  ],
  back: [
    { idx: '09', name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
    { idx: '10', name: 'NestJS', icon: 'nestjs/nestjs-original.svg' },
    { idx: '11', name: 'Express', icon: 'express/express-original.svg', invertable: true },
    { idx: '12', name: 'Java', icon: 'java/java-original.svg' },
    { idx: '13', name: 'REST API', text: 'API' },
    { idx: '14', name: 'JWT Auth', text: 'JWT' },
  ],
  db: [
    { idx: '15', name: 'MySQL', icon: 'mysql/mysql-original.svg' },
    { idx: '16', name: 'MongoDB', icon: 'mongodb/mongodb-original.svg' },
    { idx: '17', name: 'Oracle DB', icon: 'oracle/oracle-original.svg' },
    { idx: '18', name: 'Ubuntu', icon: 'ubuntu/ubuntu-original.svg' },
    { idx: '19', name: 'Nginx', icon: 'nginx/nginx-original.svg' },
    { idx: '20', name: 'Git', icon: 'git/git-original.svg' },
    { idx: '21', name: 'GitHub', icon: 'github/github-original.svg', invertable: true },
    { idx: '22', name: 'PM2', text: 'P2' },
  ],
};

const TICKER_ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Express',
  'MySQL', 'MongoDB', 'Oracle DB', 'Docker', 'Nginx', 'Redis',
  'JWT', 'REST API', 'Linux VPS', 'PM2', 'Java', 'Tailwind',
];

function StackTile({ tile }: { tile: StackTileDef }) {
  return (
    <div className="stack-tile">
      <span className="stack-tile-idx">{tile.idx}</span>
      {tile.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          loading="lazy"
          decoding="async"
          className={tile.invertable ? 'invertable' : ''}
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tile.icon}`}
          alt=""
        />
      ) : (
        <span className="stack-tile-pm2">{tile.text}</span>
      )}
      <span className="stack-tile-name">{tile.name}</span>
    </div>
  );
}

const EMAIL = 'martinvelasquezdev@gmail.com';

function useCountUp(target: number, active: boolean, duration = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const frame = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(frame);
      else setCount(target);
    };
    requestAnimationFrame(frame);
  }, [active, target, duration]);
  return count;
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>('es');
  const [dark, setDark] = useState(false);
  const [openProj, setOpenProj] = useState<Project | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [statsActive, setStatsActive]   = useState(false);
  const [metricActive, setMetricActive] = useState(false);

  const countProjects = useCountUp(8,  statsActive,  1800);
  const countYear     = useCountUp(26, statsActive,  2200);
  const countMetric   = useCountUp(8,  metricActive, 2000);

  function copyEmail(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  useEffect(() => {
    const l = (localStorage.getItem('lang') as Lang) || 'es';
    const d = localStorage.getItem('dark') === '1';
    setLang(l);
    setDark(d);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.body.classList.toggle('dark', dark);
    delete document.documentElement.dataset.theme;
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark, hydrated]);

  // Active nav section on scroll
  useEffect(() => {
    const ids = ['sobre', 'trabajo', 'stack', 'experiencia', 'contacto'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.25 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Count-up trigger hero stats (fire after hydration)
  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => setStatsActive(true), 400);
    return () => clearTimeout(timer);
  }, [hydrated]);

  // Count-up trigger metric block (fire when scrolled into view)
  useEffect(() => {
    const el = document.querySelector('.metric-block');
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMetricActive(true); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    document.querySelectorAll('.hero .reveal').forEach((el) => {
      (el as HTMLElement).style.transition = 'none';
      el.classList.add('in');
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!openProj) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenProj(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openProj]);

  const t = useCallback((k: string) => I18N[lang][k] ?? k, [lang]);
  const bi = useCallback((b: Bilingual) => b[lang], [lang]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="#trabajo"    className={`nav-link ${activeSection === 'trabajo'    ? 'is-active' : ''}`}>{t('nav.work')}</a>
            <a href="#stack"      className={`nav-link ${activeSection === 'stack'      ? 'is-active' : ''}`}>{t('nav.stack')}</a>
            <a href="#experiencia"className={`nav-link ${activeSection === 'experiencia'? 'is-active' : ''}`}>{t('nav.exp')}</a>
            <a href="#contacto"   className={`nav-link ${activeSection === 'contacto'   ? 'is-active' : ''}`}>{t('nav.contact')}</a>
          </div>
          <a href="#" className="nav-brand">MARTIN<span className="dot">.</span>DEV</a>
          <div className="nav-right">
            <span className="status-pill"><span className="status-dot" />{t('nav.available')}</span>
            <div className="nav-switch" role="group" aria-label="Idioma">
              <button
                className={`nav-switch-opt ${lang === 'es' ? 'is-active' : ''}`}
                onClick={() => setLang('es')}
                type="button"
              >ES</button>
              <button
                className={`nav-switch-opt ${lang === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
                type="button"
              >EN</button>
            </div>
            <button
              className="nav-theme"
              type="button"
              aria-label="Cambiar tema"
              title="Cambiar tema"
              onClick={() => setDark((d) => !d)}
            >
              <span className="nav-theme-ico nav-theme-sun" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <circle cx="8" cy="8" r="3" />
                  <path d="M8 1.5v1.6M8 12.9v1.6M14.5 8h-1.6M3.1 8H1.5M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1M12.6 12.6l-1.1-1.1M4.5 4.5L3.4 3.4" />
                </svg>
              </span>
              <span className="nav-theme-ico nav-theme-moon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.2 9.8a5.4 5.4 0 0 1-7-7 .5.5 0 0 0-.7-.6 6.5 6.5 0 1 0 8.3 8.3.5.5 0 0 0-.6-.7Z" />
                </svg>
              </span>
            </button>
            <a href="#contacto" className="nav-cta">{t('nav.cta')}</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="shell">
          <div className="hero-meta reveal">
            <div><span>{t('hero.role')}</span></div>
            <div><span>{t('hero.location')}</span></div>
            <div className="right"><span>{t('hero.year')}</span></div>
          </div>
          <h1 className="hero-title reveal d1">
            <span className="line">FULL</span>
            <span className="line outline">STACK</span>
            <span className="line"><span className="signal">DEV</span><span className="serif-it">.</span></span>
          </h1>
          <div className="hero-foot">
            <p className="hero-blurb reveal d2">{t('hero.blurb')}</p>
            <div className="hero-cta-col reveal d3">
              <a href="#trabajo" className="btn-primary">
                <span>{t('hero.cta1')}</span>
                <span className="arrow">→</span>
              </a>
              <a href="#contacto" className="btn-secondary">
                <span>{t('hero.cta2')}</span>
                <span>↗</span>
              </a>
            </div>
            <div className="hero-stats reveal d4">
              <div className="hero-stat">
                <span>{t('hero.stat1')}</span>
                <span className="v">{String(countProjects).padStart(2, '0')}</span>
              </div>
              <div className="hero-stat">
                <span>{t('hero.stat2')}</span>
                <span className="v"><span className="signal">May</span> {countYear}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((tk, i) => <span key={i}>{tk}</span>)}
        </div>
      </div>

      <section className="section section-foot" id="sobre">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 001</span>
            <span className="ttl">{t('sec.about')}</span>
            <span className="meta">{t('sec.about.meta')}</span>
          </div>
          <div className="about-grid">
            <div className="about-prose">
              <h2 className="reveal">
                {lang === 'es' ? (
                  <>Construyo sistemas que <span className="serif-it">funcionan</span> de verdad.</>
                ) : (
                  <>I build systems that <span className="serif-it">actually</span> work.</>
                )}
              </h2>
              <p className="reveal d1">{t('about.p1')}</p>
              <p className="reveal d2">{t('about.p2')}</p>
              <p className="reveal d3">{t('about.p3')}</p>
            </div>
            <div className="about-side">
              <div className="metric-block reveal d2">
                <div className="label">{t('about.metric.label')}</div>
                <div className="num">{String(countMetric).padStart(2, '0')}<span className="signal">.</span></div>
                <div className="sub">{t('about.metric.sub')}</div>
              </div>
              <div className="spec-table reveal d3">
                <div className="spec-row"><span className="k">{t('spec.spec')}</span><span className="v">Full Stack Development</span></div>
                <div className="spec-row"><span className="k">{t('spec.front')}</span><span className="v">React · Next.js · TypeScript</span></div>
                <div className="spec-row"><span className="k">{t('spec.back')}</span><span className="v">Node.js · NestJS · Java</span></div>
                <div className="spec-row"><span className="k">{t('spec.devops')}</span><span className="v">VPS · Nginx · PM2 · Linux</span></div>
                <div className="spec-row"><span className="k">{t('spec.edu')}</span><span className="v">UCC · 7mo semestre</span></div>
                <div className="spec-row"><span className="k">{t('spec.lang')}</span><span className="v">Español · Inglés</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-foot" id="trabajo">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 002</span>
            <span className="ttl">{t('sec.work')}</span>
            <span className="meta">{t('sec.work.meta')}</span>
          </div>

          <article className="featured-card reveal">
            <div className="featured-preview">
              <div className="featured-preview-grid" />
              <div className="featured-corner"><span className="signal">●</span> {bi(FEATURED.tag)}</div>
              <div className="featured-preview-mock" aria-hidden="true">
                <div className="fpm-bar">
                  <span className="fpm-dot" /><span className="fpm-dot" /><span className="fpm-dot" />
                  <span className="fpm-url">{FEATURED.url}</span>
                </div>
                <div className="fpm-body">
                  {[1, 2, 3].map((i) => (
                    <div className="fpm-row" key={i}>
                      <div className="fpm-thumb" />
                      <div className="fpm-lines">
                        <div className="fpm-line" />
                        <div className={`fpm-line ${i === 3 ? 'signal' : 'short'}`} />
                      </div>
                    </div>
                  ))}
                  <span className="fpm-cta">Reservar →</span>
                </div>
              </div>
            </div>
            <div className="featured-body">
              <div className="featured-tagline"><span className="signal">●</span><span>{bi(FEATURED.status)}</span></div>
              <h3 className="featured-name">{FEATURED.name}</h3>
              <p className="featured-desc">{bi(FEATURED.desc)}</p>
              <div className="featured-meta">
                <div className="fmeta-cell"><span className="k">{t('featured.k1')}</span><span className="v">{bi(FEATURED.type)}</span></div>
                <div className="fmeta-cell"><span className="k">{t('featured.k2')}</span><span className="v">{bi(FEATURED.role)}</span></div>
                <div className="fmeta-cell"><span className="k">{t('featured.k3')}</span><span className="v signal">{bi(FEATURED.state)}</span></div>
              </div>
              <div className="featured-tags">
                {FEATURED.tags.map((tag) => (
                  <TechTag key={tag} tag={tag} />
                ))}
              </div>
              <div className="featured-actions">
                <Link href={`/case/${FEATURED.key}`} className="btn-primary"><span>{t('featured.btn1')}</span><span className="arrow">→</span></Link>
                {FEATURED.liveUrl && (
                  <a href={FEATURED.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary"><span>{t('featured.btn2')}</span><span>↗</span></a>
                )}
              </div>
            </div>
          </article>

          <div className="proj-list reveal">
            <div className="proj-list-head">
              <span />
              <span>{t('list.h1')}</span>
              <span className="stack-col">{t('list.h2')}</span>
              <span className="type-col">{t('list.h3')}</span>
              <span className="year-col">{t('list.h4')}</span>
              <span />
            </div>
            {SECONDARY.map((p) => (
              <a
                href="#"
                key={p.key}
                className="proj-row"
                onClick={(e) => { e.preventDefault(); setOpenProj(p); }}
              >
                <span className="idx">{p.idx}</span>
                <span className="name">{p.name}<small>{bi(p.sub)}</small></span>
                <span className="stack">{p.stack}</span>
                <span className="type">{bi(p.type)}</span>
                <span className="year">{p.year}</span>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>

          <div className="proj-list-foot">
            <span>{t('list.foot.left')}</span>
            <a href="https://github.com/Martinvb07" target="_blank" rel="noreferrer">
              <span>{t('list.foot.right')}</span> ↗
            </a>
          </div>
        </div>
      </section>

      <section className="section section-foot" id="stack">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 003</span>
            <span className="ttl">{t('sec.stack')}</span>
            <span className="meta">{t('sec.stack.meta')}</span>
          </div>
          {[
            { letter: 'A.', key: 'front' as const, name: t('stack.front'), desc: t('stack.front.desc') },
            { letter: 'B.', key: 'back' as const, name: t('stack.back'), desc: t('stack.back.desc') },
            { letter: 'C.', key: 'db' as const, name: t('stack.db'), desc: t('stack.db.desc') },
          ].map((cat) => (
            <div className="stack-cat reveal" key={cat.key}>
              <div className="stack-cat-head">
                <span className="num">{cat.letter}</span>
                <span className="name">{cat.name}</span>
                <span className="desc">{cat.desc}</span>
              </div>
              <div className="stack-grid">
                {STACK_TILES[cat.key].map((tile) => <StackTile tile={tile} key={tile.idx} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-foot" id="experiencia">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 004</span>
            <span className="ttl">{t('sec.exp')}</span>
            <span className="meta">{t('sec.exp.meta')}</span>
          </div>
          <div className="exp-grid">
            <div className="exp-title-col">
              <h2 className="reveal">
                {t('exp.title.l1')}<br />
                {t('exp.title.l2')} <span className="serif-it">{t('exp.title.l2b')}</span><br />
                {t('exp.title.l3')}
              </h2>
            </div>
            <div className="exp-list">
              {[
                { p: '2024 → ', role: t('exp.1.role'), co: t('exp.1.co'), desc: t('exp.1.desc'), live: true, d: '' },
                { p: '2023 — 2024', role: t('exp.2.role'), co: t('exp.2.co'), desc: t('exp.2.desc'), live: false, d: 'd1' },
                { p: '2022 — 2023', role: t('exp.3.role'), co: t('exp.3.co'), desc: t('exp.3.desc'), live: false, d: 'd2' },
              ].map((e, i) => (
                <div className={`exp-item reveal ${e.d}`} key={i}>
                  <div className="exp-period">{e.p}{e.live && <span className="signal">●</span>}</div>
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-co">{e.co}</div>
                    <div className="exp-desc">{e.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="shell">
          <div className="sec-marker reveal" style={{ marginBottom: 56 }}>
            <span className="num">// 005</span>
            <span className="ttl">{t('sec.contact')}</span>
            <span className="meta">{t('sec.contact.meta')}</span>
          </div>
          <h2 className="contact-title reveal">
            <span>{t('contact.t1')}</span><br />
            <span className="outline">{t('contact.t2')}</span><br />
            <span className="signal">{t('contact.t3')}</span>
          </h2>
          <div className="contact-grid">
            <div className="contact-mail reveal d1">
              <div className="contact-mail-label">{t('contact.mail.label')}</div>
              <a href={`mailto:${EMAIL}`} className="contact-mail-link" onClick={copyEmail} title="Click para copiar">{EMAIL}</a>
              <p className="contact-mail-sub">{t('contact.mail.sub')}</p>
            </div>
            <div className="contact-side reveal d2">
              <div className="contact-handles">
                {[
                  { net: 'GitHub', icon: 'github/github-original.svg', invertable: true, h: '@Martinvb07', href: 'https://github.com/Martinvb07' },
                  { net: 'LinkedIn', icon: 'linkedin/linkedin-original.svg', h: '/in/martin-velasquez', href: 'https://www.linkedin.com/in/martin-velasquez-916ab5357/' },
                  { net: 'Twitter', icon: 'twitter/twitter-original.svg', invertable: true, h: '@MartinVBdev', href: 'https://x.com/MartinVBdev' },
                ].map((c) => (
                  <a key={c.net} href={c.href} target="_blank" rel="noreferrer" className="contact-handle" aria-label={c.net}>
                    <span className="net-ico">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        loading="lazy"
                        decoding="async"
                        className={c.invertable ? 'invertable' : ''}
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${c.icon}`}
                        alt={c.net}
                      />
                    </span>
                    <span className="h">{c.h}</span>
                    <span className="arr">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell">
          <div className="footer-inner">
            <div>© 2026 — Martín V.</div>
            <div>Villavicencio · Colombia</div>
            <div><span className="signal">●</span> <span>{t('footer.status')}</span></div>
          </div>
        </div>
      </footer>

      <div className={`proj-modal ${openProj ? 'is-open' : ''}`} aria-hidden={!openProj}>
        <div className="proj-modal-backdrop" onClick={() => setOpenProj(null)} />
        <div className="proj-modal-card" role="dialog" aria-modal="true">
          <button
            className="proj-modal-close"
            type="button"
            onClick={() => setOpenProj(null)}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
          {openProj && (
            <article className="featured-card" style={{ margin: 0, border: 0 }}>
              <div className="featured-preview">
                <div className="featured-preview-grid" />
                <div className="featured-corner"><span className="signal">●</span> {bi(openProj.tag)}</div>
                <div className="featured-preview-mock" aria-hidden="true">
                  <div className="fpm-bar">
                    <span className="fpm-dot" /><span className="fpm-dot" /><span className="fpm-dot" />
                    <span className="fpm-url">{openProj.url}</span>
                  </div>
                  <div className="fpm-body">
                    {[1, 2, 3].map((i) => (
                      <div className="fpm-row" key={i}>
                        <div className="fpm-thumb" />
                        <div className="fpm-lines">
                          <div className="fpm-line" />
                          <div className={`fpm-line ${i === 3 ? 'signal' : 'short'}`} />
                        </div>
                      </div>
                    ))}
                    <span className="fpm-cta">View →</span>
                  </div>
                </div>
              </div>
              <div className="featured-body">
                <div className="featured-tagline"><span className="signal">●</span><span>{bi(openProj.status)}</span></div>
                <h3 className="featured-name">{openProj.name}</h3>
                <p className="featured-desc">{bi(openProj.desc)}</p>
                <div className="featured-meta">
                  <div className="fmeta-cell"><span className="k">{t('featured.k1')}</span><span className="v">{bi(openProj.type)}</span></div>
                  <div className="fmeta-cell"><span className="k">{t('featured.k2')}</span><span className="v">{bi(openProj.role)}</span></div>
                  <div className="fmeta-cell"><span className="k">{t('featured.k3')}</span><span className="v signal">{bi(openProj.state)}</span></div>
                </div>
                <div className="featured-tags">
                  {openProj.tags.map((tag) => <TechTag key={tag} tag={tag} />)}
                </div>
                <div className="featured-actions">
                  <Link href={`/case/${openProj.key}`} className="btn-primary" onClick={() => setOpenProj(null)}><span>{t('featured.btn1')}</span><span className="arrow">→</span></Link>
                  {openProj.liveUrl && (
                    <a href={openProj.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary"><span>{t('featured.btn2')}</span><span>↗</span></a>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className={`toast ${copied ? 'is-visible' : ''}`} role="status" aria-live="polite">
        <span className="signal">●</span>
        <span>{lang === 'es' ? 'Email copiado al portapapeles' : 'Email copied to clipboard'}</span>
      </div>
    </>
  );
}

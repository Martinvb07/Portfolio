'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { I18N, type Lang } from '@/lib/i18n';
import { type Project, type Bilingual } from '@/lib/projects';
import { TECH_ICONS } from '@/lib/tech-icons';
import TechTag from '@/components/TechTag';

export default function CaseStudy({ project }: { project: Project }) {
  const [lang, setLang] = useState<Lang>('es');
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [project.key]);

  const t = useCallback((k: string) => I18N[lang][k] ?? k, [lang]);
  const bi = useCallback((b: Bilingual) => b[lang], [lang]);

  return (
    <div className="case-page">
      <nav className="nav case-nav">
        <div className="nav-inner">
          <div className="nav-left">
            <Link href="/" className="nav-link">← {t('case.back')}</Link>
          </div>
          <Link href="/" className="nav-brand">MARTIN<span className="dot">.</span>DEV</Link>
          <div className="nav-right">
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
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="nav-cta">{t('case.live')}</a>
            )}
          </div>
        </div>
      </nav>

      <section className="case-hero">
        <div className="shell">
          <div className="case-hero-meta reveal">
            <span>{bi(project.tag)}</span>
            <span>{project.year}</span>
            <span><span className="signal">●</span> {bi(project.state)}</span>
          </div>
          <h1 className="case-hero-title reveal d1">{project.name}<span className="serif-it">.</span></h1>
          <p className="case-hero-sub reveal d2">{bi(project.sub)}</p>
          <div className="case-hero-tags reveal d3">
            {project.tags.map((tag) => (
              <TechTag key={tag} tag={tag} />
            ))}
          </div>
          <div className="case-hero-spec reveal d4">
            <div className="spec-row"><span className="k">{t('featured.k1')}</span><span className="v">{bi(project.type)}</span></div>
            <div className="spec-row"><span className="k">{t('featured.k2')}</span><span className="v">{bi(project.role)}</span></div>
            <div className="spec-row"><span className="k">{t('featured.k3')}</span><span className="v signal">{bi(project.state)}</span></div>
            <div className="spec-row"><span className="k">{t('case.spec.stack')}</span><span className="v">{project.stack}</span></div>
          </div>
          {(project.liveUrl || project.repoUrl) && (
            <div className="case-hero-actions reveal d5">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  <span>{t('case.live')}</span>
                  <span>↗</span>
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="case-repo-link" aria-label="Ver repositorio en GitHub">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt=""
                    className="invertable"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{project.repoUrl.replace('https://github.com/', '')}</span>
                  <span className="arr">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 01</span>
            <span className="ttl">{t('case.s1')}</span>
            <span className="meta">{t('case.meta.problem')}</span>
          </div>
          <div className="case-prose reveal">
            <p>{bi(project.case.problem)}</p>
          </div>
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 02</span>
            <span className="ttl">{t('case.s2')}</span>
            <span className="meta">{t('case.meta.approach')}</span>
          </div>
          <div className="case-prose reveal">
            <p>{bi(project.case.approach)}</p>
          </div>
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 03</span>
            <span className="ttl">{t('case.s3')}</span>
            <span className="meta">{project.stack}</span>
          </div>
          <div className="case-stack-row reveal">
            {project.tags.map((tag) => {
              const tech = TECH_ICONS[tag];
              const isWompi = tag === 'Wompi';
              return (
                <div key={tag} className="case-stack-item">
                  {isWompi ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e63319" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                      <circle cx="6" cy="15" r="1.2" fill="#e63319" stroke="none" />
                      <circle cx="10" cy="15" r="1.2" fill="#e63319" stroke="none" />
                    </svg>
                  ) : tech ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      loading="lazy"
                      decoding="async"
                      className={tech.invertable ? 'invertable' : ''}
                      src={tech.src ?? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                      alt=""
                    />
                  ) : null}
                  <span className="case-stack-name">{tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 04</span>
            <span className="ttl">{t('case.s4')}</span>
            <span className="meta">{t('case.meta.highlights')}</span>
          </div>
          <ul className="case-list reveal">
            {project.case.highlights[lang].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 05</span>
            <span className="ttl">{t('case.s5')}</span>
            <span className="meta">{t('case.meta.results')}</span>
          </div>
          <div className="case-stats reveal">
            {project.case.results.map((stat, i) => (
              <div className="case-stat" key={i}>
                <div className="case-stat-value">{stat.value}</div>
                <div className="case-stat-label">{bi(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-foot">
        <div className="shell">
          <div className="sec-marker reveal">
            <span className="num">// 06</span>
            <span className="ttl">{t('case.s6')}</span>
            <span className="meta">{t('case.meta.lessons')}</span>
          </div>
          <div className="case-prose reveal">
            <p>{bi(project.case.lessons)}</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <div className="shell">
          <h2 className="case-cta-title reveal">
            {lang === 'es' ? (
              <>¿Quieres construir <span className="serif-it">algo así?</span></>
            ) : (
              <>Want to build <span className="serif-it">something like this?</span></>
            )}
          </h2>
          <div className="case-cta-actions reveal d1">
            <Link href="/#trabajo" className="btn-primary">
              <span>{t('case.cta.next')}</span>
              <span className="arrow">→</span>
            </Link>
            <Link href="/#contacto" className="btn-secondary">
              <span>{t('case.cta.contact')}</span>
              <span>↗</span>
            </Link>
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
    </div>
  );
}

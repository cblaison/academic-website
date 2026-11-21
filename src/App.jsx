import { useEffect, useState } from 'react'
import {
  profile,
  research,
  publications,
  grants,
  teaching,
  service,
} from './data.js'

const nav = [
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'grants', label: 'Grants' },
  { id: 'contact', label: 'Contact' },
]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useReveal()

  useEffect(() => {
    const root = document.documentElement
    const onMove = (e) => {
      root.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`)
      root.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="scan" aria-hidden="true" />

      <header className="topbar">
        <button type="button" className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          CB
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Primary">
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => go(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <p className="eyebrow mono" data-reveal>
            {profile.lab} · {profile.university}
          </p>
          <h1 className="hero-name" data-reveal>
            {profile.name}
          </h1>
          <p className="hero-role" data-reveal>
            {profile.role} · {profile.field}
          </p>
          <p className="hero-tagline" data-reveal>
            {profile.tagline}
          </p>
          <div className="hero-actions" data-reveal>
            <button type="button" className="btn primary" onClick={() => go('research')}>
              Explore research
            </button>
            <button type="button" className="btn ghost" onClick={() => go('contact')}>
              Contact
            </button>
          </div>
        </section>

        <section className="section" id="research">
          <div className="section-head" data-reveal>
            <span className="mono index">01</span>
            <h2>Research</h2>
          </div>
          <p className="lead" data-reveal>
            {research.thesis}
          </p>
          <div className="pillar-row">
            {research.pillars.map((p) => (
              <article key={p.title} className="pillar" data-reveal>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="publications">
          <div className="section-head" data-reveal>
            <span className="mono index">02</span>
            <h2>Selected publications</h2>
          </div>
          <ul className="pub-list">
            {publications.map((pub) => (
              <li key={`${pub.year}-${pub.title}`} data-reveal>
                <span className="mono year">{pub.year}</span>
                <div>
                  <p className="pub-authors">{pub.authors}</p>
                  <p className="pub-title">
                    {pub.doi ? (
                      <a href={pub.doi} target="_blank" rel="noreferrer">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </p>
                  <p className="pub-venue">{pub.venue}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section split" id="teaching">
          <div>
            <div className="section-head" data-reveal>
              <span className="mono index">03</span>
              <h2>Teaching</h2>
            </div>
            <p className="lead" data-reveal>
              {teaching.summary}
            </p>
            <ul className="plain-list" data-reveal>
              {teaching.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="course-panel" data-reveal>
            <h3 className="mono">Courses</h3>
            <ul>
              {teaching.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="grants">
          <div className="section-head" data-reveal>
            <span className="mono index">04</span>
            <h2>Grants & roles</h2>
          </div>
          <div className="grant-list">
            {grants.map((g) => (
              <article key={g.name} className="grant" data-reveal>
                <div className="grant-meta">
                  <span className="mono">{g.years}</span>
                  <span className="amount">{g.amount}</span>
                </div>
                <h3>{g.name}</h3>
                <p>{g.detail}</p>
              </article>
            ))}
          </div>
          <ul className="plain-list service" data-reveal>
            {service.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="section contact" id="contact">
          <div className="section-head" data-reveal>
            <span className="mono index">05</span>
            <h2>Contact</h2>
          </div>
          <div className="contact-grid" data-reveal>
            <div>
              <p className="contact-name">{profile.name}</p>
              <p>
                {profile.role}
                <br />
                {profile.lab}
                <br />
                {profile.university}
              </p>
              <p>
                {profile.office}
                <br />
                {profile.address}
              </p>
            </div>
            <div className="contact-links">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <p className="mono phone">{profile.phone}</p>
              <div className="link-row">
                {profile.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer mono">
        <span>Christophe Blaison · Université Paris Cité / LPS</span>
        <span>Academic site · 2026</span>
      </footer>
    </div>
  )
}

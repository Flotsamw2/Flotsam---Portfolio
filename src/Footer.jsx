// Footer.jsx — brand signature + navigation + legal.

function Footer({ onJumpTo }) {
  return (
    <footer style={{
      padding: '80px 64px 40px',
      background: '#151720',
      borderTop: '1px solid rgba(254,254,254,0.06)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Giant wordmark */}
        <div style={{
          paddingBottom: 40, borderBottom: '1px solid rgba(254,254,254,0.06)',
        }}>
          <p style={{
            margin: 0, fontFamily: 'Satoshi, sans-serif',
            fontWeight: 900, fontSize: 'clamp(48px, 16vw, 220px)',
            letterSpacing: '-0.04em', lineHeight: 0.88, color: '#FEFEFE',
          }}>
            Flotsam<span style={{ color: '#772CE8' }}>.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="footer__grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48, padding: '48px 0',
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6E717D', marginBottom: 16 }}>Studio</div>
            <p style={{
              margin: 0, maxWidth: '36ch', fontSize: 14, lineHeight: 1.65, color: '#C7C8CE',
            }}>
              Montage long & court format pour créateurs, marques et artistes.
              Basé à Paris, disponible à distance. Studio indépendant — fondé en 2023.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6E717D', marginBottom: 16 }}>Navigation</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[{id:'projects', l:'Projets'}, {id:'faq', l:'FAQ'}, {id:'contact', l:'Contact'}].map(i => (
                <a key={i.id} onClick={() => onJumpTo && onJumpTo(i.id)} style={{
                  color: '#FEFEFE', textDecoration: 'none', fontSize: 14, fontWeight: 500,
                  cursor: 'pointer',
                }}>{i.l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6E717D', marginBottom: 16 }}>Direct</div>
            <div style={{ display: 'grid', gap: 12 }}>
              <a href="mailto:contact@flotsam-production.com" style={{ color: '#FEFEFE', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>contact@flotsam-production.com</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6E717D', marginBottom: 16 }}>Mes réseaux</div>
            <a
              href="https://www.instagram.com/flotsam.prod/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#FEFEFE', textDecoration: 'none',
                transition: 'color 280ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#772CE8'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#FEFEFE'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 32, borderTop: '1px solid rgba(254,254,254,0.06)',
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#6E717D', flexWrap: 'wrap', gap: 24,
        }}>
          <span>© 2026 Flotsam Production. Tous droits réservés.</span>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Mentions légales', href: './mentions-legales.html' },
              { label: 'Confidentialité',  href: 'confidentialite.html' },
              { label: 'CGV',              href: './cgv.html' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  color: 'inherit', textDecoration: 'none',
                  transition: 'color 240ms cubic-bezier(0.65,0,0.35,1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#772CE8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'inherit'; }}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });

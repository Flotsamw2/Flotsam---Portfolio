// Nav.jsx — sticky nav. Shrinks (height + blur) as scrollY increases.
// Desktop vs mobile (burger) selection is CSS-driven for robustness — see index.html.

function Nav({ onJumpTo, onBookCall }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const items = [
    { id: 'temoignages', label: 'Témoignages' },
    { id: 'projects',    label: 'Projets' },
    { id: 'creations',   label: 'Créations' },
    { id: 'faq',         label: 'FAQ' },
    { id: 'contact',     label: 'Contact' },
  ];

  const jumpTo = (id) => { setMenuOpen(false); onJumpTo(id); };

  return (
    <React.Fragment>
      <header className="fp-nav" data-open={menuOpen ? 'true' : 'false'} style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 220,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: scrolled ? '14px 48px' : '28px 64px',
        background: menuOpen ? '#1A1C22'
                 : scrolled ? 'rgba(26,28,34,0.72)'
                 : 'rgba(39,41,50,0.0)',
        backdropFilter: (scrolled && !menuOpen) ? 'blur(18px) saturate(140%)' : 'blur(0px)',
        WebkitBackdropFilter: (scrolled && !menuOpen) ? 'blur(18px) saturate(140%)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(254,254,254,0.06)' : '1px solid transparent',
        transition: 'padding 420ms cubic-bezier(0.65,0,0.35,1), background 240ms ease, border-color 420ms',
      }}>
        {/* Logo */}
        <a onClick={() => jumpTo('hero')} style={{ cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <img
            className="fp-nav-logo"
            src="uploads/logo%202025.png"
            alt="Flotsam Production — logo"
            width="64"
            height="64"
            style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center', borderRadius: '60%', overflow: 'hidden' }}
          />
          <span className="fp-nav-tagline" style={{
            fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#9A9CA5',
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateX(-6px)' : 'translateX(0)',
            transition: 'opacity 320ms, transform 320ms',
          }}>Production — Paris</span>
        </a>

        {/* Desktop nav — hidden via CSS on mobile */}
        <nav className="fp-nav-desktop" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {items.map(it => (
            <EditorialLink key={it.id} onClick={() => jumpTo(it.id)}>{it.label}</EditorialLink>
          ))}
          <TracedButton href="https://calendly.com/flotsam-prod/30min" target="_blank" size={scrolled ? 'sm' : 'md'} variant="primary" icon="→">
            Réserver un appel
          </TracedButton>
        </nav>

        {/* Mobile burger — hidden via CSS on desktop */}
        <button
          className="fp-nav-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          style={{
            position: 'relative',
            width: 44, height: 44, padding: 0,
            background: 'transparent',
            border: '1px solid rgba(254,254,254,0.22)',
            borderRadius: 2, cursor: 'pointer',
            display: 'none', placeItems: 'center',
          }}
        >
          <span style={{ position: 'relative', width: 22, height: 16, display: 'inline-block' }}>
            <span style={{
              position: 'absolute', left: 0, right: 0, top: menuOpen ? 7 : 0, height: 2,
              background: '#FEFEFE',
              transform: menuOpen ? 'rotate(45deg)' : 'rotate(0)',
              transition: 'transform 280ms cubic-bezier(0.65,0,0.35,1), top 280ms',
            }}/>
            <span style={{
              position: 'absolute', left: 0, right: 0, top: 7, height: 2,
              background: '#FEFEFE', opacity: menuOpen ? 0 : 1,
              transition: 'opacity 200ms',
            }}/>
            <span style={{
              position: 'absolute', left: 0, right: 0, top: menuOpen ? 7 : 14, height: 2,
              background: '#FEFEFE',
              transform: menuOpen ? 'rotate(-45deg)' : 'rotate(0)',
              transition: 'transform 280ms cubic-bezier(0.65,0,0.35,1), top 280ms',
            }}/>
          </span>
        </button>
      </header>

      {/* Mobile overlay — rendered outside the header (sibling). CSS hides it on desktop. */}
      <div className="fp-nav-overlay" data-open={menuOpen ? 'true' : 'false'} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw', height: '100dvh',
        zIndex: 210,
        background: '#1A1C22',
        display: 'none', flexDirection: 'column',
        alignItems: 'stretch', justifyContent: 'flex-start',
        padding: '88px 24px 32px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 240ms cubic-bezier(0.65,0,0.35,1)',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((it, i) => (
            <a
              key={it.id}
              onClick={() => jumpTo(it.id)}
              style={{
                fontFamily: 'Satoshi, sans-serif', fontWeight: 700,
                fontSize: 26, letterSpacing: '-0.015em', color: '#FEFEFE',
                textDecoration: 'none', cursor: 'pointer',
                padding: '18px 0',
                borderBottom: '1px solid rgba(254,254,254,0.06)',
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 280ms ${80 + i * 50}ms cubic-bezier(0.65,0,0.35,1), transform 280ms ${80 + i * 50}ms cubic-bezier(0.65,0,0.35,1)`,
              }}
            >{it.label}</a>
          ))}
        </div>
        <div style={{
          marginTop: 32,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 280ms ${80 + items.length * 50}ms cubic-bezier(0.65,0,0.35,1), transform 280ms ${80 + items.length * 50}ms cubic-bezier(0.65,0,0.35,1)`,
        }}>
          <TracedButton
            href="https://calendly.com/flotsam-prod/30min"
            target="_blank"
            size="lg"
            variant="primary"
            icon="→"
            fullWidth
          >
            Réserver un appel
          </TracedButton>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Nav });

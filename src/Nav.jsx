// Nav.jsx — sticky nav. Shrinks (height + blur) as scrollY increases.

function Nav({ onJumpTo, onBookCall }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'temoignages', label: 'Témoignages' },
    { id: 'projects',    label: 'Projets' },
    { id: 'creations',   label: 'Créations' },
    { id: 'faq',         label: 'FAQ' },
    { id: 'contact',     label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: scrolled ? '14px 48px' : '28px 64px',
      background: scrolled ? 'rgba(26,28,34,0.72)' : 'rgba(39,41,50,0.0)',
      backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'blur(0px)',
      WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'blur(0px)',
      borderBottom: scrolled ? '1px solid rgba(254,254,254,0.06)' : '1px solid transparent',
      transition: 'padding 420ms cubic-bezier(0.65,0,0.35,1), background 420ms cubic-bezier(0.65,0,0.35,1), border-color 420ms',
    }}>
      {/* Logo */}
      <a onClick={() => onJumpTo('hero')} style={{ cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <img
          src="uploads/logo%202025.png"
          alt="Flotsam Production — logo"
          width="64"
          height="64"
          style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center', borderRadius: '60%', overflow: 'hidden' }}
        />
        <span style={{
          fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#9A9CA5',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateX(-6px)' : 'translateX(0)',
          transition: 'opacity 320ms, transform 320ms',
        }}>Production — Paris</span>
      </a>

      {/* Links + CTA */}
      <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {items.map(it => (
          <EditorialLink key={it.id} onClick={() => onJumpTo(it.id)}>{it.label}</EditorialLink>
        ))}
        <TracedButton href="https://calendly.com/flotsam-prod/30min" target="_blank" size={scrolled ? 'sm' : 'md'} variant="primary" icon="→">
          Réserver un appel
        </TracedButton>
      </nav>
    </header>
  );
}

Object.assign(window, { Nav });

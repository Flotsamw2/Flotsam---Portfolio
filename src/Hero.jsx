// Hero.jsx — full-screen hero. Display-XXL tagline, sub, "Disponible" badge,
// background video placeholder with dark overlay, scroll indicator.

function Hero({ onBookCall, onJumpTo }) {
  const heroRef = React.useRef(null);
  const [parallax, setParallax] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setParallax(Math.min(y * 0.25, 220));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      data-screen-label="01 Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '180px 64px 64px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(254,254,254,0.06)',
      }}
    >
      {/* Base anthracite canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #1A1C22 0%, #272932 50%, #1A1C22 100%)',
      }}/>
      {/* Animated flowing waves — subtle anthracite ↔ violet */}
      <WaveBackground />
      {/* Scanline/grain feel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgba(254,254,254,0.012) 2px, rgba(254,254,254,0.012) 3px)',
        pointerEvents: 'none',
      }}/>
      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(26,28,34,0.15) 0%, rgba(26,28,34,0.55) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1440, margin: '0 auto',
      }}>
        <Reveal delay={160}>
          <h1 style={{
            margin: 0,
            fontFamily: 'Satoshi, sans-serif', fontWeight: 900,
            fontSize: 'clamp(72px, 11.5vw, 168px)',
            letterSpacing: '-0.035em', lineHeight: 0.9,
            maxWidth: '14ch',
            transform: `translateY(${-parallax * 0.3}px)`,
            willChange: 'transform',
          }}>
            Flotsam<br/><span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>Production.</span>
          </h1>
        </Reveal>

        <Reveal delay={360}>
          <p style={{
            margin: '48px 0 0 0',
            maxWidth: '58ch',
            fontSize: 20, fontWeight: 400, lineHeight: 1.5, color: '#C7C8CE',
          }}>
            Je monte les vidéos des créateurs qui ont l'audience et l'ambition
            de passer au niveau supérieur.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div style={{ marginTop: 64, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <TracedButton href="https://calendly.com/flotsam-prod/30min" target="_blank" variant="primary" size="lg" icon="→">
              Réserver un appel
            </TracedButton>
            <TracedButton onClick={() => onJumpTo('projects')} variant="ghost" size="lg" icon="↓">
              Voir les projets
            </TracedButton>
          </div>
        </Reveal>
      </div>

      {/* Bottom meta strip — scroll indicator + stats */}
      <div style={{
        position: 'absolute', left: 64, right: 64, bottom: 40, zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48,
      }}>
        <Reveal delay={700}>
          <div style={{
            display: 'inline-flex', flexDirection: 'column', gap: 10,
            color: '#9A9CA5', fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', fontWeight: 500,
          }}>
            <span>Scroll</span>
            <span style={{
              display: 'inline-block', width: 1, height: 44,
              background: 'linear-gradient(180deg, #FEFEFE 0%, transparent 100%)',
              animation: 'fpScrollHint 2s cubic-bezier(0.65,0,0.35,1) infinite',
            }}/>
          </div>
        </Reveal>

        <Reveal delay={800}>
          <div style={{
            display: 'flex', gap: 56, alignItems: 'flex-end',
          }}>
            <div>
              <div style={{
                fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                marginBottom: 8,
              }}>Projets livrés</div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
                <Counter value={110} prefix="+" />
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                marginBottom: 8,
              }}>Vues générées</div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
                <Counter value={2.5} prefix="+" decimals={1} suffix="M" />
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                marginBottom: 8,
              }}>Clients</div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
                <Counter value={20} prefix="+" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });

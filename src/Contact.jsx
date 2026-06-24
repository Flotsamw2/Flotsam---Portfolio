// Contact.jsx — Minimal CTA. Huge headline + short subtitle + Calendly inline widget.

const CALENDLY_URL = 'https://calendly.com/flotsam-prod/30min';

function Contact() {
  // Load the Calendly script once on mount.
  React.useEffect(() => {
    const id = 'calendly-widget-script';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="contact" data-screen-label="05 Contact" style={{
      padding: '160px 64px',
      background: '#1A1C22',
      borderTop: '1px solid rgba(254,254,254,0.06)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>
        <Reveal delay={120}>
          <h2 style={{
            margin: 0, fontFamily: 'Satoshi, sans-serif',
            fontWeight: 900, fontSize: 'clamp(44px, 11vw, 128px)',
            letterSpacing: '-0.035em', lineHeight: 0.9, maxWidth: '14ch',
            textAlign: 'center',
          }}>
            Parlons de ton<br/>
            <span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>projet.</span>
          </h2>
        </Reveal>

        <Reveal delay={260}>
          <p style={{
            margin: '40px 0 0', maxWidth: '52ch',
            fontSize: 18, lineHeight: 1.6, color: '#C7C8CE',
          }}>
            Prends rendez-vous avec moi pour découvrir comment mes services peuvent
            rendre ton contenu plus impactant.
          </p>
        </Reveal>

        {/* Calendly inline widget */}
        <Reveal delay={420}>
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=1a1c22&text_color=fefefe&primary_color=772ce8`}
            style={{
              marginTop: 72, width: 'min(960px, 100%)',
              height: 720,
              border: '1px solid rgba(254,254,254,0.08)',
              background: '#1A1C22',
            }}
          />
        </Reveal>

        <Reveal delay={560}>
          <div style={{
            marginTop: 48, display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'Satoshi, sans-serif', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
          }}>
            <span>C'est gratuit.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });

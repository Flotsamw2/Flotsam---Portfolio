// SocialProof.jsx — "Ils m'ont fait confiance"
// 4-col grid desktop, 2-col mobile, 8 client cards.
// Hover: elevation + violet border accent.

const CLIENTS = [
  { name: 'Nassim Sahili',  handle: '@NassimSahili',    subs: '1.18M', stat: '+75k vues',   quote: 'Montage du contenu court organique et ads pour le lancement de FITMASS BUILDER', avatar: 'assets/nassimlogo.jpg' },
  { name: 'Popcorn',        handle: '@popcornofficiel', subs: '770k',  stat: '+10 projets', quote: "C'est parfait 🙌", avatar: 'assets/popc.jpg' },
  { name: 'Bonne Pitance',  handle: '@bonnepitance',    subs: '312k',  stat: '1 projet',    quote: "J'apprécie particulièrement le dévouement que tu as mis dans ce projet !", avatar: 'assets/bpyt.jpg' },
  { name: 'Agencilab',      handle: '@louisesquier',    subs: '273k',  stat: '8 projets',   quote: 'Montage de la formation MEDIA BUYING', avatar: 'assets/agencib.jpg' },
  { name: 'Théo Fernandez', handle: '@AnyoneFrance',    subs: '71.5k', stat: '+1.7M vues',  quote: 'Une vraie écriture visuelle. Mes meilleurs épisodes.', avatar: 'assets/theof.jpg' },
  { name: 'Luz World',      handle: '@luzworlde',       subs: '55.6k', stat: '+217k vues',  quote: 'Montage et création de la stratégie de contenu', avatar: 'assets/gdg.jpg' },
  { name: 'Jungo',          handle: '@im_Jungo',        subs: '48k',   stat: '2 projets',   quote: "Yo ! Putain c'est incroyable ahaha ! J'adore ton style bro !", avatar: 'assets/jungo.jpg' },
  { name: 'Ouatdefok',      handle: '@Ouatdefok',       subs: '13.4k', stat: '14 projets',  quote: "J'apprécie le professionnalisme avec lequel tu m'as démarché ainsi que le rendu et la façon dont tu m'as proposé le TOUT !", avatar: 'assets/ouat.png' },
];

function ClientCard({ c, index }) {
  const [hover, setHover] = React.useState(false);
  // Deterministic monogram gradient per name
  const hue = (c.name.charCodeAt(0) + c.name.charCodeAt(1) * 3) % 40;
  const monoGrad = `linear-gradient(135deg, hsl(${260 + hue} 60% 35%) 0%, hsl(${240 + hue} 40% 18%) 100%)`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: hover ? '#2D2F38' : '#1F212A',
        padding: '28px 24px 24px',
        borderTop: `1px solid ${hover ? '#772CE8' : 'rgba(254,254,254,0.08)'}`,
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 420ms cubic-bezier(0.65,0,0.35,1), background 280ms, border-color 280ms',
        cursor: 'default', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%', minHeight: 340, boxSizing: 'border-box',
      }}
    >
      {/* Violet corner tick on hover (editorial "mark") */}
      <span style={{
        position: 'absolute', right: 0, top: 0, width: 24, height: 1,
        background: '#772CE8',
        transform: hover ? 'translateX(0)' : 'translateX(24px)',
        transition: 'transform 320ms cubic-bezier(0.65,0,0.35,1)',
      }}/>
      <span style={{
        position: 'absolute', right: 0, top: 0, width: 1, height: 24,
        background: '#772CE8',
        transform: hover ? 'translateY(0)' : 'translateY(-24px)',
        transition: 'transform 320ms cubic-bezier(0.65,0,0.35,1) 120ms',
      }}/>

      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%',
          background: c.avatar ? 'transparent' : monoGrad,
          display: 'grid', placeItems: 'center',
          fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 14,
          color: '#FEFEFE', letterSpacing: '0.04em',
          border: '1px solid rgba(254,254,254,0.08)',
          overflow: 'hidden',
        }}>
          {c.avatar
            ? <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            : c.name.split(' ').map(w => w[0]).slice(0,2).join('')}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 14,
            letterSpacing: '-0.01em', color: '#FEFEFE',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{c.name}</div>
          <div style={{
            fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9A9CA5',
            marginTop: 3,
          }}>{c.handle} · {c.subs}</div>
        </div>
      </div>

      {/* Quote */}
      <p style={{
        margin: 0, fontSize: 14, lineHeight: 1.5, color: '#C7C8CE',
        minHeight: '3em',
      }}>
        « {c.quote} »
      </p>

      {/* Stat chip */}
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: '1px solid rgba(254,254,254,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{
          fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: 22,
          letterSpacing: '-0.02em', color: hover ? '#FEFEFE' : '#C7C8CE',
          transition: 'color 280ms',
        }}>{c.stat}</span>
        <span style={{
          fontFamily: 'Satoshi, sans-serif', fontSize: 9, fontWeight: 500,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: hover ? '#772CE8' : '#6E717D',
          transition: 'color 280ms',
        }}>{String(index + 1).padStart(2, '0')} / 08</span>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section data-screen-label="02 Ils m'ont fait confiance" id="temoignages" style={{
      padding: '160px 64px',
      background: '#1A1C22',
      borderBottom: '1px solid rgba(254,254,254,0.06)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 64, margin: '0 0 80px', flexWrap: 'wrap',
        }}>
          <Reveal delay={120}>
            <h2 style={{
              margin: 0, fontFamily: 'Satoshi, sans-serif',
              fontWeight: 900, fontSize: 'clamp(56px, 8vw, 112px)',
              letterSpacing: '-0.03em', lineHeight: 0.92, maxWidth: '14ch',
            }}>
              Ils m'ont fait<br/><span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>confiance.</span>
            </h2>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="fp-client-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 0,
          borderLeft: '1px solid rgba(254,254,254,0.06)',
        }}>
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i, 4) * 90} threshold={0.05}>
              <div style={{
                borderRight: '1px solid rgba(254,254,254,0.06)',
                borderBottom: '1px solid rgba(254,254,254,0.06)',
                height: '100%',
              }}>
                <ClientCard c={c} index={i} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SocialProof });

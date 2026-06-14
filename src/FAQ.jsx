// FAQ.jsx — Light-background section. Display title left, accordion right.

const FAQ_ITEMS = [
  {
    q: 'Ça coûte combien ?',
    a: `Ça dépend du projet, d'où l'intérêt d'en discuter afin de te proposer la meilleure solution. Si tu ne veux pas prendre le temps d'en discuter, je ne pourrai pas t'aider.`,
  },
  {
    q: 'Comment se déroule une prestation avec toi ?',
    a: `1. Un projet = un appel. On discute de ce que tu souhaites, des modalités et de la deadline.
2. Une fois le brief défini, tu m'envoies tes rushes via SwissTransfer (Pas d'inscription, pas de frais et c'est mieux que WeTransfer).
3. Une fois tes rushes réceptionnés, je lance la production et je t'informe de chaque avancée majeure.
4. Une fois le rendu terminé, je te le livre sur une plateforme dédiée pour faire tes retours jusqu'à satisfaction totale.
5. 48h après la publication, on debrief pour mesurer toutes les stats afin de faire toujours mieux !

On peut communiquer via Instagram, Whatsapp ou Discord.`,
  },
  {
    q: 'Combien de temps pour livrer un projet ?',
    a: `Là encore tout dépend du projet mais globalement pour un format court (30-90 secondes) compte 48h et pour du format long (5-20 minutes) compte 5 à 7 jours ouvrés.`,
  },
  {
    q: 'Et si ça ne me plaît pas ?',
    a: `Comme dit précédemment, mon objectif c'est ta satisfaction totale, pour ça, tu as droit à un nombre de retouches illimitées, dans la limite de ce qui a été convenu dans le brief initial.`,
  },
  {
    q: 'Pourquoi bosser avec toi ?',
    a: `J'ai travaillé avec des petits créateurs comme avec des influenceurs à plusieurs centaines de milliers d'abonnés. J'ai donc une connaissance des enjeux auxquels tu fais face basé sur la taille de ta chaîne/audience et donc des solutions à mettre en place pour que tu atteignes tes objectifs et développe ta notoriété. Pour faire simple, je ne suis pas un simple monteur vidéo mais un partenaire de croissance à tes côtés.`,
  },
];

function FaqItem({ item, index, open, onToggle }) {
  const contentRef = React.useRef(null);
  const [maxH, setMaxH] = React.useState(0);
  React.useEffect(() => {
    if (open && contentRef.current) {
      setMaxH(contentRef.current.scrollHeight);
    } else {
      setMaxH(0);
    }
  }, [open]);

  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderTop: '1px solid rgba(39,41,50,0.15)',
        borderBottom: index === FAQ_ITEMS.length - 1 ? '1px solid rgba(39,41,50,0.15)' : 'none',
      }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24,
          padding: '32px 0', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
          fontFamily: 'Satoshi, sans-serif',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#6E717D',
            fontVariantNumeric: 'tabular-nums',
          }}>{String(index + 1).padStart(2,'0')}</span>
          <span style={{
            fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700,
            letterSpacing: '-0.02em', color: '#272932',
            transform: hover ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform 320ms cubic-bezier(0.65,0,0.35,1)',
            display: 'inline-block',
          }}>{item.q}</span>
        </span>
        <span style={{
          position: 'relative', width: 24, height: 24, flexShrink: 0,
        }}>
          <span style={{
            position: 'absolute', left: 0, top: '50%', width: 24, height: 1,
            background: open ? '#772CE8' : '#272932',
            transition: 'background 280ms',
          }}/>
          <span style={{
            position: 'absolute', left: '50%', top: 0, width: 1, height: 24,
            background: open ? '#772CE8' : '#272932',
            transform: open ? 'translateX(-50%) scaleY(0)' : 'translateX(-50%) scaleY(1)',
            transition: 'transform 320ms cubic-bezier(0.65,0,0.35,1), background 280ms',
            transformOrigin: 'center',
          }}/>
        </span>
      </button>
      <div style={{
        maxHeight: maxH, overflow: 'hidden',
        transition: 'max-height 520ms cubic-bezier(0.65,0,0.35,1)',
      }}>
        <div ref={contentRef} style={{
          paddingBottom: 40, paddingLeft: 54, paddingRight: 48,
          fontSize: 16, lineHeight: 1.65, color: '#4A4D58', maxWidth: '62ch',
          whiteSpace: 'pre-line',
        }}>
          {item.a}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);

  return (
    <section id="faq" data-screen-label="04 FAQ" style={{
      padding: '160px 64px',
      background: '#FEFEFE',
      color: '#272932',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.3fr',
          gap: 96, alignItems: 'start',
        }}>
          {/* Left — display title */}
          <div style={{ position: 'sticky', top: 120 }}>
            <Reveal delay={120}>
              <h2 style={{
                margin: 0, fontFamily: 'Satoshi, sans-serif',
                fontWeight: 900, fontSize: 'clamp(56px, 7vw, 104px)',
                letterSpacing: '-0.03em', lineHeight: 0.92, maxWidth: '10ch',
                color: '#272932',
              }}>
                Les questions<br/><span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>fréquentes.</span>
              </h2>
            </Reveal>
            <Reveal delay={260}>
              <p style={{
                margin: '32px 0 0 0', maxWidth: '34ch',
                fontSize: 16, lineHeight: 1.6, color: '#4A4D58',
              }}>
                Tout ce qu'on me demande avant de signer. Si une question manque,
                <a href="#contact" style={{ color: '#772CE8', textDecoration: 'none', fontWeight: 500 }}> écrivez-moi directement</a>.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['Tarifs', 'Process', 'Délais', 'Révisions', 'Pourquoi moi'].map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setOpenIdx(i)}
                    style={{
                      background: openIdx === i ? '#272932' : 'transparent',
                      color: openIdx === i ? '#FEFEFE' : '#272932',
                      border: '1px solid #272932',
                      padding: '8px 14px', borderRadius: 999,
                      fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 280ms cubic-bezier(0.65,0,0.35,1)',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — accordion */}
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 60} threshold={0.1}>
                <FaqItem
                  item={item}
                  index={i}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FAQ });

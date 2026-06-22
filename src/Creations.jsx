// Creations.jsx — "Mes créations"
// Showcase grid : 3 horizontales (16:9) embed YouTube.
// Brandbook : anthracite + violet, Satoshi, reveal au scroll, zero bounce.

// YoutubeEmbed — lazy facade (thumbnail i.ytimg, iframe loaded on click only).
// NOTE: duplicated from Projects.jsx because JSX files are loaded via separate
// <script> tags without ES module sharing. Keep both in sync if edited.
function YoutubeEmbed({ url, ratio, title }) {
  const [active, setActive] = React.useState(false);
  const paddingBottom = ratio === '9/16' ? '177.77%' : '56.25%';
  const videoId  = url.match(/embed\/([^?]+)/)?.[1] ?? '';
  const thumb    = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      style={{
        position: 'relative', paddingBottom, height: 0,
        overflow: 'hidden', cursor: 'pointer', background: '#1A1C22',
      }}
      onClick={() => setActive(true)}
    >
      {active ? (
        <iframe
          src={`${url}&autoplay=1`}
          width="100%" height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      ) : (
        <>
          <img
            src={thumb}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
            alt={title}
            loading="lazy"
            width="1280" height="720"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'grid', placeItems: 'center',
            background: 'rgba(26,28,34,0.35)',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              border: '1px solid rgba(254,254,254,0.5)',
              background: 'rgba(39,41,50,0.6)',
              display: 'grid', placeItems: 'center',
            }}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="#FEFEFE" aria-hidden="true">
                <path d="M0 0 L18 10 L0 20 Z"/>
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const CREATIONS_HORIZONTAL = [
  {
    id: 'h1',
    seed: 2,
    technique: 'Storytelling',
    title: 'Présentation de service',
    description: `Présentation du système de progression par gamification "POLARIS" inclut dans l'accompagnement vidéopreneur du VKStudio.`,
    youtubeUrl: 'https://www.youtube.com/embed/dojx32pJhEg?rel=0&modestbranding=1&color=white',
  },
  {
    id: 'h2',
    seed: 3,
    technique: 'B-roll cutting',
    title: 'Motion Design',
    description: "Illustration par le motion design de l'essor de Google de sa création à nos jours.",
    youtubeUrl: 'https://www.youtube.com/embed/wO-oqqznKmE?rel=0&modestbranding=1&color=white',
  },
  {
    id: 'h3',
    seed: 0,
    technique: 'Color grading',
    title: 'Vidéo documentaire / à thème',
    description: "Vidéo illustrative d'un propos de Yomi Denzel sur les risques et addictions liés à Instagram et comment s'en défaire.",
    youtubeUrl: 'https://www.youtube.com/embed/8I0VAkRG1y4?rel=0&modestbranding=1&color=white',
  },
];

function CreationCard({ item, ratio, label, height, maxHeight }) {
  // For 9:16 with a height cap, derive a maxWidth so the frame
  // never exceeds the requested height.
  const isVertical = ratio === '9/16';
  const videoMaxWidth = isVertical && maxHeight
    ? `${(maxHeight * 9) / 16}px`
    : undefined;

  return (
    <div>
      {item.youtubeUrl ? (
        <YoutubeEmbed url={item.youtubeUrl} ratio="16/9" title={item.title} />
      ) : (
        <div style={{ maxWidth: videoMaxWidth }}>
          <VideoFrame ratio={ratio} label={label} seed={item.seed} height={height} src={item.src} />
        </div>
      )}

      <h3 style={{
        margin: '24px 0 10px',
        fontFamily: 'Satoshi, sans-serif', fontWeight: 700,
        fontSize: 22, letterSpacing: '-0.015em', lineHeight: 1.15,
        color: '#FEFEFE',
      }}>{item.title}</h3>

      <p style={{
        margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#9A9CA5',
        maxWidth: '34ch',
      }}>{item.description}</p>
    </div>
  );
}

function Creations() {
  return (
    <section id="creations" data-screen-label="04 Mes créations" style={{
      padding: '160px 64px',
      background: '#1A1C22',
      borderTop: '1px solid rgba(254,254,254,0.06)',
      borderBottom: '1px solid rgba(254,254,254,0.06)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 64, margin: '0 0 96px', flexWrap: 'wrap',
        }}>
          <Reveal delay={120}>
            <h2 style={{
              margin: 0, fontFamily: 'Satoshi, sans-serif',
              fontWeight: 900, fontSize: 'clamp(56px, 8vw, 112px)',
              letterSpacing: '-0.03em', lineHeight: 0.92, maxWidth: '14ch',
            }}>
              Mes<br/><span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>créations.</span>
            </h2>
          </Reveal>
        </div>

        {/* Row 1 — formats longs 16:9 */}
        <Reveal delay={140}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 18,
            margin: '0 0 32px',
          }}>
            <TimeCode>FORMAT LONG · 16:9</TimeCode>
            <span style={{ flex: 1, height: 1, background: 'rgba(254,254,254,0.08)' }}/>
          </div>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
        }}>
          {CREATIONS_HORIZONTAL.map((item, i) => (
            <Reveal key={item.id} delay={200 + i * 110} threshold={0.05}>
              <CreationCard item={item} ratio="16/9" label="16:9" height={320} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Creations });

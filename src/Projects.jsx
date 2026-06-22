// Projects.jsx — 3 detailed case studies.
// Left: big 16:9 frame + optional 9:16 companion frames.
// Right: number, category, title, client, quote, 2-3 KPI stats, CTA.

const FEATURED_PROJECTS = [
  {
    id: 'leamoreau-serie',
    num: '01',
    category: 'Format court · Instagram & TikTok',
    title: 'Anyone France',
    client: 'Théo Fernandez — 71.5k abonnés',
    quote: `« Anyone, c'est l'école d'acting en ligne de Théo Fernandez. L'enjeu : rendre la transformation de ses élèves visibles afin de créer des vocations et attirer de nouveaux inscrits. On a tout misé sur leurs performances ! Résultat : +1.7M de vues cumulées. »`,
    stats: [
      { label: 'Vues cumulées',      value: 1.7, suffix: 'M', decimals: 1 },
      { label: 'Taux de rétention',  value: 74,  suffix: '%' },
      { label: 'Projets livrés',     value: 45 },
    ],
    shorts: 2,
    duration: '00:42:18',
    seed: 0,
    mainRatio: '9/16',
    mainYoutubeUrl: 'https://www.youtube.com/embed/Y4gcH0TBm4o?rel=0&modestbranding=1',
    shortYoutubeUrls: [
      'https://www.youtube.com/embed/737qbl2De6w?rel=0&modestbranding=1',
      'https://www.youtube.com/embed/LdMm4dEJqSA?rel=0&modestbranding=1',
    ],
    buttonLabel: 'Je veux les mêmes résultats',
  },
  {
    id: 'klein-docs',
    num: '02',
    category: 'Format court · YouTube',
    title: 'Luz World',
    client: 'Luz World — 55.6k abonnés',
    quote: `« Luz est la référence n°1 de la critique RPG en France. Quand il m'a contacté pour booster son audience, il m'a dit : "T'as carte blanche." J'ai épluché des dizaines d'heures de lives pour extraire les meilleurs moments. Résultat : +220k vues en 1 mois, dont un short frôlant les 100k. »`,
    stats: [
      { label: 'Vues cumulées',   value: 220, prefix: '+', suffix: 'k' },
      { label: 'Rushes montés',   value: 38,  suffix: ' h' },
      { label: 'Projets livrés',  value: 14 },
    ],
    shorts: 2,
    duration: '00:23:58',
    seed: 2,
    mainRatio: '9/16',
    mainYoutubeUrl: 'https://www.youtube.com/embed/2S6OUPogovY?rel=0&modestbranding=1',
    shortYoutubeUrls: [
      'https://www.youtube.com/embed/MkuXzRSwnOA?rel=0&modestbranding=1',
      'https://www.youtube.com/embed/klzSGb4sGM4?rel=0&modestbranding=1',
    ],
    buttonLabel: 'Je veux être accompagné(e)',
  },
  {
    id: 'cortex-reels',
    num: '03',
    category: 'Format court · YouTube & TikTok',
    title: 'Popcorn',
    client: 'Domingo — 769k abonnés',
    quote: `« J'ai contacté l'équipe Popcorn en leur proposant des axes d'amélioration sur leur contenu et ils ont dit OK. Durant plusieurs semaines, j'ai eu carte blanche sur le contenu court de Popcorn et Domingo. »`,
    stats: [
      { label: 'Formats livrés',  value: 12, prefix: '+' },
      { label: 'Événement couvert', text: 'Qui est le meilleur sportif ?' },
      { label: 'Direction créative', text: 'Carte blanche' },
    ],
    shorts: 3,
    duration: '00:00:48',
    seed: 3,
    shortYoutubeUrls: [
      'https://www.youtube.com/embed/yBt9RrIw3m0?rel=0&modestbranding=1',
      'https://www.youtube.com/embed/H_S_SDjRDaw?rel=0&modestbranding=1',
      'https://www.youtube.com/embed/fCdKD4irCks?rel=0&modestbranding=1',
    ],
    buttonLabel: 'Je veux les mêmes résultats',
  },
];

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

function ProjectBlock({ project, index }) {
  const isEven = index % 2 === 1;
  const mainRatio = project.mainRatio || '16/9';
  const mainLabel = mainRatio.replace('/', ':');
  const verticalMain = mainRatio === '9/16';
  const hasMain = Boolean(project.mainYoutubeUrl || project.mainSrc);
  // Grid columns: when there's no master, just spread the shorts evenly.
  let mediaCols = '1fr';
  if (project.shorts > 0) {
    if (!hasMain) {
      mediaCols = `repeat(${project.shorts}, 1fr)`;
    } else if (verticalMain) {
      mediaCols = `repeat(${1 + project.shorts}, 1fr)`;
    } else {
      mediaCols = `1fr ${'0.34fr '.repeat(project.shorts).trim()}`;
    }
  }
  return (
    <article data-screen-label={`03 Projet ${project.num}`} style={{
      padding: '120px 0',
      borderTop: '1px solid rgba(254,254,254,0.06)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.35fr 1fr',
        gap: 80,
        alignItems: 'start',
      }}>
        {/* Media side */}
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mediaCols,
            gap: 16,
            alignItems: 'start',
          }}>
            {hasMain && (
              <div>
                {project.mainYoutubeUrl
                  ? <YoutubeEmbed url={project.mainYoutubeUrl} ratio={mainRatio} title={project.title} />
                  : <VideoFrame ratio={mainRatio} label={mainLabel} seed={project.seed} timecode={project.duration} src={project.mainSrc} />}
                <div style={{
                  marginTop: 14, display: 'flex', justifyContent: 'space-between',
                  fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                }}>
                  <span>Master · {mainLabel}</span>
                  <span>SMPTE {project.duration}</span>
                </div>
              </div>
            )}
            {project.shorts > 0 && Array.from({ length: project.shorts }).map((_, i) => (
              <div key={i}>
                {project.shortYoutubeUrls?.[i]
                  ? <YoutubeEmbed url={project.shortYoutubeUrls[i]} ratio="9/16" title={`${project.title} — Short 0${i + 1}`} />
                  : <VideoFrame ratio="9/16" label="9:16" seed={project.seed + i + 1} src={project.shortSrcs?.[i]} />}
                <div style={{
                  marginTop: 14,
                  fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                }}>Short / 0{i + 1}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Copy side */}
        <div>
          <Reveal delay={120}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 32,
            }}>
              <span style={{
                fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: 64,
                letterSpacing: '-0.03em', lineHeight: 1,
              }}>{project.num}<span style={{ color: '#772CE8' }}>.</span></span>
              <Pill tone="outline" dot>{project.category}</Pill>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <h3 style={{
              margin: 0, fontFamily: 'Satoshi, sans-serif',
              fontWeight: 900, fontSize: 'clamp(40px, 4vw, 56px)',
              letterSpacing: '-0.025em', lineHeight: 1, maxWidth: '14ch',
            }}>{project.title}</h3>
          </Reveal>

          <Reveal delay={320}>
            <div style={{
              fontSize: 12, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#9A9CA5', marginTop: 24,
            }}>Client · {project.client}</div>
          </Reveal>

          <Reveal delay={420}>
            <p style={{
              margin: '32px 0 0 0', fontSize: 18, lineHeight: 1.55,
              color: '#C7C8CE', maxWidth: '42ch',
              borderLeft: '1px solid #772CE8', paddingLeft: 20,
            }}>{project.quote}</p>
          </Reveal>

          {/* KPI stats */}
          <Reveal delay={520}>
            <div style={{
              display: 'grid', gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
              gap: 24, marginTop: 48,
              borderTop: '1px solid rgba(254,254,254,0.1)',
              paddingTop: 24,
            }}>
              {project.stats.map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'Satoshi, sans-serif', fontWeight: 900,
                    fontSize: s.text != null ? 20 : 40,
                    letterSpacing: '-0.02em',
                    lineHeight: s.text != null ? 1.2 : 1,
                    color: '#FEFEFE',
                    textTransform: s.text != null ? 'uppercase' : 'none',
                  }}>
                    {s.text != null
                      ? s.text
                      : <Counter value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} />}
                  </div>
                  <div style={{
                    marginTop: 10, fontSize: 10, fontWeight: 500,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={640}>
            <div style={{ marginTop: 48 }}>
              <TracedButton href="https://calendly.com/flotsam-prod/30min" target="_blank" variant="ghost" icon="→">{project.buttonLabel}</TracedButton>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" data-screen-label="03 Projets en détail" style={{
      padding: '160px 64px 80px',
      background: '#1A1C22',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 64, margin: '0', flexWrap: 'wrap',
        }}>
          <Reveal delay={120}>
            <h2 style={{
              margin: 0, fontFamily: 'Satoshi, sans-serif',
              fontWeight: 900, fontSize: 'clamp(56px, 8vw, 112px)',
              letterSpacing: '-0.03em', lineHeight: 0.92, maxWidth: '14ch',
            }}>
              Projets en<br/><span style={{ color: '#772CE8', fontStyle: 'italic', fontFamily: 'Satoshi, sans-serif' }}>détail.</span>
            </h2>
          </Reveal>
        </div>

        {FEATURED_PROJECTS.map((p, i) => (
          <ProjectBlock key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Projects });

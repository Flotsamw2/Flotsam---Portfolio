// primitives.jsx — shared building blocks for Flotsam Portfolio.
// Follows brandbook: flat, editorial, left-aligned, zero bounce, violet punctuation.

const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------------
   useReveal — fade-in + slide-up on scroll. Smooth cubic easing.
   ------------------------------------------------------------------ */
function useReveal(options = {}) {
  const { delay = 0, threshold = 0.15, once = true } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  const style = {
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    opacity: visible ? 1 : 0,
    transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: 'transform, opacity',
  };
  return { ref, style, visible };
}

/* ------------------------------------------------------------------
   Reveal — wrapper component applying useReveal.
   ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, as = 'div', style = {}, threshold = 0.15, ...rest }) {
  const { ref, style: revealStyle } = useReveal({ delay, threshold });
  const Tag = as;
  return <Tag ref={ref} style={{ ...revealStyle, ...style }} {...rest}>{children}</Tag>;
}

/* ------------------------------------------------------------------
   Stagger — auto-applies incremental delay to direct children.
   ------------------------------------------------------------------ */
function Stagger({ children, step = 120, initial = 0, threshold = 0.12 }) {
  return React.Children.map(children, (child, i) => (
    <Reveal delay={initial + step * i} threshold={threshold}>{child}</Reveal>
  ));
}

/* ------------------------------------------------------------------
   Pill — violet solid status badge. Supports "dot" REC indicator.
   ------------------------------------------------------------------ */
function Pill({ children, tone = 'violet', dot = false, pulse = false }) {
  const bg = tone === 'violet' ? '#772CE8'
           : tone === 'gold' ? '#F2CD60'
           : tone === 'outline' ? 'transparent'
           : '#772CE8';
  const fg = tone === 'gold' ? '#272932' : '#FEFEFE';
  const border = tone === 'outline' ? '1px solid rgba(254,254,254,0.22)' : 'none';
  const dotColor = tone === 'outline' ? '#772CE8' : (tone === 'gold' ? '#272932' : '#FEFEFE');
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: bg, color: fg, border,
      padding: '7px 14px', borderRadius: 999,
      fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {dot && (
        <span style={{ position: 'relative', width: 7, height: 7 }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: dotColor,
          }}/>
          {pulse && <span style={{
            position: 'absolute', inset: -3, borderRadius: '50%',
            border: `1px solid ${dotColor}`, opacity: 0.6,
            animation: 'fpPulse 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
          }}/>}
        </span>
      )}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
   TimeCode — SMPTE-style mono-feel label.
   ------------------------------------------------------------------ */
function TimeCode({ children = '00:00:00:00' }) {
  return (
    <span style={{
      fontFamily: 'Satoshi, sans-serif', fontWeight: 500,
      fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
      color: '#9A9CA5', fontVariantNumeric: 'tabular-nums',
    }}>{children}</span>
  );
}

/* ------------------------------------------------------------------
   ChapterLabel — small section label: "01 — TIMECODE · LABEL"
   ------------------------------------------------------------------ */
function ChapterLabel({ num, timecode, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: 'Satoshi, sans-serif', fontSize: 11, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9A9CA5',
    }}>
      <span style={{ color: '#FEFEFE' }}>{String(num).padStart(2,'0')}</span>
      <span style={{ width: 32, height: 1, background: 'rgba(254,254,254,0.2)' }}/>
      <span>{timecode}</span>
      <span style={{ color: '#772CE8' }}>·</span>
      <span>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   TracedButton — the signature button.
   On hover: a violet line TRACES around the perimeter (top-left→top-right
   →bottom-right→bottom-left→top-left), then fill sweeps in from the left.
   Matches the animation reference: sharp, no bounce, ~420ms.
   ------------------------------------------------------------------ */
function TracedButton({
  children, onClick, href, target, rel,
  variant = 'primary',       // 'primary' (violet fill) | 'ghost' (dark bg w/ border)
  size = 'md',               // 'sm' | 'md' | 'lg'
  icon = '→',
  fullWidth = false,
  style = {},
}) {
  const [hover, setHover] = useState(false);
  const pad = size === 'lg' ? '20px 28px'
            : size === 'sm' ? '10px 16px'
            : '15px 22px';
  const fsize = size === 'lg' ? 13 : size === 'sm' ? 11 : 12;
  const isPrimary = variant === 'primary';

  const baseBg  = isPrimary ? '#772CE8' : 'transparent';
  const hoverBg = isPrimary ? '#272932' : '#772CE8';
  const baseFg  = '#FEFEFE';

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      target={href ? target : undefined}
      rel={href && target === '_blank' ? (rel || 'noopener noreferrer') : rel}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'inline-flex',
        alignItems: 'center', gap: 14,
        padding: pad, border: 'none',
        fontFamily: 'Satoshi, sans-serif', fontWeight: 500, fontSize: fsize,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: baseFg, background: baseBg,
        cursor: 'pointer', textDecoration: 'none',
        width: fullWidth ? '100%' : 'auto', justifyContent: fullWidth ? 'center' : 'flex-start',
        overflow: 'hidden', borderRadius: 2,
        transition: 'background 420ms cubic-bezier(0.65,0,0.35,1) 180ms',
        backgroundColor: hover ? hoverBg : baseBg,
        ...style,
      }}
    >
      {/* Sweep fill layer (secondary effect — slides in from left) */}
      <span style={{
        position: 'absolute', inset: 0,
        background: isPrimary ? '#1A1C22' : '#772CE8',
        transform: hover ? 'translateX(0%)' : 'translateX(-101%)',
        transition: 'transform 520ms cubic-bezier(0.65,0,0.35,1)',
        zIndex: 0,
      }}/>

      {/* Traced border — 4 lines in sequence. Always present so the idle state shows a thin line on ghost. */}
      {/* Outer frame (idle hairline for ghost) */}
      {!isPrimary && (
        <span style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(254,254,254,0.28)',
          pointerEvents: 'none',
        }}/>
      )}
      {/* Top line: 0 → 100% width */}
      <span style={{
        position: 'absolute', left: 0, top: 0, height: 1,
        width: hover ? '100%' : '0%', background: '#FEFEFE',
        transition: 'width 180ms cubic-bezier(0.65,0,0.35,1) 0ms',
        zIndex: 2,
      }}/>
      {/* Right line: 0 → 100% height, after top finishes */}
      <span style={{
        position: 'absolute', right: 0, top: 0, width: 1,
        height: hover ? '100%' : '0%', background: '#FEFEFE',
        transition: 'height 180ms cubic-bezier(0.65,0,0.35,1) 160ms',
        zIndex: 2,
      }}/>
      {/* Bottom line: 0 → 100% width right-to-left */}
      <span style={{
        position: 'absolute', right: 0, bottom: 0, height: 1,
        width: hover ? '100%' : '0%', background: '#FEFEFE',
        transition: 'width 180ms cubic-bezier(0.65,0,0.35,1) 320ms',
        zIndex: 2,
      }}/>
      {/* Left line: 0 → 100% height, bottom-to-top */}
      <span style={{
        position: 'absolute', left: 0, bottom: 0, width: 1,
        height: hover ? '100%' : '0%', background: '#FEFEFE',
        transition: 'height 180ms cubic-bezier(0.65,0,0.35,1) 480ms',
        zIndex: 2,
      }}/>

      {/* Label */}
      <span style={{ position: 'relative', zIndex: 3 }}>{children}</span>
      {icon && (
        <span style={{
          position: 'relative', zIndex: 3,
          transition: 'transform 280ms cubic-bezier(0.65,0,0.35,1)',
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
          fontSize: fsize + 2,
        }}>{icon}</span>
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   EditorialLink — underline grows from 0→100% width, left-anchored.
   ------------------------------------------------------------------ */
function EditorialLink({ children, onClick, href, active = false, color = '#FEFEFE' }) {
  const [hover, setHover] = useState(false);
  const Tag = href ? 'a' : 'span';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'inline-block', cursor: 'pointer',
        fontFamily: 'Satoshi, sans-serif', fontWeight: 500, fontSize: 11,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color, textDecoration: 'none', padding: '6px 0',
      }}
    >
      {children}
      <span style={{
        position: 'absolute', left: 0, bottom: 0, height: 1,
        width: (hover || active) ? '100%' : '0%',
        background: '#772CE8',
        transition: 'width 280ms cubic-bezier(0.65,0,0.35,1)',
      }}/>
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Counter — animates number from 0 → value when visible.
   Supports prefix/suffix (e.g. "+", "M", "%"). ~1.6s easeOut.
   ------------------------------------------------------------------ */
function Counter({ value, suffix = '', prefix = '', decimals = 0, duration = 1600 }) {
  const { ref, visible } = useReveal({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let rafId; const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [visible, value, duration]);
  const fmt = decimals > 0
    ? display.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.round(display).toLocaleString('fr-FR');
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{prefix}{fmt}{suffix}</span>;
}

/* ------------------------------------------------------------------
   DottedDivider — horizontal violet dot rule.
   ------------------------------------------------------------------ */
function DottedDivider({ dots = 60, color = '#772CE8', opacity = 0.5 }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%', padding: '24px 0' }}>
      {Array.from({ length: dots }).map((_, i) => (
        <span key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity, flex: '0 0 auto' }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   VideoFrame — placeholder for a video with ratio label + REC indicator.
   Animated subtle parallax on scroll (offset prop).
   ------------------------------------------------------------------ */
function VideoFrame({ ratio = '16 / 9', label = '16:9', seed = 0, rec = false, timecode = '00:00', title, src, height }) {
  const tints = [
    'linear-gradient(135deg, #3A2A58 0%, #1A1C22 65%, #272932 100%)',
    'linear-gradient(125deg, #1F212A 0%, #33354A 70%, #1A1C22 100%)',
    'linear-gradient(140deg, #272932 0%, #4A2E7E 50%, #1A1C22 100%)',
    'linear-gradient(115deg, #2D2F38 0%, #1A1C22 60%, #5A3FA5 110%)',
    'linear-gradient(145deg, #1A1C22 0%, #33353F 50%, #2A1B3B 100%)',
    'linear-gradient(130deg, #3B2A52 0%, #272932 55%, #151720 100%)',
  ];
  const [hover, setHover] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // Lazy load: only mount the <video> when the frame scrolls into view.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          const v = videoRef.current;
          if (v && v.paused) v.play().catch(() => {});
        } else {
          const v = videoRef.current;
          if (v && !v.paused) v.pause();
        }
      });
    }, { threshold: 0.2, rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    // First click while still in poster state → mount the video and let it autoplay
    if (src && !shouldLoad) { setShouldLoad(true); return; }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.paused) v.play().catch(() => {});
  };
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const el = containerRef.current;
    if (!el) return;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      return;
    }
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) req.call(el).catch(() => {});
  };

  // Controls only visible/clickable when video is hovered or paused
  const showOverlay = !playing || hover;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={src ? togglePlay : undefined}
      style={{
        position: 'relative', width: '100%',
        ...(height
          ? { height: typeof height === 'number' ? `${height}px` : height }
          : { aspectRatio: ratio }),
        background: tints[seed % tints.length], overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Real video — only mounted once the frame is near the viewport.
          Before that, the gradient tint above acts as the poster/thumbnail. */}
      {src && shouldLoad && (
        <video
          ref={videoRef}
          src={encodeURI(src)}
          autoPlay muted loop playsInline preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {/* Grain / subtle overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 30%, rgba(254,254,254,0.06), transparent 55%)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}/>
      {/* Dark vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)',
        pointerEvents: 'none',
      }}/>
      {/* REC badge */}
      {rec && (
        <div style={{
          position: 'absolute', left: 16, top: 16,
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 10,
          letterSpacing: '0.22em', color: '#FEFEFE', textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#FF2D2D',
            animation: 'fpBlink 1.4s steps(2, start) infinite',
          }}/>
          REC · {timecode}
        </div>
      )}
      {/* Mute / unmute toggle — only when the real video is mounted */}
      {src && shouldLoad && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
          style={{
            position: 'absolute', right: 14, top: 14, zIndex: 3,
            width: 36, height: 36, padding: 0,
            display: 'grid', placeItems: 'center',
            border: `1px solid ${hover ? 'rgba(119,44,232,0.6)' : 'rgba(254,254,254,0.4)'}`,
            background: 'rgba(26,28,34,0.55)',
            backdropFilter: 'blur(4px)',
            color: '#FEFEFE', cursor: 'pointer', borderRadius: '50%',
            opacity: showOverlay ? 1 : 0,
            transition: 'opacity 240ms cubic-bezier(0.65,0,0.35,1), border-color 240ms',
          }}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.59 3L20 8.41 18.59 7 15 10.59 11.41 7 10 8.41 13.59 12 10 15.59 11.41 17 15 13.41 18.59 17 20 15.59 16.59 12z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 13.5 12zM14 3.23v2.06A7 7 0 0 1 19 12a7 7 0 0 1-5 6.7v2.07A9 9 0 0 0 21 12 9 9 0 0 0 14 3.23z"/>
            </svg>
          )}
        </button>
      )}
      {/* Play / Pause button — grows on hover, fades when playing */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) scale(${hover ? 1.08 : 1})`,
        transition: 'transform 280ms cubic-bezier(0.65,0,0.35,1), opacity 240ms',
        width: 72, height: 72,
        border: `1px solid ${hover ? '#772CE8' : 'rgba(254,254,254,0.5)'}`,
        borderRadius: '50%',
        display: 'grid', placeItems: 'center',
        background: hover ? 'rgba(119,44,232,0.12)' : 'rgba(39,41,50,0.35)',
        backdropFilter: 'blur(2px)',
        opacity: (src && shouldLoad) ? (showOverlay ? 1 : 0) : 1,
        pointerEvents: 'none',
      }}>
        {playing && src ? (
          <svg width="18" height="20" viewBox="0 0 18 20" fill={hover ? '#772CE8' : '#FEFEFE'} style={{ transition: 'fill 280ms' }}>
            <rect x="2" y="2" width="4" height="16"/>
            <rect x="12" y="2" width="4" height="16"/>
          </svg>
        ) : (
          <svg width="18" height="20" viewBox="0 0 18 20" fill={hover ? '#772CE8' : '#FEFEFE'} style={{ transition: 'fill 280ms' }}>
            <path d="M0 0 L18 10 L0 20 Z"/>
          </svg>
        )}
      </div>
      {/* Ratio label */}
      <span style={{
        position: 'absolute', left: 16, bottom: 12,
        fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(254,254,254,0.55)',
        pointerEvents: 'none',
      }}>{label}</span>
      {/* Fullscreen toggle */}
      <button
        onClick={toggleFullscreen}
        aria-label="Plein écran"
        style={{
          position: 'absolute', right: 14, bottom: 14, zIndex: 3,
          width: 36, height: 36, padding: 0,
          display: 'grid', placeItems: 'center',
          border: `1px solid ${hover ? 'rgba(119,44,232,0.6)' : 'rgba(254,254,254,0.4)'}`,
          background: 'rgba(26,28,34,0.55)',
          backdropFilter: 'blur(4px)',
          color: '#FEFEFE', cursor: 'pointer', borderRadius: '50%',
          opacity: showOverlay ? 1 : 0,
          transition: 'opacity 240ms cubic-bezier(0.65,0,0.35,1), border-color 240ms',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
      </button>
      {/* Project title overlay if given */}
      {title && (
        <span style={{
          position: 'absolute', left: 16, bottom: 12,
          fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(254,254,254,0.75)',
        }}>{title}</span>
      )}
    </div>
  );
}

Object.assign(window, {
  useReveal, Reveal, Stagger,
  Pill, TimeCode, ChapterLabel,
  TracedButton, EditorialLink,
  Counter, DottedDivider, VideoFrame,
});

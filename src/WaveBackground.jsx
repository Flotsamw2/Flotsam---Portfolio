// WaveBackground.jsx — canvas-based flowing waves for the Hero background.
// Anthracite ↔ faint violet. Slow, organic. Respects prefers-reduced-motion.
// Opacity globally kept low (~18%) so it sits behind the title cleanly.

function WaveBackground() {
  const canvasRef = React.useRef(null);
  const rafRef    = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Each wave = sum of sines, drawn as a filled band.
    // Slow speeds keep the motion calm. 3 layered waves for depth.
    const waves = [
      { amp: 70, freq: 0.0042, speed: 0.00018, phase: 0.0, yBase: 0.62, color: 'rgba(119, 44, 232, 0.18)' },
      { amp: 90, freq: 0.0031, speed: 0.00012, phase: 1.3, yBase: 0.74, color: 'rgba(119, 44, 232, 0.14)' },
      { amp: 55, freq: 0.0058, speed: 0.00022, phase: 2.1, yBase: 0.88, color: 'rgba(58,  42, 88,  0.35)' },
    ];

    const drawWave = (t, wv) => {
      const yBase = h * wv.yBase;
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 6) {
        // two sines with different wavelengths → organic feel
        const y =
          yBase +
          Math.sin(x * wv.freq + t * wv.speed + wv.phase)            * wv.amp +
          Math.sin(x * wv.freq * 2.3 + t * wv.speed * 1.7 + wv.phase * 0.7) * wv.amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = wv.color;
      ctx.fill();
    };

    const render = (t) => {
      ctx.clearRect(0, 0, w, h);

      // Soft violet glow disc (top-left) — very subtle
      const grad = ctx.createRadialGradient(w * 0.28, h * 0.35, 0, w * 0.28, h * 0.35, Math.max(w, h) * 0.6);
      grad.addColorStop(0, 'rgba(119, 44, 232, 0.18)');
      grad.addColorStop(0.5, 'rgba(119, 44, 232, 0.04)');
      grad.addColorStop(1, 'rgba(119, 44, 232, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Waves
      for (const wv of waves) drawWave(t, wv);

      if (!reduce) rafRef.current = requestAnimationFrame(render);
    };

    if (reduce) {
      // Render one still frame only.
      render(0);
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        display: 'block', pointerEvents: 'none',
        opacity: 0.9, // canvas already uses low-alpha fills
      }}
    />
  );
}

Object.assign(window, { WaveBackground });

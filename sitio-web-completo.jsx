import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   FULL WEBSITE + LINKEDIN — PRODUCTION PROTOTYPE
   ═══════════════════════════════════════════ */

const PALETTE = {
  bg: "#060a14",
  bgAlt: "#0c1120",
  card: "#0f1628",
  cardHover: "#141d35",
  accent: "#38bdf8",
  gold: "#f5a623",
  emerald: "#34d399",
  violet: "#8b5cf6",
  rose: "#fb7185",
  lavender: "#a78bfa",
  text: "#e4e8f0",
  textSoft: "#94a3b8",
  textDim: "#5a6a80",
  border: "#192038",
  borderLight: "#243050",
};

const COMPONENTS = [
  { id: "evalpro", label: "EvalualPRO", icon: "◈", color: "#38bdf8",
    tagline: "Evaluación prospectiva de programas académicos",
    desc: "Herramienta estratégica que evalúa viabilidad, pertinencia y relevancia de programas universitarios en escenarios de 1, 3 y 5 años frente al impacto de la inteligencia artificial.",
    problem: "¿El programa que hoy existe seguirá siendo viable en un mundo atravesado por la IA?",
    value: ["Lógica de anticipación", "Lectura del entorno", "Capacidad adaptativa", "Apoyo a decisiones institucionales"],
  },
  { id: "sinergia", label: "Sinergia", icon: "◉", color: "#8b5cf6",
    tagline: "Metodología de transformación digital con co-creación IA",
    desc: "Metodología propia que articula transformación digital en cinco niveles: personal, de área, institucional, regional/nacional e internacional, centrando el cambio en las personas y sus capacidades.",
    problem: "La transformación no ocurre por incorporar herramientas, sino cuando las personas construyen visión compartida.",
    value: ["Diseño con método", "Co-creación con IA", "Lógica sistémica", "Escalamiento progresivo"],
  },
  { id: "macro", label: "100.000 Docentes", icon: "◎", color: "#f5a623",
    tagline: "Macroinvestigación internacional sobre percepción docente",
    desc: "Investigación a escala internacional para comprender cómo 100.000 docentes de América Latina, Brasil y Portugal perciben, usan y cuestionan la inteligencia artificial en educación.",
    problem: "Necesitamos evidencia masiva, multilingüe y procesada con IA para diseñar formación docente pertinente.",
    value: ["Ambición internacional", "IA como herramienta de análisis", "Base empírica para políticas", "Sistema multilingüe ES/PT"],
  },
  { id: "libro", label: "Método Fractal", icon: "◇", color: "#34d399",
    tagline: "Libro: Indagación progresiva con inteligencia artificial",
    desc: "Obra en construcción que propone una metodología para usar la IA con sentido, profundidad y estrategia, evitando automatismos superficiales mediante la indagación progresiva.",
    problem: "El problema no es usar IA, sino saber cómo usarla con criterio, profundidad y estrategia.",
    value: ["Metodología propia", "Producción intelectual original", "Pensamiento estratégico", "Marco conceptual"],
  },
  { id: "ipb", label: "IPB Portugal", icon: "◆", color: "#fb7185",
    tagline: "Experiencia internacional en posgrado e innovación",
    desc: "Docencia en maestría en el Instituto Politécnico de Bragança y participación en grupos de innovación con aprendizaje basado en desafíos, conectando universidad y sector productivo.",
    problem: "La legitimidad internacional se construye con experiencia aplicada, no solo con discurso.",
    value: ["Experiencia en posgrado internacional", "Articulación universidad-empresa", "Metodologías activas", "Perspectiva comparada"],
  },
  { id: "curriculo", label: "Currículo & IA", icon: "○", color: "#a78bfa",
    tagline: "Eje transversal: pedagogías emergentes y competencias",
    desc: "Columna vertebral conceptual que conecta currículo, pedagogía, evaluación, formación docente y pertinencia profesional bajo el impacto transformador de la inteligencia artificial.",
    problem: "La IA no es solo una herramienta: es un fenómeno que transforma el sentido mismo de la formación.",
    value: ["Visión sistémica", "Integración curricular", "Pedagogías emergentes", "Competencias docentes"],
  },
];

const CONNECTIONS = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5],[4,5]];

const PILLARS = [
  { num: "I", title: "Futuro de la Universidad", color: "#38bdf8", desc: "Pertinencia, relevancia y viabilidad de la educación superior" },
  { num: "II", title: "Currículo e IA", color: "#8b5cf6", desc: "Cómo la IA reconfigura programas y trayectorias formativas" },
  { num: "III", title: "Formación Docente", color: "#f5a623", desc: "Competencias, percepción docente y transformación profesional" },
  { num: "IV", title: "Transformación Digital", color: "#34d399", desc: "Metodología Sinergia: niveles, casos y escalamiento" },
  { num: "V", title: "Investigación & Evidencia", color: "#fb7185", desc: "100.000 docentes: datos, hallazgos y preguntas abiertas" },
  { num: "VI", title: "Producción Internacional", color: "#a78bfa", desc: "Libro, IPB, innovación y aprendizaje basado en desafíos" },
];

const PHRASES = [
  "Repensar la universidad en tiempos de inteligencia artificial",
  "Más que adoptar tecnología: rediseñar la educación",
  "Metodologías para transformar la educación con IA",
  "De la evaluación curricular a la transformación institucional",
];

/* ── Animated Network Background ── */
function NetworkBG({ height = 500 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = height * 2;
    ctx.scale(1, 1);

    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
      }));
    }
    const nodes = nodesRef.current;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${0.08 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${0.25 + n.r * 0.1})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [height]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />;
}

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Section({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ── Ecosystem Interactive Diagram (larger) ── */
function EcosystemFull({ active, setActive }) {
  const cx = 250, cy = 220, r = 155;
  const nodes = COMPONENTS.map((c, i) => {
    const angle = (i * 2 * Math.PI / COMPONENTS.length) - Math.PI / 2;
    return { ...c, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), idx: i };
  });

  return (
    <svg viewBox="0 0 500 440" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        {COMPONENTS.map((c, i) => (
          <radialGradient key={i} id={`nodeGlow${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={c.color} stopOpacity="0" />
          </radialGradient>
        ))}
        <filter id="blur1"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <circle cx={cx} cy={cy} r={r + 60} fill="url(#coreGlow)" />
      {/* Connection lines */}
      {CONNECTIONS.map(([a, b], i) => {
        const isActive = active === a || active === b;
        return (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={isActive ? COMPONENTS[active === a ? b : a].color : "#1e293b"}
            strokeWidth={isActive ? 2 : 0.7}
            opacity={isActive ? 0.7 : 0.3}
            style={{ transition: "all 0.5s" }}
          />
        );
      })}
      {/* Center label */}
      <text x={cx} y={cy - 12} textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="700" letterSpacing="2" opacity="0.5">ECOSISTEMA</text>
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#38bdf8" fontSize="8" letterSpacing="1.5" opacity="0.7">INTERRELACIONAL</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#f5a623" fontSize="7" letterSpacing="1" opacity="0.5">EDUCACIÓN & IA</text>
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer" }}>
          <circle cx={n.x} cy={n.y} r={36} fill={`url(#nodeGlow${i})`} />
          {active === i && <circle cx={n.x} cy={n.y} r={24} fill="none" stroke={n.color} strokeWidth="1" opacity="0.4" filter="url(#blur1)"/>}
          <circle cx={n.x} cy={n.y} r={active === i ? 22 : 18}
            fill={active === i ? n.color : "#0f1628"}
            stroke={n.color} strokeWidth={active === i ? 2.5 : 1.5}
            style={{ transition: "all 0.35s" }}
          />
          <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="central"
            fill={active === i ? "#060a14" : n.color} fontSize="14" fontWeight="bold"
            style={{ transition: "fill 0.3s" }}>{n.icon}</text>
          <text x={n.x} y={n.y + 38} textAnchor="middle" fill={n.color}
            fontSize="8.5" fontWeight="700" letterSpacing="0.8">{n.label.toUpperCase()}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Component Detail Card ── */
function ComponentCard({ comp, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: PALETTE.card,
      border: `1px solid ${open ? comp.color + "40" : PALETTE.border}`,
      borderRadius: 16,
      padding: "24px 20px",
      cursor: "pointer",
      transition: "all 0.4s",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -20, right: -10,
        fontSize: 80, fontWeight: 800, color: comp.color + "08",
        fontFamily: "'Playfair Display', serif", lineHeight: 1,
      }}>{String(index + 1).padStart(2, "0")}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: comp.color + "15", border: `1.5px solid ${comp.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, color: comp.color,
        }}>{comp.icon}</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: comp.color }}>{comp.label}</div>
          <div style={{ fontSize: 11, color: PALETTE.textDim }}>{comp.tagline}</div>
        </div>
        <div style={{ marginLeft: "auto", color: PALETTE.textDim, fontSize: 18, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</div>
      </div>
      {open && (
        <div style={{ animation: "fadeSlide 0.4s" }}>
          <p style={{ fontSize: 13, color: PALETTE.text, lineHeight: 1.65, margin: "12px 0" }}>{comp.desc}</p>
          <div style={{
            background: comp.color + "0a", border: `1px solid ${comp.color}20`,
            borderRadius: 10, padding: "12px 14px", marginBottom: 12,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: comp.color, fontWeight: 700, marginBottom: 6 }}>PROBLEMA QUE RESUELVE</div>
            <p style={{ fontSize: 12, color: PALETTE.textSoft, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{comp.problem}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {comp.value.map((v, i) => (
              <span key={i} style={{
                background: comp.color + "12", color: comp.color,
                padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                border: `1px solid ${comp.color}20`,
              }}>{v}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── LinkedIn Preview ── */
function LinkedInPreview() {
  const acercaDe = `Articulo educación, inteligencia artificial, currículo, transformación digital, investigación, innovación y proyección internacional para comprender y transformar la universidad contemporánea.

He construido un ecosistema de trabajo integrado por herramientas, metodologías e investigaciones propias:

◈ EvalualPRO → Evaluación prospectiva de programas académicos a 1, 3 y 5 años frente al impacto de la IA.
◉ Sinergia → Metodología de transformación digital con co-creación IA en cinco niveles: personal, de área, institucional, regional e internacional.
◎ 100.000 Docentes → Macroinvestigación internacional (LATAM, Brasil, Portugal) sobre percepción docente ante la IA.
◇ Método Fractal → Libro en construcción sobre indagación progresiva con inteligencia artificial.

Profesor invitado en maestría en el Instituto Politécnico de Bragança (Portugal), donde también participo en innovación con aprendizaje basado en desafíos, conectando universidad y sector productivo.

Mi trabajo no es opinar sobre IA. Es diseñar marcos, herramientas y evidencia para que la transformación educativa ocurra con profundidad, método y visión estratégica.

→ Consultoría · Conferencias · Investigación · Alianzas
→ Conectemos: [correo]`;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Mock LinkedIn Card */}
      <div style={{
        background: "#ffffff", borderRadius: 14, overflow: "hidden",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
      }}>
        {/* Banner */}
        <div style={{
          height: 120, position: "relative",
          background: "linear-gradient(135deg, #060a14 0%, #0f1628 30%, #1e3a5f 60%, #38bdf8 100%)",
        }}>
          <div style={{ position: "absolute", bottom: 14, left: 20, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600, letterSpacing: 1.5 }}>
              EDUCACIÓN · IA · TRANSFORMACIÓN
            </span>
          </div>
          <div style={{ position: "absolute", bottom: 14, right: 20, display: "flex", gap: 6 }}>
            {COMPONENTS.map((c, i) => (
              <span key={i} style={{ color: c.color, fontSize: 16, opacity: 0.85 }}>{c.icon}</span>
            ))}
          </div>
        </div>
        {/* Profile */}
        <div style={{ padding: "0 20px 20px", position: "relative" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
            border: "4px solid #fff",
            position: "absolute", top: -36, left: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, color: "#fff", fontWeight: 800,
            fontFamily: "'Playfair Display', serif",
          }}>AI</div>
          <div style={{ paddingTop: 44 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>Tu Nombre</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.45, marginTop: 4, maxWidth: 420 }}>
              Educación, IA y Transformación Universitaria | Creador de Sinergia y EvalualPRO | Docente e Investigador
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Colombia · Portugal · América Latina</div>
          </div>
          {/* Acerca de */}
          <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Acerca de</div>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.65, whiteSpace: "pre-line" }}>
              {acercaDe}
            </div>
          </div>
          {/* Destacados */}
          <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Destacados</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
              {COMPONENTS.slice(0, 5).map((c, i) => (
                <div key={i} style={{
                  minWidth: 130, background: "#f9fafb", borderRadius: 10,
                  padding: "12px", border: "1px solid #e5e7eb",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4, color: c.color }}>{c.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{c.label}</div>
                  <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2, lineHeight: 1.3 }}>{c.tagline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN APP
   ═══════════════════════════════════ */
export default function App() {
  const [activeEco, setActiveEco] = useState(null);
  const [view, setView] = useState("web");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % PHRASES.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (view === "linkedin") {
    return (
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: PALETTE.bg,
        minHeight: "100vh",
        color: PALETTE.text,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet" />
        {/* Nav */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(6,10,20,0.85)", backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${PALETTE.border}`,
          padding: "12px 24px", display: "flex", justifyContent: "center", gap: 8,
        }}>
          <button onClick={() => setView("web")} style={{
            background: "transparent", color: PALETTE.textSoft,
            border: `1px solid ${PALETTE.border}`, padding: "6px 18px",
            borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>← Volver al Sitio Web</button>
          <button style={{
            background: "#0a66c2", color: "#fff",
            border: "none", padding: "6px 18px",
            borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>LinkedIn Completo</button>
        </nav>

        <div style={{ padding: "40px 20px 60px", maxWidth: 700, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#0a66c2", fontWeight: 700, marginBottom: 12 }}>PERFIL LINKEDIN — DISEÑO COMPLETO</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: 0, color: PALETTE.text }}>
                Tu presencia en LinkedIn
              </h2>
              <p style={{ color: PALETTE.textSoft, fontSize: 14, marginTop: 8 }}>
                Preview del perfil optimizado con todos los componentes del ecosistema
              </p>
            </div>
          </Section>
          <Section delay={0.15}>
            <LinkedInPreview />
          </Section>
          <Section delay={0.3}>
            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: PALETTE.gold, fontWeight: 700, marginBottom: 16 }}>
                TIPS DE IMPLEMENTACIÓN
              </div>
              {[
                { t: "Titular", d: "Máx. 220 caracteres. Pon las keywords más importantes al inicio: 'Educación, IA y Transformación Universitaria'." },
                { t: "Banner", d: "1584×396px. Usa la misma paleta del sitio web. Incluye tu nombre, tagline y los íconos del ecosistema." },
                { t: "Primeras 3 líneas", d: "Son las únicas visibles sin hacer clic en 'ver más'. El hook debe ser potente y claro." },
                { t: "Destacados", d: "5 elementos máximo con thumbnails consistentes. Cada uno enlaza a un componente del ecosistema." },
                { t: "Publicaciones", d: "2-3 por semana alternando entre los 6 pilares de contenido. Formato: texto + visual + pregunta abierta." },
              ].map((tip, i) => (
                <div key={i} style={{
                  background: PALETTE.card, border: `1px solid ${PALETTE.border}`,
                  borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                  display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <div style={{
                    minWidth: 28, height: 28, borderRadius: 8,
                    background: "rgba(10,102,194,0.12)", color: "#0a66c2",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800,
                  }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: PALETTE.text }}>{tip.t}</div>
                    <div style={{ fontSize: 11, color: PALETTE.textSoft, lineHeight: 1.5, marginTop: 2 }}>{tip.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    );
  }

  /* ═══════ WEBSITE VIEW ═══════ */
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: PALETTE.bg,
      minHeight: "100vh",
      color: PALETTE.text,
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet" />

      {/* ─── NAV ─── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(6,10,20,0.8)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${PALETTE.border}`,
        padding: "10px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, color: PALETTE.accent }}>◈</span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>Tu Nombre</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setView("linkedin")} style={{
            background: "#0a66c2", color: "#fff", border: "none",
            padding: "6px 14px", borderRadius: 16, fontSize: 11, fontWeight: 700,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Ver LinkedIn →</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        position: "relative", minHeight: 520, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "80px 24px 60px",
        overflow: "hidden",
      }}>
        <NetworkBG height={520} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680 }}>
          <div style={{
            fontSize: 10, letterSpacing: 5, color: PALETTE.gold, fontWeight: 700,
            marginBottom: 20, textTransform: "uppercase",
          }}>Educación · Inteligencia Artificial · Transformación</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px",
            background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 60%, #f5a623 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Arquitecturas para repensar la universidad
          </h1>
          <p style={{
            fontSize: 16, color: PALETTE.textSoft, lineHeight: 1.6,
            maxWidth: 520, margin: "0 auto 28px",
          }}>
            Herramientas, metodologías, investigación y experiencia aplicada para comprender y transformar la educación superior en tiempos de inteligencia artificial.
          </p>
          {/* Rotating phrase */}
          <div style={{
            height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span key={phraseIdx} style={{
              fontSize: 13, color: PALETTE.gold, fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
              animation: "fadePhrase 4s",
              letterSpacing: 0.3,
            }}>"{PHRASES[phraseIdx]}"</span>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <button style={{
              background: PALETTE.accent, color: "#060a14",
              border: "none", padding: "12px 28px", borderRadius: 28,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Explorar ecosistema ↓</button>
            <button style={{
              background: "transparent", color: PALETTE.accent,
              border: `1.5px solid ${PALETTE.accent}40`, padding: "12px 28px",
              borderRadius: 28, fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Contacto</button>
          </div>
        </div>
      </section>

      {/* ─── QUIÉN SOY ─── */}
      <section style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
        <Section>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, color: "#fff", fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              flexShrink: 0,
            }}>AI</div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.accent, fontWeight: 700, marginBottom: 8 }}>QUIÉN SOY</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, margin: "0 0 14px", lineHeight: 1.2 }}>
                Una visión articulada para transformar la educación
              </h2>
              <p style={{ fontSize: 14, color: PALETTE.textSoft, lineHeight: 1.7, margin: 0 }}>
                No soy solo un docente, investigador o consultor que trabaja temas de inteligencia artificial.
                He construido herramientas, metodologías, investigación, reflexión y experiencia aplicada que
                forman un ecosistema coherente para comprender y acompañar la transformación de la educación superior.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {["Investigador", "Docente universitario", "Metodólogo", "Consultor", "Autor", "Proyección internacional"].map(t => (
                  <span key={t} style={{
                    background: PALETTE.card, border: `1px solid ${PALETTE.border}`,
                    padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    color: PALETTE.textSoft,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ─── ECOSISTEMA ─── */}
      <section style={{
        padding: "60px 24px 80px",
        background: `linear-gradient(180deg, ${PALETTE.bg} 0%, ${PALETTE.bgAlt} 50%, ${PALETTE.bg} 100%)`,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.gold, fontWeight: 700, marginBottom: 8 }}>ECOSISTEMA INTERRELACIONAL</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 800, margin: "0 0 8px" }}>
                Arquitectura fractal de educación e IA
              </h2>
              <p style={{ color: PALETTE.textSoft, fontSize: 13, maxWidth: 480, margin: "0 auto" }}>
                Cada componente tiene identidad propia, pero todos se conectan y retroalimentan como nodos de una misma red.
              </p>
            </div>
          </Section>
          <Section delay={0.1}>
            <EcosystemFull active={activeEco} setActive={setActiveEco} />
          </Section>
          {activeEco !== null && (
            <div style={{
              maxWidth: 480, margin: "0 auto",
              background: PALETTE.card,
              border: `1px solid ${COMPONENTS[activeEco].color}30`,
              borderRadius: 16, padding: "24px 20px",
              animation: "fadeSlide 0.4s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28, color: COMPONENTS[activeEco].color }}>{COMPONENTS[activeEco].icon}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COMPONENTS[activeEco].color }}>{COMPONENTS[activeEco].label}</div>
                  <div style={{ fontSize: 11, color: PALETTE.textDim }}>{COMPONENTS[activeEco].tagline}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: PALETTE.text, lineHeight: 1.6, margin: "0 0 12px" }}>{COMPONENTS[activeEco].desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CONNECTIONS.filter(([a, b]) => a === activeEco || b === activeEco).map(([a, b], i) => {
                  const o = a === activeEco ? b : a;
                  return (
                    <span key={i} onClick={(e) => { e.stopPropagation(); setActiveEco(o); }} style={{
                      background: COMPONENTS[o].color + "12", color: COMPONENTS[o].color,
                      padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                      border: `1px solid ${COMPONENTS[o].color}25`, cursor: "pointer",
                    }}>→ {COMPONENTS[o].label}</span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── TESIS INTEGRADORA ─── */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <Section>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{
              width: 40, height: 2, background: PALETTE.gold,
              margin: "0 auto 24px", borderRadius: 2,
            }} />
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 3.5vw, 24px)",
              lineHeight: 1.55, fontStyle: "italic",
              color: PALETTE.text, margin: 0,
            }}>
              "La inteligencia artificial está obligando a repensar la universidad, el currículo,
              la formación docente, la investigación y la transformación institucional.
              Mi trabajo consiste en comprender, evaluar, diseñar y acompañar esa transformación
              desde metodologías, herramientas, investigación y experiencias aplicadas."
            </p>
            <div style={{
              width: 40, height: 2, background: PALETTE.gold,
              margin: "24px auto 0", borderRadius: 2,
            }} />
          </div>
        </Section>
      </section>

      {/* ─── LÍNEAS ESTRATÉGICAS ─── */}
      <section style={{ padding: "60px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
        <Section>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.accent, fontWeight: 700, marginBottom: 8 }}>COMPONENTES DEL ECOSISTEMA</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, margin: 0 }}>
              Líneas estratégicas
            </h2>
          </div>
        </Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {COMPONENTS.map((c, i) => (
            <Section key={i} delay={i * 0.08}>
              <ComponentCard comp={c} index={i} />
            </Section>
          ))}
        </div>
      </section>

      {/* ─── PILARES DE CONTENIDO ─── */}
      <section style={{
        padding: "80px 24px",
        background: `linear-gradient(180deg, ${PALETTE.bg} 0%, ${PALETTE.bgAlt} 100%)`,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.gold, fontWeight: 700, marginBottom: 8 }}>PENSAMIENTO & VISIÓN</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
                Pilares de contenido
              </h2>
              <p style={{ color: PALETTE.textSoft, fontSize: 13, maxWidth: 460, margin: "0 auto" }}>
                Artículos, reflexiones e investigación organizados en 6 ejes temáticos
              </p>
            </div>
          </Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {PILLARS.map((p, i) => (
              <Section key={i} delay={i * 0.06}>
                <div style={{
                  background: PALETTE.card, border: `1px solid ${p.color}20`,
                  borderRadius: 14, padding: "22px 18px",
                  position: "relative", overflow: "hidden",
                  minHeight: 140,
                }}>
                  <div style={{
                    position: "absolute", top: -12, right: -6,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 64, fontWeight: 900, color: p.color + "0a", lineHeight: 1,
                  }}>{p.num}</div>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: p.color, marginBottom: 14,
                    boxShadow: `0 0 16px ${p.color}50`,
                  }} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: p.color, marginBottom: 8, lineHeight: 1.25 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: PALETTE.textSoft, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERNACIONAL ─── */}
      <section style={{ padding: "80px 24px", maxWidth: 720, margin: "0 auto" }}>
        <Section>
          <div style={{
            background: PALETTE.card, border: `1px solid ${PALETTE.border}`,
            borderRadius: 20, padding: "36px 28px",
            display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap",
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "linear-gradient(135deg, #fb7185 0%, #f5a623 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, color: "#fff", fontWeight: 800, textAlign: "center",
              lineHeight: 1.2, flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}>COL<br/>↔<br/>POR</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.rose, fontWeight: 700, marginBottom: 8 }}>PROYECCIÓN INTERNACIONAL</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>
                Colombia — Portugal — América Latina
              </h3>
              <p style={{ fontSize: 13, color: PALETTE.textSoft, lineHeight: 1.6, margin: 0 }}>
                Docencia en maestría en el IPB, investigación multilingüe en tres idiomas,
                innovación con sector productivo y aprendizaje basado en desafíos.
                La dimensión internacional no es un complemento: es parte constitutiva del ecosistema.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* ─── CTA / CONTACTO ─── */}
      <section style={{
        padding: "80px 24px",
        background: `linear-gradient(180deg, ${PALETTE.bg} 0%, #0c1628 100%)`,
        textAlign: "center",
      }}>
        <Section>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: PALETTE.emerald, fontWeight: 700, marginBottom: 12 }}>CONECTEMOS</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 800, margin: "0 0 14px" }}>
              ¿Trabajamos juntos?
            </h2>
            <p style={{ fontSize: 14, color: PALETTE.textSoft, lineHeight: 1.6, marginBottom: 28 }}>
              Consultoría, conferencias, investigación colaborativa, transformación institucional y alianzas estratégicas.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {["Consultoría", "Conferencias", "Investigación", "Alianzas"].map(t => (
                <span key={t} style={{
                  background: PALETTE.card, border: `1px solid ${PALETTE.borderLight}`,
                  padding: "8px 18px", borderRadius: 24, fontSize: 12, fontWeight: 600,
                  color: PALETTE.textSoft,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
              <button style={{
                background: PALETTE.accent, color: "#060a14",
                border: "none", padding: "14px 32px", borderRadius: 28,
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>Escríbeme</button>
              <button onClick={() => setView("linkedin")} style={{
                background: "transparent", color: "#0a66c2",
                border: "1.5px solid #0a66c2", padding: "14px 32px",
                borderRadius: 28, fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>LinkedIn</button>
            </div>
          </div>
        </Section>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${PALETTE.border}`,
        padding: "24px", textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
          {COMPONENTS.map((c, i) => (
            <span key={i} style={{ fontSize: 14, color: c.color, opacity: 0.6 }}>{c.icon}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: PALETTE.textDim }}>
          Educación · Inteligencia Artificial · Transformación Universitaria
        </div>
        <div style={{ fontSize: 10, color: PALETTE.textDim, marginTop: 4, opacity: 0.5 }}>
          © 2026 — Todos los derechos reservados
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlide { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadePhrase { 0% { opacity:0; transform:translateY(8px) } 12% { opacity:1; transform:translateY(0) } 88% { opacity:1 } 100% { opacity:0 } }
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #243050; border-radius: 4px }
      `}</style>
    </div>
  );
}

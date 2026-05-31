import { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { Shield, Zap, Cpu, HardDrive } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

/* ── Inline SVG Logos ────────────────────────────────────────────── */
const OllamaLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <circle cx="32" cy="22" r="14" stroke="currentColor" strokeWidth="3" />
    <circle cx="26" cy="19" r="3" fill="currentColor" />
    <circle cx="38" cy="19" r="3" fill="currentColor" />
    <path d="M26 28 Q32 34 38 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M20 36 Q16 44 18 54 Q24 58 32 58 Q40 58 46 54 Q48 44 44 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M20 36 Q24 40 32 40 Q40 40 44 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="22" cy="49" r="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <circle cx="42" cy="49" r="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
  </svg>
);

const LMStudioLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <rect x="8" y="8" width="48" height="48" rx="10" stroke="currentColor" strokeWidth="3" />
    <rect x="16" y="16" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="23" cy="26" r="3" fill="currentColor" />
    <circle cx="32" cy="26" r="3" fill="currentColor" />
    <circle cx="41" cy="26" r="3" fill="currentColor" />
    <path d="M16 44 H32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M36 44 H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="34" y="41" width="4" height="6" rx="1" fill="currentColor" />
  </svg>
);

const HuggingFaceLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" />
    <circle cx="24" cy="26" r="4" fill="currentColor" />
    <circle cx="40" cy="26" r="4" fill="currentColor" />
    <path d="M20 40 Q32 50 44 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M10 20 Q14 12 20 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M54 20 Q50 12 44 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="26" r="1.5" fill="white" />
    <circle cx="40" cy="26" r="1.5" fill="white" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <path d="M32 8 C20 8 14 13 14 22 L14 28 L32 28 L32 30 L10 30 C6 30 4 35 4 40 C4 49 9 56 20 56 L26 56 L26 50 C26 45 29 42 32 42 L44 42 C50 42 56 37 56 31 L56 22 C56 13 50 8 32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M32 56 C44 56 50 51 50 42 L50 36 L32 36 L32 34 L54 34 C58 34 60 29 60 24 C60 15 55 8 44 8 L38 8 L38 14 C38 19 35 22 32 22 L20 22 C14 22 8 27 8 33 L8 42 C8 51 14 56 32 56Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="26" cy="19" r="2.5" fill="currentColor" />
    <circle cx="38" cy="45" r="2.5" fill="currentColor" />
  </svg>
);

const LangChainLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <circle cx="16" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="48" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
    <path d="M24 32 L40 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 16 L16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 48 L16 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M56 16 L48 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M56 48 L48 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="32" r="3" fill="currentColor" />
    <circle cx="48" cy="32" r="3" fill="currentColor" />
  </svg>
);

const ChromaLogo = () => (
  <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
    <ellipse cx="32" cy="20" rx="20" ry="8" stroke="currentColor" strokeWidth="2.5" />
    <path d="M12 20 L12 44 Q12 52 32 52 Q52 52 52 44 L52 20" stroke="currentColor" strokeWidth="2.5" />
    <ellipse cx="32" cy="36" rx="20" ry="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
    <circle cx="32" cy="20" r="4" fill="currentColor" />
  </svg>
);

/* ── Ollama Terminal Mock ─────────────────────────────────────────── */
function OllamaTerminal({ lines }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (line.instant) {
      const delay = setTimeout(() => {
        setVisibleLines(prev => [...prev, { text: line.text, color: line.color, prefix: line.prefix }]);
        setCurrentLine(c => c + 1);
        setCharIndex(0);
        setCurrentText('');
      }, line.delay || 300);
      return () => clearTimeout(delay);
    }

    if (charIndex < line.text.length) {
      const t = setTimeout(() => {
        setCurrentText(line.text.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, line.speed || 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, { text: line.text, color: line.color, prefix: line.prefix }]);
        setCurrentLine(c => c + 1);
        setCharIndex(0);
        setCurrentText('');
      }, line.pauseAfter || 400);
      return () => clearTimeout(t);
    }
  }, [currentLine, charIndex, lines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentText]);

  const activeLine = currentLine < lines.length ? lines[currentLine] : null;

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
        color: 'var(--accent-2)', lineHeight: 1.75,
        minHeight: '180px', maxHeight: '180px', overflowY: 'auto',
        padding: '1.25rem 1.5rem',
      }}
    >
      {visibleLines.map((line, i) => (
        <div key={i} style={{ color: line.color || 'var(--accent-2)' }}>
          {line.prefix && <span style={{ color: 'var(--accent-1)', marginRight: '0.5rem' }}>{line.prefix}</span>}
          {line.text}
        </div>
      ))}
      {activeLine && !activeLine.instant && (
        <div style={{ color: activeLine.color || 'var(--accent-2)' }}>
          {activeLine.prefix && <span style={{ color: 'var(--accent-1)', marginRight: '0.5rem' }}>{activeLine.prefix}</span>}
          {currentText}
          <Motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.65 }}
            style={{ display: 'inline-block', width: '7px', height: '14px', background: 'var(--accent-2)', marginLeft: '2px', verticalAlign: 'middle' }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
export default function AILab() {
  const { t } = useLanguage();
  const data = t('ailab');

  const TOOLS = [
    { key: 'ollama',      Logo: OllamaLogo,      color: 'var(--accent-2)', glow: 'rgba(16,185,129,0.12)' },
    { key: 'lmstudio',   Logo: LMStudioLogo,    color: 'var(--accent-1)', glow: 'rgba(0,242,254,0.12)' },
    { key: 'huggingface',Logo: HuggingFaceLogo, color: '#f59e0b',         glow: 'rgba(245,158,11,0.12)' },
    { key: 'python',     Logo: PythonLogo,      color: '#3b82f6',         glow: 'rgba(59,130,246,0.12)' },
    { key: 'langchain',  Logo: LangChainLogo,   color: 'var(--accent-3)', glow: 'rgba(139,92,246,0.12)' },
    { key: 'chroma',     Logo: ChromaLogo,      color: '#f472b6',         glow: 'rgba(244,114,182,0.12)' },
  ];

  const terminalLines = data.terminalLines;

  return (
    <section id="ailab" className="section container">
      <SectionLabel number={2} label={data.label} />

      <Motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {data.titlePrefix} <span className="text-gradient">{data.titleHighlight}</span>
      </Motion.h2>

      <Motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {data.subtitle}
      </Motion.p>

      {/* Tool Cards Grid */}
      <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
        {TOOLS.map((tool, i) => {
          const info = data.tools[tool.key];
          return (
            <Motion.div
              key={tool.key}
              className="glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${tool.color}30` }}
              style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Glow corner */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${tool.glow}, transparent 70%)`, pointerEvents: 'none' }} />

              {/* Icon + Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
                <div style={{ color: tool.color, opacity: 0.9 }}>
                  <tool.Logo />
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
                  color: 'var(--accent-2)', borderRadius: '999px',
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.5px',
                  padding: '0.18rem 0.55rem',
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-2)', boxShadow: '0 0 6px var(--accent-2)', animation: 'pulse-dot 2s ease-in-out infinite', display: 'block' }} />
                  {data.activeLabel}
                </span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                {info.name}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                {info.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {info.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.7rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace',
                    background: `${tool.color}10`, color: tool.color,
                    padding: '0.18rem 0.45rem', borderRadius: '5px', border: `1px solid ${tool.color}25`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Motion.div>
          );
        })}
      </div>

      {/* Bottom row: Privacy card + Ollama terminal */}
      <div className="grid-cols-2">
        {/* Privacy-First Card */}
        <Motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.25)' }}
          style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '120px', background: 'radial-gradient(circle at top left, rgba(139,92,246,0.1), transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.65rem', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', color: 'var(--accent-3)' }}>
              <Shield size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{data.privacy.title}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-3)', fontWeight: 600 }}>{data.privacy.tagline}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.privacy.points.map((point, i) => {
              const icons = [<Shield size={15} />, <Zap size={15} />, <Cpu size={15} />, <HardDrive size={15} />];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div style={{ color: 'var(--accent-3)', marginTop: '1px', flexShrink: 0 }}>
                    {icons[i % icons.length]}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{point.title}</span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.1rem', lineHeight: 1.5 }}>{point.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Motion.div>

        {/* Ollama Terminal Mock */}
        <Motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden', padding: 0 }}
        >
          {/* Terminal header */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', padding: '0.6rem 1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56', display: 'block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e', display: 'block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f', display: 'block' }} />
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {data.terminalTitle}
            </span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.5px',
              background: 'rgba(16,185,129,0.1)', color: 'var(--accent-2)',
              border: '1px solid rgba(16,185,129,0.2)', borderRadius: '999px',
              padding: '0.1rem 0.5rem',
            }}>
              {data.terminalBadge}
            </span>
          </div>

          <OllamaTerminal lines={terminalLines} />

          {/* Hardware strip */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '0.65rem 1.5rem',
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
          }}>
            {data.hwSpecs.map(spec => (
              <div key={spec.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-1)', boxShadow: '0 0 5px var(--accent-1)' }} />
                <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-1)', fontWeight: 700 }}>{spec.label}</span> {spec.value}
                </span>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

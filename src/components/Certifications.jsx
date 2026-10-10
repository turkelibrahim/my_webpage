import { motion as Motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

const ISSUER_META = {
  SAS: { color: '#00BCD4', short: 'SAS', bg: 'rgba(0,188,212,0.12)', border: 'rgba(0,188,212,0.25)' },
  'Turkcell Akademi': { color: '#FFD600', short: 'TURKCELL', bg: 'rgba(255,214,0,0.1)', border: 'rgba(255,214,0,0.25)' },
  Udemy: { color: '#a435f0', short: 'UDEMY', bg: 'rgba(164,53,240,0.12)', border: 'rgba(164,53,240,0.25)' },
  'BTK Akademi': { color: '#8b5cf6', short: 'BTK', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
};

const STAT_COLORS = ['var(--accent-1)', '#00BCD4', '#8b5cf6', '#FFD600'];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };
}

function CertCard({ cert, index }) {
  const { t } = useLanguage();
  const meta = ISSUER_META[cert.issuer] || { color: '#00f2fe', short: cert.issuer, bg: 'rgba(0,242,254,0.12)', border: 'rgba(0,242,254,0.25)' };

  return (
    <Motion.div
      className="glass-panel cert-card"
      {...fadeUp(0.05 + index * 0.06)}
      whileHover={{ y: -5, boxShadow: `0 20px 44px rgba(0,0,0,0.45), 0 0 0 1px ${meta.color}35` }}
      style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '130px', height: '130px', background: `radial-gradient(circle, ${meta.color}18 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 700, color: meta.color, letterSpacing: '1.5px', background: meta.bg, border: `1px solid ${meta.border}`, padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
          {meta.short}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981', fontSize: '0.72rem', fontWeight: 600 }}>
          <CheckCircle2 size={12} />
          <span>{t('common.completed')}</span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.45, marginBottom: '0.4rem', position: 'relative', zIndex: 1 }}>
        {cert.title}
      </h3>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem', position: 'relative', zIndex: 1, fontFamily: 'JetBrains Mono, monospace' }}>
        {cert.date}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', position: 'relative', zIndex: 1, marginBottom: cert.credentialUrl ? '1rem' : 0 }}>
        {cert.skills.map(skill => (
          <span key={skill} style={{ fontSize: '0.72rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', background: `${meta.color}10`, color: meta.color, padding: '0.18rem 0.5rem', borderRadius: '4px', border: `1px solid ${meta.color}25` }}>
            #{skill}
          </span>
        ))}
      </div>

      {cert.credentialUrl && (
        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" style={{ color: meta.color, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          {t('common.viewCertificate')}
        </a>
      )}
    </Motion.div>
  );
}

export default function Certifications() {
  const { t } = useLanguage();
  const certs = t('certifications.items');
  const stats = t('certifications.stats');

  return (
    <section id="certifications" className="section container">
      <SectionLabel number={5} label={t('certifications.label')} />
      <Motion.h2 className="section-title" {...fadeUp(0)}>
        {t('certifications.titlePrefix')} <span className="text-gradient">{t('certifications.titleHighlight')}</span>
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {t('certifications.subtitle')}
      </Motion.p>

      <Motion.div {...fadeUp(0.1)} className="cert-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
        {stats.map((stat, index) => {
          const color = STAT_COLORS[index];
          return (
            <div key={stat.label} className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', background: `linear-gradient(135deg, ${color}, ${color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </Motion.div>

      <div className="grid-cols-2">
        {certs.map((cert, index) => (
          <CertCard key={`${cert.issuer}-${cert.title}`} cert={cert} index={index} />
        ))}
      </div>

      <Motion.div {...fadeUp(0.5)} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
        {Object.entries(ISSUER_META).map(([name, meta]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
          </div>
        ))}
      </Motion.div>
    </section>
  );
}

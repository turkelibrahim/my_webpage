import { motion as Motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

const GROUP_META = [
  { color: 'var(--accent-1)', glow: 'rgba(0,242,254,0.12)' },
  { color: 'var(--accent-2)', glow: 'rgba(16,185,129,0.12)' },
  { color: 'var(--accent-3)', glow: 'rgba(139,92,246,0.12)' },
  { color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
  { color: '#a78bfa', glow: 'rgba(167,139,250,0.12)' },
  { color: 'var(--accent-3)', glow: 'rgba(139,92,246,0.12)' },
  { color: 'var(--accent-1)', glow: 'rgba(0,242,254,0.12)' },
  { color: '#10b981', glow: 'rgba(16,185,129,0.12)' },
];

function SkillBar({ name, level, color, delay }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{name}</span>
        <span style={{ fontSize: '0.72rem', color, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
          {level}%
        </span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <Motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(to right, ${color}60, ${color})`, boxShadow: `0 0 6px ${color}60` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const skillGroups = t('skills.groups');

  return (
    <section id="skills" className="section container">
      <SectionLabel number={2} label={t('skills.label')} />
      <Motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('skills.titlePrefix')} <span className="text-gradient">{t('skills.titleHighlight')}</span>
      </Motion.h2>
      <Motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {t('skills.subtitle')}
      </Motion.p>

      <div className="grid-cols-3">
        {skillGroups.map((group, groupIndex) => {
          const meta = GROUP_META[groupIndex];
          return (
            <Motion.div
              key={group.category}
              className="glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: groupIndex * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${meta.color}25` }}
              style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', background: `radial-gradient(circle at top right, ${meta.glow}, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.4rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: meta.color, boxShadow: `0 0 8px ${meta.color}`, flexShrink: 0 }} />
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>
                  {group.category}
                </h3>
              </div>

              {group.items.map((item, itemIndex) => (
                <SkillBar key={item.name} name={item.name} level={item.level} color={meta.color} delay={0.08 + itemIndex * 0.05} />
              ))}
            </Motion.div>
          );
        })}
      </div>
    </section>
  );
}

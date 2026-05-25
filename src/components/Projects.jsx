import { motion as Motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

const PROJECT_COLORS = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-1)', 'var(--accent-2)'];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function Projects() {
  const { t } = useLanguage();
  const projects = t('projects.items');
  const experience = t('projects.experience');

  return (
    <section id="projects" className="section container">
      <SectionLabel number={4} label={t('projects.label')} />
      <Motion.h2 className="section-title" {...fadeUp(0)}>
        {t('projects.titlePrefix')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {t('projects.subtitle')}
      </Motion.p>

      <div className="grid-cols-2" style={{ marginBottom: '3rem' }}>
        {projects.map((project, index) => {
          const color = PROJECT_COLORS[index];
          return (
            <Motion.div
              key={project.number}
              className="glass-panel"
              {...fadeUp(0.1 + index * 0.1)}
              whileHover={{ y: -7, boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${color}30` }}
              style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '-8px', right: '12px', fontFamily: 'Outfit, sans-serif', fontSize: '6rem', fontWeight: 900, color, opacity: 0.04, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px' }}>
                {project.number}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                <span className="badge" style={{ background: `${color}15`, color, borderColor: `${color}35` }}>
                  {project.role}
                </span>
                <ExternalLink size={15} color={color} style={{ opacity: 0.5, marginTop: '2px' }} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                {project.title}
              </h3>

              <ul style={{ padding: 0, margin: '0 0 1.75rem', listStyle: 'none', position: 'relative', zIndex: 1 }}>
                {project.points.map(point => (
                  <li key={point} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.6rem' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, marginTop: '0.52rem', flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', position: 'relative', zIndex: 1, marginBottom: project.repoUrl ? '1rem' : 0 }}>
                {project.tech.map(tech => (
                  <span key={tech} style={{ fontSize: '0.75rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', background: `${color}10`, color, padding: '0.22rem 0.55rem', borderRadius: '5px', border: `1px solid ${color}28` }}>
                    #{tech}
                  </span>
                ))}
              </div>

              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', position: 'relative', zIndex: 1 }}>
                  {t('common.githubRepo')} <ExternalLink size={14} />
                </a>
              )}
            </Motion.div>
          );
        })}
      </div>

      <Motion.div className="glass-panel" {...fadeUp(0.3)} style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', background: 'rgba(16,185,129,0.1)', borderRadius: '10px', color: 'var(--accent-2)' }}>
              <Briefcase size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{t('projects.experienceTitle')}</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                {experience.period} - {experience.duration}
              </span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-2)', fontWeight: 700 }}>
              {experience.role}
            </span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              {experience.company}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2.5rem' }}>
          {experience.points.map(point => (
            <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', flex: '1 1 280px', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-2)', marginTop: '0.52rem', flexShrink: 0 }} />
              {point}
            </div>
          ))}
        </div>
      </Motion.div>
    </section>
  );
}

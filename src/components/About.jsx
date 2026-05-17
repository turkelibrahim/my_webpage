import { motion as Motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, Bot, BrainCircuit, Database, CheckCircle2, Globe2 } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

const FOCUS_META = [
  { icon: <Bot size={20} />, color: 'var(--accent-1)' },
  { icon: <BrainCircuit size={20} />, color: 'var(--accent-2)' },
  { icon: <Database size={20} />, color: 'var(--accent-3)' },
];

const TIMELINE_META = [
  { icon: <GraduationCap size={15} />, color: 'var(--accent-3)' },
  { icon: <Briefcase size={15} />, color: 'var(--accent-2)' },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  };
}

export default function About() {
  const { t } = useLanguage();
  const focusAreas = t('about.focusAreas');
  const competencies = t('about.competencies');
  const timeline = t('about.timeline');
  const languages = t('about.languages');

  return (
    <section id="about" className="section container">
      <SectionLabel number={1} label={t('about.label')} />
      <Motion.h2 className="section-title" {...fadeUp()}>
        {t('about.titlePrefix')} <span className="text-gradient">&</span> {t('about.titleSuffix')}
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {t('about.subtitle')}
      </Motion.p>

      <div className="grid-cols-3" style={{ marginBottom: '4.5rem' }}>
        {focusAreas.map((focus, index) => {
          const meta = FOCUS_META[index];
          return (
            <Motion.div
              key={focus.title}
              className="glass-panel focus-card"
              {...fadeUp(0.08 + index * 0.1)}
              whileHover={{ y: -5 }}
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div className="focus-icon" style={{ color: meta.color, background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}>
                {meta.icon}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '1rem 0 0.4rem', color: '#fff' }}>
                {focus.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                {focus.text}
              </p>
            </Motion.div>
          );
        })}
      </div>

      <div className="grid-cols-2" style={{ gap: '2.5rem', alignItems: 'start', marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Motion.div className="glass-panel" {...fadeUp(0.1)} style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.4rem' }}>
              <div style={{ padding: '0.55rem', background: 'rgba(0,242,254,0.08)', borderRadius: '9px', color: 'var(--accent-1)' }}>
                <Target size={18} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{t('about.careerGoalTitle')}</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '0.93rem' }}>
              {t('about.careerGoalText1Start')}
              <strong style={{ color: 'var(--text-primary)' }}>{t('about.careerGoalText1Strong')}</strong>
              {t('about.careerGoalText1End')}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.93rem', marginBottom: '1.5rem' }}>
              {t('about.careerGoalText2')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {t('about.tags').map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </Motion.div>

          <Motion.div className="glass-panel" {...fadeUp(0.18)} style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.2rem' }}>
              {t('about.competenciesTitle')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {competencies.map(competency => (
                <div key={competency} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-2)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{competency}</span>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Motion.div {...fadeUp(0.15)}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.75rem' }}>
              {t('about.timelineTitleStart')} <span className="text-gradient">&</span> {t('about.timelineTitleEnd')}
            </h3>
            <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
              <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-1), var(--accent-3))', opacity: 0.25 }} />
              {timeline.map((item, index) => {
                const meta = TIMELINE_META[index];
                return (
                  <Motion.div
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: 0.1 + index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'relative', marginBottom: index < timeline.length - 1 ? '1.75rem' : 0 }}
                  >
                    <div style={{ position: 'absolute', left: '-1.75rem', top: '6px', width: '14px', height: '14px', borderRadius: '50%', background: meta.color, boxShadow: `0 0 10px ${meta.color}70`, border: '2px solid rgba(2,6,23,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '7px' }}>
                      {meta.icon}
                    </div>
                    <div className="glass-panel" style={{ padding: '1.4rem 1.6rem' }}>
                      <span style={{ fontSize: '0.72rem', color: meta.color, fontWeight: 700, letterSpacing: '0.5px', fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.year}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0.3rem 0 0.15rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: meta.color, fontWeight: 600, marginBottom: '0.4rem' }}>{item.subtitle}</p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
          </Motion.div>

          <Motion.div className="glass-panel" {...fadeUp(0.25)} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(0,242,254,0.08)', borderRadius: '9px', color: 'var(--accent-1)' }}>
                <Globe2 size={17} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{t('about.languagesTitle')}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {languages.map((language, index) => {
                const color = index === 0 ? 'var(--accent-2)' : 'var(--accent-1)';
                return (
                  <div key={language.lang}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{language.lang}</span>
                        {language.note && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginLeft: '0.6rem', fontFamily: 'JetBrains Mono, monospace' }}>
                            {language.note}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.78rem', color, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', background: `${color}15`, padding: '0.2rem 0.6rem', borderRadius: '6px', border: `1px solid ${color}30` }}>
                        {language.level}
                      </span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <Motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(to right, ${color}50, ${color})`, boxShadow: `0 0 6px ${color}50` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

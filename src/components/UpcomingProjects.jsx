import { motion as Motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function UpcomingProjects() {
  const { currentLanguage } = useLanguage();
  const color = 'var(--accent-1)';
  const color2 = 'var(--accent-2)';
  
  return (
    <section id="upcoming-projects" className="section container">
      <SectionLabel number={4} label="R&D" />
      <Motion.h2 className="section-title" {...fadeUp(0)}>
        {currentLanguage === 'tr' ? (
          <>Geliştirmekte Olduğumuz <span className="text-gradient">Projeler</span></>
        ) : (
          <>Upcoming <span className="text-gradient">R&D Projects</span></>
        )}
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {currentLanguage === 'tr' ? 'Yapay zeka alanında şekillenen yeni inisiyatifler.' : 'Initiatives shaping the future of AI.'}
      </Motion.p>

      <div style={{ marginTop: '3rem' }}>
        <Motion.div
          className="glass-panel"
          {...fadeUp(0.1)}
          whileHover={{ y: -7, boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${color}30` }}
          style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
            <span className="badge" style={{ background: `${color}15`, color, borderColor: `${color}35` }}>
              NLP Platform
            </span>
            <ExternalLink size={15} color={color} style={{ opacity: 0.5, marginTop: '2px' }} />
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            Ottoman Archive Intelligence (Powered by Claude API)
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
            In addition to our core AI_COMPANY_OS architecture, we are currently developing a specialized NLP platform. This project focuses on translating, analyzing, and indexing historical Ottoman archives, printed works, and manuscripts into modern Turkish. We use advanced AI to correct OCR errors, contextualize historical documents, and enable deep semantic search for researchers and academic institutions.
          </p>

          <a 
            href="https://github.com/turkelibrahim/INTELLIGENT-OTTOMAN-TURKISH-ASSISTANT.git" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', position: 'relative', zIndex: 1, padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${color}, ${color2})`, color: '#fff', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer' }}
          >
            View Repository on GitHub <ExternalLink size={16} />
          </a>
        </Motion.div>
      </div>
    </section>
  );
}

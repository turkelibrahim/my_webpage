import { motion as Motion } from 'framer-motion';
import { ExternalLink, Beaker } from 'lucide-react';
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
  const color = 'var(--accent-2)';

  const content = {
    tr: {
      sectionTitlePrefix: 'Geliştirmekte Olduğumuz',
      sectionTitleHighlight: 'Projeler',
      subtitle: 'Yapay zeka alanında şekillenen yeni inisiyatifler.',
      statusLabel: 'IN DEVELOPMENT',
      projectTitle: 'Ottoman Archive Intelligence',
      description: 'Ana AI_COMPANY_OS mimarimize ek olarak, şu anda özelleştirilmiş bir NLP platformu geliştiriyoruz. Bu proje; tarihi Osmanlı arşivlerini, matbu eserleri ve el yazmalarını modern Türkçeye çevirme, analiz etme ve indeksleme üzerine odaklanmaktadır. Gelişmiş yapay zeka kullanarak OCR hatalarını düzeltiyor, tarihi belgeleri bağlamsallaştırıyor ve araştırmacılar ile akademik kurumlar için derin anlamsal arama imkanı sunuyoruz.',
      capabilities: [
        'Osmanlıca Belge İşleme',
        'OCR Hata Düzeltme',
        'Tarihi Metin Analizi',
        'Modern Türkçe Çeviri',
        'Anlamsal Arama'
      ],
      githubBtn: 'GitHub Üzerinde İncele'
    },
    en: {
      sectionTitlePrefix: 'Current',
      sectionTitleHighlight: 'R&D Projects',
      subtitle: 'Initiatives shaping the future of AI.',
      statusLabel: 'IN DEVELOPMENT',
      projectTitle: 'Ottoman Archive Intelligence',
      description: 'In addition to our core AI_COMPANY_OS architecture, we are currently developing a specialized NLP platform. This project focuses on translating, analyzing, and indexing historical Ottoman archives, printed works, and manuscripts into modern Turkish. We use advanced AI to correct OCR errors, contextualize historical documents, and enable deep semantic search for researchers and academic institutions.',
      capabilities: [
        'Ottoman Turkish document processing',
        'OCR error correction',
        'Historical text analysis',
        'Modern Turkish translation',
        'Semantic search'
      ],
      githubBtn: 'View Repository on GitHub'
    }
  };

  const currentContent = content[currentLanguage];

  return (
    <section id="upcoming-projects" className="section container">
      <SectionLabel number={4} label={currentLanguage === 'tr' ? 'Ar-Ge Projeleri' : 'R&D Projects'} />
      <Motion.h2 className="section-title" {...fadeUp(0)}>
        {currentContent.sectionTitlePrefix} <span className="text-gradient">{currentContent.sectionTitleHighlight}</span>
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {currentContent.subtitle}
      </Motion.p>

      <div style={{ marginTop: '3rem' }}>
        <Motion.div
          className="glass-panel"
          {...fadeUp(0.1)}
          whileHover={{ y: -7, boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${color}30` }}
          style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
        >
          {/* Subtle Accent Glow */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div className="grid-cols-2" style={{ gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            
            {/* Left Content Column */}
            <div>
              {/* Top Label & Icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span className="badge" style={{ background: `${color}15`, color, borderColor: `${color}35`, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                  <Beaker size={12} /> {currentContent.statusLabel}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '1.25rem' }}>
                {currentContent.projectTitle}
              </h3>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {currentContent.description}
              </p>

              {/* Capabilities/Focus List */}
              <ul style={{ padding: 0, margin: '0 0 2rem', listStyle: 'none' }}>
                {currentContent.capabilities.map(point => (
                  <li key={point} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.6rem' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, marginTop: '0.52rem', flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>

              {/* GitHub Action */}
              <div>
                <a 
                  href="https://github.com/turkelibrahim/INTELLIGENT-OTTOMAN-TURKISH-ASSISTANT" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  {currentContent.githubBtn} <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Right Image Column */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/ottoman-project.png" 
                alt="Ottoman Archive Intelligence UI" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '12px', 
                  border: `1px solid ${color}30`, 
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4)` 
                }} 
              />
            </div>

          </div>
        </Motion.div>
      </div>
    </section>
  );
}

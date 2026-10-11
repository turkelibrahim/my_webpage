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
      sectionTitleHighlight: 'Ar-Ge Projeleri',
      subtitle: 'Tarihsel metinler ve Osmanlı arşivleri için yapay zekâ destekli analiz inisiyatifi.',
      statusLabel: 'AR-GE AŞAMASINDA',
      projectTitle: 'Intelligent Ottoman Turkish Assistant',
      description: 'Intelligent Ottoman Turkish Assistant, tarihi Osmanlı arşivlerini, matbu eserleri ve el yazmalarını incelemeye yönelik bağımsız bir yapay zekâ ve doğal dil işleme (NLP) araştırma projesidir. Belge işleme, OCR hata düzeltme, metinlerin Latin harflerine aktarımı, günümüz Türkçesine çevirisi ve anlamsal belge analizi süreçlerine odaklanmaktadır.',
      capabilities: [
        'Osmanlıca Belge İşleme & Analiz',
        'Gelişmiş OCR Hata Düzeltme',
        'Latin Harflerine Transkripsiyon',
        'Günümüz Türkçesine Çeviri',
        'Anlamsal ve Tarihsel Metin Arama'
      ],
      githubBtn: 'GitHub Üzerinde İncele'
    },
    en: {
      sectionTitlePrefix: 'Current',
      sectionTitleHighlight: 'R&D Projects',
      subtitle: 'AI-assisted analysis initiative for historical manuscripts and Ottoman archives.',
      statusLabel: 'IN DEVELOPMENT',
      projectTitle: 'Intelligent Ottoman Turkish Assistant',
      description: 'Intelligent Ottoman Turkish Assistant is an independent AI and NLP research project focused on analyzing, transliterating, and translating historical Ottoman archives, printed works, and manuscripts into modern Turkish. It targets document processing, OCR error correction, Latin transliteration, modern Turkish translation, and semantic document analysis for academic and archival research.',
      capabilities: [
        'Ottoman Turkish document processing & analysis',
        'Advanced OCR error correction',
        'Transliteration to Latin script',
        'Modern Turkish translation',
        'Semantic & historical text search'
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
                alt="Intelligent Ottoman Turkish Assistant — Tarihi Osmanlı Arşivleri Yapay Zekâ Analiz ve Çeviri Projesi Arayüzü" 
                loading="lazy"
                decoding="async"
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

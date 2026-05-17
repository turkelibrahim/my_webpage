import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { Download, Mail, Terminal, ArrowDown } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

const GithubIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function useTyping(text, speed = 40) {
  const [typingState, setTypingState] = useState({ text, value: '' });

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setTypingState({ text, value: text.slice(0, i + 1) });
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return typingState.text === text ? typingState.value : '';
}

function Counter({ end, suffix = '' }) {
  const [counterState, setCounterState] = useState({ end, value: 0 });

  useEffect(() => {
    const step = Math.ceil(end / 40);
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, end);
      setCounterState({ end, value: cur });
      if (cur >= end) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [end]);

  return <>{counterState.end === end ? counterState.value : 0}{suffix}</>;
}

export default function Hero() {
  const { t } = useLanguage();
  const typed = useTyping(t('hero.terminalText'), 38);
  const stats = t('hero.stats');

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="section flex-center" style={{ minHeight: '100vh', paddingTop: '68px', paddingBottom: '4rem' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <Motion.div variants={container} initial="hidden" animate="visible">
            <Motion.div variants={item} style={{ marginBottom: '1.25rem' }}>
              <span className="hero-available-badge">
                <span className="hero-available-dot" />
                {t('hero.availability')}
              </span>
            </Motion.div>

            <Motion.h1 variants={item} className="hero-title" style={{ fontSize: 'clamp(2.6rem, 4vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.25rem' }}>
              {t('hero.greeting')}<br />
              <span className="text-gradient">{t('hero.name')}</span>
            </Motion.h1>

            <Motion.p variants={item} className="hero-description" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '480px' }}>
              {t('hero.descriptionStart')}
              <strong style={{ color: 'var(--text-primary)' }}>{t('hero.degree')}</strong>
              {t('hero.descriptionMiddle')}
              <strong style={{ color: 'var(--accent-1)' }}>{t('hero.llm')}</strong>
              {t('hero.descriptionAfterLlm')}
              <strong style={{ color: 'var(--accent-2)' }}>{t('hero.aiApps')}</strong>
              {t('hero.descriptionEnd')}
            </Motion.p>

            <Motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#contact" className="btn-primary">
                {t('hero.contactCta')} <Mail size={17} />
              </a>
              <a href="/Ibrahim_Turkel_tr_CV.pdf" download className="btn-secondary">
                {t('hero.cvCta')} <Download size={17} />
              </a>
            </Motion.div>

            <Motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <a href="https://github.com/turkelibrahim" target="_blank" rel="noreferrer" className="social-btn">
                <GithubIcon size={19} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/ibrahim-türkel" target="_blank" rel="noreferrer" className="social-btn">
                <LinkedinIcon size={19} />
                <span>LinkedIn</span>
              </a>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div className="terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span style={{ background: '#ff5f56' }} />
                  <span style={{ background: '#ffbd2e' }} />
                  <span style={{ background: '#27c93f' }} />
                </div>
                <span className="terminal-title">
                  <Terminal size={12} /> {t('hero.terminalTitle')}
                </span>
                <span />
              </div>
              <pre className="terminal-body">
                {typed}
                <Motion.span className="terminal-cursor" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} />
              </pre>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {stats.map((stat, index) => (
                <Motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className="stat-number">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '2px' }}
        >
          <Motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>{t('common.scroll')}</span>
            <ArrowDown size={16} />
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}

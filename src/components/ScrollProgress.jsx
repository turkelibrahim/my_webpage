import { useEffect, useState } from 'react';
import { motion as Motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <Motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(to right, var(--accent-1), var(--accent-3))',
        transformOrigin: '0%',
        zIndex: 1100,
      }}
    />
  );
}

export function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      title={t('common.backToTop')}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        zIndex: 900,
        width: '44px', height: '44px', borderRadius: '12px',
        background: 'rgba(0,242,254,0.12)',
        border: '1px solid rgba(0,242,254,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent-1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        transition: 'background 0.2s, transform 0.2s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,242,254,0.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,242,254,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <ArrowUp size={18} />
    </Motion.button>
  );
}

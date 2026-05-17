import { useState, useEffect, useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/useLanguage';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = useMemo(() => [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.certifications'), href: '#certifications' },
    { label: t('nav.contact'), href: '#contact' },
  ], [t]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(link => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navLinks]);

  return (
    <>
      <Motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(2, 6, 23, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 242, 254, 0.08)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <a href="#" aria-label={t('nav.logoAria')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/it-logo.svg"
            alt={t('nav.logoAlt')}
            style={{
              width: '158px',
              height: '42px',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.18))',
            }}
          />
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navLinks.map(link => {
            const id = link.href.slice(1);
            return (
              <a
                key={id}
                href={link.href}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: active === id ? 'var(--accent-1)' : 'var(--text-secondary)',
                  background: active === id ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseOver={e => { if (active !== id) e.currentTarget.style.color = '#fff'; }}
                onMouseOut={e => { if (active !== id) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="https://github.com/turkelibrahim" target="_blank" rel="noreferrer" className="nav-icon-btn" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/ibrahim-türkel" target="_blank" rel="noreferrer" className="nav-icon-btn" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <LanguageSwitcher />
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(value => !value)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'none', padding: '0.4rem' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '68px', left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(2, 6, 23, 0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(0, 242, 254, 0.1)',
              padding: '1rem 2rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.color = 'var(--accent-1)'; e.currentTarget.style.background = 'rgba(0,242,254,0.06)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link.label}
              </a>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

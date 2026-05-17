import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '../i18n/useLanguage';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function fadeUp(delay) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const socials = [
    { icon: <GithubIcon size={20} />, label: 'GitHub', href: 'https://github.com/turkelibrahim', color: 'var(--text-primary)' },
    { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/ibrahim-türkel', color: '#0a66c2' },
    { icon: <Mail size={20} />, label: t('contact.email'), href: 'mailto:ibrahimturkel18@gmail.com', color: 'var(--accent-1)' },
  ];

  const contactItems = [
    { icon: <Mail size={20} />, label: t('contact.email'), value: 'ibrahimturkel18@gmail.com', href: 'mailto:ibrahimturkel18@gmail.com' },
    { icon: <MapPin size={20} />, label: t('contact.location'), value: t('contact.locationValue'), href: null },
  ];

  const fields = [
    { name: 'name', label: t('contact.nameLabel'), type: 'text', placeholder: t('contact.namePlaceholder') },
    { name: 'email', label: t('contact.email'), type: 'email', placeholder: t('contact.emailPlaceholder') },
  ];

  const handleChange = event => setForm(value => ({ ...value, [event.target.name]: event.target.value }));

  const handleSubmit = event => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    const body = `${t('contact.mailBodyName')}: ${form.name}\n${t('contact.mailBodyEmail')}: ${form.email}\n\n${t('contact.mailBodyMessage')}:\n${form.message}`;
    const mailtoLink = `mailto:ibrahimturkel18@gmail.com?subject=${encodeURIComponent(`${t('contact.mailSubject')}: ${form.name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section container">
      <SectionLabel number={5} label={t('contact.label')} />
      <Motion.h2 className="section-title" {...fadeUp(0)}>
        {t('contact.titlePrefix')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
      </Motion.h2>
      <Motion.p className="section-subtitle" {...fadeUp(0.08)}>
        {t('contact.subtitle')}
      </Motion.p>

      <div className="grid-cols-2" style={{ gap: '3rem', alignItems: 'start' }}>
        <Motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>{t('contact.reachTitle')}</h3>

            {contactItems.map((item, index) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: index < contactItems.length - 1 ? '1.25rem' : 0 }}>
                <div style={{ padding: '0.75rem', background: 'rgba(0,242,254,0.08)', borderRadius: '12px', color: 'var(--accent-1)', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.15rem' }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>{item.value}</a>
                  ) : (
                    <p style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
              {t('contact.socialTitle')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-secondary)', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <span style={{ color: social.color }}>{social.icon}</span>
                  <span style={{ fontWeight: 500 }}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderLeft: '3px solid var(--accent-3)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--accent-3)', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{t('contact.referenceLabel')}</p>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>{t('contact.referenceName')}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{t('contact.referenceRole')}</p>
            <a href="mailto:oturkel63@outlook.com" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={13} color="var(--accent-2)" /> oturkel63@outlook.com
            </a>
          </div>
        </Motion.div>

        <Motion.div className="glass-panel" {...fadeUp(0.18)} style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{t('contact.formTitle')}</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            {t('contact.formSubtitle')}
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {fields.map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>{field.label}</label>
                  <input name={field.name} type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={handleChange} className="contact-input" />
                </div>
              ))}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>{t('contact.messageLabel')}</label>
              <textarea name="message" rows={5} placeholder={t('contact.messagePlaceholder')} value={form.message} onChange={handleChange} className="contact-input" style={{ resize: 'vertical', minHeight: '120px' }} />
            </div>

            {status === 'error' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.88rem' }}>
                <AlertCircle size={16} /> {t('contact.error')}
              </div>
            )}
            {status === 'success' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-2)', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} /> {t('contact.success')}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              {t('contact.send')} <Send size={17} />
            </button>
          </form>
        </Motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 1.5rem' }} />
        © {new Date().getFullYear()} İbrahim Türkel · {t('contact.footerRights')}
      </div>
    </section>
  );
}

import { motion as Motion } from 'framer-motion';

export default function SectionLabel({ number, label }) {
  return (
    <Motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '1rem', justifyContent: 'center',
      }}
    >
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem', fontWeight: 500,
        color: 'var(--accent-1)', letterSpacing: '2px',
        opacity: 0.7,
      }}>
        {String(number).padStart(2, '0')} /
      </span>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem', fontWeight: 500,
        color: 'var(--text-secondary)', letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, var(--accent-1), transparent)', opacity: 0.4 }} />
    </Motion.div>
  );
}

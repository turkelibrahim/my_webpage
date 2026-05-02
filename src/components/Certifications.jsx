import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    {
      title: 'Certified Information Systems Security Professional (CISSP)',
      issuer: 'ISC2',
      date: 'Ekim 2023',
      skills: ['Risk Management', 'Security Architecture', 'Network Security'],
      link: '#'
    },
    {
      title: 'Advanced PHP & MySQL Backend Masterclass',
      issuer: 'Udemy',
      date: 'Ocak 2023',
      skills: ['PHP 8', 'MySQL', 'REST API', 'OOP'],
      link: '#'
    },
    {
      title: 'Cisco Certified CyberOps Associate',
      issuer: 'Cisco',
      date: 'Ağustos 2022',
      skills: ['Threat Analysis', 'Security Monitoring', 'Incident Response'],
      link: '#'
    },
    {
      title: 'Practical Ethical Hacking (PEH)',
      issuer: 'TCM Security',
      date: 'Mayıs 2022',
      skills: ['Penetration Testing', 'Active Directory', 'Web Exploitation'],
      link: '#'
    }
  ];

  return (
    <section id="certifications" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Eğitim & <span className="text-gradient">Sertifikalar</span></h2>
        <p className="section-subtitle">
          Sürekli öğrenme ve mesleki gelişim kapsamında elde edilen uluslararası geçerli sertifikalar.
        </p>
        
        <div className="grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              className="glass-panel" 
              style={{ 
                padding: '2.5rem', 
                transformStyle: 'preserve-3d', 
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02, boxShadow: '0 20px 40px rgba(0,242,254,0.15)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}></div>

              <div style={{ marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-3)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                    {cert.issuer}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                    {cert.date}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.4 }}>{cert.title}</h3>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem', transform: 'translateZ(20px)' }}>
                {cert.skills.map((skill, k) => (
                  <span key={k} style={{ 
                    color: 'var(--accent-1)', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    background: 'rgba(0, 242, 254, 0.05)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 242, 254, 0.1)'
                  }}>#{skill}</span>
                ))}
              </div>

              {cert.link !== '#' && (
                <div style={{ marginTop: '2rem', transform: 'translateZ(25px)' }}>
                   <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: '100%' }}>
                     Sertifikayı Görüntüle
                   </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

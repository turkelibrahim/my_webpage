import { motion } from 'framer-motion';

export default function Skills() {
  const skillsData = [
    { category: 'Programlama', items: ['C++', 'Python', 'PHP', 'Java', 'C#', 'JavaScript'] },
    { category: 'Backend & Mimari', items: ['RESTful API Tasarımı', 'Asenkron Sistemler', 'Sunucu Mimarileri'] },
    { category: 'Veritabanı', items: ['PostgreSQL', 'MySQL', 'İlişkisel DB Tasarımı', 'Sorgu Optimizasyonu'] },
    { category: 'Siber Güvenlik', items: ['Sızma Testleri (Pentesting)', 'Zafiyet Analizi', 'Güvenli Kodlama', 'Ağ Güvenliği', 'OWASP'] },
    { category: 'Araçlar & Standartlar', items: ['Git', 'GitHub', 'Linux', 'Docker', 'SOLID', 'Clean Code', 'DRY'] },
    { category: 'Web & Frontend', items: ['HTML5', 'CSS3', 'React'] },
    { category: 'Bilgisayar Bilimi', items: ['Veri Yapıları', 'Algoritma Tasarımı', 'Big-O Analizi', 'Siber Güvenlik'] }
  ];

  return (
    <section id="skills" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Teknik <span className="text-gradient">Yetkinlikler</span></h2>
        <p className="section-subtitle">
          Gelişmiş teknolojiler ve mühendislik pratikleri ile donatılmış modern yetkinlik setim.
        </p>
        
        <div className="grid-cols-3">
          {skillsData.map((skillGroup, index) => (
            <motion.div 
              key={index}
              className="glass-panel" 
              style={{ padding: '2rem', transformStyle: 'preserve-3d' }}
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#fff', transform: 'translateZ(20px)' }}>{skillGroup.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', transform: 'translateZ(30px)' }}>
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      background: 'rgba(255,255,255,0.05)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

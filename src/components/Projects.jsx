import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Yapay Zeka Destekli İngilizce Eğitim Platformu',
      role: 'Backend Geliştirici',
      tech: ['PHP', 'MySQL', 'Algoritma Tasarımı'],
      points: [
        'PHP tabanlı, ölçeklenebilir ve yüksek performanslı backend mimarisi tasarımı.',
        'Kullanıcı performans verilerini analiz ederek dinamik içerik sunan algoritmalar.',
        'Modüler yapı ve DRY (Don\'t Repeat Yourself) prensibine tam uyum.'
      ]
    },
    {
      title: 'Yapay Zeka Tabanlı Kariyer Analiz Sistemi',
      role: 'Backend & Veri Mimarı',
      tech: ['PHP', 'MySQL', 'Veri İşleme', 'Optimizasyon'],
      points: [
        'Veri erişim performansını artırmak amacıyla ileri seviye sorgu optimizasyonları.',
        'Kullanıcı verilerini analiz ederek kişiselleştirilmiş kariyer projeksiyonları.',
        'Yüksek performanslı veri işleme için ölçeklenebilir veri modeli tasarımı.'
      ]
    },
    {
      title: 'Siber Güvenlik Zafiyet Analizi ve Sistem Sıkılaştırma',
      role: 'Güvenlik Araştırmacısı',
      tech: ['Sızma Testi', 'Ağ Güvenliği', 'Linux', 'Kriptografi'],
      points: [
        'Ağ topolojileri üzerinde kapsamlı zafiyet tarama işlemleri ve risk raporlaması.',
        'Mevcut sistemlerde tespit edilen açıklara yönelik güvenlik sıkılaştırma (hardening) politikalarının oluşturulması.',
        'Güvenlik ve penetrasyon testleri (Pentesting) süreçlerinde senaryo tabanlı teknik uygulamalar.'
      ]
    },
    {
      title: 'Online Yetenek Tabanlı Sınav Sistemi',
      role: 'Backend & Veritabanı Geliştiricisi',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Oyunlaştırma'],
      points: [
        'Kapasite yönetimi ve liderlik tablolarıyla (Badges) zenginleştirilmiş modern değerlendirme platformu.',
        'Sunucu tabanlı doğrulama ve veri bütünlüğü sağlayan yüksek güvenli backend mantığı.',
        'Asenkron Javascript sayaçları ve otomatik gönderim ile adil sınav (anti-cheat) mekanizmaları.'
      ]
    }
  ];

  return (
    <section id="projects" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Projeler <span className="text-gradient">& Analizler</span></h2>
        <p className="section-subtitle">
          Gerçek dünya problemlerine ve güvenlik tehditlerine karşı performanslı, sürdürülebilir çözümler.
        </p>
        
        <div className="grid-cols-2" style={{ marginBottom: '3rem' }}>
          {projects.map((proj, i) => (
            <motion.div 
              key={i} 
              className="glass-panel" 
              style={{ padding: '2.5rem', transformStyle: 'preserve-3d' }}
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div style={{ marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>
                <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{proj.role}</span>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', lineHeight: 1.3 }}>{proj.title}</h3>
              </div>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                {proj.points.map((pt, j) => (
                  <li key={j} style={{ marginBottom: '0.8rem' }}>{pt}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                {proj.tech.map((t, k) => (
                  <span key={k} style={{ color: 'var(--accent-2)', fontSize: '0.85rem', fontWeight: 600 }}>#{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-3)' }}>Profesyonel Deneyim</h3>
           <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>TÜRKEL ZİRAİ ÜRÜNLER TARIM PETROL - Satış ve Operasyon</h4>
           <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Ağustos 2020 - Eylül 2023</p>
           <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: 1.7 }}>
              <li style={{ marginBottom: '0.5rem' }}>Saha operasyon süreçlerinin koordinasyonu ve yönetimsel takibi sağlandı.</li>
              <li style={{ marginBottom: '0.5rem' }}>Müşteri ilişkileri yönetimi ve profesyonel iletişim süreçlerinde aktif rol alındı.</li>
              <li>Operasyonel verimliliğin artırılması amacıyla iş akış süreçlerine analitik katkıda bulunuldu.</li>
           </ul>
        </div>
      </motion.div>
    </section>
  );
}

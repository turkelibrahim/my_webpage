import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Hakkımda <span className="text-gradient">&</span> Eğitim</h2>
        <p className="section-subtitle">
          Sürekli öğrenmeyi ve teknolojik gelişmelere adapte olmayı ilke edinmiş bir mühendis adayıyım.
        </p>

        <div className="grid-cols-2">
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-1)' }}>Kariyer Hedefim</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Temel kariyer hedefim, <strong>yüksek performanslı backend sistem mimarileri</strong> ve sistem tasarımı konularında uzmanlaşmaktır. Mühendislik prensiplerini odağa alarak, büyük veri setlerini işleyen ve gerçek dünya problemlerine sürdürülebilir, performanslı çözümler sunan sistemler geliştirmeyi amaçlıyorum.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              SOLID ve Clean Code gibi prensiplere tam bağlılıkla, analitik düşünme ve sistematik problem çözme becerilerimi her projede uygulamaya özen gösteriyorum.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-3)' }}>Eğitim Durumum</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Ankara Bilim Üniversitesi</h4>
              <p style={{ color: 'var(--accent-2)', fontWeight: 500, marginBottom: '0.5rem' }}>Bilgisayar Mühendisliği (%100 İngilizce)</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>2022 - Günümüz</p>
            </div>
            <ul style={{ color: 'var(--text-secondary)', listStyleType: 'none', lineHeight: 1.8 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-2)' }}></div>
                Mevcut Durum: 3. Sınıf Öğrencisi
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-2)' }}></div>
                Beklenen Mezuniyet: 2027
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-2)' }}></div>
                İngilizce: B1/B2 Seviyesi (Proficiency)
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

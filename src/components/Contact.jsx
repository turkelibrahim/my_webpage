import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Code, User } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section container">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">İletişime <span className="text-gradient">Geç</span></h2>
        
        <div className="grid-cols-2">
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Bana Ulaşın</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0,242,254,0.1)', borderRadius: '12px', color: 'var(--accent-1)' }}>
                <Mail size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>E-posta</p>
                <a href="mailto:ibrahimturkel18@gmail.com" style={{ display: 'block', color: '#fff', fontWeight: 500 }}>ibrahimturkel18@gmail.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0,242,254,0.1)', borderRadius: '12px', color: 'var(--accent-1)' }}>
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Konum</p>
                <p style={{ color: '#fff', fontWeight: 500 }}>Ankara, Türkiye</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://github.com/Trklibrahim" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                <Code size={20} />
              </a>
              <a href="https://linkedin.com/in/ibrahim-türkel" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                <User size={20} />
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-3)', marginBottom: '1.5rem' }}>Referans</h3>
            <div style={{ borderLeft: '3px solid var(--accent-3)', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>Ömer Türkel</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Şirket Müdürü, Türkel Zirai Ürünleri</p>
                

                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <Mail size={16} color="var(--accent-2)" /> oturkel63@outlook.com
                </p>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', paddingBottom: '2rem' }}>
           © {new Date().getFullYear()} İbrahim Türkel. Tüm Hakları Saklıdır.
        </div>
      </motion.div>
    </section>
  );
}

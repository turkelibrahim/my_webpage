import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, User, Download, Mail, Terminal } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = "> system.initialize({\n  role: 'Backend Developer',\n  focus: 'Cyber Security',\n  status: 'Ready'\n});";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="section flex-center" style={{ minHeight: '100vh', paddingTop: '0' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Terminal Effect Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            maxWidth: '600px', 
            margin: '0 auto 2rem auto', 
            background: 'rgba(2, 6, 23, 0.7)', 
            border: '1px solid rgba(16, 185, 129, 0.2)', 
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={14} color="var(--accent-2)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ibrahim@terminal:~</span>
          </div>
          <div style={{ padding: '1.5rem', fontFamily: 'monospace', color: 'var(--accent-2)', fontSize: '0.9rem', whiteSpace: 'pre-wrap', lineHeight: 1.5, minHeight: '120px' }}>
            {typedText}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-2)', marginLeft: '4px', verticalAlign: 'middle' }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <span className="badge" style={{ borderColor: 'var(--accent-2)', color: 'var(--accent-2)', background: 'rgba(16, 185, 129, 0.1)' }}>Geleceği Kodlayan Mühendis</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
            Merhaba, Ben <br/>
            <span className="text-gradient">İbrahim Türkel</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            Ankara Bilim Üniversitesi Bilgisayar Mühendisliği Öğrencisi. 
            Yüksek performanslı <strong style={{color: 'var(--text-primary)'}}>backend mimarileri</strong> ve <strong style={{color: 'var(--accent-2)'}}>siber güvenlik</strong> çözümleri üretiyorum.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary">
              İletişime Geç <Mail size={20} />
            </a>
            <a href="/İbrahim_TÜRKEL_CV_tr.pdf" download className="btn-secondary">
              CV İndir <Download size={20} />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
            <a href="https://github.com/Trklibrahim" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <Code size={28} />
            </a>
            <a href="https://linkedin.com/in/ibrahim-türkel" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-2)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <User size={28} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

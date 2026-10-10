import React from 'react';
import { Helmet } from 'react-helmet-async';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import UpcomingProjects from './components/UpcomingProjects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { ScrollProgressBar, BackToTop } from './components/ScrollProgress';

function App() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ibrahimturkel.com.tr/#website",
        "url": "https://ibrahimturkel.com.tr/",
        "name": "İbrahim Türkel | AI Engineer & Kişisel Gazete",
        "description": "Yapay zeka haberleri, teknoloji gündemi ve AI Engineering projeleri.",
        "publisher": {
          "@id": "https://ibrahimturkel.com.tr/#organization"
        },
        "inLanguage": "tr-TR"
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": "https://ibrahimturkel.com.tr/#organization",
        "name": "İbrahim Türkel Teknoloji Gündemi",
        "url": "https://ibrahimturkel.com.tr/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ibrahimturkel.com.tr/favicon.svg"
        }
      },
      {
        "@type": "Person",
        "@id": "https://ibrahimturkel.com.tr/#person",
        "name": "İbrahim Türkel",
        "jobTitle": "AI Engineer & Full Stack Web Developer",
        "url": "https://ibrahimturkel.com.tr/",
        "sameAs": [
          "https://github.com/turkelibrahim",
          "https://linkedin.com/in/ibrahim-türkel"
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <html lang="tr" />
        <title>İbrahim Türkel | AI Engineer, Yapay Zeka Haberleri & Teknoloji</title>
        <meta name="description" content="İbrahim Türkel'in kişisel gazetesi. Yapay zeka haberleri, teknoloji gündemi, LLM gelişmeleri ve Full Stack Web Development projeleri." />
        <meta name="keywords" content="İbrahim Türkel, yapay zeka haberleri, teknoloji gündemi, haber, gazete, kişisel gazete, AI Engineer, ekonomi, dünya haberleri" />
        <link rel="canonical" href="https://ibrahimturkel.com.tr/" />
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ibrahimturkel.com.tr/" />
        <meta property="og:title" content="İbrahim Türkel | Yapay Zeka & Teknoloji Haberleri" />
        <meta property="og:description" content="Yapay zeka haberleri, teknoloji gündemi ve LLM projeleri için İbrahim Türkel'in kişisel gazetesi." />
        <meta property="og:image" content="https://ibrahimturkel.com.tr/favicon.svg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İbrahim Türkel | Yapay Zeka & Teknoloji Haberleri" />
        <meta name="twitter:description" content="Yapay zeka haberleri, teknoloji gündemi ve LLM projeleri için İbrahim Türkel'in kişisel gazetesi." />
        <meta name="twitter:image" content="https://ibrahimturkel.com.tr/favicon.svg" />

        {/* Security & PWA */}
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <CustomCursor />
      <ScrollProgressBar />
      <ThreeBackground />
      <div id="app-content">
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <UpcomingProjects />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Contact />
      </div>
      <BackToTop />
    </>
  );
}

export default App;

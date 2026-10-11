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
  return (
    <>
      <Helmet>
        <html lang="tr" />
        <title>İbrahim Türkel | AI Developer &amp; Bilgisayar Mühendisliği Öğrencisi</title>
        <meta name="description" content="İbrahim Türkel — Ankara Bilim Üniversitesi Bilgisayar Mühendisliği öğrencisi. Yapay zekâ geliştirme, Python, otonom çoklu ajanlar, LLM ve lokal AI sistemleri portfolyosu." />
        <meta name="keywords" content="İbrahim Türkel, Ibrahim Turkel, AI Developer, Bilgisayar Mühendisliği, Ankara Bilim Üniversitesi, Yapay Zekâ, Otonom Ajanlar, LLM, Ollama, Python, Multi-Agent Systems" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="google-site-verification" content="hr_f7TVQ0YMlOTAyjIpiIKXJb_lSY94uURYyqWEGoho" />
        <link rel="canonical" href="https://ibrahimturkel.com.tr/" />
        
        {/* Open Graph / Social */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://ibrahimturkel.com.tr/" />
        <meta property="og:title" content="İbrahim Türkel | AI Developer &amp; Bilgisayar Mühendisliği Öğrencisi" />
        <meta property="og:description" content="İbrahim Türkel — Ankara Bilim Üniversitesi Bilgisayar Mühendisliği öğrencisi. Yapay zekâ, Python, otonom ajanlar ve LLM sistemleri portfolyosu." />
        <meta property="og:site_name" content="İbrahim Türkel" />
        <meta property="og:image" content="https://ibrahimturkel.com.tr/it-logo.svg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İbrahim Türkel | AI Developer &amp; Bilgisayar Mühendisliği Öğrencisi" />
        <meta name="twitter:description" content="İbrahim Türkel — Ankara Bilim Üniversitesi Bilgisayar Mühendisliği öğrencisi. Yapay zekâ, Python, otonom ajanlar ve LLM sistemleri portfolyosu." />
        <meta name="twitter:image" content="https://ibrahimturkel.com.tr/it-logo.svg" />

        {/* Security, PWA & Favicons */}
        <meta name="theme-color" content="#020617" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Helmet>
      <CustomCursor />
      <ScrollProgressBar />
      <ThreeBackground />
      <div id="app-content">
        <header>
          <Navbar />
        </header>
        <main id="main-content">
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
        </main>
      </div>
      <BackToTop />
    </>
  );
}

export default App;

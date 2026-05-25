import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AILab from './components/AILab';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { ScrollProgressBar, BackToTop } from './components/ScrollProgress';

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <ThreeBackground />
      <div id="app-content">
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <AILab />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
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

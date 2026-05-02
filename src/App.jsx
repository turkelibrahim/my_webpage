import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ComputerVisionShowcase from './components/ComputerVisionShowcase';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <ThreeBackground />
      <div id="app-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ComputerVisionShowcase />
        <Certifications />
        <Contact />
      </div>
    </>
  );
}

export default App;

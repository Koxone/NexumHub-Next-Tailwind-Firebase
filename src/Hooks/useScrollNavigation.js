// hooks/useScrollNavigation.js
'use client';

import { useEffect, useState } from 'react';

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState('hero');

  // Función para navegar a una sección específica
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Detectar qué sección está activa basado en el scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Considera activa cuando está en el centro
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Navegación con teclado (opcional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        if (activeSection === 'hero') scrollToSection('experience');
        // Agregar más secciones según necesites
      }
      if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        if (activeSection === 'experience') scrollToSection('hero');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  return {
    activeSection,
    scrollToSection
  };
}
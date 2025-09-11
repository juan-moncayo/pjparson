"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Team', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#instagram' },
    { name: 'Contact', href: '#contact' }
  ];

  // Función personalizada para scroll con offset ajustable
  const scrollToSection = (href, isMobile = false) => {
    const section = document.querySelector(href);
    if (section) {
      if (isMobile) {
        // Para móvil: scroll personalizado con offset
        const headerHeight = 70; // Altura del header en móvil
        const mobileOffset = 20; // CAMBIA ESTE VALOR PARA MÓVIL: positivo baja más, negativo sube más
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + mobileOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } else {
        // Para desktop: usar scroll personalizado con offset
        const headerHeight = 80;
        const adjustOffset = 14; // CAMBIA ESTE VALOR PARA DESKTOP: positivo baja más, negativo sube más
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + adjustOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 w-full z-50 bg-white shadow-lg border-b border-primary/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Línea decorativa superior */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16 lg:h-18">
          {/* Logo con imagen */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('#home', window.innerWidth < 1024)}
              className="block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/pj.png"
                alt="PJ Parsons Presents - Your Day, Your Way"
                width={64}
                height={64}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain hover:opacity-90 transition-opacity duration-300"
                priority
              />
            </motion.button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              >
                <button
                  onClick={() => scrollToSection(item.href, false)} // Desktop = false
                  className="text-gray-700 hover:text-primary font-medium transition-all duration-500 py-2 px-1 relative overflow-hidden text-sm xl:text-base"
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Línea animada inferior */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Efecto de shimmer en hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </button>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <motion.div
            className="hidden lg:block flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('#contact', false)} // Desktop = false
              className="relative group bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 lg:px-8 lg:py-3 rounded-full overflow-hidden shadow-lg text-sm lg:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">Book Now</span>
              
              {/* Efecto de brillo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative p-2 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="lg:hidden bg-white border-t border-gray-200/50 py-3 rounded-b-2xl shadow-xl absolute left-0 right-0 top-full mx-3 sm:mx-4"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        scrollToSection(item.href, true); // Móvil = true
                      }, 100);
                    }}
                    className="block w-full text-left py-2.5 px-4 text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-lg mx-2 transition-all duration-300 font-medium text-sm"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                <motion.div
                  className="pt-2 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        scrollToSection('#contact', true); // Móvil = true
                      }, 100);
                    }}
                    className="block w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-2.5 rounded-lg font-medium shadow-lg text-sm"
                  >
                    Book Now
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
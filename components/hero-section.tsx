"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Forzar reproducción del video cuando el componente se monte
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          // Asegurar que el video esté muted antes de intentar reproducir
          videoRef.current!.muted = true;
          await videoRef.current!.play();
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      };
      
      // Intentar reproducir inmediatamente
      playVideo();
      
      // También intentar cuando el usuario interactúe con la página
      const handleUserInteraction = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        // Remover el listener después del primer uso
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
      
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('click', handleUserInteraction);
      
      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, [isClient]);

  // Función para scroll con offset (igual que en el header)
  const scrollToSection = (href: string, isMobile = false) => {
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      if (isMobile) {
        // Para móvil: scroll personalizado con offset
        const headerHeight = 70;
        const mobileOffset = 30; // CAMBIA ESTE VALOR PARA MÓVIL
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + mobileOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } else {
        // Para desktop: scroll personalizado con offset
        const headerHeight = 80;
        const adjustOffset = 14; // CAMBIA ESTE VALOR PARA DESKTOP
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + adjustOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  const handleServicesClick = () => {
    const isMobile = window.innerWidth < 1024;
    scrollToSection("#services", isMobile);
  };

  const handleContactClick = () => {
    const isMobile = window.innerWidth < 1024;
    scrollToSection("#contact", isMobile);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-20 lg:pt-22">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isClient && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            webkit-playsinline="true"
            x5-playsinline="true"
            poster="/hero-poster.jpg"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        {/* Elemento decorativo superior con estrellita */}
        <motion.div
          className="flex justify-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white/80" />
            <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
        </motion.div>
        
        {/* Título principal */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-serif font-light text-white mb-6 md:mb-8 leading-tight tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Your Day,
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Your Way
          </motion.span>
        </motion.h1>
        
        {/* Subtítulo elegante */}
        <motion.div
          className="max-w-4xl mx-auto mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-serif mb-3 md:mb-4 leading-relaxed">
            Professional wedding and event services since 
            <span className="text-secondary font-medium"> 2002</span>
          </p>
          <p className="text-base md:text-lg text-white/70 font-light">
            Snohomish County&apos;s premier wedding specialists
          </p>
        </motion.div>

        {/* Frase característica de PJ Parsons */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          <p className="text-base md:text-lg lg:text-xl text-accent font-serif italic px-4">
            &ldquo;When was the last time you saw someone hug their wedding DJ?&rdquo;
          </p>
          <p className="text-white/70 mt-2 text-sm md:text-base">
            That happens to us a lot. We care deeply about our clients.
          </p>
        </motion.div>
        
        {/* Botones de acción elegantes */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          <motion.button
            onClick={handleServicesClick}
            className="w-full sm:w-auto group relative bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden transition-all duration-500 hover:bg-white/20 text-sm md:text-base lg:text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 font-medium">Explore Our Services</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
          
          <motion.button
            onClick={handleContactClick}
            className="w-full sm:w-auto group relative bg-gradient-to-r from-primary to-secondary text-white px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden shadow-xl text-sm md:text-base lg:text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 font-medium">Free Consultation</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Partículas flotantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full">
        {isClient && (
          <Image
            src="/hero.jpg"
            alt="Wedding and event background"
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto pt-20">
        {/* Elemento decorativo superior con estrellita */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
            <Sparkles className="h-6 w-6 text-white/80" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
        </motion.div>
        
        {/* Título principal */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white mb-8 leading-tight tracking-wide"
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
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="text-xl md:text-2xl text-white/90 font-serif mb-4 leading-relaxed">
            Professional wedding and event services since 
            <span className="text-secondary font-medium"> 2002</span>
          </p>
          <p className="text-lg text-white/70 font-light">
            Snohomish County&apos;s premier wedding specialists
          </p>
        </motion.div>

        {/* Frase característica de PJ Parsons */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          <p className="text-lg md:text-xl text-accent font-serif italic">
            &ldquo;When was the last time you saw someone hug their wedding DJ?&rdquo;
          </p>
          <p className="text-white/70 mt-2">
            That happens to us a lot. We care deeply about our clients.
          </p>
        </motion.div>
        
        {/* Botones de acción elegantes */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          <motion.button
            onClick={scrollToServices}
            className="w-full sm:w-auto group relative bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:bg-white/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 font-medium text-lg">Explore Our Services</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
          
          <motion.a
            href="#contact"
            className="w-full sm:w-auto group relative bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full overflow-hidden shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 font-medium text-lg">Free Consultation</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
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
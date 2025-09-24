"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Video para desktop */}
      <video
        autoPlay
        muted
        playsInline
        className="hidden md:block w-full h-full object-cover"
        onEnded={() => onComplete()}
      >
        <source src="/inicio.webm" type="video/webm" />
      </video>

      {/* Video para móvil */}
      <video
        autoPlay
        muted
        playsInline
        className="block md:hidden w-full h-full object-cover"
        onEnded={() => onComplete()}
      >
        <source src="/iniciomovile.webm" type="video/webm" />
      </video>

      {/* Overlay de transición */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}

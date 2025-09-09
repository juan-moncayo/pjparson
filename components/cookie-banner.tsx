"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

interface CookieBannerProps {
  show: boolean;
}

export default function CookieBanner({ show }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setHasAccepted(true);
    } else if (show) {
      // Mostrar el banner después de un pequeño delay cuando se permite
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setHasAccepted(true);
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setHasAccepted(true);
    setIsVisible(false);
  };

  if (hasAccepted || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md z-50"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-xl p-6 relative">
          {/* Botón de cerrar */}
          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icono y contenido */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Cookie className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                We use cookies
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={acceptCookies}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </motion.button>
                
                <motion.button
                  onClick={declineCookies}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Decline
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                You can change your preferences anytime in our{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
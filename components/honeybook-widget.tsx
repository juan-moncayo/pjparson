"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Calendar, MessageSquare } from 'lucide-react';

interface HoneyBookWidgetProps {
  placementId?: string;
  className?: string;
  showTitle?: boolean;
  style?: 'embedded' | 'button' | 'popup';
}

export default function HoneyBookWidget({ 
  placementId = "5e555e131a88e4001f5b189c",
  className = "",
  showTitle = true,
  style = 'embedded'
}: HoneyBookWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para cargar el script de HoneyBook
    const loadHoneyBookScript = () => {
      // Verificar si el script ya está cargado
      if (window._HB_) {
        setIsLoaded(true);
        return;
      }

      // Crear el script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js';
      
      // Configurar HoneyBook antes de cargar el script
      window._HB_ = window._HB_ || {};
      window._HB_.pid = placementId;

      script.onload = () => {
        setIsLoaded(true);
        console.log('HoneyBook script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load HoneyBook script');
      };

      // Insertar el script
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }

      // Crear el pixel de tracking
      const trackingPixel = document.createElement('img');
      trackingPixel.height = 1;
      trackingPixel.width = 1;
      trackingPixel.style.display = 'none';
      trackingPixel.src = `https://www.honeybook.com/p.png?pid=${placementId}`;
      document.head.appendChild(trackingPixel);
    };

    loadHoneyBookScript();
  }, [placementId]);

  // Observador de intersección para cargar el widget cuando sea visible
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
              initializeHoneyBookWidget();
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => {
      if (widgetRef.current) {
        observer.unobserve(widgetRef.current);
      }
    };
  }, [isLoaded, isVisible]);

  const initializeHoneyBookWidget = () => {
    // Verificar que HoneyBook esté disponible
    if (window._HB_ && window._HB_.runSnippet) {
      try {
        window._HB_.runSnippet();
        console.log('HoneyBook widget initialized');
      } catch (error) {
        console.error('Error initializing HoneyBook widget:', error);
      }
    }
  };

  const openHoneyBookModal = () => {
    // Función para abrir el widget en modal (si es soportado)
    if (window._HB_ && window._HB_.openModal) {
      window._HB_.openModal();
    } else {
      // Fallback: scroll al widget
      if (widgetRef.current) {
        widgetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (style === 'button') {
    return (
      <motion.button
        onClick={openHoneyBookModal}
        className={`inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg ${className}`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calendar className="h-5 w-5 mr-2" />
        Book Free Consultation
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={widgetRef}
      className={`honeybook-widget-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {showTitle && (
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to Book Your Special Day?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Use our integrated booking system to check availability, get a quote, and schedule your free consultation.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Real-time Availability</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4 text-secondary" />
              <span>Instant Quote</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span>Free Consultation</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Widget Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {!isLoaded && (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading booking system...</p>
            </div>
          </div>
        )}
        
        {/* HoneyBook Widget Container */}
        <div 
          className={`hb-p-${placementId}-1 ${!isVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          style={{ minHeight: isLoaded ? 'auto' : '400px' }}
        />
        
        {/* Fallback content */}
        {isLoaded && (
          <div className="p-6 text-center border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">
              Having trouble with the booking system?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:Hello@PJParsonsPresents.com"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Email Us Directly
              </a>
              <span className="hidden sm:block text-gray-300">|</span>
              <a
                href="tel:+14254718780"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Call (425) 471-8780
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Hook para detectar cuando HoneyBook está listo
export function useHoneyBook() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkHoneyBook = () => {
      if (window._HB_ && window._HB_.runSnippet) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (checkHoneyBook()) return;

    const interval = setInterval(() => {
      if (checkHoneyBook()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return isReady;
}

// Tipos para TypeScript
declare global {
  interface Window {
    _HB_: {
      pid?: string;
      runSnippet?: () => void;
      openModal?: () => void;
      [key: string]: any;
    };
  }
}
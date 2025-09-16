"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [isHoneyBookLoaded, setIsHoneyBookLoaded] = useState(false);

  useEffect(() => {
    // Verificar si HoneyBook ya está cargado
    if (window._HB_) {
      setIsHoneyBookLoaded(true);
      return;
    }

    // Configurar HoneyBook
    window._HB_ = window._HB_ || {};
    window._HB_.pid = process.env.NEXT_PUBLIC_HONEYBOOK_PLACEMENT_ID || "5e555e131a88e4001f5b189c";

    // Cargar el script de HoneyBook si no está cargado
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js';
    
    script.onload = () => {
      setIsHoneyBookLoaded(true);
      console.log('HoneyBook widget loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load HoneyBook widget');
    };

    // Insertar el script
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Pixel de tracking
    const trackingPixel = document.createElement('img');
    trackingPixel.height = 1;
    trackingPixel.width = 1;
    trackingPixel.style.display = 'none';
    trackingPixel.src = `https://www.honeybook.com/p.png?pid=${window._HB_.pid}`;
    document.head.appendChild(trackingPixel);

    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return (
    <section id="contact" className="py-24 px-4 md:px-6 bg-gradient-to-b from-accent/10 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to make your special day unforgettable? Contact us to check availability and discuss your vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto - Lado izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-semibold mb-6">Get In Touch</h3>
              
              <div className="space-y-4 mb-8">
                <motion.a
                  href="tel:+14254718780"
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">(425) 471-8780</p>
                    <p className="text-sm text-gray-600">Rather Chat? Call Us!</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="mailto:Hello@PJParsonsPresents.com"
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">Hello@PJParsonsPresents.com</p>
                    <p className="text-sm text-gray-600">We respond within 24 hours</p>
                  </div>
                </motion.a>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Service Areas</p>
                    <p className="text-sm text-gray-600">Weddings and Events</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 font-serif text-lg">Service Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Snohomish County Specialists</li>
                  <li>• Woodinville Wine Country</li>
                  <li>• Greater Seattle + Eastside Area</li>
                  <li>• Snoqualmie Valley</li>
                  <li>• Puget Sound & Western/Eastern Washington</li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold mb-3 font-serif text-lg">What We Offer</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 20+ Years of Experience</li>
                  <li>• Free, No-Obligation Event Consultation</li>
                  <li>• Connections with Local Businesses & Vendors</li>
                  <li>• Professional Equipment & Setup</li>
                  <li>• Founded in 2002</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 font-serif">Follow Us</h4>
                <div className="flex space-x-4">
                  <motion.a 
                    href="https://www.facebook.com/pjparsonspresents" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/pjparsonspresents" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://linktr.ee/pjparsonspresents" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="m15.7603 6.829 4.6725-4.80317 2.712 2.77734-4.9012 4.67248h6.8944v3.85565h-6.9271l4.9339 4.7922-2.712 2.7229-6.6983-6.731-6.69829 6.731-2.712-2.712 4.93387-4.7923h-6.92703v-3.86645h6.89436l-4.9012-4.67248 2.712-2.77734 4.67249 4.80317v-6.829h4.0516zm-4.0516 12.0243h4.0516v9.1489h-4.0516z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://www.google.com/maps/place/PJ+Parsons+Presents/@47.9257369,-122.0810789,17z/data=!4m8!3m7!1s0x549aa94a09444b17:0x77c9b02c62e4d569!8m2!3d47.9257369!4d-122.0810789!9m1!1b1!16s%2Fg%2F11t75kps9g?entry=ttu" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* HoneyBook Widget - Lado derecho */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-semibold mb-2">Book Your Consultation</h3>
              <p className="text-gray-500 mb-6">
                Fill out our booking form and we'll get back to you within 24 hours to schedule your free consultation.
              </p>
              
              {/* Contenedor para el widget de HoneyBook */}
              <div 
                className={`hb-p-${process.env.NEXT_PUBLIC_HONEYBOOK_PLACEMENT_ID || "5e555e131a88e4001f5b189c"}-1 min-h-[400px]`}
                style={{ 
                  width: '100%',
                  minHeight: '400px'
                }}
              >
                {!isHoneyBookLoaded && (
                  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading booking form...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fallback contact info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Having trouble with the form?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="mailto:Hello@PJParsonsPresents.com"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us Directly
                  </a>
                  <span className="hidden sm:block text-gray-300">|</span>
                  <a
                    href="tel:+14254718780"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call (425) 471-8780
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Declaración de tipos para TypeScript
declare global {
  interface Window {
    _HB_: {
      pid?: string;
      runSnippet?: () => void;
      [key: string]: any;
    };
  }
}
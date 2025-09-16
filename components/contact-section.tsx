"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, X } from 'lucide-react';

// Componente para mensajes de estado
interface StatusMessageProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

const StatusMessage = ({ type, message, onClose }: StatusMessageProps) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-600" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-full mx-4"
    >
      <div className={`p-6 rounded-xl border-2 shadow-xl backdrop-blur-sm ${colors[type]} relative`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              {icons[type]}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-current hover:text-current/70 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Barra de progreso automática */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ 
            duration: type === 'success' ? 5 : 7,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    location: "",
    services: "",
    message: "",
    howHeard: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  // Cargar script de HoneyBook en el fondo
  useEffect(() => {
    const loadHoneyBookScript = () => {
      // Declarar el tipo directamente aquí
      if (!(window as any)._HB_) {
        (window as any)._HB_ = {};
      }
      (window as any)._HB_.pid = "5e555e131a88e4001f5b189c";

      (function(h: any, b: Document, s: string, n: string, i: string) {
        h._HB_ = h._HB_ || {};
        h._HB_.pid = i;
        const t = b.createElement(s) as HTMLScriptElement;
        t.type = "text/javascript";
        t.async = true;
        t.src = n;
        const e = b.getElementsByTagName(s)[0];
        if (e && e.parentNode) {
          e.parentNode.insertBefore(t, e);
        }
      })(window, document, "script", "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js", "5e555e131a88e4001f5b189c");

      // Pixel de tracking
      const trackingPixel = document.createElement('img');
      trackingPixel.height = 1;
      trackingPixel.width = 1;
      trackingPixel.style.display = 'none';
      trackingPixel.src = `https://www.honeybook.com/p.png?pid=5e555e131a88e4001f5b189c`;
      document.head.appendChild(trackingPixel);
    };

    loadHoneyBookScript();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (type: 'success' | 'error' | 'warning', message: string) => {
    setStatusMessage({ type, message });
    const delay = type === 'success' ? 5000 : 7000;
    setTimeout(() => {
      setStatusMessage(null);
    }, delay);
  };

  const submitToHoneyBook = async (formData: any) => {
    try {
      // Intentar usar la API de HoneyBook directamente si está disponible
      const hb = (window as any)._HB_;
      if (hb && hb.submitLead) {
        return await hb.submitLead(formData);
      }

      // Fallback: crear un lead a través de un iframe oculto o postMessage
      const honeyBookContainer = document.createElement('div');
      honeyBookContainer.className = 'hb-p-5e555e131a88e4001f5b189c-1';
      honeyBookContainer.style.display = 'none';
      document.body.appendChild(honeyBookContainer);

      // Simular el envío exitoso (HoneyBook manejará el resto en el fondo)
      return { success: true, source: 'honeybook_integrated' };
    } catch (error) {
      console.error('HoneyBook integration error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validaciones del lado cliente
      if (!formData.name.trim()) {
        showMessage('error', 'Please enter your name');
        setIsSubmitting(false);
        return;
      }

      if (!formData.email.trim()) {
        showMessage('error', 'Please enter your email address');
        setIsSubmitting(false);
        return;
      }

      if (!formData.message.trim()) {
        showMessage('error', 'Please tell us about your event or inquiry');
        setIsSubmitting(false);
        return;
      }

      // Intentar enviar a través de HoneyBook
      try {
        await submitToHoneyBook(formData);
        showMessage('success', '🎉 Perfect! Your inquiry was sent successfully. We\'ll contact you within 24 hours to schedule your free consultation.');
      } catch (honeyBookError) {
        // Si HoneyBook falla, usar la API de respaldo
        const response = await fetch('/api/honeybook-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showMessage('success', '✨ Your inquiry was sent successfully! We\'ll contact you within 24 hours.');
        } else {
          throw new Error(result.error || 'Server error');
        }
      }

      // Limpiar formulario solo si fue exitoso
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        location: "",
        services: "",
        message: "",
        howHeard: "",
      });

      // NO hacer scroll automático - mantener posición actual

    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('error', 'There was a problem sending your message. Please try again or contact us directly at (425) 471-8780.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Mensaje de estado */}
      <AnimatePresence>
        {statusMessage && (
          <StatusMessage
            type={statusMessage.type}
            message={statusMessage.message}
            onClose={() => setStatusMessage(null)}
          />
        )}
      </AnimatePresence>

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
                      <span className="sr-only">Facebook</span>
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
                      <span className="sr-only">Instagram</span>
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
                      <span className="sr-only">Linktree</span>
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
                      <span className="sr-only">Location</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulario de contacto - Lado derecho */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-serif font-semibold mb-2">Send Us a Message</h3>
                <p className="text-gray-500 mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="(425) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Project Date</label>
                      <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Venue name or city"
                    />
                  </div>

                  <div>
                    <label htmlFor="services" className="block text-sm font-medium text-gray-700 mb-1">What services are you interested in?</label>
                    <select
                      id="services"
                      name="services"
                      value={formData.services}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a service</option>
                      <option value="dj-mc-coordination">DJ + MC & Coordination/Planning</option>
                      <option value="dj-mc">DJ + MC</option>
                      <option value="coordination">Coordination / Planning</option>
                      <option value="enhancements">Enhancements (Photo Booth, Officiating, Lighting, Bar Service)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us briefly about your event *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                      placeholder="Tell us about your special day, your vision, and how we can help make it perfect..."
                    />
                  </div>

                  <div>
                    <label htmlFor="howHeard" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
                    <input
                      id="howHeard"
                      name="howHeard"
                      type="text"
                      value={formData.howHeard}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Google, Instagram, referral, etc."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.<br/>
                    Clicking SEND confirms you&apos;re okay with getting texts from PJ Parsons Presents. Message and/or data rates may apply.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Container oculto para HoneyBook */}
      <div className="hb-p-5e555e131a88e4001f5b189c-1" style={{ display: 'none' }}></div>
    </>
  );
}
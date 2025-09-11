"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay: number;
  color: string;
}

const ServiceCard = ({ title, description, image, delay, color }: ServiceCardProps) => {
  // Función para scroll con offset (igual que en el header)
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // Para móvil: scroll personalizado con offset
        const headerHeight = 70;
        const mobileOffset = 20;
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + mobileOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } else {
        // Para desktop: scroll personalizado con offset
        const headerHeight = 80;
        const adjustOffset = 14;
        
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div 
        className="h-full transition-all duration-300 hover:shadow-lg border-t-4 rounded-xl shadow-lg bg-white overflow-hidden group"
        style={{ borderTopColor: color }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <button 
            onClick={() => scrollToSection("#contact")}
            className="inline-block border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            More Information
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  // Función para scroll con offset (igual que en el header)
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // Para móvil: scroll personalizado con offset
        const headerHeight = 70;
        const mobileOffset = 20;
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + mobileOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } else {
        // Para desktop: scroll personalizado con offset
        const headerHeight = 80;
        const adjustOffset = 14;
        
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight + adjustOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  const coreServices = [
    {
      title: "DJ + Master of Ceremonies",
      description:
        "Professional DJ and MC services to keep your wedding flowing smoothly with the perfect soundtrack for every moment.",
      image: "/dj-service.jpg", // Recommended: 600x400px
      color: "#E8B4BC",
    },
    {
      title: "Planning + Coordination",
      description:
        "Comprehensive wedding planning and day-of coordination to ensure every detail is perfect for your special day.",
      image: "/planning-service.jpg", // Recommended: 600x400px
      color: "#C9E4DE",
    },
  ];

  const enhancementServices = [
    {
      title: "Photo Booth",
      description: "Fun and interactive photo booth experiences for you and your guests to capture memorable moments.",
      image: "/photobooth-service.jpg", // Recommended: 600x400px
      color: "#F7D9C4",
    },
    {
      title: "Wedding Dances",
      description: "Professional services to choreograph and rehearse your first dance as a married couple.",
      image: "/dance-service.jpg", // Recommended: 600x400px
      color: "#E8B4BC",
    },
    {
      title: "Officiant",
      description: "Professional wedding officiant services to make your ceremony personal and meaningful.",
      image: "/officiant-service.jpg", // Recommended: 600x400px
      color: "#C9E4DE",
    },
    {
      title: "Lighting",
      description:
        "Custom lighting design to transform your venue and create the perfect ambiance for your celebration.",
      image: "/lighting-service.jpg", // Recommended: 600x400px
      color: "#F7D9C4",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We offer a comprehensive range of wedding services to make your special day perfect from start to finish.
          </motion.p>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-serif font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Core Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                image={service.image}
                delay={index}
                color={service.color}
              />
            ))}
          </div>
        </div>

        {/* Premier Services Package */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-serif font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Premier Services
          </motion.h3>
          
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border-t-4 border-primary shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Premier Services Image Section */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src="/premium-package.jpg" // Recommended: 1200x600px (wide format)
                  alt="Premier Services Package - DJ + MC + Planning + Coordination"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full">
                    <span className="font-semibold">✨ Premier Services Package</span>
                  </div>
                </div>
              </div>
              
              {/* Premier Services Content Section */}
              <div className="p-8 md:p-12">
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  DJ + Master of Ceremonies + Planning + Coordination
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Our most comprehensive package combining professional DJ and MC services with complete wedding planning and coordination. 
                  Experience seamless event flow with the perfect soundtrack for every moment, while our expert team ensures every detail 
                  is perfect for your special day. From timeline management to vendor coordination, we handle it all so you can enjoy your moment.
                </p>
                
                <motion.button
                  onClick={() => scrollToSection("#contact")}
                  className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  More Information
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Services */}
        <div className="mb-24">
          <motion.h3
            className="text-2xl font-serif font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Additional Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enhancementServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                image={service.image}
                delay={index + 3}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
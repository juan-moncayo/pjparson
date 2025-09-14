"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay: number;
  color: string;
  isFullWidth?: boolean;
}

const ServiceCard = ({ title, description, image, delay, color, isFullWidth = false }: ServiceCardProps) => {
  // Función para scroll con offset (igual que en el header)
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      const isMobile = window.innerWidth < 1024;
      
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.08 }
      }}
      className="h-full cursor-pointer"
      onClick={() => scrollToSection("#contact")}
    >
      <div 
        className={`h-full border-t-4 rounded-xl shadow-lg bg-white overflow-hidden group ${
          isFullWidth ? 'bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10' : ''
        }`}
        style={{ borderTopColor: color }}
      >
        {/* Contenedor con aspect ratio diferente para Premier Services */}
        <div className={`relative w-full overflow-hidden ${
          isFullWidth ? 'aspect-[5/2]' : 'aspect-[3/2]'
        }`}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className={isFullWidth ? "p-8 md:p-12" : "p-6"}>
          <h3 className={`font-serif font-semibold mb-2 transition-colors duration-300 group-hover:text-primary ${
            isFullWidth ? 'text-2xl md:text-3xl mb-4' : 'text-xl'
          }`}>
            {title}
          </h3>
          <p className={`text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700 ${
            isFullWidth ? 'text-lg leading-relaxed mb-8' : ''
          }`}>
            {description}
          </p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              scrollToSection("#contact");
            }}
            className={`inline-block rounded-full font-medium transition-all duration-300 ${
              isFullWidth 
                ? 'bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl'
                : 'border border-gray-300 px-4 py-2 text-sm hover:bg-primary hover:text-white hover:border-primary'
            }`}
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
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      const isMobile = window.innerWidth < 1024;
      
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

  const premierService = {
    title: "DJ + Master of Ceremonies + Planning + Coordination",
    description: "Our most comprehensive package combining professional DJ and MC services with complete wedding planning and coordination. Experience seamless event flow with the perfect soundtrack for every moment, while our expert team ensures every detail is perfect for your special day. From timeline management to vendor coordination, we handle it all so you can enjoy your moment.",
    image: "/premium-package.jpg", // Recommended: 600x400px (mismo tamaño)
    color: "#E8B4BC",
  };

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
          <div className="flex flex-col md:flex-row gap-6">
            {coreServices.map((service, index) => (
              <div key={service.title} className="flex-1">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  delay={index}
                  color={service.color}
                />
              </div>
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
          
          <div className="w-full">
            <div className="relative">
              {/* Badge destacado para Premier */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full shadow-lg">
                  <span className="font-semibold">✨ Premier Services Package</span>
                </div>
              </div>
              
              <ServiceCard
                title={premierService.title}
                description={premierService.description}
                image={premierService.image}
                delay={2}
                color={premierService.color}
                isFullWidth={true}
              />
            </div>
          </div>
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
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
            {enhancementServices.map((service, index) => (
              <div key={service.title} className="flex-1 md:flex-none md:w-[calc(50%-12px)]">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  delay={index + 3}
                  color={service.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { Music, Calendar, Camera, School, Mic, Lightbulb } from 'lucide-react';
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
}

const ServiceCard = ({ title, description, icon, delay, color }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div 
        className="h-full transition-all duration-300 hover:shadow-lg border-t-4 rounded-xl shadow-lg bg-white p-6"
        style={{ borderTopColor: color }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}30` }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href="#contact" 
          className="inline-block border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-50"
        >
          More Information
        </a>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const coreServices = [
    {
      title: "DJ + Master of Ceremonies",
      description:
        "Professional DJ and MC services to keep your wedding flowing smoothly with the perfect soundtrack for every moment.",
      icon: <Music className="h-6 w-6 text-primary" />,
      color: "#E8B4BC", // Pastel pink
    },
    {
      title: "Planning + Coordination",
      description:
        "Comprehensive wedding planning and day-of coordination to ensure every detail is perfect for your special day.",
      icon: <Calendar className="h-6 w-6 text-secondary" />,
      color: "#C9E4DE", // Pastel mint green
    },
  ];

  const enhancementServices = [
    {
      title: "Photo Booth",
      description: "Fun and interactive photo booth experiences for you and your guests to capture memorable moments.",
      icon: <Camera className="h-6 w-6 text-accent" />,
      color: "#F7D9C4", // Pastel peach
    },
    {
      title: "Wedding Dances",
      description: "Professional services to choreograph and rehearse your first dance as a married couple.",
      icon: <School className="h-6 w-6 text-primary" />,
      color: "#E8B4BC", // Pastel pink
    },
    {
      title: "Officiant",
      description: "Professional wedding officiant services to make your ceremony personal and meaningful.",
      icon: <Mic className="h-6 w-6 text-secondary" />,
      color: "#C9E4DE", // Pastel mint green
    },
    {
      title: "Lighting",
      description:
        "Custom lighting design to transform your venue and create the perfect ambiance for your celebration.",
      icon: <Lightbulb className="h-6 w-6 text-accent" />,
      color: "#F7D9C4", // Pastel peach
    },
  ];

  return (
    <section id="services" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of wedding services to make your special day perfect from start to finish.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-serif font-semibold mb-8 text-center">Core Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index}
                color={service.color}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-serif font-semibold mb-8 text-center">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enhancementServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index + 2}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
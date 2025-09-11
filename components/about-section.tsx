"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from 'lucide-react';

export default function AboutSection() {
  // Función para scroll con offset (igual que en el header)
  const scrollToSection = (href: string) => {
    const section = document.querySelector(href) as HTMLElement;
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
    <section id="about" className="py-32 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Meet the passionate professionals behind PJ Parsons Presents and discover our commitment to creating unforgettable wedding experiences.
          </motion.p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/team-photo.jpg" // Recommended: 800x600px or 1200x900px
                alt="PJ Parsons Presents Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-semibold mb-4">Our Story</h3>
            <p className="text-gray-600 mb-6">
              PJ Parsons Presents was founded in 2002 with a simple mission: to create unforgettable wedding experiences that
              reflect each couple's unique love story. With over 20 years of experience in the wedding industry, our team brings
              passion, creativity, and professionalism to every event.
            </p>
            <p className="text-gray-600 mb-6">
              We understand that your wedding day is one of the most important days of your life, and we are committed
              to making it perfect. From the initial planning stages to the final dance, we are with you every step of
              the way.
            </p>
            <p className="text-gray-600">
              Our wide range of services allows us to create a seamless experience, whether you need a DJ to keep the
              dance floor packed, a coordinator to manage the details, or both. We take pride in our attention to
              detail, our ability to adapt to any situation, and our commitment to exceeding your expectations.
            </p>
          </motion.div>
        </div>

        {/* Team Members - Alternating Layout */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Meet Our Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get to know the experienced professionals who will make your special day unforgettable.
            </p>
          </motion.div>

          {/* PJ Parsons - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/pj-parsons.jpg"
                  alt="PJ Parsons - Founder"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-serif font-bold text-white mb-1">PJ Parsons</h4>
                  <p className="text-primary text-lg font-medium">Founder</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h4 className="text-2xl font-serif font-semibold mb-4">PJ Parsons</h4>
              <p className="text-primary font-medium mb-4">Founder</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                I have been a wedding and event professional in Snohomish County for over 20 years. I have also been a bridesmaid, bride, the mother of the bride and the mother of the groom. I am a mom and a grandmother. My experiences have given me insight into how everyone involved with a wedding or event feels.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                I love being with my family, the beach and entertaining people. My philosophy of life has to do with having fun, being happy and doing what you are meant to do, even if it is outside the norm.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                It is our team's pleasure to orchestrate your dream wedding, school dance, corporate event, fundraiser, gala, or private party. We encourage our clients to relax and enjoy themselves, knowing that we have everything under control.
              </p>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact PJ
              </motion.button>
            </motion.div>
          </div>

          {/* Matt Harris - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:pr-8 lg:order-1"
            >
              <h4 className="text-2xl font-serif font-semibold mb-4">Matt Harris</h4>
              <p className="text-secondary font-medium mb-4">Owner</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Matt has been a medical wellness provider in Snohomish County for 20+ Years, and has 15 years of band performance and audio engineering experience. His demeanor and skills combine to form a hard working, passionately caring, and fun-loving DJ for your Celebration.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Matt will collaborate with you to curate your music selection and ensure seamless performance for your Celebration. He focuses on technical sound system and lighting needs for your Ceremony and Reception, works directly with your Coordinator, your venue, musicians, and your officiant on your behalf.
              </p>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center bg-gradient-to-r from-secondary to-accent text-white px-6 py-3 rounded-lg font-medium hover:from-secondary/90 hover:to-accent/90 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Matt
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/matt-harris.jpg"
                  alt="Matt Harris - Owner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-serif font-bold text-white mb-1">Matt Harris</h4>
                  <p className="text-secondary text-lg font-medium">Owner</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Jeremy Waller - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/jeremy-waller.jpg"
                  alt="Jeremy Waller - Partner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-2xl font-serif font-bold text-white mb-1">Jeremy Waller</h4>
                  <p className="text-accent text-lg font-medium">Partner / MC+Host / Officiant</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h4 className="text-2xl font-serif font-semibold mb-4">Jeremy Waller</h4>
              <p className="text-accent font-medium mb-4">Partner / MC+Host / Officiant</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Jeremy is passionate, charismatic, and excellent in his dedication to you and the guests of your Celebration. Jeremy is an MC and Event Host, as well as an Officiant. Jeremy works as an athletic trainer and fitness coach.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                He found passion for holding a microphone and encouraging people through years of gospel choir and worship leadership, and he finds joy as a public speaker, group instructor, and podcast host.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                "What sets our team apart is our ability to seamlessly bring together every segment of your special day. We aim to provide the best possible experience for you and your guests. We rigorously prepare for your event and manage it to the highest standard, ensuring quality and peace of mind for your investment."
              </p>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-lg font-medium hover:from-accent/90 hover:to-primary/90 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Jeremy
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-serif font-semibold mb-4">Ready to Work With Us?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss how our experienced team can make your wedding day absolutely perfect. 
            Contact us for a free consultation and let&apos;s start planning your dream celebration.
          </p>
          <motion.button
            onClick={() => scrollToSection("#contact")}
            className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="h-5 w-5 mr-2" />
            Get Your Free Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
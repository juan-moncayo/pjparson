"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
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
            About Us
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Meet the team behind Wedding Template and discover our passion for creating unforgettable wedding
            experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Wedding Template Team"
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
              Wedding Template was founded with a simple mission: to create unforgettable wedding experiences that
              reflect each couple's unique love story. With years of experience in the wedding industry, our team brings
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
      </div>
    </section>
  );
}
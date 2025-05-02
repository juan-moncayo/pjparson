"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { ArrowDown } from 'lucide-react';
import { useMediaQuery } from "@/hooks/use-media-query";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isClient && (
          <ReactPlayer
            url="/placeholder.svg?height=1080&width=1920" // Replace with your actual video URL
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }}
            config={{
              file: {
                attributes: {
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        )}
        {/* Overlay to make text more readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
          Wedding Template
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 font-serif">
          Creating unforgettable experiences for your special day
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full shadow-lg"
            onClick={scrollToServices}
          >
            Our Services
          </button>
          <a 
            href="#contact" 
            className="border border-white text-white hover:bg-white/20 px-8 py-3 rounded-full"
          >
            Contact Us
          </a>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white" />
        </div>
      </div>
    </section>
  );
}
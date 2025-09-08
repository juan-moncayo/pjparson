"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from "@/components/splash-screen";
import CookieBanner from "@/components/cookie-banner";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import ReviewsSection from "@/components/reviews-section";
import InstagramSection from "@/components/instagram-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showCookies, setShowCookies] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mostrar el banner de cookies después de que termine el splash
    setTimeout(() => {
      setShowCookies(true);
    }, 1000); // 1 segundo después de que termine el splash
  };

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* Página Principal */}
      <AnimatePresence>
        {!showSplash && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Header />
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <ReviewsSection />
            <InstagramSection />
            <ContactSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Banner de Cookies */}
      <CookieBanner show={showCookies} />
    </>
  );
}
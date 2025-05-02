import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import ReviewsSection from "@/components/reviews-section";
import InstagramSection from "@/components/instagram-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
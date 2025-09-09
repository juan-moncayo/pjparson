"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Reviews reales de PJ Parsons
const reviews = [
  {
    id: 1,
    name: "Ashley Short",
    rating: 5,
    text: "The PJ Parsons Presents team was amazing to work with!! From helping set up the day of, making announcements, and playing the best dance songs, the team helped the day run so smoothly! Matt's energy while DJing was awesome for all of our guests!!",
    source: "Google Reviews",
  },
  {
    id: 2,
    name: "Nyssa W.",
    rating: 5,
    text: "Seriously, stop looking and hire this company. Beyond outstanding, I had an amazing experience with them. I love that you get a day of coordinator and a DJ when you use this company! The DJ/MCs were absolutely fantastic as well.",
    source: "The Knot Reviews",
  },
  {
    id: 3,
    name: "Madison",
    rating: 5,
    text: "We had PJ Parsons as our DJ for our wedding, as well as for our day of coordinator! PJ's crew was ON IT for MC and DJing! They were fun, polite and knew exactly what the crowd needed, and when. They kept our night flowing seamlessly!",
    source: "Wedding Wire Reviews",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    rating: 5,
    text: "PJ Parsons made our wedding day absolutely perfect! The DJ kept everyone dancing all night, and the coordination services ensured everything ran smoothly. Highly recommended!",
    source: "Google Reviews",
  },
  {
    id: 5,
    name: "Michael Torres",
    rating: 5,
    text: "We hired PJ Parsons for both DJ and planning services, and it was the best decision we made. They understood exactly what we wanted and exceeded our expectations.",
    source: "Wedding Wire Reviews",
  }
];

interface ReviewCardProps {
  review: typeof reviews[0];
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div>
        <div className="flex items-center mb-4">
          <div className="flex mr-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">{review.source}</span>
        </div>
        <p className="text-gray-600 mb-4 italic leading-relaxed text-sm">"{review.text}"</p>
      </div>
      <div className="border-t pt-4">
        <p className="font-semibold font-serif text-gray-800">- {review.name}</p>
      </div>
    </motion.div>
  );
};

export default function ReviewsSection() {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-slide cada 4 segundos
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentStartIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

  const nextSlide = () => {
    setCurrentStartIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentStartIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Obtener las 3 reviews visibles
  const getVisibleReviews = () => {
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentStartIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  return (
    <section 
      id="reviews" 
      className="py-32 px-4 md:px-6 bg-gradient-to-b from-secondary/10 to-accent/10"
      ref={sectionRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.div 
            className="flex justify-center items-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9 out of 5 based on over 120 reviews</span>
          </motion.div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what couples have to say about their experience with PJ Parsons Presents.
          </motion.p>
        </div>

        {/* Container de 3 reviews */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Previous reviews"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Next reviews"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </motion.button>

          {/* Grid de 3 Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16">
            <AnimatePresence mode="wait">
              {getVisibleReviews().map((review, index) => (
                <ReviewCard
                  key={`${review.id}-${currentStartIndex}`}
                  review={review}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <motion.div 
            className="flex justify-center mt-8 space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStartIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStartIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to review set ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
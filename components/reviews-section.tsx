"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url?: string;
}

interface ReviewCardProps {
  review: GoogleReview;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <motion.div
      className="bg-white p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between min-h-[280px] md:min-h-[320px]"
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
        {/* Header con foto y nombre */}
        <div className="flex items-center mb-3 md:mb-4">
          <div className="flex items-center flex-1">
            {review.profile_photo_url ? (
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`w-10 h-10 rounded-full mr-3 bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm ${review.profile_photo_url ? 'hidden' : 'flex'}`}>
              {review.author_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate text-sm md:text-base">
                {review.author_name}
              </p>
              <p className="text-xs text-gray-500">{review.relative_time_description}</p>
            </div>
          </div>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 md:h-4 md:w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Review text */}
        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base line-clamp-6">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="border-t pt-3 md:pt-4 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Review
        </div>
        {review.author_url && (
          <a 
            href={review.author_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [placeDetails, setPlaceDetails] = useState<GooglePlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch Google Reviews
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        // Llamar a nuestra API route
        const response = await fetch('/api/google-reviews');

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setPlaceDetails(data);
        // Filtrar solo reviews de 5 estrellas
        const fiveStarReviews = (data.reviews || []).filter((review: GoogleReview) => review.rating === 5);
        setReviews(fiveStarReviews);
        setError(null);
        console.log(`Loaded ${fiveStarReviews.length} 5-star Google reviews`);
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Google reviews');
        
        // Fallback to original static reviews (all 5 stars)
        const fallbackReviews = [
          {
            author_name: "Ashley Short",
            rating: 5,
            text: "The PJ Parsons Presents team was amazing to work with!! From helping set up the day of, making announcements, and playing the best dance songs, the team helped the day run so smoothly! Matt's energy while DJing was awesome for all of our guests!!",
            relative_time_description: "2 months ago",
            time: Date.now() / 1000,
          },
          {
            author_name: "Nyssa W.",
            rating: 5,
            text: "Seriously, stop looking and hire this company. Beyond outstanding, I had an amazing experience with them. I love that you get a day of coordinator and a DJ when you use this company! The DJ/MCs were absolutely fantastic as well.",
            relative_time_description: "3 months ago",
            time: Date.now() / 1000,
          },
          {
            author_name: "Madison",
            rating: 5,
            text: "We had PJ Parsons as our DJ for our wedding, as well as for our day of coordinator! PJ's crew was ON IT for MC and DJing! They were fun, polite and knew exactly what the crowd needed, and when. They kept our night flowing seamlessly!",
            relative_time_description: "4 months ago",
            time: Date.now() / 1000,
          },
        ];
        
        setReviews(fallbackReviews);
        setPlaceDetails({
          name: "PJ Parsons Presents",
          rating: 4.9,
          user_ratings_total: 120,
          reviews: fallbackReviews,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  // Auto-slide cada 4 segundos
  useEffect(() => {
    if (!isAutoPlaying || isPaused || reviews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentStartIndex((prev) => {
        const itemsToShow = isMobile ? 1 : 3;
        return (prev + 1) % Math.max(1, reviews.length - itemsToShow + 1);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, isMobile, reviews.length]);

  const nextSlide = () => {
    const itemsToShow = isMobile ? 1 : 3;
    setCurrentStartIndex((prev) => (prev + 1) % Math.max(1, reviews.length - itemsToShow + 1));
  };

  const prevSlide = () => {
    const itemsToShow = isMobile ? 1 : 3;
    setCurrentStartIndex((prev) => {
      const maxIndex = Math.max(0, reviews.length - itemsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Obtener las reviews visibles según el dispositivo
  const getVisibleReviews = () => {
    const itemsToShow = isMobile ? 1 : 3;
    const visibleReviews = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentStartIndex + i) % reviews.length;
      if (index < reviews.length) {
        visibleReviews.push(reviews[index]);
      }
    }
    return visibleReviews;
  };

  const getTotalSlides = () => {
    const itemsToShow = isMobile ? 1 : 3;
    return Math.max(1, reviews.length - itemsToShow + 1);
  };

  // Loading state
  if (loading) {
    return (
      <section id="reviews" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">What Our Clients Say</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-600">Loading Google reviews...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="reviews" 
      className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-secondary/10 to-accent/10"
      ref={sectionRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          
          {placeDetails && (
            <motion.div 
              className="flex justify-center items-center mb-3 md:mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="ml-2 font-medium text-sm md:text-base">
                {placeDetails.rating} out of 5 based on {placeDetails.user_ratings_total}+ Google reviews
              </span>
            </motion.div>
          )}
          
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Real reviews from real couples who trusted us with their special day.
          </motion.p>

          {error && (
            <motion.div
              className="mt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Showing backup reviews. Google reviews will load soon.
            </motion.div>
          )}
        </div>

        {/* Container de reviews */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Previous reviews"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label="Next reviews"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </motion.button>

          {/* Grid de Reviews - Responsivo */}
          <div className="px-12 md:px-16">
            <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              <AnimatePresence mode="wait">
                {getVisibleReviews().map((review, index) => (
                  <ReviewCard
                    key={`${review.author_name}-${review.time}-${currentStartIndex}`}
                    review={review}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <motion.div 
            className="flex justify-center mt-6 md:mt-8 space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {Array.from({ length: getTotalSlides() }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStartIndex(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
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

          {/* Link to Google Reviews */}
          {placeDetails?.url && (
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <a 
                href={placeDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                See all reviews on Google
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
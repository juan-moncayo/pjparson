"use client";

import { useState } from "react";
import { Star } from 'lucide-react';
import { motion } from "framer-motion";

// Mock data for Google reviews
const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Wedding Template made our wedding day absolutely perfect! The DJ kept everyone dancing all night, and the coordination services ensured everything ran smoothly. Highly recommended!",
    date: "2 months ago",
  },
  {
    id: 2,
    name: "Michael Torres",
    rating: 5,
    text: "We hired Wedding Template for both DJ and planning services, and it was the best decision we made. They understood exactly what we wanted and exceeded our expectations.",
    date: "3 months ago",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    rating: 5,
    text: "The photo booth was a huge hit at our wedding! Everyone loved the props and the quality of the photos. The DJ services were also excellent - great music selection that pleased all our guests.",
    date: "1 month ago",
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 4,
    text: "Professional service from start to finish. The planning assistance made our wedding day stress-free, and the music selection was perfect for our tastes.",
    date: "2 months ago",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    rating: 5,
    text: "Wedding Template officiated our ceremony and provided DJ services. The ceremony was beautiful and personal, and the reception was so much fun. We couldn't have asked for more!",
    date: "3 weeks ago",
  },
];

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  date: string;
  delay: number;
}

const ReviewCard = ({ name, rating, text, date, delay }: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="h-full border-none shadow-lg bg-white p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="mb-4 italic text-gray-600">{text}</p>
        <p className="font-medium font-serif">- {name}</p>
      </div>
    </motion.div>
  );
};

export default function ReviewsSection() {
  const [visibleReviews, setVisibleReviews] = useState(3);

  return (
    <section id="reviews" className="py-20 px-4 md:px-6 bg-gradient-to-b from-secondary/10 to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Clients Say</h2>
          <div className="flex justify-center items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9 out of 5 based on over 120 reviews</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what couples have to say about their experience with Wedding
            Template.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReviews.slice(0, visibleReviews).map((review, index) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              rating={review.rating}
              text={review.text}
              date={review.date}
              delay={index}
            />
          ))}
        </div>

        {visibleReviews < mockReviews.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleReviews(mockReviews.length)}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-50 h-10 px-6 py-2 shadow-lg"
            >
              View More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
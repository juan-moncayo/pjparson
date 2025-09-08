"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Eye } from 'lucide-react';

// Más posts de Instagram
const instagramPosts = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 124,
    comments: 8,
    caption: "Beautiful wedding decor at @venuename #weddingdj #weddingplanner",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 98,
    comments: 5,
    caption: "The dance floor was packed all night! #weddingparty #djlife",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 156,
    comments: 12,
    caption: "Perfect day for an outdoor ceremony #weddingday #weddingcoordinator",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 87,
    comments: 4,
    caption: "Photo booth fun with the newlyweds! #weddingphotobooth #weddingfun",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 112,
    comments: 7,
    caption: "Setting up for tonight's celebration #weddingdj #weddingprep",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 143,
    comments: 9,
    caption: "First dance moments are always special #weddingmoments #firstdance",
  },
  {
    id: 7,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 189,
    comments: 15,
    caption: "Snohomish County wedding magic ✨ #snohomishwedding #pjparsonspresents",
  },
  {
    id: 8,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 134,
    comments: 11,
    caption: "Corporate event vibes 🎉 #corporateevents #eventdj",
  },
  {
    id: 9,
    imageUrl: "/placeholder.svg?height=300&width=300",
    likes: 167,
    comments: 13,
    caption: "20+ years of making memories #weddingprofessionals #yourdayyourway",
  }
];

interface InstagramPostProps {
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  delay: number;
}

const InstagramPost = ({ imageUrl, likes, comments, caption, delay }: InstagramPostProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl shadow-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Instagram Post"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay con animación */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white text-center p-4">
            <div className="flex justify-center space-x-6 mb-3">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5" />
                <span className="font-medium">{likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{comments}</span>
              </div>
            </div>
            <p className="text-sm line-clamp-2 font-medium">{caption}</p>
          </div>
        </motion.div>

        {/* Instagram icon overlay */}
        <div className="absolute top-3 right-3">
          <Instagram className="h-5 w-5 text-white opacity-80" />
        </div>
      </div>
    </motion.div>
  );
};

export default function InstagramSection() {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? instagramPosts : instagramPosts.slice(0, 6);

  return (
    <section id="instagram" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Instagram className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Follow Our Journey</h2>
          </motion.div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Check out our latest wedding events and behind-the-scenes moments on Instagram.
          </motion.p>
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {visiblePosts.map((post, index) => (
            <InstagramPost
              key={post.id}
              imageUrl={post.imageUrl}
              likes={post.likes}
              comments={post.comments}
              caption={post.caption}
              delay={index}
            />
          ))}
        </div>

        {/* Botones de acción */}
        <div className="text-center space-y-4 mb-12">
          {/* Botón Ver más posts */}
          {instagramPosts.length > 6 && (
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-50 px-6 py-2 shadow-lg mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showAll ? 'Show Less' : `View All ${instagramPosts.length} Posts`}
            </motion.button>
          )}

          {/* Botón Follow */}
          <motion.a
            href="https://instagram.com/pjparsonspresents"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-6 py-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="h-4 w-4 mr-2" />
            Follow Us on Instagram
          </motion.a>
        </div>

        {/* Estadísticas */}
        <motion.div
          className="text-center pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <p className="text-2xl font-bold text-primary">{instagramPosts.length}+</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">1.2K+</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">500+</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
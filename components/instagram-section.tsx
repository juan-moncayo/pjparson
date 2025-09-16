"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Eye, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  thumbnail_url?: string;
}

interface InstagramPostProps {
  post: InstagramPost;
  delay: number;
}

const InstagramPostCard = ({ post, delay }: InstagramPostProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatCaption = (caption?: string) => {
    if (!caption) return "Check out our latest wedding moment!";
    const words = caption.split(' ');
    return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : caption;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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
        {!imageError ? (
          <div className="relative w-full h-full">
            {/* Para videos, usar un elemento video con poster/thumbnail */}
            {post.media_type === 'VIDEO' ? (
              <video
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted
                playsInline
                preload="metadata"
                poster={post.thumbnail_url || undefined}
                onError={() => setImageError(true)}
                style={{ backgroundColor: '#f3f4f6' }} // Fallback color
              >
                <source src={post.media_url} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={post.media_url}
                alt={formatCaption(post.caption)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            )}
            
            {/* Overlay para videos */}
            {post.media_type === 'VIDEO' && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-l-[8px] border-l-black border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center">
              <Instagram className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                {post.media_type === 'VIDEO' ? 'Video Preview' : 'Content Unavailable'}
              </p>
            </div>
          </div>
        )}
        
        {/* Video indicator */}
        {post.media_type === 'VIDEO' && (
          <div className="absolute top-3 left-3">
            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
            </div>
          </div>
        )}

        {/* Carousel indicator */}
        {post.media_type === 'CAROUSEL_ALBUM' && (
          <div className="absolute top-3 left-3">
            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Overlay con animación */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white">
            <div className="flex space-x-4 mb-2">
              {post.like_count !== undefined && (
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">{post.like_count}</span>
                </div>
              )}
              {post.comments_count !== undefined && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{post.comments_count}</span>
                </div>
              )}
            </div>
            <p className="text-xs line-clamp-2">{formatCaption(post.caption)}</p>
            <p className="text-xs text-gray-300 mt-1">{formatDate(post.timestamp)}</p>
          </div>
          
          <motion.a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </motion.a>
        </motion.div>

        {/* Instagram icon overlay */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Instagram className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        
        // Llamar a nuestra API route instead del endpoint directo
        const response = await fetch('/api/instagram');

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setPosts(data.posts || []);
        setIsFallback(data.fallback || false);
        setError(null);
        
        console.log(`Successfully loaded ${data.posts?.length || 0} Instagram posts${data.fallback ? ' (fallback data)' : ''}`);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Instagram posts');
        
        // Set fallback posts if API completely fails
        setPosts([]);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const visiblePosts = showAll ? posts : posts.slice(0, 6);

  // Loading state
  if (loading) {
    return (
      <section id="instagram" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Follow Our Journey</h2>
            </div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-600">Loading our latest Instagram posts...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && posts.length === 0) {
    return (
      <section id="instagram" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Follow Our Journey</h2>
            </div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Unable to load Instagram posts at the moment.</p>
              <motion.a
                href="https://instagram.com/pjparsonspresents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-6 py-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-4 w-4 mr-2" />
                Visit Our Instagram
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mr-3 shadow-lg">
              <Instagram className="h-6 w-6 text-white" />
            </div>
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
          
          {/* Mostrar aviso si son datos de fallback */}
          {isFallback && (
            <motion.div
              className="mt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Showing sample posts. Live Instagram feed will load soon.
            </motion.div>
          )}
        </div>

        {posts.length > 0 ? (
          <>
            {/* Grid de posts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {visiblePosts.map((post, index) => (
                <InstagramPostCard
                  key={post.id}
                  post={post}
                  delay={index}
                />
              ))}
            </div>

            {/* Botones de acción */}
            <div className="text-center space-y-4 mb-16">
              {/* Botón Ver más posts */}
              {posts.length > 6 && (
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-50 px-6 py-2 shadow-lg mr-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showAll ? 'Show Less' : `View All ${posts.length} Posts`}
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
              className="text-center pb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div>
                  <p className="text-2xl font-bold text-primary">{posts.length}+</p>
                  <p className="text-sm text-gray-600">Recent Posts</p>
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No posts available at the moment.</p>
            <motion.a
              href="https://instagram.com/pjparsonspresents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-6 py-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="h-4 w-4 mr-2" />
              Visit Our Instagram
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
}
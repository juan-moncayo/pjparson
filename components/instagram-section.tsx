"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from 'lucide-react';

// Mock data for Instagram feed
const mockInstagramPosts = [
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
];

interface InstagramPostProps {
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  delay: number;
}

const InstagramPost = ({ imageUrl, likes, comments, caption, delay }: InstagramPostProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl shadow-lg"
    >
      <div className="aspect-square relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Instagram Post"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="flex justify-center space-x-4 mb-2">
              <span className="flex items-center">❤️ {likes}</span>
              <span className="flex items-center">💬 {comments}</span>
            </div>
            <p className="text-sm line-clamp-3 font-medium">{caption}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Follow Our Journey</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest wedding events and behind-the-scenes moments on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockInstagramPosts.map((post, index) => (
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

        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90 h-10 px-6 py-2 shadow-lg"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
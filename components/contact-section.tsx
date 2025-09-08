"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    location: "",
    services: "",
    message: "",
    howHeard: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      location: "",
      services: "",
      message: "",
      howHeard: "",
    });
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-b from-accent/10 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to make your special day unforgettable? Contact us to check availability and discuss your vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-semibold mb-6">Get In Touch</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">(425) 471-8780</p>
                    <p className="text-sm text-gray-600">Rather Chat? Call Us!</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Hello@PJParsonsPresents.com</p>
                    <p className="text-sm text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Service Areas</p>
                    <p className="text-sm text-gray-600">Weddings and Events</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 font-serif text-lg">Service Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Snohomish County Specialists</li>
                  <li>• Woodinville Wine Country</li>
                  <li>• Greater Seattle + Eastside Area</li>
                  <li>• Snoqualmie Valley</li>
                  <li>• Puget Sound & Western/Eastern Washington</li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold mb-3 font-serif text-lg">What We Offer</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 20+ Years of Experience</li>
                  <li>• Free, No-Obligation Event Consultation</li>
                  <li>• Connections with Local Businesses & Vendors</li>
                  <li>• Professional Equipment & Setup</li>
                  <li>• Founded in 2002</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 font-serif">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/pjparsonspresents" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://www.instagram.com/pjparsonspresents" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://linktr.ee/pjparsonspresents" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="m15.7603 6.829 4.6725-4.80317 2.712 2.77734-4.9012 4.67248h6.8944v3.85565h-6.9271l4.9339 4.7922-2.712 2.7229-6.6983-6.731-6.69829 6.731-2.712-2.712 4.93387-4.7923h-6.92703v-3.86645h6.89436l-4.9012-4.67248 2.712-2.77734 4.67249 4.80317v-6.829h4.0516zm-4.0516 12.0243h4.0516v9.1489h-4.0516z"/>
                    </svg>
                    <span className="sr-only">Linktree</span>
                  </a>
                  <a href="https://www.google.com/maps/place/PJ+Parsons+Presents/@47.9257369,-122.0810789,17z/data=!4m8!3m7!1s0x549aa94a09444b17:0x77c9b02c62e4d569!8m2!3d47.9257369!4d-122.0810789!9m1!1b1!16s%2Fg%2F11t75kps9g?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="sr-only">Location</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-semibold mb-2">Send Us a Message</h3>
              <p className="text-gray-500 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Project Date</label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-gray-700 mb-1">What services are you interested in?</label>
                  <select
                    id="services"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="dj-mc-coordination">DJ + MC & Coordination/Planning</option>
                    <option value="dj-mc">DJ + MC</option>
                    <option value="coordination">Coordination / Planning</option>
                    <option value="enhancements">Enhancements (Photo Booth, Officiating, Lighting, Bar Service)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us briefly about your event</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="howHeard" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
                  <input
                    id="howHeard"
                    name="howHeard"
                    type="text"
                    value={formData.howHeard}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.<br/>
                  Clicking SEND confirms you're okay with getting texts from PJ Parsons Presents. Message and/or data rates may apply.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
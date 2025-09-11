"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, Cookie, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const goBack = () => {
    if (window.opener) {
      window.close();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={goBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-serif font-bold text-gray-800">
                PJ Parsons Presents
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {currentDate}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="h-8 w-8" />
              <h1 className="text-3xl font-serif font-bold">Privacy Policy & Terms of Service</h1>
            </div>
            <p className="text-white/90 text-lg">
              Your privacy and trust are important to us. This document outlines how we collect, 
              use, and protect your information, as well as the terms governing our services.
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-12">
            
            {/* Privacy Policy Section */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-serif font-bold text-gray-800">Privacy Policy</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h3>
                  <div className="prose text-gray-600">
                    <p className="mb-4">We collect information you provide directly to us, such as:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address</li>
                      <li><strong>Event Details:</strong> Wedding/event date, venue location, service preferences</li>
                      <li><strong>Communication Records:</strong> Messages, emails, and consultation notes</li>
                      <li><strong>Payment Information:</strong> Billing details for contracted services</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h3>
                  <div className="prose text-gray-600">
                    <p className="mb-4">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide and coordinate wedding and event services</li>
                      <li>Communicate with you about your event and our services</li>
                      <li>Process payments and manage contracts</li>
                      <li>Send you relevant updates and promotional materials (with your consent)</li>
                      <li>Improve our services and customer experience</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Sharing</h3>
                  <div className="prose text-gray-600">
                    <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information only in these circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Vendors & Partners:</strong> With trusted vendors necessary for your event (photographers, venues, etc.) with your consent</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> In the event of a merger or sale of our business</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Policy Section */}
            <section className="border-t pt-8">
              <div className="flex items-center space-x-3 mb-6">
                <Cookie className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-serif font-bold text-gray-800">Cookie Policy</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">What Are Cookies</h3>
                  <p className="text-gray-600">
                    Cookies are small text files stored on your device when you visit our website. 
                    They help us provide you with a better browsing experience and understand how our website is used.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Cookies We Use</h3>
                  <div className="prose text-gray-600">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand website usage and improve performance</li>
                      <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                      <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Consent</h3>
                  <p className="text-gray-600">
                    By continuing to use our website, you consent to our use of cookies as described in this policy. 
                    You can manage your cookie preferences through your browser settings or our cookie banner.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section className="border-t pt-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-serif font-bold text-gray-800">Terms of Service</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Agreement</h3>
                  <p className="text-gray-600">
                    By engaging PJ Parsons Presents for wedding or event services, you agree to these terms. 
                    All services are subject to availability and executed according to our professional standards.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking & Payments</h3>
                  <div className="prose text-gray-600">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All bookings require a signed contract and deposit</li>
                      <li>Payment schedules are outlined in individual service contracts</li>
                      <li>Cancellation policies vary by service and are detailed in contracts</li>
                      <li>Final payments are due before event date as specified in contracts</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Liability & Force Majeure</h3>
                  <p className="text-gray-600">
                    While we strive for perfection, our liability is limited to the value of contracted services. 
                    We are not responsible for circumstances beyond our control, including but not limited to: 
                    weather, venue issues, vendor failures, or acts of nature.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h3>
                  <p className="text-gray-600">
                    All content on this website, including text, images, and logos, is protected by copyright. 
                    Photos and videos from your event may be used for promotional purposes unless otherwise specified in your contract.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="border-t pt-6 sm:pt-8">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-gray-800 mb-3 sm:mb-4">Questions About Our Policies?</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  If you have any questions about this Privacy Policy, Cookie Policy, or Terms of Service, 
                  please don't hesitate to contact us.
                </p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <a 
                    href="mailto:Hello@PJParsonsPresents.com"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all sm:break-normal">Hello@PJParsonsPresents.com</span>
                  </a>
                  <a 
                    href="tel:+14254718780"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>(425) 471-8780</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Updates Notice */}
            <section className="border-t pt-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Policy Updates</h3>
                <p className="text-gray-600 text-sm">
                  We may update this Privacy Policy and Terms of Service from time to time. 
                  We will notify you of any changes by posting the new policies on this page with an updated revision date. 
                  Your continued use of our services after any changes constitutes acceptance of the new terms.
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  Last updated: {currentDate} | Effective Date: January 1, 2024
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PJ Parsons Presents. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Your Day, Your Way - Serving Snohomish County and Beyond Since 2002
          </p>
        </div>
      </footer>
    </div>
  );
}
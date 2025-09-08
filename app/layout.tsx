import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "PJ Parsons Presents - Wedding & Event Services",
  description: "Your Day, Your Way - 20+ years of wedding and event excellence in Snohomish County. DJ, MC, Coordination, and more.",
  keywords: "wedding DJ, wedding coordinator, Snohomish County, Seattle weddings, event planning, photo booth, officiant",
  authors: [{ name: "PJ Parsons Presents" }],
  openGraph: {
    title: "PJ Parsons Presents - Wedding & Event Services",
    description: "Your Day, Your Way - Creating unforgettable wedding experiences",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E8B4BC" />
      </head>
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
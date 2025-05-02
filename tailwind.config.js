/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8B4BC",
        secondary: "#C9E4DE",
        accent: "#F7D9C4",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./three/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        showroom: {
          dark: "#0a0a0c",
          surface: "#121216",
          card: "#18181f",
          border: "#262633",
          accent: "#c5a880", // Warm luxury champagne / bronze
          accentHover: "#d8bc95",
          sand: "#f5f3ef",
          taupe: "#8e867d",
          charcoal: "#1d1d24",
          glass: "rgba(18, 18, 22, 0.75)",
          glassLight: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
        glow: "0 0 25px rgba(197, 168, 128, 0.25)",
      },
    },
  },
  plugins: [],
};


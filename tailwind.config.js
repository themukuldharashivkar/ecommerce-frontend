/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/customer/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
    "./src/Routers/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
      },
      colors: {
        ink: "#0E0E10",
        paper: "#FAFAF8",
        brand: {
          50: "#F3F0FF",
          100: "#E8E2FF",
          200: "#D2C7FF",
          400: "#8F73FF",
          500: "#7352FF",
          600: "#5B35F0",
          700: "#4A27CC",
        },
        sale: "#E5484D",
        success: "#12A150",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,14,16,.04), 0 8px 24px -8px rgba(14,14,16,.10)",
        lift: "0 2px 4px rgba(14,14,16,.04), 0 24px 48px -16px rgba(14,14,16,.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fade-in .4s ease both",
        shimmer: "shimmer 1.6s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

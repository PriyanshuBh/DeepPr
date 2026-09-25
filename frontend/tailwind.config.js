/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      colors: {
        canvas: "#0F1115", // Deep slate background
        canvasSoft: "#1A1D24", // Slightly lighter slate for cards
        ink: "#F8FAFC", // Off-white text
        inkSoft: "#E2E8F0",
        textMuted: "#94A3B8",
        textFaint: "#64748B",
        field: "#232833",
        hairline: "#333B4D",
        accent: "#3B82F6" // Modern tech blue
      },
      borderRadius: {
        sm: "16px",
        md: "24px",
      }
    },
  },
  plugins: [],
};

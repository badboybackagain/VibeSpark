/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#08086F",
          orange: "#F4773B",
          "orange-hover": "#E05E1F",
          "orange-light": "#FF8E56",
          midnight: "#080B35",
          "midnight-deep": "#04061F",
          indigo: "#403CFF",
          "royal-blue": "#254DFF",
          purple: "#6B74E6",
          lavender: "#D6D6FF",
          "lavender-light": "#EEF0FF",
          soft: "#F7F7FF",
          muted: "#6B7280",
          cardDark: "rgba(12, 16, 58, 0.75)",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(244, 119, 59, 0.45)',
        'glow-indigo': '0 0 35px -5px rgba(64, 60, 255, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(107, 116, 230, 0.15)',
        'card-dark': '0 10px 30px -10px rgba(4, 6, 31, 0.5)',
        'card-light': '0 10px 25px -5px rgba(8, 8, 111, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 80% 20%, rgba(64, 60, 255, 0.28) 0%, rgba(8, 11, 53, 0.95) 60%, #04061F 100%)',
        'mesh-glow': 'radial-gradient(circle at 50% 50%, rgba(64, 60, 255, 0.15) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}

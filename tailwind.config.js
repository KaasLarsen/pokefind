/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pk: {
          navy: "#0c1e3d",
          ink: "#0a1628",
          blue: "#1e4a8a",
          sky: "#7eb8ff",
          electric: "#ffd24a",
          yellow: "#ffcb05",
          "yellow-bright": "#ffe566",
          mint: "#5eead4",
          red: "#e3350d",
          cream: "#f4f7fb",
          card: "#ffffff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 203, 5, 0.35)",
        "glow-lg": "0 0 60px -12px rgba(255, 210, 74, 0.45)",
        "card-inset": "inset 0 1px 0 0 rgba(255, 255, 255, 0.85)",
      },
      backgroundImage: {
        "pk-mesh":
          "radial-gradient(ellipse 80% 60% at 15% 10%, rgba(126, 184, 255, 0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 85%, rgba(255, 203, 5, 0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(94, 234, 212, 0.08), transparent 45%)",
        "pk-hero":
          "linear-gradient(135deg, rgba(12, 30, 61, 0.98) 0%, rgba(30, 74, 138, 0.95) 45%, rgba(10, 22, 40, 0.98) 100%)",
        "pk-hero-vivid":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 210, 74, 0.35), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(227, 53, 13, 0.15), transparent 45%), linear-gradient(145deg, #0a1628 0%, #1e4a8a 42%, #0c1e3d 100%)",
        "pk-card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(244,247,251,0.92) 50%, rgba(255,255,255,0.99) 100%)",
      },
      keyframes: {
        "pk-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pk-pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.95" },
        },
        "pk-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "pk-float": "pk-float 5s ease-in-out infinite",
        "pk-float-delayed": "pk-float 5.8s ease-in-out infinite 0.2s",
        "pk-pulse-soft": "pk-pulse-soft 3.5s ease-in-out infinite",
        "pk-shimmer": "pk-shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};


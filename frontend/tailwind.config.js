/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand green (header, primary buttons, send button)
        brand: {
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32", // primary
          900: "#1B5E20",
        },
        // Accent blue (user message bubbles, info card border)
        accent: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#2196F3",
          600: "#1E88E5",
          700: "#1976D2",
          800: "#1565C0", // primary accent
          900: "#0D47A1",
        },
        // Surface neutrals (light + dark)
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8FA",
          muted: "#EEF1F4",
          border: "#E2E6EA",
          dark: "#1A1D21",
          "dark-subtle": "#23272D",
          "dark-muted": "#2C3037",
          "dark-border": "#3A3F47",
        },
      },
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(15, 23, 42, 0.06)",
        elevated: "0 8px 24px rgba(15, 23, 42, 0.10)",
      },
      borderRadius: {
        bubble: "16px",
      },
    },
  },
  plugins: [],
};

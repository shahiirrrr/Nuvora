/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        'ping-slow': {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
        'heart-beat': {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'ping-slow': 'ping-slow 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out',
      },
      colors: {
        // Custom color palette
        primary: {
          DEFAULT: '#19183B',
          dark: '#12122A',
          light: '#32315D',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#708993',
          dark: '#5A6E77',
          light: '#8EA4AD',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#A1C2BD',
          dark: '#8AA9A4',
          light: '#B8D1CD',
          foreground: '#19183B',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFB',
        },
        // Theme colors using the custom palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "var(--foreground)",
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#4A9782',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#111827',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#111827',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

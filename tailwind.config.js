/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#0a1929',
          800: '#0f2744',
          700: '#1a3456',
          600: '#2d5a8c',
          500: '#4a6fa5',  // 👈 EKSİK OLAN BUYDU!
          400: '#6783b7',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
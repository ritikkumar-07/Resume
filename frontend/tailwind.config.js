/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DFD8',
          300: '#D6C7BC',
          800: '#5A4E47',
          900: '#332E2B',
        }
      }
    },
  },
  plugins: [],
}
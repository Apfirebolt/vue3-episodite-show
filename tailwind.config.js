/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557',
        danger: '#E63946',
        secondary: {
          100: '#F1FAEE',
          200: '#A8DADC',
          300: '#457B9D',
        },
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
        vazir: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#755AE2',
        secondary: '#3C1356',
        primaryLight: '#F5F3FF',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: '#755AE2',
        secondary: '#3C1356',
        primaryLight: '#F5F3FF',
      },

      screens: {
        xs: { max: '480px' }, // Custom extra small screen
        sm: { max: '640px' }, // Small screens like tablets
        md: { max: '768px' }, // Medium screens like large tablets
        lg: { max: '1024px' }, // Large screens like laptops
        xl: { max: '1280px' }, // Extra large screens like desktops
        '2xl': { max: '1536px' }, // 2X large screens
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          width: '100%',
          paddingLeft: theme('spacing.16'),
          paddingRight: theme('spacing.16'),
          marginLeft: 'auto',
          marginRight: 'auto',
          // "@screen xs": {
          //   maxWidth: "480px",
          // },
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
          '@screen 2xl': {
            maxWidth: '1536px',
          },
        },
      });
    },
  ],
};

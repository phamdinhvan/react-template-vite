/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {},
    },
    screens: {
      xs: '480px',
      sm: '640px', //Tablet
      md: '768px',
      lg: '1024px', //Desktop
      xl: '1280px',
      xxl: '1440px',
      max_sm: { max: '640px' },
      max_md: { max: '768px' },
      max_lg: { max: '1024px' },
      max_xl: { max: '1440px' },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  prefix: 'tw-',
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gradient1: 'rgb(221, 221, 255) 0%',
        gradient2: 'rgb(172, 172, 255) 100%',
        orange: '#F68614',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

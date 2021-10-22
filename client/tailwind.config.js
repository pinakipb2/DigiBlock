module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gradient1: 'rgb(221, 221, 255) 0%',
        gradient2: 'rgb(172, 172, 255) 100%',
        orange: '#F68614',
        prime: '#0c11c2',
        blue1: '#3089DC',
        healthy: '#05B113',
      },
      fontFamily: {
        roboto: ['Roboto', 'sanf-serif'],
        raleway: ['Raleway', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      height: {
        loginCardHt: '35rem',
      },
      animation: {
        'to-fro': 'wiggle 2.5s infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-30%)' },
          '50%': { transform: 'translateX(30%)' },
          '100%': { transform: 'translateX(-30%)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

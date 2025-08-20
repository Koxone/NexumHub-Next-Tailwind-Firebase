// tailwind.config.js
module.exports = {
  // ... tu configuración existente
  theme: {
    extend: {
      // ... otras extensiones
    },
  },
  plugins: [
    // ... otros plugins
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.snap-y': {
          'scroll-snap-type': 'y mandatory',
        },
        '.snap-start': {
          'scroll-snap-align': 'start',
        },
        '.snap-always': {
          'scroll-snap-stop': 'always',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

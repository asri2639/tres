module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mbg: 'var(--color-mb-background)',
        hbg: '#031820',
      },
      fontSize: {
        tiny: '0.9375rem',
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
      },
      fontFamily: {
        english: ['LikhithEnglish']
      },
      boxShadow: {
        t: '0 -2px 13px rgba(0,0,0,0.2)',
      }
    },
  },
  variants: {},
  plugins: [],
};

const path = require('path');

const localeSubpaths = {
  asm: 'assamese',
  bn: 'bengali',
  gu: 'gujarati',
  hi: 'hindi',
  kn: 'kannada',
  ml: 'malayalam',
  mr: 'marathi',
  or: 'oriya',
  pan: 'punjabi',
  ur: 'urdu',
  en: 'english',
  te: 'telugu',
  ta: 'tamil',
};
module.exports = {
  distDir: 'dist',
  // rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV, // Pass through env variables
    TEST: process.env.NEXT_TEST,
  },

  rewrites: async () => {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/ads.txt',
        destination: '/api/ads',
      },
    ];
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (!isServer) {
    //   webpack.resolve = { alias: require("./aliases.config").webpack };
    // }
    return config;
  },

  generateBuildId: async () => {
    const date = new Date();
    return date.toISOString().slice(0, 16);
  },
};

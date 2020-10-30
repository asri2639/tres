const path = require('path');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = {
  as: 'assamese',
  be: 'bengali',
  gu: 'gujarati',
  hi: 'hindi',
  kn: 'kannada',
  ma: 'malayalam',
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
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (!isServer) {
    //   webpack.resolve = { alias: require("./aliases.config").webpack };
    // }
    return config;
  },
};

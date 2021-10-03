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
  productionBrowserSourceMaps: false,
  // rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV, // Pass through env variables
    TEST: process.env.NEXT_PUBLIC_TEST,
  },

  images: {
    domains: ['etvbharatimages.akamaized.net', 'localhost'],
  },

  rewrites: () => {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/ads.txt',
        destination: '/api/ads',
      },
      {
        source: '/:slug*/:slug.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/apis/v2/:path*',
        destination: 'https://prod.suv.etvbharat.com/v2/:path*',
      },
      {
        source: '/apis/:path*',
        destination: 'https://prod.api.etvbharat.com/:path*',
      },
    ];
  },


   redirects: () => {
    return [
      {
        source: '/',
        destination: '/english/national',
        permanent: true
      },
       {
        source: '/:language',
        destination: '/english/national',
        permanent: true
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

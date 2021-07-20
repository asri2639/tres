import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;

const prd_test = publicRuntimeConfig.TEST === 'test';

const baseURL =
  env === 'production'
    ? 'https://prod.api.etvbharat.com'
    :'https://curator.api.etvbharat.com';

export const domainUrl =
  env === 'production' && !prd_test
    ? 'https://react.etvbharat.com'
    : env === 'development' || prd_test
    ? 'http://localhost:3000'
    : 'https://react.staging.etvbharat.com';

const mAuthToken = 'kmAJAH4RTtqHjgoauC4o';
const authToken = 'xBUKcKnXfngfrqGoF93y';

const Constants = Object.freeze({
  baseURL: baseURL,
  authToken: authToken,
  mAuthToken: mAuthToken,
  appURLs: {
    android:
      'https://play.google.com/store/apps/details?id=com.etvbharat.android',
    ios: 'https://itunes.apple.com/us/app/yourapp/id1453416186',
  },
});


export const accessToken = {
  web:
    env === 'production'
      ? 'TjeNsXehJqhh2DGJzBY9'
      : env === 'development'
      ? 'TjeNsXehJqhh2DGJzBY9'
      : 'Fw3196P2FES3HBfytEtn',
  mobile:
    env === 'production'
      ? 'woB1UukKSzZ5aduEUxwt'
      : env === 'development'
      ? 'woB1UukKSzZ5aduEUxwt'
      : 's2byd1VP6PN8hYDsb8zj',
};

export const applicationConfig = {
  value: null,
};

export const languageMap = {
  assamese: 'asm',
  bengali: 'bn',
  english: 'en',
  gujarati: 'gu',
  hindi: 'hi',
  kannada: 'kn',
  malayalam: 'ml',
  marathi: 'mr',
  oriya: 'or',
  punjabi: 'pan',
  tamil: 'ta',
  telugu: 'te',
  urdu: 'ur',
};

export const localeSubpaths = {
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

export default Constants;

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;

const baseURL =
  env === 'production'
    ? 'https://prod.api.etvbharat.com'
    : env === 'development'
    ? 'http://localhost:3000/api'
    : 'https://staging.api.etvbharat.com';

// const accessToken =
//   env === 'production'
//     ? 'TjeNsXehJqhh2DGJzBY9'
//     : env === 'development'
//     ? 'TjeNsXehJqhh2DGJzBY9'
//     : 'fwrYv4w5Tz8QKYWQ17u2';

// const mAccessToken =
//   env === 'production'
//     ? 'woB1UukKSzZ5aduEUxwt'
//     : env === 'development'
//     ? 'woB1UukKSzZ5aduEUxwt'
//     : 'oN5eiUpVazqaAYXzaPNY';

const mAuthToken = 'kmAJAH4RTtqHjgoauC4o';
const authToken = 'xBUKcKnXfngfrqGoF93y';

const Constants = Object.freeze({
  baseURL: baseURL,
  authToken: authToken,
  mAuthToken: mAuthToken,
  socialURLs: {
    facebook: 'https://www.facebook.com/ETVBharatEnglish',
    twitter: 'https://twitter.com/eenadu_english',
  },
  appURLs: {
    android:
      'https://play.google.com/store/apps/details?id=com.etvbharat.android',
    ios: 'https://itunes.apple.com/us/app/yourapp/id1453416186',
  },
});

export const accessToken = {
  web: '',
  mobile: '',
};

export const applicationConfig = {
  value: null
};

export const languageMap = {
  assamese: 'asm',
  bengali: 'be',
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
  be: 'bengali',
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

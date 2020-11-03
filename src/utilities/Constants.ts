const env = process.env.NEXT_PUBLIC_APP_ENV;

const baseURL =
  env === 'production'
    ? 'https://prod.api.etvbharat.com/api'
    : env === 'development'
    ? 'http://localhost:3000/api'
    : 'https://staging.api.etvbharat.com/api';

const accessToken =
  env === 'production'
    ? 'TjeNsXehJqhh2DGJzBY9'
    : env === 'development'
    ? 'TjeNsXehJqhh2DGJzBY9'
    : 'fwrYv4w5Tz8QKYWQ17u2';

const authToken = 'xBUKcKnXfngfrqGoF93y';

const Constants = Object.freeze({
  baseURL: baseURL,
  authToken: authToken,
  accessToken: accessToken,
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

export const languageMap = {
  assamese: 'as',
  bengali: 'be',
  english: 'en',
  gujarati: 'gu',
  hindi: 'hi',
  kannada: 'kn',
  malayalam: 'ma',
  marathi: 'mr',
  oriya: 'or',
  punjabi: 'pan',
  tamil: 'ta',
  telugu: 'te',
  urdu: 'ur',
};

export const localeSubpaths = {
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

export default Constants;

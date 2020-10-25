const PROXY_URL = '';
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000/api'
    : PROXY_URL + 'http://localhost:3000/api';

const Constants = Object.freeze({
  baseURL: baseURL,
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
  ka: 'kannada',
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

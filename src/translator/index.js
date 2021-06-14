import english from './locales/en/common.json';
import assamese from './locales/as/common.json';
import bengali from './locales/bn/common.json';
import gujarati from './locales/gu/common.json';
import hindi from './locales/hi/common.json';
import kannada from './locales/kn/common.json';
import malayalam from './locales/ml/common.json';
import marathi from './locales/mr/common.json';
import oriya from './locales/or/common.json';
import punjabi from './locales/pan/common.json';
import tamil from './locales/ta/common.json';
import telugu from './locales/te/common.json';
import urdu from './locales/ur/common.json';

export default function getTranslatedValue(key, language) {
  let translatedValue = '';

  switch (language) {
    case 'en':
      translatedValue = english[`${key}`];
      break;
    case 'asm':
      translatedValue = assamese[`${key}`];
      break;
    case 'bn':
      translatedValue = bengali[`${key}`];
      break;

    case 'gu':
      translatedValue = gujarati[`${key}`];
      break;
    case 'hi':
      translatedValue = hindi[`${key}`];
      break;
    case 'kn':
      translatedValue = kannada[`${key}`];
      break;

    case 'ml':
      translatedValue = malayalam[`${key}`];
      break;

    case 'mr':
      translatedValue = marathi[`${key}`];
      break;

    case 'or':
      translatedValue = oriya[`${key}`];
      break;

    case 'pan':
      translatedValue = punjabi[`${key}`];
      break;

    case 'ta':
      translatedValue = tamil[`${key}`];
      break;

    case 'te':
      translatedValue = telugu[`${key}`];
      break;

    case 'ur':
      translatedValue = urdu[`${key}`];
      break;
  }

  return translatedValue;
}

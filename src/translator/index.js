 
 
 
 
 
 
 
 
 
 
 export default function getTranslatedValue(key,language){
     let translatedValue = '';

     switch(language) {
         case 'en':
            const english = require('./locales/en/common.json');
             translatedValue = english[`${key}`];
         break;
         case 'asm':
            const assamese = require('./locales/as/common.json');
            translatedValue = assamese[`${key}`];
        break;
        case 'bn':
            const bengali = require('./locales/bn/common.json');
            translatedValue = bengali[`${key}`];
        break;

        case 'gu':
            const gujarati = require('./locales/gu/common.json');
            translatedValue = gujarati[`${key}`];
        break;
        case 'hi':
            const hindi = require('./locales/hi/common.json');
            translatedValue = hindi[`${key}`];
        break;
        case 'kn':
            const kannada  = require('./locales/kn/common.json');
            translatedValue = kannada[`${key}`];
        break;

        case 'ml':
            const malayalam = require('./locales/ml/common.json');
            translatedValue = malayalam[`${key}`];
        break;

        case 'mr':
            const marathi = require('./locales/mr/common.json');
            translatedValue = marathi[`${key}`];
        break;

        case 'or':
            const oriya  = require('./locales/or/common.json');
            translatedValue = oriya[`${key}`];
        break;

        case 'pan':
            const punjabi = require('./locales/pan/common.json');
            translatedValue = punjabi[`${key}`];
        break;


        case 'ta':
            const tamil = require('./locales/ta/common.json');
            translatedValue = tamil[`${key}`];
        break;

        case 'te':
            const telugu = require('./locales/te/common.json');
            translatedValue = telugu[`${key}`];
        break;

         case 'ur':
            const urdu = require('./locales/ur/common.json');
            translatedValue = urdu[`${key}`];
        break;

     }

	return translatedValue;
}
import { useCallback, useContext, useEffect, useRef } from 'react';
import { useInView, InView } from 'react-intersection-observer';
// import { InView } from 'react-intersection-observer';
import AdContainer from '@components/article/AdContainer';
import { dateFormatter, thumbnailExtractor } from '@utils/Helpers';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import Thumbnail from '@components/common/Thumbnail';
import GoogleTagManager from '@utils/GoogleTagManager';
import ComScore from '@utils/ComScore';
import { RTLContext } from '@components/layout/Layout';
import MobileNextArticle from '@components/article/MobileNextArticle';
import Sticky from 'wil-react-sticky';

// initialPosition
// div height
// current Scroll position

const related1 = [
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'IPO vs OFS: What stock market investors should know?',
      'IPO vs OFS',
      'What stock market investors should know about IPO',
      'know about IPO and OFS',
      'business news',
      'Neha Goel',
      'personal finance',
      'Stocks',
      'Stock market investors',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/markets/ipo-vs-ofs-what-stock-market-investors-should-know/na20200825115003770',
    media_type: 'news',
    content_id: 'na20200825115003770',
    display_title: 'IPO vs OFS: What stock market investors should know?',
    friendly_id: 'ipo-vs-ofs-what-stock-market-investors-should-know-1',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      medium_1_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      web_3_2: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      web_2_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      high_2_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      high_1_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      web_1_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      medium_3_2: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      small_1_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      high_3_2: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      small_3_2: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
      small_2_1: {
        caption: 'Concept Image',
        alt_tags: 'Concept Image',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-8547237-thumbnail-3x2-ipo-vs-ofs.jpg',
      },
    },
    hr_list: 'business/markets',
    ml_title: [
      {
        code: 'en',
        text: 'IPO vs OFS: What stock market investors should know?',
      },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'former Reserve Bank of India Governor C Rangarajan',
      'Eenadu Associate Editor N Viswa Prasad',
      'C Rangarajan on economy',
      'interiew with C Rangarajan',
      'C Rangarajan on investment climate',
      'Rangarajan on farm laws',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/government-is-not-spending-as-much-as-it-should-be-c-rangarajan/na20210116093858488',
    media_type: 'news',
    content_id: 'na20210116093858488',
    display_title:
      'Government is not spending as much as it should be: C Rangarajan',
    friendly_id:
      'government-is-not-spending-as-much-as-it-should-be-c-rangarajan',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10259163-29-10259163-1610768428761.jpg',
      },
      medium_1_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10259163-29-10259163-1610768428761.jpg',
      },
      web_3_2: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10259163-688-10259163-1610768417798.jpg',
      },
      web_2_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10259163-29-10259163-1610768428761.jpg',
      },
      high_2_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10259163-29-10259163-1610768428761.jpg',
      },
      high_1_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10259163-29-10259163-1610768428761.jpg',
      },
      web_1_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10259163-29-10259163-1610768428761.jpg',
      },
      medium_3_2: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10259163-688-10259163-1610768417798.jpg',
      },
      small_1_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10259163-29-10259163-1610768428761.jpg',
      },
      high_3_2: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10259163-688-10259163-1610768417798.jpg',
      },
      small_3_2: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10259163-688-10259163-1610768417798.jpg',
      },
      small_2_1: {
        caption:
          'Government is not spending as much as it should be: C Rangarajan',
        alt_tags:
          'Government is not spending as much as it should be: C Rangarajan',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10259163-29-10259163-1610768428761.jpg',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      {
        code: 'en',
        text:
          'Government is not spending as much as it should be: C Rangarajan',
      },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'Bharti Airtel shares',
      'Bharti Airtel',
      'Airtel shares gain',
      'Airtel stock today',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/bharti-airtel-shares-continue-to-gain-jump-another-4-pc/na20210115195250259',
    media_type: 'news',
    content_id: 'na20210115195250259',
    display_title: 'Bharti Airtel shares continue to gain; jump another 4 pc',
    friendly_id: 'bharti-airtel-shares-continue-to-gain-jump-another-4-pc',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10255354-thumbnail-3x2-airtel.JPG',
      },
      medium_1_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10255354-thumbnail-3x2-airtel.JPG',
      },
      web_3_2: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10255354-thumbnail-3x2-airtel.JPG',
      },
      web_2_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10255354-thumbnail-3x2-airtel.JPG',
      },
      high_2_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10255354-thumbnail-3x2-airtel.JPG',
      },
      high_1_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10255354-thumbnail-3x2-airtel.JPG',
      },
      web_1_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10255354-thumbnail-3x2-airtel.JPG',
      },
      medium_3_2: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10255354-thumbnail-3x2-airtel.JPG',
      },
      small_1_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10255354-thumbnail-3x2-airtel.JPG',
      },
      high_3_2: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10255354-thumbnail-3x2-airtel.JPG',
      },
      small_3_2: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10255354-thumbnail-3x2-airtel.JPG',
      },
      small_2_1: {
        caption: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        alt_tags: 'Bharti Airtel shares continue to gain; jump another 4 pc',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10255354-thumbnail-3x2-airtel.JPG',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      {
        code: 'en',
        text: 'Bharti Airtel shares continue to gain; jump another 4 pc',
      },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'Sensex today',
      'Market today',
      'Stock market today',
      'Market closing',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/markets/sensex-tumbles-549-pts-nifty-drops-below-14450/na20210115160633689',
    media_type: 'news',
    content_id: 'na20210115160633689',
    display_title: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
    friendly_id: 'sensex-tumbles-549-pts-nifty-drops-below-14450',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251858-thumbnail-3x2-sensex.JPG',
      },
      medium_1_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251858-thumbnail-3x2-sensex.JPG',
      },
      web_3_2: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251858-thumbnail-3x2-sensex.JPG',
      },
      web_2_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251858-thumbnail-3x2-sensex.JPG',
      },
      high_2_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251858-thumbnail-3x2-sensex.JPG',
      },
      high_1_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10251858-thumbnail-3x2-sensex.JPG',
      },
      web_1_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10251858-thumbnail-3x2-sensex.JPG',
      },
      medium_3_2: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251858-thumbnail-3x2-sensex.JPG',
      },
      small_1_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251858-thumbnail-3x2-sensex.JPG',
      },
      high_3_2: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251858-thumbnail-3x2-sensex.JPG',
      },
      small_3_2: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251858-thumbnail-3x2-sensex.JPG',
      },
      small_2_1: {
        caption: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        alt_tags: 'Sensex tumbles 549 pts; Nifty drops below 14,450',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251858-thumbnail-3x2-sensex.JPG',
      },
    },
    hr_list: 'business/markets',
    ml_title: [
      { code: 'en', text: 'Sensex tumbles 549 pts; Nifty drops below 14,450' },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'GAIL share buyback',
      'GAIL stock',
      'GAIL share market',
      'GAIL buyback',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/gail-announces-rs-1046-dot-35-cr-share-buyback/na20210115155932734',
    media_type: 'news',
    content_id: 'na20210115155932734',
    display_title: 'GAIL announces Rs 1,046.35 cr share buyback',
    friendly_id: 'gail-announces-rs-1046-dot-35-cr-share-buyback',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251692-thumbnail-3x2-gail.jpg',
      },
      medium_1_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251692-thumbnail-3x2-gail.jpg',
      },
      web_3_2: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251692-thumbnail-3x2-gail.jpg',
      },
      web_2_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251692-thumbnail-3x2-gail.jpg',
      },
      high_2_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251692-thumbnail-3x2-gail.jpg',
      },
      high_1_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10251692-thumbnail-3x2-gail.jpg',
      },
      web_1_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10251692-thumbnail-3x2-gail.jpg',
      },
      medium_3_2: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251692-thumbnail-3x2-gail.jpg',
      },
      small_1_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251692-thumbnail-3x2-gail.jpg',
      },
      high_3_2: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251692-thumbnail-3x2-gail.jpg',
      },
      small_3_2: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251692-thumbnail-3x2-gail.jpg',
      },
      small_2_1: {
        caption: 'GAIL announces Rs 1,046.35 cr share buyback',
        alt_tags: 'GAIL announces Rs 1,046.35 cr share buyback',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251692-thumbnail-3x2-gail.jpg',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      { code: 'en', text: 'GAIL announces Rs 1,046.35 cr share buyback' },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'BIMSTEC nations',
      'Piyush Goyal on startups',
      'Indian investors with BIMSTEC',
      'startup boost in India',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/goyal-exhorts-indian-investors-to-eye-bimstec-nations/na20210115154223294',
    media_type: 'news',
    content_id: 'na20210115154223294',
    display_title: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
    friendly_id: 'goyal-exhorts-indian-investors-to-eye-bimstec-nations-1',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      medium_1_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      web_3_2: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      web_2_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      high_2_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      high_1_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      web_1_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      medium_3_2: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      small_1_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      high_3_2: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      small_3_2: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
      small_2_1: {
        caption: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        alt_tags: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10251414-thumbnail-3x2-piyush-goyal.jpg',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      {
        code: 'en',
        text: 'Goyal exhorts Indian investors to eye BIMSTEC nations',
      },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'Maruti Suzuki online financing platform',
      'Maruti Suzuki',
      'Maruti Suzuki website',
      'Maruti Suzuki Smart Finance',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/maruti-suzuki-launches-online-financing-platform/na20210115124653133',
    media_type: 'news',
    content_id: 'na20210115124653133',
    display_title: 'Maruti Suzuki launches online financing platform',
    friendly_id: 'maruti-suzuki-launches-online-financing-platform-1',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      medium_1_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      web_3_2: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      web_2_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      high_2_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      high_1_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      web_1_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      medium_3_2: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      small_1_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      high_3_2: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      small_3_2: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
      small_2_1: {
        caption: 'Maruti Suzuki launches online financing platform',
        alt_tags: 'Maruti Suzuki launches online financing platform',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10249042-thumbnail-3x2-maruti-suzuki.jpg',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      { code: 'en', text: 'Maruti Suzuki launches online financing platform' },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'Sensex today',
      'Markets today',
      'Stock market today',
      'Opening session',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/markets/sensex-drops-over-200-pts-in-early-trade-nifty-below-14550/na20210115113647130',
    media_type: 'news',
    content_id: 'na20210115113647130',
    display_title:
      'Sensex drops over 200 pts in early trade; Nifty below 14,550',
    friendly_id: 'sensex-drops-over-200-pts-in-early-trade-nifty-below-14550',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10248186-thumbnail-3x2-sensex.jpg',
      },
      medium_1_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10248186-thumbnail-3x2-sensex.jpg',
      },
      web_3_2: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10248186-thumbnail-3x2-sensex.jpg',
      },
      web_2_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10248186-thumbnail-3x2-sensex.jpg',
      },
      high_2_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10248186-thumbnail-3x2-sensex.jpg',
      },
      high_1_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10248186-thumbnail-3x2-sensex.jpg',
      },
      web_1_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10248186-thumbnail-3x2-sensex.jpg',
      },
      medium_3_2: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10248186-thumbnail-3x2-sensex.jpg',
      },
      small_1_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10248186-thumbnail-3x2-sensex.jpg',
      },
      high_3_2: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10248186-thumbnail-3x2-sensex.jpg',
      },
      small_3_2: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10248186-thumbnail-3x2-sensex.jpg',
      },
      small_2_1: {
        caption: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        alt_tags:
          'Sensex drops over 200 pts in early trade; Nifty below 14,550',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10248186-thumbnail-3x2-sensex.jpg',
      },
    },
    hr_list: 'business/markets',
    ml_title: [
      {
        code: 'en',
        text: 'Sensex drops over 200 pts in early trade; Nifty below 14,550',
      },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'TCS market valuation',
      'Tata Consultancy Services',
      'TCS stock gain',
      'Reliance Industries Limited',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/national-budget/tcs-market-valuation-crosses-rs-12-lakh-cr-mark/na20210114195222891',
    media_type: 'news',
    content_id: 'na20210114195222891',
    display_title: "TCS' market valuation crosses Rs 12 lakh cr-mark",
    friendly_id: 'tcs-market-valuation-crosses-rs-12-lakh-cr-mark',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10243374-thumbnail-3x2-tcs.jpg',
      },
      medium_1_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10243374-thumbnail-3x2-tcs.jpg',
      },
      web_3_2: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10243374-thumbnail-3x2-tcs.jpg',
      },
      web_2_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10243374-thumbnail-3x2-tcs.jpg',
      },
      high_2_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10243374-thumbnail-3x2-tcs.jpg',
      },
      high_1_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10243374-thumbnail-3x2-tcs.jpg',
      },
      web_1_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10243374-thumbnail-3x2-tcs.jpg',
      },
      medium_3_2: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10243374-thumbnail-3x2-tcs.jpg',
      },
      small_1_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10243374-thumbnail-3x2-tcs.jpg',
      },
      high_3_2: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10243374-thumbnail-3x2-tcs.jpg',
      },
      small_3_2: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10243374-thumbnail-3x2-tcs.jpg',
      },
      small_2_1: {
        caption: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        alt_tags: "TCS' market valuation crosses Rs 12 lakh cr-mark",
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10243374-thumbnail-3x2-tcs.jpg',
      },
    },
    hr_list: 'business/national-budget',
    ml_title: [
      { code: 'en', text: "TCS' market valuation crosses Rs 12 lakh cr-mark" },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
  {
    item_languages: ['en'],
    web_details_link: 'web-news-details',
    keywords: [
      'SAIL OFS',
      'SAIL OFS over-subscribed',
      'sale of Sail',
      'steelmaker SAIL sale',
    ],
    content_type: 'article',
    web_url:
      'english/national/business/business-news/sail-ofs-over-subscribed-3-dot-6-times-on-first-day/na20210114190727362',
    media_type: 'news',
    content_id: 'na20210114190727362',
    display_title: 'SAIL OFS over-subscribed 3.6 times on first day',
    friendly_id: 'sail-ofs-over-subscribed-3-dot-6-times-on-first-day-1',
    details_link: 'news-details',
    thumbnails: {
      medium_2_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10242753-thumbnail-3x2-sail.jpg',
      },
      medium_1_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10242753-thumbnail-3x2-sail.jpg',
      },
      web_3_2: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10242753-thumbnail-3x2-sail.jpg',
      },
      web_2_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10242753-thumbnail-3x2-sail.jpg',
      },
      high_2_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-384-10242753-thumbnail-3x2-sail.jpg',
      },
      high_1_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/98-98-10242753-thumbnail-3x2-sail.jpg',
      },
      web_1_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/492-492-10242753-thumbnail-3x2-sail.jpg',
      },
      medium_3_2: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10242753-thumbnail-3x2-sail.jpg',
      },
      small_1_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/70-70-10242753-thumbnail-3x2-sail.jpg',
      },
      high_3_2: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-10242753-thumbnail-3x2-sail.jpg',
      },
      small_3_2: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-214-10242753-thumbnail-3x2-sail.jpg',
      },
      small_2_1: {
        caption: 'SAIL OFS over-subscribed 3.6 times on first day',
        alt_tags: 'SAIL OFS over-subscribed 3.6 times on first day',
        url:
          'https://etvbharatimages.akamaized.net/etvbharat/prod-images/320-160-10242753-thumbnail-3x2-sail.jpg',
      },
    },
    hr_list: 'business/business-news',
    ml_title: [
      { code: 'en', text: 'SAIL OFS over-subscribed 3.6 times on first day' },
    ],
    fb_share_url: '',
    additional_metada: {},
  },
];

export default function Article({
  contentId,
  data,
  html,
  className,
  rhs,
  desktop,
  nextArticle,
  scrollToNextArticle,
  viewed,
  updateViewed,
  related
}) {
  const contentRef = useRef(null);
  const isRTL = useContext(RTLContext);
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      GoogleTagManager.articleViewScroll(data, { newsArticle: true });

      if (viewed.length === 1) {
        ComScore.pageView();
      } else {
        ComScore.nextPageView();
      }
    }
    if (inView) {
      const urlParts = data.web_url.split('/');
      const contentIdFromUrl = window.location.href.split('/').slice(-1)[0];
      if (contentIdFromUrl === contentId) {
        return;
      } else {
        if (ref && ref.current) {
          const elBoundary = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (elBoundary.top > 0 && elBoundary.top < windowHeight) {
            document.title = data.title;
            window.history.pushState(
              { id: data.title },
              data.title,
              '/' + data.web_url
            );

            var event = new CustomEvent<string>('newurl', {
              detail: contentId,
            });

            window.dispatchEvent(event);
          }
        }
      }
    }

    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 768;
      const divStyle = isDesktop
        ? `width: 728px; height: 90px;`
        : `width: 300px; height: 250px;`;
      const slotArr = isDesktop ? '[728, 90]' : '[300, 250]';
      let adHTML = null;
      let id, ad_id;

      if (isDesktop) {
        if (rhs && data.ad_conf) {
          id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].gpt_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
          ad_id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].ad_unit_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
        }
      } else {
        if (data.ad_conf && data.ad_conf.length > 0 && !!data.ad_conf[0]) {
          id = data.ad_conf[0].gpt_id;
          ad_id = data.ad_conf[0].ad_unit_id;
        }
      }

      if (id && ad_id) {
        adHTML = `<div id='${id}' style='${divStyle}'></div>`;
        const el = document.querySelector(
          `[data-content-id="${contentId}"] .EtvadsSection`
        );

        if (el && el.querySelector('#adsContainer')) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          var code = `
          if(window.googletag && googletag.apiReady) {
            googletag.cmd.push(function() {
              googletag.pubads().collapseEmptyDivs();
              googletag.defineSlot('${ad_id}', ${slotArr}, '${id}').addService(googletag.pubads()); 
              googletag.enableServices(); 
            }); 
            googletag.cmd.push(function() { 
              googletag.display('${id}'); 
            });
        }`;
          s.appendChild(document.createTextNode(code));
          // document.body.appendChild(s);
          el.innerHTML = adHTML;
          el.querySelector('#' + id).appendChild(s);
        }
      }
    }
  }, [inView, contentId, rhs, contentRef]);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  let filteredRHS = [];
  if (rhs) {
    filteredRHS = rhs.filter((v) => {
      return (
        v.layout_type.indexOf('ad_unit') >= 0 ||
        (v.layout_type.indexOf('ad_unit') === -1 &&
          v.catalog_list_items.length > 0)
      );
    });
  }

  const thumbnail = thumbnailExtractor(
    data.thumbnails,
    '3_2',
    'b2s',
    data.media_type
  );
  return (
    <>
      <div
        data-content-id={contentId}
        className={`article relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10 ${
          isRTL ? 'md:flex-row-reverse rtl' : ''
        }`}
      >
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className={`lg-social hidden absolute md:flex flex-col justify-around pt-2 h-56 ${
              isRTL ? 'rtl-social' : ''
            }`}
          >
            <SocialMedia data={data} />
          </Media>
        </MediaContextProvider>

        <div className="md:w-8/12 h-full bg-white">
          <Sticky
            containerSelectorFocus={`.article[data-content-id="${contentId}"]`}
            stickyEnableRange={[768, Infinity]}
            offsetTop={60}
          >
            <div
              className={`${
                className || ''
              } actual-content lg:container lg:mx-auto px-3 md:px-0 bg-white `}
              ref={contentRef}
            >
              <div className="flex flex-col md:flex-col-reverse md:mb-8">
                <div className="-mx-3 md:mx-0">
                  <Thumbnail
                    thumbnail={thumbnail}
                    className={'md:rounded-lg w-full'}
                    type={data.media_type}
                  />
                </div>
                <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                  <h1
                    ref={setRefs}
                    className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold"
                  >
                    {data.title}
                  </h1>
                  <div className="text-sm text-gray-600 md:text-black always-english">
                    {data.publish_date_uts
                      ? `Published on: ${dateFormatter(data.publish_date_uts)}`
                      : ''}
                    <span className="hidden md:inline-block">
                      {data.publish_date_uts && data.update_date_uts
                        ? `  |  `
                        : ''}
                    </span>
                    <br className="md:hidden" />
                    {data.update_date_uts
                      ? `Updated on: ${dateFormatter(data.update_date_uts)}`
                      : ''}
                  </div>
                </div>

                <MediaContextProvider>
                  <Media
                    at="xs"
                    className="flex justify-between mx-auto w-56 mb-2"
                  >
                    <SocialMedia data={data} />
                  </Media>
                </MediaContextProvider>
              </div>

              <div
                className="text-sm md:text-md"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />

              <InView
                as="div"
                className="pseudo quarter"
                triggerOnce={true}
                onChange={async (inView, entry) => {
                  if (inView) {
                    GoogleTagManager.articleViewScroll(
                      data,
                      { newsArticle: true },
                      25
                    );
                  }
                }}
              >
                <span></span>
              </InView>
              <InView
                as="div"
                className="pseudo half"
                triggerOnce={true}
                onChange={(inView, entry) => {
                  if (inView) {
                    GoogleTagManager.articleViewScroll(
                      data,
                      { newsArticle: true },
                      50
                    );
                  }
                }}
              >
                <span></span>
              </InView>

              <InView
                as="div"
                className="pseudo three-quarter"
                triggerOnce={true}
                onChange={(inView, entry) => {
                  if (inView) {
                    GoogleTagManager.articleViewScroll(
                      data,
                      { newsArticle: true },
                      75
                    );
                  }
                }}
              >
                <span></span>
              </InView>

              <InView
                as="div"
                className="pseudo full"
                triggerOnce={true}
                onChange={(inView, entry) => {
                  if (inView) {
                    GoogleTagManager.articleViewScroll(
                      data,
                      { newsArticle: true },
                      100
                    );
                  }
                }}
              >
                <span></span>
              </InView>
            </div>
          </Sticky>
        </div>

        <MediaContextProvider>
          <Media at="xs">
            <MobileNextArticle
              label={'next_article'}
              data={data}
              related={related}
              scrollToNextArticle={scrollToNextArticle}
              nextArticle={nextArticle}
            />
          </Media>
          <Media greaterThan="xs" className={`ad-content md:block md:w-4/12`}>
            <div className="w-full items-center space-y-6 pt-4 pb-4">
              {!rhs ? 'Loading...' : <AdContainer data={filteredRHS} />}
            </div>
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
}

import getConfig from 'next/config';

const getRobots = (config) =>
  config.APP_ENV === 'staging'
    ? `User-agent: *
Disallow: /
`
    : `User-agent: *
Allow: /*

Disallow: /api/*
Disallow:/dai
Disallow:/ads/
Disallow:/dfpads
Disallow:/etvbharat_staging
Disallow:/react_etvbharat_staging
Disallow:/gallery-ads
Disallow:/home-page-ad-units
Disallow:/in-article-ads
Disallow:/banner-near-logo
Disallow:/tamara-hospital
Disallow:/1754*
Disallow:/*%

# Sitemap Files
Sitemap: https://www.etvbharat.com/googlenewssitemap.xml
Sitemap: https://www.etvbharat.com/sitemap.xml
Sitemap: https://www.etvbharat.com/category-sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/bihar/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/chhattisgarh/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/gujarati/gujarat/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/himachal-pradesh/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/jharkhand/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/oriya/odisha/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/punjabi/punjab/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/rajasthan/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/uttarakhand/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/assamese/assam/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/haryana/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/tamil/tamil-nadu/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/malayalam/kerala/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/urdu/jammu-and-kashmir/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/urdu/urdu-national/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/delhi/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/marathi/maharashtra/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/telugu/telangana/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/bengali/west-bengal/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/uttar-pradesh/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/kannada/karnataka/latest_news_sitemap.xml
Sitemap: https://www.etvbharat.com/hindi/madhya-pradesh/latest_news_sitemap.xml`;

/* class Sitemap extends React.Component {
  static async getInitialProps({ res }) {

    res.setHeader('Content-Type', 'text/plain');
    res.write(getRobots(publicRuntimeConfig));
    res.end();
  }
}

export default Sitemap; */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { publicRuntimeConfig } = getConfig();

  res.setHeader('Content-Type', 'text/plain');
  res.write(getRobots(publicRuntimeConfig));
  res.end();
};

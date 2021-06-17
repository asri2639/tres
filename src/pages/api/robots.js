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
Disallow:/etvbharat_staging
Disallow:/gallery-ads
Disallow:/home-page-ad-units
Disallow:/in-article-ads
Disallow:/banner-near-logo
Disallow:/tamara-hospital
Disallow:/1754*

# Sitemap Files
Sitemap: https://www.etvbharat.com/sitemap.xml
Sitemap: https://www.etvbharat.com/latest_news_sitemap.xml
`;

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

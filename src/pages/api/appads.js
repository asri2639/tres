import getConfig from 'next/config';
const fs = require('fs');

const getAds = (config) => {
  return fs.readFileSync(`public/static/appads.txt`);
};

export default (req, res) => {
  const { publicRuntimeConfig } = getConfig();

  res.setHeader('Content-Type', 'text/plain');
  res.write(getAds(publicRuntimeConfig));
  res.end();
};

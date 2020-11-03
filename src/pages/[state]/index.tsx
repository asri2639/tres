import React from 'react';
import { i18n, Link, withTranslation } from '@i18n';

const state = ({ t }) => {
  return <div></div>;
};

state.getInitialProps = async ({ req, res }) => {
  /* console.log(req.url)
  if (res) {
    res.writeHead(302, {
      // or 301
      Location: `${process.env.NEXT_PUBLIC_APP_ENV ==='staging' ?  'https://staging.etvbharat.com':'https://www.etvbharat.com'}${req.url}`,
    });
    res.end();
  } else {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_ENV ==='staging' ?  'https://staging.etvbharat.com':'https://www.etvbharat.com'}${req.url}`;
  } */
  return {
    namespacesRequired: ['common'],
  };
};
export default withTranslation('common')(state);

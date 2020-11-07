import React from 'react';
import { i18n, Link, withTranslation } from '@i18n';
import getConfig from 'next/config';

const state = ({ t }) => {
  return <div></div>;
};

state.getInitialProps = async ({ req, res }) => {
  const { publicRuntimeConfig } = getConfig();

  if (res) {
    res.writeHead(302, {
      // or 301
      Location: `${
        publicRuntimeConfig.APP_ENV === 'staging'
          ? 'https://staging.etvbharat.com'
          : 'https://www.etvbharat.com'
      }${req.url}`,
    });
    res.end();
  }
  return {
    namespacesRequired: ['common'],
  };
};
export default withTranslation('common')(state);

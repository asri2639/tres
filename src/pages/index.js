import React from 'react';
import Head from 'next/head';
import { withTranslation } from '@i18n';

const Index = () => {
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default withTranslation('common')(Index);

import React, { useEffect, useState } from 'react';
import { i18n, Link, withTranslation } from '@i18n';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { stateCodeConverter } from '@utils/Helpers';
import ListContainer from '@components/listing/ListContainer';
import { applicationConfig, languageMap } from '@utils/Constants';
import { trackPromise } from 'react-promise-tracker';

const state = ({ data, payload, t }) => {
  return <ListContainer data={data} payload={payload}></ListContainer>;
};

state.getInitialProps = async ({ query, req, res, ...args }) => {
  const api = API(APIEnum.Listing, APIEnum.CatalogList);
  const url = args.asPath;

  const response = await api.Listing.getListingApiKey({
    query: {
      app: 'msite',
      url: args.asPath,
    },
  });

  const result = response.data;

  const urlSplit = url.split('/');
  const language = languageMap[urlSplit[1]];
  const state = stateCodeConverter(urlSplit[2]);

  if (typeof window !== 'undefined') {
    document.documentElement.lang = languageMap[language];
    if (location.protocol === 'http') {
      // window.location.href = window.location.href.replace('http:', 'https:');
    }
  }

  const requestPayload = {
    params: {
      key: result.home_link,
    },
    query: {
      collective_ads_count: 0,
      page: 0,
      page_size: 8,
      version: 'v2',
      response: 'r2',
      item_languages: language,
      portal_state: state,
    },
  };
  const listingResp = await trackPromise(
    api.CatalogList.getListing(requestPayload)
  );

  const data = listingResp.data.data;
  /* if (res) {
    res.writeHead(302, {
      // or 301
      Location: `${
        publicRuntimeConfig.APP_ENV === 'staging'
          ? 'https://staging.etvbharat.com'
          : 'https://www.etvbharat.com'
      }${req.url}`,
    });
    res.end();
  } */
  return {
    namespacesRequired: ['common'],
    pageType: 'listing',
    data: data,
    payload: requestPayload,
  };
};

export default withTranslation('common')(state);

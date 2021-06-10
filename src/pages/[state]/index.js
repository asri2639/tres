import React, { useContext } from 'react';
import { i18n, Link, withTranslation } from '@i18n';
import { I18nContext } from 'next-i18next';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ListContainer from '@components/listing/ListContainer';
import { applicationConfig, languageMap } from '@utils/Constants';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { configStateCodeConverter, stateCodeConverter } from '@utils/Helpers';
import { NextSeo } from 'next-seo';
import getConfig from 'next/config';

const state = ({ data, payload, pageType, t }) => {
  const router = useRouter();
  const {
    i18n: { language },
  } = useContext(I18nContext);
  const convertedState = configStateCodeConverter(router.query.state);

  let fbContentId = '';
  if (applicationConfig && applicationConfig.params_hash2) {
    const fbContent =
      applicationConfig.params_hash2.config_params.fb_pages[convertedState];
    fbContentId = fbContent ? fbContent.fb_page_id : null;
  }

  return data ? (
    <>
      <Head>
        <title>{data.meta_tag_title}</title>
        <meta name="fbPages" property="fb:pages" content={fbContentId}></meta>
      </Head>
      <NextSeo
        title={data.meta_tag_title}
        description={data.meta_tag_description}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: data.meta_tag_keywords
              ? data.meta_tag_keywords.join(', ')
              : '',
          },
        ]}
        openGraph={{
          site_name: 'ETV Bharat News',
          url: `https://www.etvbharat.com/${router.asPath.slice(1)}`,
          type: 'article',
          title: data.meta_tag_title,
          description: data.meta_tag_description,
          images: [
            {
              url: `https://react.etvbharat.com/assets/logos/${language}.png`,
              width: 200,
              height: 200,
              alt: 'ETV Bharat News',
            },
          ],
        }}
        twitter={{
          handle: '@etvbharat',
          site: '@etvbharat',
          cardType: 'summary_large_image',
        }}
      />
      <ListContainer
        key={router.query.state}
        data={data}
        payload={payload}
      ></ListContainer>
    </>
  ) : null;
};

state.getInitialProps = async ({ query, req, res, ...args }) => {
  const api = API(APIEnum.Listing, APIEnum.CatalogList);
  const url = args.asPath;
  const { publicRuntimeConfig } = getConfig();
  
  if (process.browser) {
    const redirectUrl = `${
      publicRuntimeConfig.APP_ENV === 'staging'
        ? 'https://staging.etvbharat.com'
        : 'https://www.etvbharat.com'
    }${url}`;

    if (res && !process.browser) {
      res.writeHead(302, {
        Location: redirectUrl,
      });
      res.end();
    } else {
      console.log(redirectUrl)
      location.href = redirectUrl;
    }
  }

  /*  if (url !== '/english/national') {
    if (res) {
      res.writeHead(302, {
        // or 301
        Location: `${
          publicRuntimeConfig.APP_ENV === 'staging'
            ? 'https://staging.etvbharat.com'
            : 'https://www.etvbharat.com'
        }${url}`,
      });
      res.end();
    }
  } */

  const response = await api.Listing.getListingApiKey({
    query: {
      app: 'msite',
      url: url,
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

  return {
    namespacesRequired: ['common'],
    pageType: 'listing',
    data: data,
    payload: requestPayload,
  };
};

export default withTranslation('common')(state);

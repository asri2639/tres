import React, { useEffect } from 'react';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ListContainer from '@components/listing/ListContainer';
import { applicationConfig, languageMap } from '@utils/Constants';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  configStateCodeConverter,
  getAmpUrl,
  stateCodeConverter,
} from '@utils/Helpers';
import { NextSeo } from 'next-seo';
import useTranslator from '@hooks/useTranslator';

const state = ({ data, payload, pageType }) => {
  const router = useRouter();

  const { appLanguage } = useTranslator();

  const convertedState = configStateCodeConverter(router.query.state);

  let fbContentId = '';
  if (applicationConfig && applicationConfig.params_hash2) {
    const fbContent =
      applicationConfig.params_hash2.config_params.fb_pages[convertedState];
    fbContentId = fbContent ? fbContent.fb_page_id : null;
  }

  const canonicalUrl = `https://www.etvbharat.com${
    new URL(`http:localhost:3000${router.asPath}`).pathname
  }`;
  const ampUrl = getAmpUrl(canonicalUrl, true);
  let ampExists = false;

  const splitPath = router.asPath.split('/');
  const state = splitPath[2];
  if (
    state === 'uttar-pradesh' ||
    (state === 'national' && splitPath[1] !== 'urdu')
  ) {
    ampExists = true;
  }

  return data ? (
    <>
      <Head>
        <title>{data.meta_tag_title}</title>
        <link rel="canonical" href={canonicalUrl}></link>
        {ampExists ? <link rel="amphtml" href={ampUrl}></link> : null}
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
              url: `https://www.etvbharat.com/assets/logos/${appLanguage.name}.png`,
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
        key={router.query.language + '-' + router.query.state}
        data={data}
        payload={payload}
      ></ListContainer>
    </>
  ) : null;
};

state.getInitialProps = async ({ query, req, res, ...args }) => {
  const api = API(APIEnum.Listing, APIEnum.CatalogList);
  const url = args.asPath;

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

  if (!state) {
    /*  if (process.browser) {
      router.push('/english/national');
    } else {
      res.writeHead(302, { Location: '/english/national' }).end();
    } */
  }

  if (result) {
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
      pageType: 'listing',
      data: data,
      payload: requestPayload,
    };
  } else {
    return {
      pageType: 'listing',
      data: null,
    };
  }
};

export default state;

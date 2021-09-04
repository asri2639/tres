import React from 'react';
import { NextSeo } from 'next-seo';
import { trackPromise } from 'react-promise-tracker';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Head from 'next/head';
import { getAmpUrl, stateCodeConverter } from '@utils/Helpers';
import { languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import useTranslator from '@hooks/useTranslator';

import { totalItemsCount } from '@components/listing/PageListing';
import Error from 'next/error';

import PageListing from '@components/listing/PageListing';

const slug = ({ data, initCount, pageType, id, payload, dropDownData }) => {
  const router = useRouter();
  const { appLanguage } = useTranslator();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  const getComponent = () => {
    let stateName = null;
    let canonicalUrl = '';
    let ampUrl = '';

    if (pageType === 'error') {
      return <div>URL Not Found</div>;
    } else if (pageType === 'redirect') {
      return null;
    }

    const pathname = new URL(`http:localhost:3000${router.asPath}`).pathname;
    const splitPath = pathname.split('/');

    if (stateName) {
      canonicalUrl = `https://www.etvbharat.com${[
        ...splitPath.slice(0, 2),
        stateName,
        ...splitPath.slice(3),
      ].join('/')}`;
    } else {
      canonicalUrl = `https://www.etvbharat.com${pathname}`;
    }

    const state = splitPath[2];
    if (
      state === 'uttar-pradesh' ||
      (state === 'national' && splitPath[1] !== 'urdu')
    ) {
      ampUrl = getAmpUrl(canonicalUrl, splitPath.length === 3);
    }

    switch (pageType) {
      case 'navlisting':
        return (
          <>
            <Head>
              <title>
                {data.meta_tag_title !== '' &&
                !data.meta_tag_title.includes('canonical tag')
                  ? data.meta_tag_title
                  : 'ETV Bharat'}
              </title>
              <link rel="canonical" href={canonicalUrl}></link>
            </Head>

            <NextSeo
              title={
                data.meta_tag_title !== '' &&
                !data.meta_tag_title.includes('canonical tag')
                  ? data.meta_tag_title
                  : 'ETV Bharat'
              }
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
                url: `https://www.etvbharat.com${pathname}`,
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
            <PageListing
              key={canonicalUrl}
              data={data}
              initCount={initCount}
              payload={payload}
              dropdown={dropDownData}
            ></PageListing>
          </>
        );
      case 'redirect':
        return null;
      default:
        return <></>;
    }
  };

  return (
    <>
      {data ? (
        getComponent()
      ) : (
        <div className={'not-found'}>
          <Error statusCode={404}></Error>
        </div>
      )}
    </>
  );
};

export default slug;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params, ...args }) {
  let language = 'en',
    state = 'na';
  const url = `/${params.language}/${params.state}/videos`;

  language = languageMap[params.language];
  state = stateCodeConverter(params.state);

  const api = API(APIEnum.Listing, APIEnum.CatalogList, APIEnum.Catalog);

  const response = await api.Listing.getListingApiKey({
    query: {
      app: 'msite',
      url: url,
    },
  }).catch((e) => {
    return {
      redirect: {
        destination: `/${params.language}/${params.state}`,
        permanent: false,
      },
    };
  });
  const result = response.data;
  if (!result) {
    return {
      redirect: {
        destination: `/${params.language}/${params.state}`,
        permanent: false,
      },
    };
  }

  let finalDataObj = {
    title: '',
    data: [],
  };

  const qparams = {
    collective_ads_count: 0,
    page: 0,
    page_size: 4,
    version: 'v2',
    response: 'r2',
    item_languages: language,
    portal_state: state,
  };

  var finalQueryParamObject = {};
  for (var i = 0; i < result.query_params.length; i++) {
    finalQueryParamObject = Object.assign(
      {},
      finalQueryParamObject,
      result.query_params[i]
    );
  }

  const requestPayload = {
    params: {
      key: result.home_link,
    },
    query: Object.assign({}, qparams, finalQueryParamObject),
  };

  const listingResp = await trackPromise(
    api.CatalogList.getListing(requestPayload)
  );

  if (listingResp && listingResp.data && listingResp.data.data) {
    const data = listingResp.data.data;
    let initCount = 0;
    try {
      initCount = totalItemsCount(data.catalog_list_items);
    } catch (e) {
      initCount = 0;
    }
    
    if (initCount) {
      return {
        props: {
          pageType: 'navlisting',
          data: data,
          initCount: initCount,
          payload: requestPayload,
          dropDownData: finalDataObj,
        },
        revalidate: 120,
      };
    }
  }

  return {
    redirect: {
      destination: `/${params.language}/${params.state}`,
      permanent: false,
    },
  };
}

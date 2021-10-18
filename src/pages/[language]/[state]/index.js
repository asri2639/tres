import React from 'react';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ListContainer from '@components/listing/ListContainer';
import { applicationConfig, languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  configStateCodeConverter,
  getAmpUrl,
  stateCodeConverter,
} from '@utils/Helpers';
import { NextSeo } from 'next-seo';
import useTranslator from '@hooks/useTranslator';
import { totalItemsCount } from '@components/listing/PageListing';

const state = ({ data, payload }) => {
  const router = useRouter();
  const { appLanguage } = useTranslator();

  if (router.isFallback) {
    return <h2 className="loading"></h2>;
  }

  const convertedState = configStateCodeConverter(router.query.state);

  let fbContentId = '';
  if (applicationConfig && applicationConfig.params_hash2) {
    const fbContent =
      applicationConfig.params_hash2.config_params.fb_pages[convertedState];
    fbContentId = fbContent ? fbContent.fb_page_id : null;
  }

  const pathname = new URL(`http:localhost:3000${router.asPath}`).pathname;
  const canonicalUrl = `https://www.etvbharat.com${pathname}`;
  let ampUrl = `https://www.etvbharat.com/amp${pathname}`;
  let ampExists = true;

  const splitPath = router.asPath.split('/');
  const state = splitPath[2];
  if (
    state === 'uttar-pradesh' ||
    (state === 'national' && splitPath[1] !== 'urdu')
  ) {
    ampExists = true;
    ampUrl = getAmpUrl(canonicalUrl, true);
  }

  return data ? (
    <>
      <Head>
        <title>{data.meta_tag_title}</title>
        <link rel="canonical" href={canonicalUrl}></link>
        {pathname === '/english/national' ? (
          <link rel="alternate" href={canonicalUrl}></link>
        ) : null}

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
      <ListContainer
        key={router.query.language + '-' + router.query.state}
        data={data}
        payload={payload}
      ></ListContainer>
    </>
  ) : null;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, ...args }) {
  try {
    const api = API(APIEnum.Listing, APIEnum.CatalogList);
    const response = await api.Listing.getListingApiKey({
      query: {
        app: 'msite',
        url: `/${params.language}/${params.state}`,
      },
    });

    const result = response.data;
    if (!result) {
      return {
        redirect: {
          destination: '/english/national',
          permanent: false,
        },
      };
    }

    const language = languageMap[params.language];
    const state = stateCodeConverter(params.state);

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
      const listingResp = await api.CatalogList.getListing(requestPayload);

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
              pageType: 'listing',
              data: data,
              payload: requestPayload,
            },
            revalidate: 120,
          };
        }
      }

      return {
        notFound: true,
        revalidate: 120,
      };
    } else {
      return {
        notFound: true,
        revalidate: 120,
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default state;

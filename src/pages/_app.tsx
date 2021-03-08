import Layout from '@components/layout/Layout';
import React, { useContext } from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import '@styles/tailwind.css';
import '@styles/globals.scss';
import '@styles/_fonts.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { i18n, appWithTranslation } from '@i18n';
import Constants, {
  accessToken,
  languageMap,
  applicationConfig,
} from '@utils/Constants';
import Head from 'next/head';
import getConfig from 'next/config';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import { thumbnailExtractor } from '@utils/Helpers';

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export const AMPContext = React.createContext(false);
let currentLanguage = 'english';

function App({ Component, pageProps, data, accessToken, appConfig }) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  useEffect(() => {

    document.documentElement.lang = languageMap[router.asPath.split('/')[1]];

    const handleRouteChange = (url) => {
      const urlSplit = url.split('/');
      if (urlSplit[1] !== currentLanguage) {
        currentLanguage = urlSplit[1];
        document.documentElement.lang = languageMap[currentLanguage];
        i18n.changeLanguage(document.documentElement.lang);
      }
      var match = urlSplit.slice(-1)[0].match(/\w{2}[0-9]+$/);
      if (!(match && match[0])) {
        const newUrl = `${
          publicRuntimeConfig.APP_ENV === 'staging'
            ? 'https://staging.etvbharat.com'
            : 'https://www.etvbharat.com'
        }${url}`;
        window.location.replace(newUrl);
      }
      console.log('App is changing to: ', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="googlebot" content="all" />
        <meta name="bingbots" content="all" />
        <meta name="robots" content="all" />
      </Head>
      {accessToken.web.length && accessToken.mobile.length ? (
        <AMPContext.Provider
          value={
            router.query.amp ===
            '1' /* &&
            publicRuntimeConfig.APP_ENV !== 'production' */
              ? true
              : false
          }
        >
          <Layout accessToken={accessToken} appConfig={appConfig}>
            {router.query.amp !== '1' &&  publicRuntimeConfig.APP_ENV === 'production' ? (
              <div
                id="etv-pseudo-content"
                style={{
                  visibility: 'hidden',
                  display: 'none',
                  position: 'absolute',
                  zIndex: -101,
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    pageProps.data && pageProps.data.thumbnails
                      ? `<div class="title">${
                          pageProps.data.title
                        }</div><div class="thumbnail"><img
                src=${
                  pageProps.data.media_type === 'breaking_news' ||pageProps.data.media_type === 'news'
                    ? 'https://react.etvbharat.com/assets/images/breakingplate.jpg'
                    : pageProps.data.thumbnails.web_3_2.url
                }
                alt=${
                  pageProps.data.media_type === 'breaking_news' || pageProps.data.media_type === 'news'
                    ? 'Breaking News'
                    : pageProps.data.thumbnails.web_3_2.alt_tags
                }
              /></div>${pageProps.data.html_tag}`
                      : '',
                }}
              ></div>
            ) : null}
            <Component {...pageProps} />
          </Layout>
        </AMPContext.Provider>
      ) : null}
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  const api = API(APIEnum.Catalog);

  if (accessToken.web.length === 0) {
    const result = await api.getAccessToken({
      params: {
        auth_token: Constants.authToken,
      },
    });
    accessToken.web = result.data.data.access_token;
  }

  if (accessToken.mobile.length === 0) {
    const result = await api.getAccessToken({
      params: {
        auth_token: Constants.mAuthToken,
      },
    });
    accessToken.mobile = result.data.data.access_token;
  }
  let appConfig = null;
  if (accessToken.mobile.length && !applicationConfig.value) {
    const result = await api.Catalog.getAppConfig({
      query: {
        response: 'r2',
        item_languages: 'en',
        current_version: '1.1',
        region: 'IN',
        version: 'v2',
      },
      isSSR: true,
    });

    appConfig = result.data.data;
    applicationConfig.value = appConfig;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    data: '',
    accessToken,
    appConfig: applicationConfig.value,
  };
};

export default appWithTranslation(App);

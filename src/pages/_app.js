import Layout from '@components/layout/Layout';
import React, { useContext, useEffect, useState } from 'react';
import '@styles/tailwind.css';
import '@styles/globals.scss';
import '@styles/_fonts.scss';
import Router, { useRouter } from 'next/router';
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
import NProgress from 'nprogress';
import GlobalSpinner from '@components/global_spinner/GlobalSpinner';

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export const AMPContext = React.createContext(false);
export const TransitionContext = React.createContext(true);

let currentLanguage = 'english';

function App({ Component, pageProps, data, accessToken, appConfig }) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
      setIsTransitioning(true);
      // destroy all ad slots
      const { googletag } = window;
      window.ads = new Set();
      googletag.cmd.push(function () {
        googletag.destroySlots();
      });
    };
    const handleRouteError = () => NProgress.done();

    const handleRouteComplete = (url) => {
      NProgress.done();
      document.documentElement.lang = languageMap[url.split('/')[1]];
      const urlSplit = url.split('/');
      if (urlSplit[1] !== currentLanguage) {
        currentLanguage = urlSplit[1];
        document.documentElement.lang = languageMap[currentLanguage];
        i18n.changeLanguage(document.documentElement.lang);
      }
      setIsTransitioning(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteError);
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
        <AMPContext.Provider value={router.query.amp === '1' ? true : false}>
          <TransitionContext.Provider value={isTransitioning}>
            {isTransitioning ? <GlobalSpinner /> : null}
            <Layout
              accessToken={accessToken}
              appConfig={appConfig}
              pageType={pageProps.pageType}
            >
              <Component {...pageProps} />
            </Layout>
          </TransitionContext.Provider>
        </AMPContext.Provider>
      ) : null}
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  if (ctx.asPath === '/') {
    if (process.browser) {
      Router.push('/english/national');
    } else {
      ctx.res.writeHead(302, { Location: '/national' }).end();
    }
  }
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
  // if (accessToken.mobile.length && !applicationConfig.value) {
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
  // }

  const pageProps = await Component.getInitialProps(ctx);
  return {
    pageProps,
    data: '',
    accessToken,
    appConfig: applicationConfig.value,
  };
};

export default appWithTranslation(App);

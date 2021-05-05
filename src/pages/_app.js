import Layout from '@components/layout/Layout';
import React, { useContext } from 'react';
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

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export const AMPContext = React.createContext(false);
let currentLanguage = 'english';

export function reportWebVitals(metric) {
  console.log(metric);
}

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
  NProgress.done();
  document.documentElement.lang = languageMap[url.split('/')[1]];
  const urlSplit = url.split('/');
  if (urlSplit[1] !== currentLanguage) {
    currentLanguage = urlSplit[1];
    document.documentElement.lang = languageMap[currentLanguage];
    i18n.changeLanguage(document.documentElement.lang);
  }
});
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, noRender, pageProps, data, accessToken, appConfig }) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

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
            {noRender ? null : <Component {...pageProps} />}
          </Layout>
        </AMPContext.Provider>
      ) : null}
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (ctx.asPath === '/') {
    process.browser
      ? Router.push('/national')
      : ctx.res.writeHead(302, { Location: '/national' }).end();
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

  let url = null;
  if (process.browser) {
    url = window.location.pathname;
  }

  console.log(Component)

  if (
    Component.getInitialProps &&
    !(url != null && ctx.asPath !== url && url.split('/').length ===  ctx.asPath.split('/').length)
  ) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    noRender: url != null && ctx.asPath !== url && url.split('/').length === ctx.asPath.split('/').length,
    pageProps,
    data: '',
    accessToken,
    appConfig: applicationConfig.value,
  };
};

export default appWithTranslation(App);

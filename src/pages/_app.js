import Layout from '@components/layout/Layout';
import React, { useEffect, useState } from 'react';
import '@styles/tailwind.css';
import '@styles/_fonts.scss';
import '@styles/globals.scss';

import { useRouter } from 'next/router';
import { accessToken } from '@utils/Constants';
import Head from 'next/head';
import NProgress from 'nprogress';
import useTranslator from '@hooks/useTranslator';

export const AMPContext = React.createContext(false);
export const TransitionContext = React.createContext(true);

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const language = router.query.language || 'english';
  const isAMP = router.query.amp === '1';
  useTranslator({ init: true });

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
      setIsTransitioning(true);
      // destroy all ad slots
      const { googletag } = window;
      window.ads = new Set();
      if (googletag) {
        googletag.cmd.push(function () {
          googletag.destroySlots();
        });
      }
    };
    const handleRouteError = () => NProgress.done();

    const handleRouteComplete = (url) => {
      NProgress.done();
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

  const langName = language;
  const langCap = langName.charAt(0).toUpperCase() + langName.slice(1);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="googlebot" content="all" />
        <meta name="bingbots" content="all" />
        <meta name="robots" content="all" />
        <meta name="theme-color" content="#07254c" />

        {!isAMP ? (
          <>
            <link
              rel="preload"
              href={`https://etvbharatimages.akamaized.net/etvbharat/static/${
                langName === 'assamese'
                  ? 'o-0IIpQlx3QUlC5A4PNr5TRA.woff2'
                  : 'assets/fonts/' + langCap + '/' + langName + '.woff2'
              }`}
              as="font"
              type="font/woff2"
              crossOrigin={'anonymous'}
            />
          </>
        ) : null}
      </Head>

      <AMPContext.Provider value={isAMP}>
        <TransitionContext.Provider value={isTransitioning}>
          {/*   {isTransitioning ? <GlobalSpinner /> : null} */}
          <Layout accessToken={accessToken} pageType={pageProps.pageType}>
            <Component {...pageProps} />
          </Layout>
        </TransitionContext.Provider>
      </AMPContext.Provider>
    </>
  );
}

/* App.getInitialProps = async ({ Component, ctx }) => {
  const language = ctx.asPath.split('?')[0].split('/')[1];
  if (ctx.asPath === '/' || !languageMap[language]) {
    if (process.browser) {
      Router.push('/english/national');
    } else {
      ctx.res.writeHead(302, { Location: '/english/national' }).end();
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
  let pageProps;
  try {
    pageProps = await Component.getInitialProps(ctx);
    if (pageProps.pageType === 'redirect') {
      const redirectUrl = decodeURI(
        pageProps.data.indexOf('.woff') === -1 ? pageProps.data : ''
      );
      if (process.browser) {
        location.href = redirectUrl;
      } else {
        // ctx.res.writeHead(302, { Location: decodeURI(pageProps.data) }).end();
      }
    }
  } catch (e) {
    console.log(e);
  }

  return {
    pageProps,
    data: '',
    accessToken,
  };
}; */

export default App;

import Layout from '@components/layout/Layout';
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import '@styles/tailwind.css'
import '@styles/globals.scss'
import '@styles/_fonts.scss'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { i18n, appWithTranslation } from '@i18n'
import { languageMap } from '@utils/Constants';
import Head from 'next/head';


// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

let currentLanguage = 'english';

function App({ Component, pageProps, data }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url.split('/')[1] !== currentLanguage) {
        currentLanguage = url.split('/')[1];
        document.documentElement.lang = languageMap[currentLanguage];
        i18n.changeLanguage(document.documentElement.lang);
        console.log('App is changing to: ', url)
      }

    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="googlebot" content="all" />
        <meta name="bingbots" content="all" />
        <meta name="robots" content="all" />
      </Head>
      <Layout><Component {...pageProps} /></Layout>
    </>)
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, data: '' };
};

export default appWithTranslation(App)

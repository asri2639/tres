import { domainUrl, languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

let translations = null;
const useTranslator = (options = { init: false }) => {
  const router = useRouter();
  console.log(router);
  const [appLanguage, setAppLanguage] = useState({
    code: languageMap[router.query.language],
    name: router.query.language,
  });

  const fetchTranslationData = (language) => {
    if (!appLanguage || appLanguage.name !== language || !translations) {
      document.documentElement.lang = languageMap[language];
      fetch(
        domainUrl +
          '/assets/locales/' +
          document.documentElement.lang +
          '/common.json'
      )
        .then((res) => res.json())
        .then((data) => {
          setAppLanguage((prevState) => ({
            ...prevState,
            code: languageMap[language],
            name: language,
          }));
          translations = data;
        });
    }
  };

  useEffect(() => {
    const handleRouteComplete = (url, a) => {
      fetchTranslationData(url.split('/')[1]);
    };

    if (options.init) {
      if (typeof window !== undefined) {
        fetchTranslationData(router.query.language);
      }

      router.events.on('routeChangeComplete', handleRouteComplete);

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
    }

    return () => {
      options.init &&
        router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  const t = (key) => {
    return translations ? translations[key] : '';
  };

  return { t, appLanguage };
};

export default useTranslator;

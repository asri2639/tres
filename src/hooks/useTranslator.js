import { languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTranslator = (options = { init: false }) => {
  const router = useRouter();
  const [appLanguage, setAppLanguage] = useState({
    code: languageMap[router.query.language],
    name: router.query.language,
    translations: null,
  });

  const fetchTranslationData = (language) => {
    if (
      !appLanguage ||
      appLanguage.name !== language ||
      !appLanguage.translations
    ) {
      document.documentElement.lang = languageMap[language];
      fetch('/assets/locales/' + document.documentElement.lang + '/common.json')
        .then((res) => res.json())
        .then((data) => {
          setAppLanguage(() => ({
            code: languageMap[language],
            name: language,
            translations: data,
          }));
        });
    }
  };

  useEffect(() => {
    if (options.init) {
      if (typeof window !== undefined) {
        fetchTranslationData(router.query.language);
      }
      const handleRouteComplete = (url, a) => {
        fetchTranslationData(url.split('/')[1]);
      };

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
    return appLanguage && appLanguage.translations
      ? appLanguage.translations[key]
      : '';
  };

  return { t, appLanguage };
};

export default useTranslator;

import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const controller = '/catalogs';

export default function Catalog(inst) {
  return {
    getLanguages({ params, query, config } = new APIRequest()) {
      return inst.get(
        `${controller}/city-state/items/india/languages?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getFooterDetails({ params, query, config } = new APIRequest()) {
      return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      );
    },
    getAppConfig({ params, query, ...config }) {
      /* return inst.get(
        `${controller}/message/items/app-config-params.gzip?${new URLSearchParams(
          query
        )}`,
        config
      ); */
      const env = publicRuntimeConfig.APP_ENV;
      let url = 'http://localhost:3000';
      if (env === 'production') {
        url = 'https://react.etvbharat.com';
      } else if (env === 'staging') {
        url = 'https://react.stagin.etvbharat.com';
      }

      return fetch(`${url}/assets/appConfig.json`)
        .then((resp) => resp.json())
        .catch((e) => {
          /*  return fetch(
            `https://react.etvbharat.com/assets/appConfig.json`
          ).then((resp) => resp.json()); */
        });
    },
    getPageAds({ params, query, config } = new APIRequest()) {
      return inst.get(`/page_ads?${new URLSearchParams(query)}`, config);
    },
    getDistricts({ params, query, config } = new APIRequest()) {
      return inst.get(
        `${controller}/city-state/items/india/states/${
          params.state
        }/districts?${new URLSearchParams(query)}`,
        config
      );
    },
  };
}

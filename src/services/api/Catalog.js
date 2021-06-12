import { APIRequest } from '@interfaces/API';
import appConfig from '../../../public/assets/appConfig.json';

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

      return Promise.resolve(appConfig);
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

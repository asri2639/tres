import { APIRequest } from '@interfaces/API';
import { domainUrl } from '@utils/Constants';

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
    getListingPageSates({ params, query, config } = new APIRequest()) {
      return inst.get(
        `${controller}/city-state/states?${new URLSearchParams(query)}`,
        config
      );
    },
    getCityDistrictData({ params, query, config } = new APIRequest()) {
      return inst.get(
        `${controller}/city-state/items/india/states/${
          params.key
        }?${new URLSearchParams(query)}`,
        config
      );
    },
    getFooterDetails({ params, query, config } = new APIRequest()) {
      return import('../../static/footer').then((r) => r.default);
    },
    getAppConfig({ params, query, ...config }) {
      return import('../../static/appConfig')
        .then((r) => r.default)
        .catch((e) => {});
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

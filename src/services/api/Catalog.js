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
        `${controller}/city-state/states?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getCityDistrictData({params, query, config } = new APIRequest()){
      return inst.get(
        `${controller}/city-state/items/india/states/${params.key}?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getFooterDetails({ params, query, config } = new APIRequest()) {
      /*  return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      ); */
      return fetch(`${domainUrl}/assets/footer.json`)
        .then((resp) => resp.json())
        .catch((e) => {
          /*  return fetch(
          `https://www.etvbharat.com/assets/appConfig.json`
        ).then((resp) => resp.json()); */
        });
    },
    getAppConfig({ params, query, ...config }) {
      /* return inst.get(
        `${controller}/message/items/app-config-params.gzip?${new URLSearchParams(
          query
        )}`,
        config
      ); */

      return fetch(`${domainUrl}/assets/appConfig.json`)
        .then((resp) => resp.json())
        .catch((e) => {
          console.log(e)
          /*  return fetch(
            `https://www.etvbharat.com/assets/appConfig.json`
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

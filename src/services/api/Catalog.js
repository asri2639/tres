import { APIRequest } from '@interfaces/API';
import { domainUrl } from '@utils/Constants';
import axios from 'axios';

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
      /*  return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      ); */
      return axios
        .get('/assets/footer.json', {
          baseURL: domainUrl,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAppConfig({ params, query, ...config }) {
      /* return inst.get(
        `${controller}/message/items/app-config-params.gzip?${new URLSearchParams(
          query
        )}`,
        config
      ); */

      return axios
        .get('/assets/appConfig.json', {
          baseURL: domainUrl,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
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

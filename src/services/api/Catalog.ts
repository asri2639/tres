import { APIRequest } from '@interfaces/API';

const controller = '/catalogs';

export default function Catalog(inst) {
  return {
    getLanguages({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/city-state/items/india/languages?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getFooterDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      );
    },
    getAppConfig({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/message/items/app-config-params.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
  };
}

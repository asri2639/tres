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

/*
country = 'IN';
auth_token = 'xBUKcKnXfngfrqGoF93y';
access_token='TjeNsXehJqhh2DGJzBY9';

selected_language = 'en';

Catalogs controller ->

    1. languages = 
    {
        baseURL: 'https://prod.api.etvbharat.com/',
        URL: '/catalogs/city-state/items/india/languages',
        method: 'GET',
        contentType: 'application/json',
        query: {
            region:country,
            auth_token,
            access_token
        },
    }

    2. footer = 
      {
        baseURL: 'https://prod.api.etvbharat.com/',
        URL: '/catalogs/message/items/footer-api',
        method: 'GET',
        contentType: 'application/json',
        query: {
            region:country,
            auth_token,
            access_token,
            response:'r2',
            item_languages: selected_language,

        },
    }

    3. app-config-params = 

        {
              baseURL: 'https://prod.api.etvbharat.com/',
              URL: '/catalogs/message/items/app-config-params.gzip',
              method: 'GET',
              contentType: 'application/json',
              query: {
                  region:country,
                  auth_token,
                  access_token,
                  response:'r2',
                  item_languages: selected_language,
                  current_version: '1.1'

              }, 
        }

*/

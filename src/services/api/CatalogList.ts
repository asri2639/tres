import { APIRequest } from '@interfaces/API';
import { stateCodeConverter } from '@utils/Helpers';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;
const controller = '/catalog_lists';

const getProperParam = (params) => {
  if (!params && typeof window !== 'undefined') {
    params = { state: location.pathname.split('/')[2] };
  }
  return params && params.state && params.state !== 'national'
    ? '-' + params.state
    : '';
};

export default function CatalogList(inst) {
  return {
    getArticleDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/web-news-details${getProperParam(
          params
        )}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getVideoDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/web-video-details${getProperParam(
          params
        )}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getRelatedArticles({ params, query, ...config }: APIRequest) {
      return inst.get(
        `/get_related_articles.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getMenuDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/web-left-menu${getProperParam(
          params
        )}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getMobileMenuDetails({ params, query, ...config }: APIRequest) {
      if (publicRuntimeConfig.APP_ENV === 'staging') {
        return inst.get(
          `${controller}/left-menu-msite${getProperParam(
            params
          )}.gzip?${new URLSearchParams(query)}`,
          config
        );
      } else {
        return inst.get(
          `${controller}/msite-new-left-menu${getProperParam(
            params
          )}.gzip?${new URLSearchParams(query)}`,
          config
        );
      }
    },
    getSubMenuDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${params.key}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
  };
}

import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;
const controller = '/catalog_lists';

const getProperParam = (params, options?) => {
  if (!params && typeof window !== 'undefined') {
    params = {
      state:
        location.pathname.split('/')[1] === 'urdu'
          ? 'urdu'
          : location.pathname.split('/')[2],
    };
  }

  return params &&
    params.state &&
    (options.exclude || ['national', 'kerala', 'odisha']).indexOf(
      params.state
    ) === -1
    ? '-' + params.state
    : '';
};

export default function CatalogList(inst) {
  return {
    getArticleDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${
          config['isSSR'] ? '' : 'web-'
        }news-details${getProperParam(params, {
          exclude: !config['isSSR'] ? ['national'] : null,
        })}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getVideoDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${
          config['isSSR'] ? 'video-details' : params.suffix
        }.gzip?${new URLSearchParams(query)}`,
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
        `${controller}/${params.suffix}${getProperParam(
          params
        )}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getSubMenuDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${params.key}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
  };
}

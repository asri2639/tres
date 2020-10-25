import { APIRequest } from '@interfaces/API';

const controller = '/catalog_lists';

export default function CatalogList(inst) {
  return {
    getArticleDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/web-news-details.gzip?${new URLSearchParams(query)}`,
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
        `${controller}/web-left-menu.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getMobileMenuDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/msite-new-left-menu.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
    getSubMenuDetails({ params, query, ...config }: APIRequest) {
      console.log(params);
      return inst.get(
        `${controller}/${params.key}.gzip?${new URLSearchParams(query)}`,
        config
      );
    },
  };
}
/* 
 
 Catalog List Controller

 1. News Article Details

    {
        baseURL: 'https://prod.api.etvbharat.com/',
        URL: '/catalog_lists/web-news-details',
        method: 'GET',
        contentType: 'application/json',
        query: {
            region:country,
            auth_token,
            access_token,
            response:'r2',
            item_languages: selected_language,
            content_id: id, //variable
            gallery_ad: true,
            page_size:1,
            portal_state: 'na', //national
            scroll_no: 0
        },
    }


 2. Menu Items

   {
        baseURL: 'https://prod.api.etvbharat.com/',
        URL: '/catalog_lists/web-news-details',
        method: 'GET',
        contentType: 'application/json',
        query: {
            region:country,
            auth_token,
            access_token,
            response:'r2',
            item_languages: selected_language,
            pagination:false,
            portal_state: 'na', //national
        },
    }


    related articles query
    access_token=TjeNsXehJqhh2DGJzBY9&auth_token=xBUKcKnXfngfrqGoF93y&content_id=na20200825115003770&item_languages=en&page=0&page_size=10&response=r1&state=english


*/

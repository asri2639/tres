import React, { useEffect } from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { trackPromise } from 'react-promise-tracker';
import cacheData from 'memory-cache';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Head from 'next/head';
import {
  configStateCodeConverter,
  getAmpUrl,
  loadJS,
  stateCodeConverter,
  thumbnailExtractor,
} from '@utils/Helpers';
import { applicationConfig, languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import useTranslator from '@hooks/useTranslator';
import ArticleList from '@components/article/ArticleList';
import VideoList from '@components/video/VideoList';
import GalleryList from '@components/gallery/GalleryList';
import ListContainer from '@components/listing/ListContainer';
import PageListing, { totalItemsCount } from '@components/listing/PageListing';
import Error from 'next/error';
const slug = ({
  data,
  initCount,
  pageType,
  appConfig,
  id,
  isAmp,
  payload,
  dropDownData,
}) => {
  const router = useRouter();
  const { appLanguage } = useTranslator();
  let canonicalUrl = '',
    ampUrl = '';
  const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const convertedState = configStateCodeConverter(router.query.state);
  let fbContentId = '';
  if (appConfig && appConfig.params_hash2) {
    const fbContent =
      appConfig.params_hash2.config_params.fb_pages[convertedState];
    fbContentId = fbContent ? fbContent.fb_page_id : null;
  }

  let ampExists = null;
  if (id) {
    const match = id.match(/(\d+)/);
    ampExists = +match[0].slice(0, 12) >= 202102120000;
  }
  let readwhere = false;

  const splitPath = router.asPath.split('/');
  const state = splitPath[2];
  if (
    state === 'uttar-pradesh' ||
    (state === 'national' && splitPath[1] !== 'urdu')
  ) {
    readwhere = true;
  }

  // const ampExists = false; // prod enabling amp

  const getComponent = () => {
    let component = null;
    let headerObj = {};
    let stateName = null;
    let canonicalUrl = '';

    if (pageType === 'error') {
      return <div>URL Not Found</div>;
    }

    const pathname = new URL(`http:localhost:3000${router.asPath}`).pathname;
    const splitPath = pathname.split('/');

    if (pageType === 'article' || pageType === 'video') {
      if (
        data.state &&
        data.state.length > 0 &&
        data.state.indexOf('na') !== -1
      ) {
        if (data.item_languages.indexOf('hi') !== -1) {
          stateName = 'delhi';
        } else if (data.item_languages.indexOf('te') !== -1) {
          stateName = 'telangana';
        } else if (data.item_languages.indexOf('ur') !== -1) {
          stateName = 'national';
        }
      }
    }

    if (stateName) {
      canonicalUrl = `https://www.etvbharat.com${[
        ...splitPath.slice(0, 2),
        stateName,
        ...splitPath.slice(3),
      ].join('/')}`;
    } else {
      canonicalUrl = `https://www.etvbharat.com${pathname}`;
    }
    if (
      pageType === 'gallery' ||
      pageType === 'video' ||
      pageType === 'article'
    ) {
      ampUrl = `https://www.etvbharat.com/amp${pathname}`;
    }

    const state = splitPath[2];
    if (
      state === 'uttar-pradesh' ||
      (state === 'national' && splitPath[1] !== 'urdu')
    ) {
      ampUrl = getAmpUrl(canonicalUrl, splitPath.length === 3);
    }

    switch (pageType) {
      case 'article':
        const tags = new Set();
        let datum = {};
        const html = data
          ? data.html_tag.replace(scriptTagExtractionRegex, '')
          : '';
        const scripts = [];

        let matchedScript = null;
        do {
          matchedScript = scriptTagExtractionRegex.exec(data.html_tag);
          if (matchedScript && !isAmp) {
            scripts.push(matchedScript[0]);
          }
        } while (matchedScript);

        if (typeof window !== 'undefined') {
          scripts.forEach((v) => {
            const regex = /<script.*?src="(.*?)"/;
            let m = regex.exec(v);
            if (m) {
              tags.add(m[1]);
              loadJS(m[1]);
            }
          });
        }
        datum.html = html;
        datum.data = data;

        datum.contentType = data.content_type;
        datum.contentId = data.content_id;

        let k = data.update_date_string
          ? data.update_date_string.slice(0, 10)
          : '';
        let T = data.publish_date_string
          ? data.publish_date_string.slice(0, 10)
          : '';

        headerObj = {
          title: data.title,
          canonicalUrl: canonicalUrl,
          ampUrl: ampUrl,
          fbContentId: fbContentId,
          thumbnail: thumbnailExtractor(
            data.thumbnails,
            '3_2',
            'b2s',
            data.media_type
          ),

          description: data.short_description || data.description,
          keywords: data.keywords ? data.keywords.join(', ') : '',
          url: data.web_url,
          contentType: data.content_type,
          ldjson: true,
          headline: data.title.replace(/\"/gi, '\\"'),
          thumbnailM:
            data.thumbnails && data.thumbnails.medium_3_2
              ? data.thumbnails.medium_3_2.url
              : '',
          updatedAt: k,
          publishedAt: T,
        };

        component = (
          <ArticleList
            articleData={{ articles: [datum], contentId: datum.contentId }}
          />
        );
        break;

      case 'video':
        let videoDatum = {};
        videoDatum.data = data;

        videoDatum.contentType = data.content_type;
        videoDatum.contentId = data.content_id;

        const isLive =
          data['media_type'] === 'live_stream' ||
          data['episode_type'] === 'live_stream';

        if (typeof window !== 'undefined' && !isAmp) {
          loadJS(
            'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
          );
          loadJS(
            'https://players-saranyu.s3.amazonaws.com/etvbharat_staging/saranyu_player/plugin/external-js/scroll-playpause1.js'
          );
          loadJS(
            'https://players-saranyu.s3.amazonaws.com/etvbharat_staging/saranyu_player/plugin/external-js/scroll-playpause1.js'
          );
        }

        headerObj = {
          title: data.title,
          canonicalUrl: canonicalUrl,
          ampUrl: ampUrl,
          fbContentId: fbContentId,
          thumbnail: thumbnailExtractor(
            data.thumbnails,
            '3_2',
            'b2s',
            data.media_type
          ),

          description: data.short_description || data.description,
          keywords: data.keywords ? data.keywords.join(', ') : '',
          url: data.web_url,
          contentType: data.content_type,
          ldjson: false,
        };

        component = (
          <VideoList
            videoData={{
              videos: [videoDatum],
              contentId: videoDatum.contentId,
            }}
            appConfig={appConfig}
          />
        );
        break;
      case 'gallery':
        const main = data.gallery[0];
        const keywords = data.gallery.map((v) => {
          return v.description;
        });

        headerObj = {
          title: main.display_title,
          canonicalUrl: canonicalUrl,
          ampUrl: ampUrl,
          fbContentId: fbContentId,
          thumbnail: thumbnailExtractor(
            data.thumbnails,
            '3_2',
            'b2s',
            data.media_type
          ),

          description:
            main.short_description || main.description || main.display_title,
          keywords: keywords ? keywords.join(', ') : '',
          url: `${router.asPath.slice(1)}`,
          contentType: main.content_type,
          images: [
            {
              url: main.thumbnails.banner
                ? main.thumbnails.banner.url
                : main.thumbnails.web_3_2.url,
              width: 768,
              height: 512,
              alt: main.thumbnails.banner
                ? main.thumbnails.banner.alt_tags
                : main.thumbnails.web_3_2.alt_tags,
            },
          ],
          ldjson: false,
        };

        component = (
          <GalleryList
            galleryData={{
              galleries: [
                {
                  content_id: data.gallery[0].parent_id,
                  images: data.gallery,
                  count: data.items_count,
                },
              ],
              contentId: data.gallery[0].parent_id,
            }}
          />
        );
        break;
      case 'navlisting':
        return (
          <>
            <Head>
              <title>
                {data.meta_tag_title !== '' &&
                !data.meta_tag_title.includes('canonical tag')
                  ? data.meta_tag_title
                  : 'ETV Bharat'}
              </title>
              <link rel="canonical" href={canonicalUrl}></link>
            </Head>

            <NextSeo
              title={
                data.meta_tag_title !== '' &&
                !data.meta_tag_title.includes('canonical tag')
                  ? data.meta_tag_title
                  : 'ETV Bharat'
              }
              description={data.meta_tag_description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: data.meta_tag_keywords
                    ? data.meta_tag_keywords.join(', ')
                    : '',
                },
              ]}
              openGraph={{
                site_name: 'ETV Bharat News',
                url: `https://www.etvbharat.com${pathname}`,
                type: 'article',
                title: data.meta_tag_title,
                description: data.meta_tag_description,
                images: [
                  {
                    url: `https://www.etvbharat.com/assets/logos/${appLanguage.name}.png`,
                    width: 200,
                    height: 200,
                    alt: 'ETV Bharat News',
                  },
                ],
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
            <PageListing
              key={canonicalUrl}
              data={data}
              initCount={initCount}
              payload={payload}
              dropdown={dropDownData}
            ></PageListing>
          </>
        );
      case 'search':
        return <ListContainer data={data} payload={payload}></ListContainer>;
      case 'redirect':
        return null;
    }

    return (
      <>
        {headerObj.title ? (
          <>
            {' '}
            <Head>
              <title>{headerObj.title}</title>
              <link rel="canonical" href={headerObj.canonicalUrl}></link>
              {ampExists && (data.is_amp || readwhere) ? (
                <link rel="amphtml" href={headerObj.ampUrl}></link>
              ) : null}
              <meta
                name="fbPages"
                property="fb:pages"
                content={headerObj.fbContentId}
              ></meta>
              <link rel="preload" as="image" href={headerObj.thumbnail.url} />
              <meta
                property="og:image:secure_url"
                content={headerObj.thumbnail.url}
              />
            </Head>
            <NextSeo
              title={headerObj.title}
              description={headerObj.description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: headerObj.keywords,
                },
              ]}
              openGraph={{
                site_name: 'ETV Bharat News',
                url: `https://www.etvbharat.com/${headerObj.url}`,
                type: headerObj.contentType,
                title: headerObj.title,
                description: headerObj.description,
                images: headerObj.images || [
                  {
                    url: headerObj.thumbnail.url,
                    width: 768,
                    height: 512,
                    alt: headerObj.thumbnail.alt_tags,
                  },
                ],
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
          </>
        ) : null}
        {headerObj.ldjson ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
 {
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": "https://www.etvbharat.com/${headerObj.url}"
 },
 "headline": "${headerObj.headline}",
 "description": "${headerObj.description.replace(/\"/gi, '\\"')}",
 "image": {
 "@type": "ImageObject",
 "url": "${headerObj.thumbnailM}",
 "width": 708,
 "height": 474
 },
 "author": {
 "@type": "Organization",
 "name": "ETV Bharat"
 },
 "publisher": {
 "@type": "Organization",
 "name": "ETV Bharat",
 "logo": {
 "@type": "ImageObject",
 "url": "https://www.etvbharat.com/assets/images/etvlogo/${(
   headerObj.url.split('/')[0] + ''
 ).toLowerCase()}.png",
 "width": 82,
 "height": 60
 }
 },
 "datePublished": "${headerObj.publishedAt}",
 "dateModified": "${headerObj.updatedAt || headerObj.publishedAt}"
 }`,
            }}
          ></script>
        ) : null}
        {component}
      </>
    );
  };
  return (
    <>
      {data ? (
        getComponent()
      ) : (
        <div className={'not-found'}>
          <Error statusCode={404}></Error>
        </div>
      )}
    </>
  );
};

slug.getInitialProps = async ({ query, req, res, ...args }) => {
  let language = 'en',
    state = 'na',
    params = null,
    bypass = false;

  const { publicRuntimeConfig } = getConfig();
  const isAmp =
    query.amp === '1'; /* && publicRuntimeConfig.APP_ENV !== 'production' */
  const url = args.asPath;

  const urlSplit = url.split('/');
  language = languageMap[urlSplit[1]];
  state = stateCodeConverter(urlSplit[2]);

  const languageState = urlSplit[1];
  params = {
    state: query.state,
    language: language,
  };

  bypass = args.asPath.indexOf('/live-streaming/') >= 0;
  const id = query.slug.slice(-1)[0];
  const re = new RegExp('(' + state + '|na)\\d+', 'gi');

  if (re.test(id) || bypass) {
    const api = API(APIEnum.CatalogList);
    let type = query.slug[0].toLowerCase();
    if (bypass) {
      type = 'live-streaming';
    }

    switch (type) {
      case 'videos':
      case 'video':
      case 'live-streaming':
        if (typeof window !== 'undefined') {
          window['applicationConfig'] = applicationConfig;
        }
        let suffix = null;
        if (applicationConfig.value) {
          let convertedState = configStateCodeConverter(query.state);
          convertedState = query.language === 'urdu' ? 'urdu' : convertedState;
          suffix =
            applicationConfig.value['params_hash2'].config_params.ssr_details[
              convertedState
            ].video_details_link;
        }

        const videoResponse = await api.CatalogList.getVideoDetails({
          params: {
            ...params,
            suffix: suffix,
          },
          query: {
            response: 'r2',
            item_languages: language,
            content_id: id, //variable
            gallery_ad: true,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
            version: 'v2',
          },
          // config: { isSSR: typeof window === 'undefined' },

          // isSSR: typeof window === 'undefined',
        });
        const videoResp = videoResponse.data.data.catalog_list_items[0];
        const video = videoResp.catalog_list_items[0];
        // Pass data to the page via props
        return {
          pageType: 'video',
          data: video,
          appConfig: applicationConfig.value,
          isAmp: isAmp,
          id: id,
        };
      case 'gallery':
        const galleryResponse = await api.CatalogList.getArticleDetails({
          params: params,
          query: {
            item_languages: language,
            region: 'IN',
            response: 'r2',
            content_id: id, //variable
            gallery_ad: true,
            page: 0,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
            scroll_no: 0,
          },
          config: { isSSR: typeof window === 'undefined' },
        });

        const galleryResp = galleryResponse.data.data.catalog_list_items[0];
        const gallery = galleryResp.catalog_list_items;

        // Pass data to the page via props
        return {
          pageType: 'gallery',
          data: { gallery, items_count: galleryResp.total_items_count },
          appConfig: applicationConfig.value,
          isAmp: isAmp,
          id: id,
        };
      default:
        const articleResponse = await api.CatalogList.getArticleDetails({
          params: params,
          query: {
            item_languages: language,
            region: 'IN',
            response: 'r2',
            content_id: id, //variable
            gallery_ad: true,
            page: 0,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
            scroll_no: 0,
          },
          config: { isSSR: typeof window === 'undefined' },
        });

        let article = null;
        let error = '';
        try {
          const articleResp = articleResponse.data.data.catalog_list_items[0];
          article = articleResp.catalog_list_items[0];
        } catch (e) {
          error = 'Invalid URL';
        }

        /* console.log(
 articleResp.catalog_list_items.length === 0 ? 'Invalid Response' : ''
 ); */
        // Pass data to the page via props
        return {
          pageType: error ? 'error' : 'article',
          data: article,
          appConfig: applicationConfig.value,
          isAmp: isAmp,
          id: id,
          error: error,
        };
    }
  } else {
    const api = API(APIEnum.Listing, APIEnum.CatalogList, APIEnum.Catalog);
    if (
      (url.includes('state') ) ||
      url.substring(url.length - 'state'.length) == 'state' ||
      url.includes('bharat') ||
      url.includes('crime') ||
      url.includes('video') ||
      url.includes('gallery') ||
      url.includes('city') ||
      url.includes('district') ||
      url.includes('sitara') ||
      url.includes('film-and-tv') ||
      url.includes('international') ||
      url.includes('business') ||
      url.includes('champion') ||
      url.includes('science-and-technology') ||
      url.includes('sukhibhava') ||
      url.includes('opinion') ||
      url.includes('sports')
    ) {
      const url = args.asPath;
      const response = await api.Listing.getListingApiKey({
        query: {
          app: 'msite',
          url: url,
        },
      }).catch((e) => {
        return {
          data: null,
        };
      });
      const result = response.data;
      if (!result) {
        if (res) res.statusCode = 404;
        return {
          pageType: 'listing',
          data: '',
          statusCode: 404,
        };
      }

      let finalDataObj = {
        title: '',
        data: [],
      };
      let dropDownData = undefined;
      if (
        (url.includes('state') ||
          url.includes('city') ||
          url.includes('district')) &&
        !url.includes('video')
      ) {
        let otherStates = '';
        if (
          url.includes('english') ||
          (query.language === 'urdu' && query.state === 'national')
        ) {
          otherStates = 'yes';
        }
        const cityParam = url.includes('city')
          ? urlSplit[2] + '/cities'
          : urlSplit[2] + '/districts';
        const statePayload = {
          query: {
            response: 'r2',
            item_languages: language,
            region: 'IN',
            other_states: otherStates,
          },
        };

        const cityDistrictPayload = {
          params: {
            key: cityParam,
          },
          query: {
            response: 'r2',
            item_languages: language,
            region: 'IN',
          },
        };

        if (url.includes('state')) {
          const data = cacheData.get(language + url[2]);
          finalDataObj.type = 'state';
          if (data) {
            dropDownData = data;
          } else {
            const response = await trackPromise(
              api.Catalog.getListingPageStates(statePayload)
            );
            if (response && response.data && response.data.data) {
              dropDownData = response.data.data.items;
              if (dropDownData.length > 0) {
                cacheData.put(
                  language + urlSplit[2],
                  dropDownData,
                  5 * 1000 * 60 * 60
                );
              }
            } else {
              console.log('h3r3');
            }
          }
        } else {
          let type = '';
          let finalurl = '';
          if (url.includes('city')) {
            type = 'city';
            if (url.substring(url.length - 'city'.length) !== 'city') {
              finalurl = url.substr(0, url.lastIndexOf('/'));
            } else {
              finalurl = url;
            }
          } else {
            type = 'district';
            if (url.substring(url.length - 'district'.length) !== 'district') {
              finalurl = url.substr(0, url.lastIndexOf('/'));
            } else {
              finalurl = url;
            }
          }

          finalDataObj.type = type;
          finalDataObj.url = finalurl;
          const data = cacheData.get(language + url[2] + type);

          if (data) {
            dropDownData = data;
          } else {
            const response = await trackPromise(
              api.Catalog.getCityDistrictData(cityDistrictPayload)
            );
            if (response && response.data && response.data.data) {
              dropDownData = response.data.data.items;
              if (dropDownData.length > 0) {
                cacheData.put(
                  language + url[2] + type,
                  dropDownData,
                  5 * 1000 * 60 * 60
                );
              }
            } else {
              console.log('h3r3');
            }
          }
        }
        let selectedValue = '';

        const state = urlSplit[4] || urlSplit[2];
        const titleobj = dropDownData.filter(
          (item) => state == item.friendly_id
        );

        if (titleobj.length > 0) {
          selectedValue = titleobj[0].ml_title[0].text;
        } else {
          selectedValue = dropDownData[0].ml_title[0].text;
        }

        if (language == 'en' && !selectedValue) {
          if (url.includes('state')) {
            selectedValue = 'Delhi';
          }
        }

        finalDataObj.data = dropDownData;
        finalDataObj.title = selectedValue;
      }

      const params = {
        collective_ads_count: 0,
        page: 0,
        page_size: 8,
        version: 'v2',
        response: 'r2',
        item_languages: language,
        portal_state: state,
      };

      if (result) {
        var finalQueryParamObject = {};
        for (var i = 0; i < result.query_params.length; i++) {
          finalQueryParamObject = Object.assign(
            {},
            finalQueryParamObject,
            result.query_params[i]
          );
        }

        if (
          url.includes('city') &&
          Object.keys(finalQueryParamObject).length === 0
        ) {
          finalQueryParamObject.dynamic_city = dropDownData[0].friendly_id;
        }
        if (
          url.includes('district') &&
          Object.keys(finalQueryParamObject).length === 0
        ) {
          finalQueryParamObject.dynamic_district = dropDownData[0].friendly_id;
        }
        if (
          url.includes('state') &&
          Object.keys(finalQueryParamObject).length === 0
        ) {
          finalQueryParamObject.dynamic_state = 'dl';
        }
        const requestPayload = {
          params: {
            key: result.home_link,
          },
          query: Object.assign({}, params, finalQueryParamObject),
        };

        const listingResp = await trackPromise(
          api.CatalogList.getListing(requestPayload)
        );

        if (listingResp && listingResp.data && listingResp.data.data) {
          const data = listingResp.data.data;
          let initCount = 0;
          try {
            initCount = totalItemsCount(data.catalog_list_items);
          } catch (e) {
            initCount = 0;
          }
          if (initCount) {
            return {
              pageType: 'navlisting',
              data: data,
              initCount: initCount,
              payload: requestPayload,
              dropDownData: finalDataObj,
            };
          }
        }

        if (res) res.statusCode = 404;
        return {
          pageType: 'listing',
          statusCode: 404,
        };

        //console.log(data);
      } else {
        if (res) res.statusCode = 404;
        return {
          pageType: 'listing',
          data: '',
          statusCode: 404,
        };
      }
    } else {
      const redirectUrl = `${
        publicRuntimeConfig.APP_ENV === 'staging'
          ? 'https://old.etvbharat.com'
          : 'https://old.etvbharat.com'
      }${url}`;
      return {
        pageType: 'redirect',
        data: redirectUrl,
      };
    }
  }
};
export default slug;

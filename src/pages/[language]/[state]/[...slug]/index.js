import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Head from 'next/head';
import {
  configStateCodeConverter,
  loadJS,
  stateCodeConverter,
  thumbnailExtractor,
} from '@utils/Helpers';
import { applicationConfig, languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import ArticleList from '@components/article/ArticleList';
import VideoList from '@components/video/VideoList';
import GalleryList from '@components/gallery/GalleryList';
import ListContainer from '@components/listing/ListContainer';
import { trackPromise } from 'react-promise-tracker';

const slug = ({ data, pageType, appConfig, id, isAmp, payload }) => {
  const router = useRouter();
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

  // const ampExists = false; // prod enabling amp

  const getComponent = () => {
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

        canonicalUrl = `https://react.etvbharat.com${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        if (
          datum.data.state &&
          datum.data.state.length > 0 &&
          datum.data.state.indexOf('na') !== -1
        ) {
          const pathname = new URL(`http:localhost:3000${router.asPath}`)
            .pathname;

          const splitPath = pathname.split('/');
          let stateName = null;
          if (datum.data.item_languages.indexOf('hi') !== -1) {
            stateName = 'delhi';
          } else if (datum.data.item_languages.indexOf('te') !== -1) {
            stateName = 'telangana';
          } else if (datum.data.item_languages.indexOf('ur') !== -1) {
            stateName = 'national';
          }
          if (stateName) {
            canonicalUrl = `https://react.etvbharat.com${[
              ...splitPath.slice(0, 2),
              stateName,
              ...splitPath.slice(3),
            ].join('/')}`;
          }
        }

        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        let k = data.update_date_string
          ? data.update_date_string.slice(0, 10)
          : '';
        let T = data.publish_date_string
          ? data.publish_date_string.slice(0, 10)
          : '';

        console.log('has videos :', data.has_videos);
        return (
          <>
            <Head>
              <title>{data.title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists && data.is_amp ? (
                <link rel="amphtml" href={ampUrl}></link>
              ) : null}
              <meta
                name="fbPages"
                property="fb:pages"
                content={fbContentId}
              ></meta>
              <link
                rel="preload"
                as="image"
                href={(() => {
                  const thumbnail = thumbnailExtractor(
                    data.thumbnails,
                    '3_2',
                    'b2s',
                    data.media_type
                  );
                  return thumbnail.url;
                })()}
              />
            </Head>
            <NextSeo
              title={data.title}
              description={data.short_description || data.description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: data.keywords ? data.keywords.join(', ') : '',
                },
              ]}
              openGraph={{
                site_name: 'ETV Bharat News',
                url: `https://www.etvbharat.com/${data.web_url}`,
                type: data.content_type,
                title: data.title,
                description: data.short_description || data.description,
                images: (() => {
                  const thumbnail = thumbnailExtractor(
                    data.thumbnails,
                    '3_2',
                    'b2s',
                    data.media_type
                  );
                  return [
                    {
                      url: thumbnail.url,
                      width: 768,
                      height: 512,
                      alt: thumbnail.alt_tags,
                    },
                  ];
                })(),
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://react.etvbharat.com/${data.web_url}"
              },
              "headline": "${data.title.replace(/\"/gi, '\\"')}",
              "description": "${(
                data.description || data.short_description
              ).replace(/\"/gi, '\\"')}",
              "image": {
                "@type": "ImageObject",
                "url": "${
                  data.thumbnails && data.thumbnails.medium_3_2
                    ? data.thumbnails.medium_3_2.url
                    : ''
                }",
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
                  "url": "https://www.etvbharat.com/src/assets/images/etvlogo/${(
                    data.web_url.split('/')[0] + ''
                  ).toLowerCase()}.png",
                  "width": 82,
                  "height": 60
                }
              },
              "datePublished": "${T}",
              "dateModified": "${k || T}"
            }`,
              }}
            ></script>
            {
              <ArticleList
                articleData={{ articles: [datum], contentId: datum.contentId }}
              />
            }
          </>
        );
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
        canonicalUrl = `https://react.etvbharat.com${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        if (
          videoDatum.data.state &&
          videoDatum.data.state.length > 0 &&
          videoDatum.data.state.indexOf('na') !== -1
        ) {
          const pathname = new URL(`http:localhost:3000${router.asPath}`)
            .pathname;

          const splitPath = pathname.split('/');
          let stateName = null;
          if (videoDatum.data.item_languages.indexOf('hi') !== -1) {
            stateName = 'delhi';
          } else if (videoDatum.data.item_languages.indexOf('te') !== -1) {
            stateName = 'telangana';
          } else if (videoDatum.data.item_languages.indexOf('ur') !== -1) {
            stateName = 'national';
          }
          if (stateName) {
            canonicalUrl = `https://react.etvbharat.com${[
              ...splitPath.slice(0, 2),
              stateName,
              ...splitPath.slice(3),
            ].join('/')}`;
          }
        }
        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        return (
          <>
            <Head>
              <title>{data.title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists && !isLive && data.is_amp ? (
                <link rel="amphtml" href={ampUrl}></link>
              ) : null}
              <meta
                name="fbPages"
                property="fb:pages"
                content={fbContentId}
              ></meta>
            </Head>
            <NextSeo
              title={data.title}
              description={data.short_description || data.description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: data.keywords ? data.keywords.join(', ') : '',
                },
              ]}
              openGraph={{
                site_name: 'ETV Bharat News',
                url: `https://www.etvbharat.com/${data.web_url}`,
                type: data.content_type,
                title: data.title,
                description: data.short_description || data.description,
                images: (() => {
                  const thumbnail = thumbnailExtractor(
                    data.thumbnails,
                    '3_2',
                    'b2s',
                    data.media_type
                  );
                  return [
                    {
                      url: thumbnail.url,
                      width: 768,
                      height: 512,
                      alt: thumbnail.alt_tags,
                    },
                  ];
                })(),
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
            <VideoList
              videoData={{
                videos: [videoDatum],
                contentId: videoDatum.contentId,
              }}
              appConfig={appConfig}
            />
          </>
        );
      case 'gallery':
        const main = data.gallery[0];
        const keywords = data.gallery.map((v) => {
          return v.description;
        });
        canonicalUrl = `https://react.etvbharat.com${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        if (
          data.state &&
          data.state.length > 0 &&
          data.state.indexOf('na') !== -1
        ) {
          const pathname = new URL(`http:localhost:3000${router.asPath}`)
            .pathname;

          const splitPath = pathname.split('/');
          let stateName = null;
          if (data.item_languages.indexOf('hi') !== -1) {
            stateName = 'delhi';
          } else if (data.item_languages.indexOf('te') !== -1) {
            stateName = 'telangana';
          } else if (data.item_languages.indexOf('ur') !== -1) {
            stateName = 'national';
          }
          if (stateName) {
            canonicalUrl = `https://react.etvbharat.com${[
              ...splitPath.slice(0, 2),
              stateName,
              ...splitPath.slice(3),
            ].join('/')}`;
          }
        }
        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        return (
          <>
            <Head>
              <title>{main.display_title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists && data.is_amp ? (
                <link rel="amphtml" href={ampUrl}></link>
              ) : null}
              <meta
                name="fbPages"
                property="fb:pages"
                content={fbContentId}
              ></meta>
            </Head>
            <NextSeo
              title={main.display_title}
              description={
                main.short_description || main.description || main.display_title
              }
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: keywords ? keywords.join(', ') : '',
                },
              ]}
              openGraph={{
                site_name: 'ETV Bharat News',
                url: `https://www.etvbharat.com/${router.asPath.slice(1)}`,
                type: main.content_type,
                title: main.title,
                description: main.short_description || main.description,
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
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
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
          </>
        );

      case 'listing':
        return <ListContainer data={data} payload={payload}></ListContainer>;
    }
  };
  return <>{data ? getComponent() : <div>No article data</div>}</>;
};

slug.getInitialProps = async ({ query, req, res, ...args }) => {
  let i18n = null,
    language = 'en',
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

  if (typeof window !== 'undefined') {
    document.documentElement.lang = languageMap[language];
    window['applicationConfig'] = applicationConfig;

    if (location.protocol === 'http') {
      // window.location.href = window.location.href.replace('http:', 'https:');
    }
  }

  bypass = args.asPath.indexOf('live-streaming') >= 0;
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

        const articleResp = articleResponse.data.data.catalog_list_items[0];
        const article = articleResp.catalog_list_items[0];

        console.log(
          articleResp.catalog_list_items.length === 0 ? 'Invalid Response' : ''
        );
        // Pass data to the page via props
        return {
          pageType: 'article',
          data: article,
          appConfig: applicationConfig.value,
          isAmp: isAmp,
          id: id,
        };
    }
  } else {
    const redirectUrl = `${
      publicRuntimeConfig.APP_ENV === 'staging'
        ? 'https://staging.etvbharat.com'
        : 'https://www.etvbharat.com'
    }${url}`;

    if (res) {
      res.writeHead(302, {
        Location: redirectUrl,
      });
      res.end();
    } else {
      location.href = redirectUrl;
    }

    /* const stateValue = stateCodeConverter(urlSplit[4]);
    const api = API(APIEnum.Listing, APIEnum.CatalogList);
    const response = await api.Listing.getListingApiKey({
      query: {
        app: 'msite',
        url: args.asPath,
      },
    });

    const result = response.data;

    const requestPayload = {
      params: {
        key: result.home_link,
      },
      query: {
        collective_ads_count: 0,
        page: 0,
        page_size: 8,
        version: 'v2',
        response: 'r2',
        item_languages: language,
        portal_state: languageState,
        dynamic_state: stateValue,
      },
    };

    const listingResp = await trackPromise(
      api.CatalogList.getListing(requestPayload)
    );

    const data = listingResp.data.data; */

    /*  return {
      namespacesRequired: ['common'],
      pageType: 'listing',
      data: data,
      appConfig: applicationConfig.value,
      payload: requestPayload,
      id: null,
    }; */

    /*  const id = query.slug.slice(-1)[0];
    var match = id.match(/\w{2,6}[0-9]+$/);
    if (!(match && match[0])) {
      res.writeHead(302, {
        // or 301
        Location: `${
          publicRuntimeConfig.APP_ENV === 'staging'
            ? 'https://staging.etvbharat.com'
            : 'https://www.etvbharat.com'
        }${req.url}`,
      });
      res.end();
    }
    if (
      req['protocol'] === 'http' &&
      publicRuntimeConfig.APP_ENV !== 'development' &&
      req.headers.host.endsWith('.etvbharat.com')
    ) {
      res.writeHead(302, {
        Location: 'https://' + req.headers.host + req.url,
      });
      res.end();
    } */
  }
};

export default slug;
import React from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Head from 'next/head';
import { NextPage } from 'next';
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

interface Propss {
  data: any;
  pageType: String;
  appConfig?: any;
  id?: String;
}

const slug: NextPage<Propss> = ({ data, pageType, appConfig, id }) => {
  const router = useRouter();
  let canonicalUrl = '',
    ampUrl = '';
  const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const convertedState = configStateCodeConverter(router.query.state);
  let fbContentId = '';
  if (appConfig.params_hash2) {
    const fbContent =
      appConfig.params_hash2.config_params.fb_pages[convertedState];
    fbContentId = fbContent ? fbContent.fb_page_id : null;
  }

  // const match = id.match(/(\d+)/);
  // const ampExists = +match[0].slice(0,8)>=20210122;
  const ampExists = false; // prod enabling amp

  const getComponent = () => {
    switch (pageType) {
      case 'article':
        const tags = new Set();
        let datum: any = {};
        const html = data
          ? data.html_tag.replace(scriptTagExtractionRegex, '')
          : '';
        const scripts = [];

        let matchedScript = null;
        do {
          matchedScript = scriptTagExtractionRegex.exec(data.html_tag);
          if (matchedScript) {
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
        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        console.log('has videos :', data.has_videos);
        return (
          <>
            <Head>
              <title>{data.title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists && !data.has_videos ? (
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
                cardType: 'summary',
              }}
            />
            <ArticleList
              articleData={{ articles: [datum], contentId: datum.contentId }}
            />
          </>
        );
      case 'video':
        let videoDatum: any = {};
        videoDatum.data = data;

        videoDatum.contentType = data.content_type;
        videoDatum.contentId = data.content_id;

        if (typeof window !== 'undefined') {
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
        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        return (
          <>
            <Head>
              <title>{data.title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists && false ? (
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
                cardType: 'summary',
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
        ampUrl = `https://react.etvbharat.com/amp${
          new URL(`http:localhost:3000${router.asPath}`).pathname
        }`;

        return (
          <>
            <Head>
              <title>{main.display_title}</title>
              <link rel="canonical" href={canonicalUrl}></link>
              {ampExists ? <link rel="amphtml" href={ampUrl}></link> : null}
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
                    url: main.thumbnails.banner.url,
                    width: 768,
                    height: 512,
                    alt: main.thumbnails.banner.alt_tags,
                  },
                ],
              }}
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary',
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
    }
  };
  return <>{data ? getComponent() : <div>Nothing {data + ''}</div>}</>;
};

slug.getInitialProps = async ({ query, req, res, ...args }) => {
  let i18n = null;
  let language = 'en';
  let state = 'na';
  let params = null;
  const { publicRuntimeConfig } = getConfig();
  const isAmp =
    query.amp === '1'; /* && publicRuntimeConfig.APP_ENV !== 'production' */

  if (typeof window !== 'undefined') {
    window['applicationConfig'] = applicationConfig;
  }
  if (req && req['i18n']) {
    i18n = req['i18n'];
    language = i18n.language;
    state = stateCodeConverter(query.state + '');
    params = {
      state: query.state,
      language: language,
    };
  } else if (typeof window !== 'undefined') {
    document.documentElement.lang = languageMap[language];
    if (location.protocol === 'http') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
    const urlSplit = location.pathname.split('/');
    language = languageMap[urlSplit[1]];
    state = stateCodeConverter(urlSplit[2]);
    params = {
      state: query.state,
      language: language,
    };
  }

  const id = query.slug.slice(-1)[0];
  const re = new RegExp('(' + state + '|na)\\d+', 'gi');
  if (re.test(id)) {
    const api = API(APIEnum.CatalogList);

    switch (query.slug[0].toLowerCase()) {
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
          isSSR: typeof window === 'undefined',
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
          isSSR: typeof window === 'undefined',
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
  } else if (typeof window === 'undefined') {
    const id = query.slug.slice(-1)[0];
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
    }
  }

  return {
    pageType: 'listing',
    data: {},
    appConfig: {},
    isAmp: isAmp,
    id: null,
  };
};

export default slug;

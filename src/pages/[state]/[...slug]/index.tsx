import React, { useContext } from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ArticleList from '@components/article/ArticleList';
import Head from 'next/head';
import { NextPage } from 'next';
import { withTranslation } from '@i18n';
import { loadJS, stateCodeConverter, thumbnailExtractor } from '@utils/Helpers';
import { IncomingMessage } from 'http';
import { languageMap } from '@utils/Constants';
import GalleryList from '@components/gallery/GalleryList';
import { useRouter } from 'next/router';
import VideoList from '@components/video/VideoList';

interface Propss {
  data?: any;
  pageType: String;
}

export const config = { amp: 'hybrid' };

const slug: NextPage<Propss> = ({ data, pageType }) => {
  const router = useRouter();

  const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
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

        return (
          <>
            <Head>
              <title>{data.title}</title>
            </Head>
            <NextSeo
              title={data.title}
              description={data.short_description || data.description}
              additionalMetaTags={[
                {
                  property: 'keywords',
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
                    'b2s'
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

        return (
          <>
            <Head>
              <title>{data.title}</title>
            </Head>
            <NextSeo
              title={data.title}
              description={data.short_description || data.description}
              additionalMetaTags={[
                {
                  property: 'keywords',
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
                    'b2s'
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
            />
          </>
        );
      case 'gallery':
        const main = data.gallery[0];

        const keywords = data.gallery.map((v) => {
          return v.description;
        });
        return (
          <>
            <Head>
              <title>{main.display_title}</title>
            </Head>
            <NextSeo
              title={main.display_title}
              description={
                main.short_description || main.description || main.display_title
              }
              additionalMetaTags={[
                {
                  property: 'keywords',
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
  return <>{data ? getComponent() : <div>nothing</div>}</>;
};

slug.getInitialProps = async ({ query, req, ...args }) => {
  let i18n = null;
  let language = 'en';
  let state = 'na';
  let params = null;
  if (req && req['i18n']) {
    i18n = req['i18n'];
    language = i18n.language;
    state = stateCodeConverter(query.state + '');
    params = {
      state: query.state,
    };
  } else if (typeof window !== 'undefined') {
    const urlSplit = location.pathname.split('/');
    language = languageMap[urlSplit[1]];
    state = stateCodeConverter(urlSplit[2]);
  }

  const id = query.slug.slice(-1)[0];
  const re = new RegExp(state + '\\d+', 'gi');
  if (re.test(id)) {
    const api = API(APIEnum.CatalogList);

    switch (query.slug[0].toLowerCase()) {
      case 'videos':
      case 'video':
        const videoResponse = await api.CatalogList.getVideoDetails({
          params: params,
          query: {
            response: 'r2',
            item_languages: language,
            content_id: id, //variable
            gallery_ad: true,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
          },
        });

        const videoResp = videoResponse.data.data.catalog_list_items[0];
        const video = videoResp.catalog_list_items[0];

        // Pass data to the page via props
        return {
          pageType: 'video',
          data: video,
        };
      case 'gallery':
        const galleryResponse = await api.CatalogList.getArticleDetails({
          params: params,
          query: {
            response: 'r2',
            item_languages: language,
            content_id: id, //variable
            gallery_ad: true,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
          },
        });

        const galleryResp = galleryResponse.data.data.catalog_list_items[0];
        const gallery = galleryResp.catalog_list_items;

        // Pass data to the page via props
        return {
          pageType: 'gallery',
          data: { gallery, items_count: galleryResp.total_items_count },
        };
      default:
        const articleResponse = await api.CatalogList.getArticleDetails({
          params: params,
          query: {
            response: 'r2',
            item_languages: language,
            content_id: id, //variable
            gallery_ad: true,
            page_size: typeof window === 'undefined' ? 1 : 10,
            portal_state: state, //national
          },
        });

        const articleResp = articleResponse.data.data.catalog_list_items[0];
        const article = articleResp.catalog_list_items[0];

        // Pass data to the page via props
        return {
          pageType: 'article',
          data: article,
        };
    }
  }

  return {
    pageType: 'listing',
    data: {},
  };
};

export default slug;

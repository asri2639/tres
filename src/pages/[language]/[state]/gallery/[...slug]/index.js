import React from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Head from 'next/head';
import {
  configStateCodeConverter,
  getAmpUrl,
  stateCodeConverter,
  thumbnailExtractor,
} from '@utils/Helpers';
import { applicationConfig, languageMap } from '@utils/Constants';
import { useRouter } from 'next/router';
import Error from 'next/error';
import GalleryList from '@components/gallery/GalleryList';

const slug = ({ data, pageType, appConfig, id, userAgent }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  let ampUrl = '';
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
    if (match) {
      ampExists = +match[0].slice(0, 12) >= 202102120000;
    }
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
    } else if (pageType === 'redirect') {
      return null;
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

    ampUrl = `https://www.etvbharat.com/amp${pathname}`;

    const state = splitPath[2];
    if (
      state === 'uttar-pradesh' ||
      (state === 'national' && splitPath[1] !== 'urdu')
    ) {
      ampUrl = getAmpUrl(canonicalUrl, splitPath.length === 3);
    }

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
      headline: main.display_title.replace(/\"/gi, '\\"'),
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
      ldjson: true,
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
        userAgent={userAgent}
      />
    );

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

              <link
                rel="preconnect"
                href="https://prod.api.etvbharat.com"
              ></link>

              <meta
                property="og:image:secure_url"
                content={headerObj.thumbnail.url}
              />
            </Head>
            <NextSeo
              title={headerObj.title}
              description={headerObj.description
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\[/g, '%5B')
                .replace(/\]/g, '%5D')}
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
          <>
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
 "url": "${headerObj.thumbnail.url}",
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

            {/*   <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `{
                  "@context": "https://schema.org",
                  "@type": "imageGallery",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://www.etvbharat.com/${headerObj.url}",
                    "headline": "${headerObj.headline}",
                    "description": "${headerObj.description.replace(
                      /\"/gi,
                      '\\"'
                    )}",
                    "keywords": "${headerObj.keywords}"
                  },
                  "url": "https://www.etvbharat.com/${headerObj.url}",
                  "image": {
                    "@type": "ImageObject",
                    "url": ${JSON.stringify(
                      data.gallery
                        .filter((v) => v.thumbnails && v.type === 'image')
                        .map((v) => v.thumbnails.l_large.url)
                        .filter(Boolean)
                    )},
                    "width": 1200,
                    "height": 800
                  },
                  "datePublished": "${headerObj.publishedAt}",
                  "dateModified": "${
                    headerObj.updatedAt || headerObj.publishedAt
                  }"
                  "author": { "@type": "Person", "name": "ETV Bharat" },
                  "publisher": {
                    "@type": "Organization",
                    "name": "ETV Bharat",
                    "url": "https://www.etvbharat.com/",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.etvbharat.com/assets/images/etvlogo/${(
                        headerObj.url.split('/')[0] + ''
                      ).toLowerCase()}.png",
                      "width": 82,
                      "height": 60
                    }
                  }
                }
              `,
              }}
            ></script> */}
          </>
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params, ...args }) {
  let language = 'en',
    state = 'na',
    qparams = null;
  const url = `/${params.language}/${params.state}/gallery/${params.slug}`;

  if (url.includes('/search/')) {
    const redirectUrl = `https://old.etvbharat.com${url}`;
    if (res) {
      res.writeHead(302, { Location: `https://old.etvbharat.com${url}` }).end();
    } else {
      window.location = redirectUrl;
    }
    return {
      data: {},
      pageType: 'redirect',
    };
  }

  const id = params.slug.slice(-1)[0];
  const re = new RegExp('(' + state + '|na)\\d+', 'gi');

  const urlSplit = url.split('/');
  language = languageMap[urlSplit[1]];
  state = stateCodeConverter(urlSplit[2]);

  qparams = {
    state: params.state,
    language: language,
  };

  if (re.test(id)) {
    const api = API(APIEnum.CatalogList);

    const galleryResponse = await api.CatalogList.getArticleDetails({
      params: qparams,
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
    });
    const galleryResp = galleryResponse.data.data.catalog_list_items[0];
    const gallery = galleryResp.catalog_list_items;
    if ((!gallery || gallery.length === 0) && res) {
      if (res) res.statusCode = 404;
      return {
        props: {
          pageType: 'article',
          data: '',
          statusCode: 404,
        },
      };
    }
    // Pass data to the page via props
    return {
      props: {
        pageType: 'gallery',
        data: { gallery, items_count: galleryResp.total_items_count },
        appConfig: applicationConfig.value,
        id: id,
      },
      revalidate: 120,
    };
  } else {
    if (res) res.statusCode = 404;
    return {
      props: {
        pageType: 'article',
        data: '',
        statusCode: 404,
      },
    };
  }
}
export default slug;

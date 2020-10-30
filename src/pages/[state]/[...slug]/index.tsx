import React, { useContext } from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ArticleList from '@components/article/ArticleList';
import Head from 'next/head';
import { NextPage } from 'next';
import { withTranslation } from '@i18n';
import { stateCodeConverter, thumbnailExtractor } from '@utils/Helpers';
import { WithTranslation } from 'next-i18next';
import { IncomingMessage } from 'http';
import { languageMap } from '@utils/Constants';

interface Propss {
  data?: any;
  pageType: String;
}

const slug: NextPage<Propss> = ({ data, pageType }) => {
  const getComponent = () => {
    switch (pageType) {
      case 'news':
        const tags = new Set();
        let datum: any = {};
        const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const html = data ? data.html_tag.replace(scriptTagExtractionRegex, '') : '';
        const scripts = [];

        let matchedScript = null;
        do {
          matchedScript = scriptTagExtractionRegex.exec(data.html_tag);
          if (matchedScript) {
            scripts.push(matchedScript[0]);
          }
        } while (matchedScript);
        // console.log(scripts);

        if (typeof window !== 'undefined') {
          scripts.forEach((v) => {
            const regex = /<script.*?src="(.*?)"/;
            let m = regex.exec(v);
            if (m) {
              tags.add(m[1]);
              // loadjscssfile(m[1], 'js');
            }
          });
          datum.html = html;
          datum.data = data;

          datum.contentType = data.content_type;
          datum.contentId = data.content_id;
        }
        return <ArticleList articleData={{ articles: [datum], contentId: datum.contentId }} />
      case 'video':
        return <div>Video</div>
      case 'gallery':
        return <div>Gallery</div>
    }

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
          images: data.pageType === 'gallery' ? [{
            url: data.thumbnails.banner.url,
            width: 768,
            height: 512,
            alt: data.thumbnails.banner.alt_tags,
          }
          ]
            :
            (() => {
              const thumbnail = thumbnailExtractor(data.thumbnails, '3_2', 'b2s')
              return [
                {
                  url: thumbnail.url,
                  width: 768,
                  height: 512,
                  alt: thumbnail.alt_tags,
                },

              ]
            })()

        }}
        twitter={{
          handle: '@etvbharat',
          site: '@etvbharat',
          cardType: 'summary',
        }}
      />

      {data ? getComponent() : <div>nothing</div>}
    </>
  );
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
      state: query.state
    }
  } else if (typeof window !== 'undefined') {
    const urlSplit = location.pathname.split('/')
    language = languageMap[urlSplit[1]];
    state = stateCodeConverter(urlSplit[2])
  }

  const id = query.slug.slice(-1)[0];
  const re = new RegExp(state + "\\d+", 'gi')
  if (re.test(id)) {
    const api = API(APIEnum.CatalogList);

    const country = 'IN';
    const auth_token = 'xBUKcKnXfngfrqGoF93y';
    const access_token = 'TjeNsXehJqhh2DGJzBY9';
    const response = await api.CatalogList.getArticleDetails({
      params: params,
      query: {
        // region: country,
        auth_token,
        access_token,
        response: 'r2',
        item_languages: language,
        content_id: id, //variable
        gallery_ad: true,
        page_size: typeof window === 'undefined' ? 1 : 10,
        portal_state: state, //national
      },
    });


    const articleResp = response.data.data.catalog_list_items[0];
    const article = articleResp.catalog_list_items[0];

    const media = article.media_type;
    const contentType = article.content_type;

    article.pageType = "video" === contentType ? "video" :
      ("image" === contentType && "gallery" === media ? "gallery" : "news")

    // Pass data to the page via props
    return {
      pageType: article.pageType,
      data: article,
    };
  }

  return {
    pageType: 'listing',
    data: {},
  };
};


export default slug;

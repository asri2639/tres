import React from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import ArticleList from '@components/article/ArticleList';
import Head from 'next/head';
import { NextPage } from 'next';

interface Propss {
  data?: any;
  pageType: String;
}

const slug: NextPage<Propss> = ({ data, pageType }) => {
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
            content: data.keywords.join(', '),
          },
        ]}
        openGraph={{
          site_name: 'ETV Bharat News',
          url: `https://www.etvbharat.com/${data.web_url}`,
          type: data.content_type,
          title: data.title,
          description: data.short_description || data.description,
          images: [
            {
              url: data.thumbnails.web_3_2.url,
              width: 768,
              height: 512,
              alt: data.thumbnails.web_3_2.alt_tags,
            },
            {
              url: data.thumbnails.high_3_2.url,
              width: 768,
              height: 512,
              alt: data.thumbnails.high_3_2.alt_tags,
            },
          ],
        }}
        twitter={{
          handle: '@etvbharat',
          site: '@etvbharat',
          cardType: 'summary',
        }}
      />

      {data ? <ArticleList articleData={{ articles: [datum], contentId: datum.contentId }} /> : <div>nothing</div>}
    </>
  );
};

slug.getInitialProps = async ({ query }) => {
  const id = query.slug.slice(-1)[0];
  if (/na\d+/gi.test(id)) {
    const api = API(APIEnum.CatalogList);

    const country = 'IN';
    const auth_token = 'xBUKcKnXfngfrqGoF93y';
    const access_token = 'TjeNsXehJqhh2DGJzBY9';
    const selected_language = 'en';

    const response = await api.CatalogList.getArticleDetails({
      query: {
        region: country,
        auth_token,
        access_token,
        response: 'r2',
        item_languages: selected_language,
        content_id: id, //variable
        gallery_ad: true,
        page_size: 1,
        portal_state: 'na', //national
        scroll_no: 0,
      },
    });

    // Pass data to the page via props
    return {
      pageType: 'article',
      data: response.data.data.catalog_list_items[0].catalog_list_items[0],
    };
  }

  return {
    pageType: 'listing',
    data: {},
  };
};

export default slug;

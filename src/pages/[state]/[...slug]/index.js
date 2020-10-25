import React from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';
import Article from '@components/article/Article';
import Head from 'next/head';
import { NewsArticleJsonLd } from 'next-seo';

export default function slug(props) {
  const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const html = props.data
    ? props.data.html_tag.replace(scriptTagExtractionRegex, '')
    : '';
  const scripts = [];
  let matchedScript = null;
  do {
    matchedScript = scriptTagExtractionRegex.exec(props.data.html_tag);
    if (matchedScript) {
      scripts.push(matchedScript[0]);
    }
  } while (matchedScript);
  console.log(scripts);
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <NextSeo
        title={props.data.title}
        description={props.data.short_description || props.data.description}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: props.data.keywords.join(', '),
          },
        ]}
        openGraph={{
          site_name: 'ETV Bharat News',
          url: `https://www.etvbharat.com/${props.data.web_url}`,
          type: props.data.content_type,
          title: props.data.title,
          description: props.data.short_description || props.data.description,
          images: [
            {
              url: props.data.thumbnails.web_3_2.url,
              width: 768,
              height: 512,
              alt: props.data.thumbnails.web_3_2.alt_tags,
            },
            {
              url: props.data.thumbnails.high_3_2.url,
              width: 768,
              height: 512,
              alt: props.data.thumbnails.high_3_2.alt_tags,
            },
          ],
        }}
        twitter={{
          handle: '@etvbharat',
          site: '@etvbharat',
          cardType: 'summary',
        }}
      />
      {/*  <NewsArticleJsonLd

      /> */}

      {props.data ? (
        <Article data={props.data} html={html} />
      ) : (
        <div>nothing</div>
      )}
    </>
  );
}

export const getServerSideProps = async ({ query, params }) => {
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

    const relatedResp = await api.CatalogList.getArticleDetails({
      query: {
        region: country,
        auth_token,
        access_token,
        response: 'r2',
        item_languages: selected_language,
        content_id: id, //variable
        page_size: 10,
        portal_state: 'na', //national
      },
    });
    const relatedArticles = relatedResp.data;

    // Pass data to the page via props
    return {
      props: {
        data: response.data.data.catalog_list_items[0].catalog_list_items[0],
        related: relatedArticles,
      },
    };
  }

  return { props: {} };
};

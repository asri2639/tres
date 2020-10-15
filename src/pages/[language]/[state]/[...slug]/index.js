import React from 'react';
import { NextSeo } from 'next-seo';
import API from '@api/API';
import APIEnum from '@api/APIEnum';

export default function Article(props) {
  return (
    <>
      {/*  <NextSeo
        title="Using More of Config"
        description="This example uses more of the available config options."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
          site_name: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      /> */}
      {props.data ? (
        <div
          style={{ 'max-width': '1280px', margin: '0 auto' }}
          dangerouslySetInnerHTML={{
            __html: props.data.html_tag,
          }}
        ></div>
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

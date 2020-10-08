import React from 'react';
import { NextSeo } from 'next-seo';

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
      <div
        dangerouslySetInnerHTML={{
          __html: props.data.html_tag,
        }}
      ></div>
    </>
  );
}

export const getServerSideProps = async ({ query, params }) => {
  const id = query.slug.slice(-1)[0];
  if (/na\d+/gi.test(id)) {
    const res = await fetch(
      `https://prod.api.etvbharat.com/catalog_lists/web-news-details.gzip?auth_token=xBUKcKnXfngfrqGoF93y&response=r2&item_languages=en&access_token=TjeNsXehJqhh2DGJzBY9&content_id=${id}&gallery_ad=true&page=0&page_size=1&portal_state=na&scroll_no=0`
    );
    const data = await res.json();

    const resp = await fetch(
      `https://prod.api.etvbharat.com/get_related_articles.gzip?access_token=TjeNsXehJqhh2DGJzBY9&auth_token=xBUKcKnXfngfrqGoF93y&content_id=${id}&item_languages=en&page=0&page_size=10&response=r1&state=english`
    );
    const relatedArticles = await resp.json();

    // Pass data to the page via props
    return {
      props: {
        data: data.data.catalog_list_items[0].catalog_list_items[0],
        related: relatedArticles,
      },
    };
  }

  return { props: {} };
};

import React from 'react';

export default function Article(props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          props.data.data.catalog_list_items[0].catalog_list_items[0].html_tag,
      }}
    ></div>
  );
}

export const getServerSideProps = async ({ query, params }) => {
  const id = query.slug.slice(-1)[0];
  if (/na\d+/gi.test(id)) {
    const res = await fetch(
      `https://prod.api.etvbharat.com/catalog_lists/web-news-details.gzip?auth_token=xBUKcKnXfngfrqGoF93y&response=r2&item_languages=en&access_token=TjeNsXehJqhh2DGJzBY9&content_id=${id}&gallery_ad=true&page=0&page_size=1&portal_state=na&scroll_no=0`
    );
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
  }

  return { props: {} };
};

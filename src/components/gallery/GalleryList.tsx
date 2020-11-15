import React, { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { I18nContext } from 'next-i18next';
import { Media, MediaContextProvider } from 'media';

import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import { stateCodeConverter } from '@utils/Helpers';

import BottomRelatedBar from '@components/article/BottomRelatedBar';
import Breadcrumbs from '@components/article/Breadcrumbs';
import Gallery from '@components/gallery/Gallery';
import { useRouter } from 'next/router';

const GalleryList = ({ galleryData }) => {
  const router = useRouter();
  const api = API(APIEnum.CatalogList);
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const [viewed, setViewed] = useState([]);

  const relatedGalleriesFetcher = (...args) => {
    const [apiEnum, methodName, contentId] = args;
    if (methodName === 'getArticleDetails' && window.innerWidth < 769) {
      //  return null;
    }
    return api[apiEnum][methodName]({
      query: {
        response: methodName === 'getArticleDetails' ? 'r2' : 'r1',
        item_languages: language,
        page: 0,
        page_size: 10,
        content_id: contentId,
        gallery_ad: true,
        scroll_no: 0,
        // portal_state: english,
        state: stateCodeConverter(location.pathname.split('/')[2]),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const { data: adData, error: adError } = useSWR(
    ['CatalogList', 'getArticleDetails', galleryData.contentId],
    relatedGalleriesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  const { data, error } = useSWR(
    ['CatalogList', 'getRelatedArticles', galleryData.contentId],
    relatedGalleriesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  // Set galleries from galleryData
  useEffect(() => {
    if (galleryData) {
      if (galleryData.error) {
        // Handle error
      } else {
        setGalleries(galleryData.galleries);
      }
    }
    if (data) {
      stopLoading();
      setRelated(data.catalog_list_items);
    } else {
      startLoading();
    }
    if (adData) {
      let article = galleries.find(
        (article) => article.content_id === galleryData.contentId
      );
      if (article) {
        article.rhs = adData.catalog_list_items.slice(1);
        article.web_url = router.asPath.slice(1);

        setGalleries((galleries) => [...galleries]);
      }
    }
  }, [galleryData, data, adData]);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = async () => {
    // To get page offset of last article
    const lastGalleryLoaded = document.querySelector(
      '.article-list > .article:last-child'
    );
    if (lastGalleryLoaded) {
      let offsetHeight = document.body.offsetHeight;
      if (window.innerWidth < 769) {
        offsetHeight -= 350;
      }
      if (window.innerHeight + window.pageYOffset >= offsetHeight) {
        const curIndex = related.findIndex(
          (v) =>
            v.content_id === lastGalleryLoaded.getAttribute('data-content-id')
        );
        if (curIndex > -1 && curIndex < 9 && !loading) {
          startLoading();
          await api.CatalogList.getArticleDetails({
            query: {
              response: 'r2',
              item_languages: language,
              content_id: related[curIndex + 1].content_id, //variable
              page_size: window.innerWidth < 769 ? 1 : 10,
              portal_state: stateCodeConverter(location.pathname.split('/')[2]),
            },
          }).then((res) => {
            const newGallery =
              res.data.data.catalog_list_items[0].catalog_list_items;
            const rhs = res.data.data.catalog_list_items.slice(1);

            const newList = [
              ...galleries,
              {
                images: newGallery,
                rhs,
                content_id: newGallery[0].parent_id,
                web_url: related[curIndex + 1].web_url,
                count:
                  res.data.data.catalog_list_items[0].catalog_list_items
                    .total_items_count,
              },
            ];
            setGalleries(newList);
            stopLoading();
          });
        }
      }
    }
  };

  const scrollToGallery = (article) => {
    const articleEl = document.querySelector(
      `.article[data-content-id=${article.content_id}]`
    );
    if (articleEl) {
      // articleEl.scrollIntoView({ behavior: "smooth", inline: "nearest" });

      const y = articleEl.getBoundingClientRect().top + window.scrollY - 28;
      window.scroll({
        top: y,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      {/* <div className="article-count fixed right-0 text-white top-0 z-50 p-3 text-2xl font-bold">{galleries.length}</div> */}
      <MediaContextProvider>
        <Media greaterThan="xs" className="w-full">
          {' '}
          <Breadcrumbs />
        </Media>
      </MediaContextProvider>

      <ul className="article-list flex flex-col lg:container lg:mx-auto pt-4">
        {galleries.length > 0 &&
          galleries.map((gallery, i) => (
            <Gallery
              className=""
              key={gallery.content_id}
              contentId={gallery.content_id}
              data={gallery.images}
              rhs={gallery.rhs}
              count={gallery.count}
              webUrl={gallery.web_url}
              nextGallery={i < 9 ? related[i + 1] : null}
              scrollToNextGallery={() => scrollToGallery(related[i + 1])}
              viewed={viewed}
              updateViewed={(viewed) => {
                setViewed(viewed);
              }}
            />
          ))}
        {loading && (
          <h1 className="w-full text-red-700 text-2xl z-10">Loading ...</h1>
        )}
      </ul>

      {related ? (
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className="fixed bottom-0  z-20 w-screen h-16 "
          >
            {' '}
            <BottomRelatedBar data={related} />
          </Media>
        </MediaContextProvider>
      ) : null}
    </>
  );
};
export default GalleryList;

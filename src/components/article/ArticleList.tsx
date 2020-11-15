import React, { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { I18nContext } from 'next-i18next';
import { Media, MediaContextProvider } from 'media';

import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import { stateCodeConverter } from '@utils/Helpers';

import Article from '@components/article/Article';
import BottomRelatedBar from '@components/article/BottomRelatedBar';
import Breadcrumbs from '@components/article/Breadcrumbs';

const ArticleList = ({ articleData }) => {
  const api = API(APIEnum.CatalogList);
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [viewed, setViewed] = useState([]);

  const relatedArticlesFetcher = (...args) => {
    const [apiEnum, methodName, contentId] = args;
    if (methodName === 'getArticleDetails' && window.innerWidth < 769) {
      //  return null;
    }
    return api[apiEnum][methodName]({
      query: {
        // region: country,
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
    ['CatalogList', 'getArticleDetails', articleData.contentId],
    relatedArticlesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  const { data, error } = useSWR(
    ['CatalogList', 'getRelatedArticles', articleData.contentId],
    relatedArticlesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  // Set articles from articleData
  useEffect(() => {
    if (articleData) {
      if (articleData.error) {
        // Handle error
      } else {
        setArticles(articleData.articles);
      }
    }
    if (data) {
      stopLoading();
      setRelated(data.catalog_list_items);
    } else {
      startLoading();
    }

    if (adData) {
      let article = articles.find(
        (article) => article.data.content_id === articleData.contentId
      );
      if (article) {
        article.rhs = adData.catalog_list_items.slice(1);
        setArticles((articles) => [...articles]);
      }
    }
  }, [articleData, data, adData]);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = async () => {
    // To get page offset of last article
    const lastArticleLoaded = document.querySelector(
      '.article-list > .article:last-child'
    );
    if (lastArticleLoaded) {
      let offsetHeight = document.body.offsetHeight;
      if (window.innerWidth < 769) {
        offsetHeight -= 350;
      }
      if (window.innerHeight + window.pageYOffset >= offsetHeight) {
        const curIndex = related.findIndex(
          (v) =>
            v.content_id === lastArticleLoaded.getAttribute('data-content-id')
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
            const newArticle =
              res.data.data.catalog_list_items[0].catalog_list_items[0];
            const rhs = res.data.data.catalog_list_items.slice(1);
            const scriptTagExtractionRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            const html = newArticle
              ? newArticle.html_tag.replace(scriptTagExtractionRegex, '')
              : '';

            /* const scripts = [];

            let matchedScript = null;
            do {
              matchedScript = scriptTagExtractionRegex.exec(newArticle.html_tag);
              if (matchedScript) {
                scripts.push(matchedScript[0]);
              }
            } while (matchedScript);
            console.log(scripts); */
            const newList = [
              ...articles,
              {
                html: html,
                data: newArticle,
                rhs,
                contentId: newArticle.content_id,
              },
            ];
            setArticles(newList);
            stopLoading();
          });
        }
      }
    }
  };

  const scrollToArticle = (article) => {
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
      {/* <div className="article-count fixed right-0 text-white top-0 z-50 p-3 text-2xl font-bold">{articles.length}</div> */}
      <MediaContextProvider>
        <Media greaterThan="xs" className="w-full">
          {' '}
          <Breadcrumbs />
        </Media>
      </MediaContextProvider>

      <ul className="article-list flex flex-col lg:container lg:mx-auto pt-4">
        {articles.length > 0 &&
          articles.map((article, i) => (
            <Article
              key={article.contentId}
              {...article}
              rhs={article.rhs}
              nextArticle={i < 9 ? related[i + 1] : null}
              scrollToNextArticle={() => scrollToArticle(related[i + 1])}
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
            className="fixed bottom-0 z-20 w-screen h-16 "
          >
            {' '}
            <BottomRelatedBar data={related} />
          </Media>
        </MediaContextProvider>
      ) : null}
    </>
  );
};
export default ArticleList;

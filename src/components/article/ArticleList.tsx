import React, { useState, useEffect, useContext } from "react"
import useSWR from "swr";
import { I18nContext } from "next-i18next";

import API from "@services/api/API";
import APIEnum from "@services/api/APIEnum";

import Article from "@components/article/Article"

const country = 'IN';
const auth_token = 'xBUKcKnXfngfrqGoF93y';
const access_token = 'TjeNsXehJqhh2DGJzBY9';

const ArticleList = ({ articleData }) => {
  const api = API(APIEnum.CatalogList);
  const { i18n: { language, options } } = useContext(I18nContext)

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [related, setRelated] = useState([])
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  const relatedArticlesFetcher = (...args) => {
    const [apiEnum, methodName, contentId] = args;
    return api[apiEnum][methodName]({
      query: {
        region: country,
        auth_token: auth_token,
        access_token: access_token,
        response: 'r1',
        item_languages: language,
        page: 0,
        page_size: 10,
        content_id: contentId
        // portal_state: english,
        // state: english,
      }
    }).then(res => {
      return res.data.data
    });
  }

  const { data, error } = useSWR(['CatalogList', 'getRelatedArticles', articleData.contentId], relatedArticlesFetcher, { dedupingInterval: 5 * 60 * 1000 });

  // Set articles from articleData
  useEffect(() => {
    if (articleData) {
      if (articleData.error) {
        // Handle error
      } else {
        setArticles(articleData.articles)
      }
    }
    if (data) {
      stopLoading()
      setRelated(data.catalog_list_items.map(v => v.content_id))
    } else {
      startLoading()
    }
  }, [articleData, data])

  // Router event handler
  useEffect(() => {

  }, [])

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = async () => {
    // To get page offset of last article
    const lastArticleLoaded = document.querySelector(
      ".article-list > .article:last-child"
    )
    if (lastArticleLoaded) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        const curIndex = related.indexOf(lastArticleLoaded.getAttribute('data-content-id'))

        if (curIndex < 9 && !loading) {
          startLoading();
          await api.CatalogList.getArticleDetails({
            query: {
              region: country,
              auth_token,
              access_token,
              response: 'r2',
              item_languages: language,
              content_id: related[curIndex + 1], //variable
              page_size: 10,
              portal_state: 'na', //national
            },
          }).then(res => {
            const newArticle = res.data.data.catalog_list_items[0].catalog_list_items[0];
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
            const newList = [...articles, { html: html, data: newArticle }]
            setArticles(newList)
            stopLoading()
          });
        };
      }

    }
  }


  return (
    <>
      <div className="article-count fixed right-0 text-white top-0 z-50 p-3 text-2xl font-bold">{articles.length}</div>
      <ul className="article-list flex flex-col lg:container lg:mx-auto">
        {articles.length > 0 &&
          articles.map((article, i) => {
            return (
              <div key={article.data.content_id} data-content-id={article.data.content_id} className="article w-full border-b-2 border-grey-500">
                <div className="md:w-7/12">
                  <Article className='' contentId={article.data.content_id} data={article.data} html={article.html} />
                </div>
                <div className="md:w-4/12">
                </div>
              </div>
            )
          })}
        {loading && <h1 className="w-full text-red-700 text-2xl z-10">Loading ...</h1>}
      </ul>
    </>
  )
}
export default ArticleList
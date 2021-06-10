import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useContext, useEffect, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Media, MediaContextProvider } from '@media';
import RectangleCard from '@components/listing/mobile/RectangleCard';
import AdContainer from '@components/article/AdContainer';
import DesktopAdContainer from '@components/article/DesktopAdContainer';
import CatalogWall from './mobile/CatalogWall';
import SeeAll from './mobile/SeeAll';
import Loading from './mobile/Loading';
import { stateCodeConverter } from '@utils/Helpers';
import { I18nContext } from 'react-i18next';
import useSWR from 'swr';
import React from 'react';
import Sticky from 'wil-react-sticky';
import MainArticles from './MainArticles';
import MobileMainArticles from './mobile/MobileMainArticles';

const ListContainer = ({ children, data, payload }) => {
  const reArrangeData = (data) => {
    /*  let extra = [];
    return data.catalog_list_items.map((v, i) => {
      if (v.catalog_list_items.length === 5) {
        if (extra.length === 0) {
          extra.push(v.catalog_list_items[4]);
          return {
            ...v,
            catalog_list_items: [...v.catalog_list_items.slice(0, 4)],
          };
        } else {
          return {
            ...v,
            catalog_list_items: [
              ...extra.splice(0, 1),
              ...v.catalog_list_items,
            ],
          };
        }
      }

      return v;
    }); */
    return data.catalog_list_items;
  };

  const items = reArrangeData(data);

  const api = API(APIEnum.CatalogList);
  const {
    i18n: { language, options },
  } = useContext(I18nContext);
  const [listItems, setListItems] = useState(items);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  let totalCalls = Math.ceil(data.total_items_count / 8);
  const [callsDone, setCallsDone] = useState(1);
  const [filteredRHS, setFilteredRHS] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const adsMap = [];
  const [firstSet, setFirstSet] = useState([]);
  const relatedArticlesFetcher = (...args) => {
    const [apiEnum, methodName, contentId] = args;
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
    [
      'CatalogList',
      'getArticleDetails',
      data.catalog_list_items[1].catalog_list_items.find(
        (v) => v.content_type === 'article'
      ).content_id,
    ],
    relatedArticlesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );

  useEffect(() => {
    setListItems(reArrangeData(data));
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setTimeout(() => {
        const ads = document.querySelectorAll('.listing-ad');
        for (let i = 0; i < ads.length; i++) {
          let elem = ads[i];
          elem.parentNode.removeChild(elem);
        }
        setIsDesktop(true);
      }, 10);
      setTimeout(() => {
        document.addEventListener('load', () => {
          googletag.pubads().refresh();
        });
      }, 300);
    }
  }, [data]);

  useEffect(() => {
    if (adData) {
      // fetchMoreListItems();
      let filtered = adData.catalog_list_items.slice(1).filter((v) => {
        return (
          v.layout_type.indexOf('ad_unit') >= 0 ||
          (v.layout_type.indexOf('ad_unit') === -1 &&
            v.catalog_list_items.length > 0)
        );
      });
      setFilteredRHS(filtered);
    }
    if (isDesktop) {
      // await fetchMoreListItems();
      // await fetchMoreListItems();
    }
  }, [adData]);

  async function fetchMoreListItems() {
    if (payload && callsDone < totalCalls) {
      const requestPayload = {
        ...payload,
        query: {
          ...payload.query,
          page: callsDone, // since page index startsfrom 0
        },
      };

      const listingResp = await api.CatalogList.getListing(requestPayload);
      if (listingResp.data) {
        const data = listingResp.data.data;
        let items = reArrangeData(data);

        if (isDesktop) {
          let first = [...firstSet];
          let result = [];
          items.forEach((v) => {
            if (v.catalog_list_items.length === 5) {
              if (!first.length) {
                first = v.catalog_list_items;
              } else {
                v.catalog_list_items = [...first, ...v.catalog_list_items];
                result.push(v);
                first = [];
              }
            } else {
              result.push(v);
            }
          });
          items = result;
          if (first.length) {
            setFirstSet(first);
          }
        }

        setListItems((prevState) => {
          return [...prevState, ...items];
        });

        setCallsDone((callsDone) => callsDone + 1);
      }
    }

    setIsFetching(false);
  }

  function renderLayout(catalog, ind) {
    let returnValue = null;
    switch (catalog.layout_type) {
      case 'news_listing':
        returnValue = catalog.catalog_list_items.map((article, index) => (
          <RectangleCard
            key={ind + article.content_id + index}
            article={article}
            className="rectangle-card bg-white mt-1 md:mt-2 md:w-1/2 rounded-md"
          />
        ));
        break;
      case 'ad_unit_square':
        if (
          adsMap.findIndex(
            (v) => v && v.gpt_id === catalog.ad_conf.responsive_ad.gpt_id
          ) === -1
        ) {
          adsMap.push(catalog);
        }
        if (!isDesktop) {
          returnValue = (
            <React.Fragment key={'ad' + ind}>
              <AdContainer
                isDesktop={isDesktop}
                data={[catalog]}
                className="my-1 listing-ad"
                type={'listing'}
              />
            </React.Fragment>
          );
        }
        break;

      case 'catalog_wall_menu':
        /* return catalog.catalog_list_items.length > 0 ? (
          <CatalogWall
            key={catalog.friendly_id + ind}
            data={catalog.catalog_list_items}
          />
        ) : null; */
        returnValue = null;
        break;

      case 'auto_horizontal_dropdown_carousel_viewall':
      case 'featured_mosaic_carousel_seeall':
        returnValue =
          catalog.catalog_list_items.length > 0 ? (
            <SeeAll key={catalog.friendly_id + ind} data={catalog} />
          ) : null;
        break;
    }
    const desktopAdIndex = [3, 6, 10, 14, 19].findIndex((v) => v == ind);
    return (
      <React.Fragment key={ind}>
        {returnValue}
        {desktopAdIndex !== -1 ? (
          <DesktopAdContainer
            desktop={isDesktop}
            data={[adsMap[desktopAdIndex]]}
            className="my-1 listing-ad"
            type={'listing'}
          />
        ) : null}
      </React.Fragment>
    );
  }

  return (
    <>
      {/*    <div className="w-full mb-3 lg:container lg:mx-auto ">
        <MainArticle
          className="md:w-8/12 "
          article={listItems[0].catalog_list_items[0]}
        />
        <div className="md:w-4/12 "></div>
      </div> */}
      <div
        key={1 + isDesktop}
        className={`lg:container listing-container mt-2 lg:mx-auto bg-gray-200 relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10`}
      >
        <div className="md:w-8/12 h-full px-2 md:flex md:flex-wrap">
          {/* Mobile listing */}
          <MediaContextProvider>
            {listItems && listItems.length > 0 ? (
              <>
                <Media at="xs" className="w-full">
                  <MobileMainArticles list={listItems[0].catalog_list_items} />
                </Media>
                <Media greaterThan="xs" className="w-full flex space-x-2">
                  <MainArticles list={listItems[0].catalog_list_items} />
                </Media>
                {listItems.slice(1).map((subList, ind) => {
                  return renderLayout(subList, ind);
                })}
              </>
            ) : null}

            <Loading isLoading={isFetching && callsDone < totalCalls} />
          </MediaContextProvider>
        </div>
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className={`ad-content px-3 pt-2 -my-3 bg-white md:block md:w-4/12`}
          >
            <Sticky
              containerSelectorFocus={`.listing-container`}
              stickyEnableRange={[768, Infinity]}
              offsetTop={60}
            >
              <Loading isLoading={!filteredRHS} />
              {filteredRHS ? (
                <AdContainer data={filteredRHS} index={0} type={'home_page'} />
              ) : null}
            </Sticky>
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
};

export default ListContainer;

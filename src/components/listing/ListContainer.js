import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useContext, useEffect, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Media, MediaContextProvider } from '@media';
import SquareCard from '@components/listing/mobile/SquareCard';
import RectangleCard from '@components/listing/mobile/RectangleCard';
import AdContainer from '@components/article/AdContainer';
import CatalogWall from './mobile/CatalogWall';
import SeeAll from './mobile/SeeAll';
import Loading from './mobile/Loading';
import { stateCodeConverter } from '@utils/Helpers';
import { I18nContext } from 'react-i18next';
import useSWR from 'swr';
import React from 'react';
import Sticky from 'wil-react-sticky';
import MainArticle from '@components/listing/mobile/MainArticle';

const ListContainer = ({ children, data, payload }) => {
  const api = API(APIEnum.CatalogList);

  const {
    i18n: { language, options },
  } = useContext(I18nContext);
  const [listItems, setListItems] = useState(data.catalog_list_items);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const totalCalls = Math.ceil(data.total_items_count / 8);
  const [callsDone, setCallsDone] = useState(1);
  const [filteredRHS, setFilteredRHS] = useState([]);

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
      data.catalog_list_items[0].catalog_list_items[1].content_id,
    ],
    relatedArticlesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );

  useEffect(() => {
    setListItems(data.catalog_list_items);
  }, [data]);

  useEffect(() => {
    if (adData) {
      fetchMoreListItems();
      let filtered = adData.catalog_list_items.slice(1).filter((v) => {
        return (
          v.layout_type.indexOf('ad_unit') >= 0 ||
          (v.layout_type.indexOf('ad_unit') === -1 &&
            v.catalog_list_items.length > 0)
        );
      });
      setFilteredRHS(filtered);
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

      const data = listingResp.data.data;
      setListItems((prevState) => [...prevState, ...data.catalog_list_items]);
      setCallsDone((callsDone) => callsDone + 1);
    }

    setIsFetching(false);
  }

  function renderLayout(catalog, ind) {
    switch (catalog.layout_type) {
      case 'news_listing':
        return catalog.catalog_list_items.map((article, ind) => (
          <RectangleCard
            key={ind + article.content_id}
            article={article}
            className="rectangle-card bg-white mt-1 md:mt-2 md:w-1/2 rounded-md"
          />
        ));
      case 'ad_unit_square':
        return (
          <React.Fragment key={'ad' + ind}>
            <MediaContextProvider>
              <Media at="xs">
                <AdContainer data={[catalog]} className="my-1" />
              </Media>
            </MediaContextProvider>
            <MediaContextProvider>
              <Media at="xs"></Media>
            </MediaContextProvider>
          </React.Fragment>
        );

      case 'catalog_wall_menu':
        /* return catalog.catalog_list_items.length > 0 ? (
          <CatalogWall
            key={catalog.friendly_id + ind}
            data={catalog.catalog_list_items}
          />
        ) : null; */
        return null;
      case 'auto_horizontal_dropdown_carousel_viewall':
      case 'featured_mosaic_carousel_seeall':
        return catalog.catalog_list_items.length > 0 ? (
          <SeeAll key={catalog.friendly_id + ind} data={catalog} />
        ) : null;
    }
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
        className={`lg:container listing-container mt-2 lg:mx-auto bg-gray-200 relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10`}
      >
        <div className="md:w-8/12 h-full px-2 md:flex md:flex-wrap">
          <MediaContextProvider>
            {/* Mobile listing */}
            {listItems.length > 0 ? (
              <>
                <div className="w-full flex space-x-2">
                  <SquareCard
                    className="w-1/2 bg-white"
                    article={listItems[0].catalog_list_items[1]}
                  />

                  <SquareCard
                    className="w-1/2 bg-white"
                    article={listItems[0].catalog_list_items[2]}
                  />
                </div>
                {listItems.slice(1).map((subList, ind) => {
                  return renderLayout(subList, ind);
                })}
              </>
            ) : null}

            <Loading isLoading={isFetching && callsDone < totalCalls} />
          </MediaContextProvider>
        </div>
        <MediaContextProvider>
          <Media greaterThan="xs" className={`ad-content md:block md:w-4/12`}>
            <Sticky
              containerSelectorFocus={`.listing-container`}
              stickyEnableRange={[768, Infinity]}
              offsetTop={60}
            >
              <AdContainer data={filteredRHS} />
            </Sticky>
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
};

export default ListContainer;

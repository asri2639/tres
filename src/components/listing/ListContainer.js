import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useEffect, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Media, MediaContextProvider } from '@media';
import SquareCard from '@components/listing/mobile/SquareCard';
import RectangleCard from '@components/listing/mobile/RectangleCard';
import AdContainer from '@components/article/AdContainer';
import CatalogWall from './mobile/CatalogWall';
import SeeAll from './mobile/SeeAll';
import MainArticle from './mobile/MainArticle';
import Loading from './mobile/Loading';

const ListContainer = ({ children, data, payload }) => {
  const api = API(APIEnum.CatalogList);

  const [listItems, setListItems] = useState(data.catalog_list_items);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const totalCalls = Math.ceil(data.total_items_count / 8);
  const [callsDone, setCallsDone] = useState(1);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setListItems(data.catalog_list_items);

    extractAds(data.catalog_list_items);
  }, [data]);

  useEffect(() => {
    extractAds(listItems);
  }, [listItems]);

  function extractAds(listItems) {
    const filteredAds = listItems.filter(
      (list) => list.layout_type === 'ad_unit_square'
    );
    console.log(ads);
    setAds((prevAds) => [...prevAds, ...filteredAds]);
  }

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
          <>
            <MediaContextProvider>
              <Media at="xs">
                <AdContainer
                  key={'ad' + ind}
                  data={[catalog]}
                  className="my-1"
                />
              </Media>
            </MediaContextProvider>
            <MediaContextProvider>
              <Media at="xs"></Media>
            </MediaContextProvider>
          </>
        );

      case 'catalog_wall_menu':
        return catalog.catalog_list_items.length > 0 ? (
          <CatalogWall
            key={catalog.friendly_id + ind}
            data={catalog.catalog_list_items}
          />
        ) : null;
      case 'auto_horizontal_dropdown_carousel_viewall':
      case 'featured_mosaic_carousel_seeall':
        return catalog.catalog_list_items.length > 0 ? (
          <SeeAll key={catalog.friendly_id + ind} data={catalog} />
        ) : null;
    }
  }

  return (
    <>
     {/*  <div className="w-full mb-3 lg:container lg:mx-auto ">
        <MainArticle
          className="md:w-8/12 "
          article={listItems[0].catalog_list_items[0]}
        />
        <div className="md:w-4/12 "></div>
      </div> */}
      <div
        className={`lg:container mt-2 lg:mx-auto bg-gray-200 relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10`}
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
            {/* ads.length &&
              ads.map((ad, ind) => {
                return (
                  <AdContainer
                    key={'ad' + ind + ind}
                    data={[ad]}
                    className="mb-48"
                  />
                );
              }) */}
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
};

export default ListContainer;

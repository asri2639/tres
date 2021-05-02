import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useEffect, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Media, MediaContextProvider } from '@media';
import SquareCard from '@components/listing/mobile/SquareCard';
import RectangleCard from '@components/listing/mobile/RectangleCard';
import AdContainer from '@components/article/AdContainer';

const ListContainer = ({ children, data, payload }) => {
  const api = API(APIEnum.CatalogList);

  const [listItems, setListItems] = useState(data.catalog_list_items);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const totalCalls = Math.ceil(data.total_items_count / 8);
  const [callsDone, setCallsDone] = useState(1);

  useEffect(() => {
    setListItems(data.catalog_list_items);
  }, [data]);

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
            className="bg-white mt-1 rounded-md"
          />
        ));
      case 'ad_unit_square':
        return null;
        /*  <AdContainer key={'ad' + ind} data={[catalog]} className="my-1" /> */
    }
  }

  return (
    <>
      <div
        className={`bg-gray-200 relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10`}
      >
        <div className="md:w-8/12 h-full px-2">
          <MediaContextProvider>
            <Media at="xs">
              {/* Mobile listing */}
              {listItems.length > 0 ? (
                <>
                  <div>
                    <div className="w-full">
                      {listItems[0].catalog_list_items[0].display_title}
                    </div>
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
                  </div>
                  {listItems.slice(1).map((subList, ind) => {
                    return renderLayout(subList, ind);
                  })}
                </>
              ) : null}
            </Media>
            <Media greaterThan="xs"></Media>
          </MediaContextProvider>
        </div>
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className={`ad-content md:block md:w-4/12`}
          ></Media>
        </MediaContextProvider>
      </div>
    </>
  );
};

export default ListContainer;

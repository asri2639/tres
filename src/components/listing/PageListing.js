import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useContext, useEffect, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Media, MediaContextProvider } from '@media';
import RectangleCard from '@components/listing/mobile/RectangleCard';
import AdContainer from '@components/article/AdContainer';
import NavLink from '@components/common/NavLink';
import DesktopAdContainer from '@components/article/DesktopAdContainer';
import CatalogWall from './mobile/CatalogWall';
import SeeAll from './mobile/SeeAll';
import SliderSeeAll from './mobile/SliderSeeAll';
import GoogleTagManager from '@utils/GoogleTagManager';
import Modal from '@components/modal/Modal';
import Loading from './mobile/Loading';
import { stateCodeConverter } from '@utils/Helpers';
import ListingStateSelectModal from '@components/common/ListingStateSelectModal';
import { I18nContext } from 'react-i18next';
import useSWR from 'swr';
import React from 'react';
import Sticky from 'wil-react-sticky';
import { useRouter } from 'next/router';
import MainArticles from './MainArticles';
import MobileMainArticles from './mobile/MobileMainArticles';
import { RTLContext } from '@components/layout/Layout';
import useTranslator from '@hooks/useTranslator';
const PageListing = ({ children, data, payload, dropdown }) => {
  const api = API(APIEnum.CatalogList, APIEnum.Listing);
  const router = useRouter();
  const isRTL = useContext(RTLContext);
  const { t, appLanguage } = useTranslator();
  const [showStateModal, setShowStateModal] = useState(false);
  const [desktopCall, setDesktopCall] = useState(true);
  const [totalCalls, setTotalCalls] = useState(
    Math.ceil(data.total_items_count / 8)
  );
  const [paginationCount, setPaginationCount] = useState(0);
  const totalItemsCount = (latestdata) => {
    let itemsCount = 0;

    latestdata.map((subList, ind) => {
      if (subList.layout_type !== 'catalog_wall_menu') {
        subList.catalog_list_items.map((child, dnd) => {});
        itemsCount = itemsCount + subList.catalog_list_items.length;
      }
    });
    return itemsCount;
  };
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
  const [isDesktop, setIsDesktop] = useState(false);

  const items = reArrangeData(data);
  const [selected, setSelected] = useState({
    state: '',
    language: '',
    text: '',
  });
  const [listItems, setListItems] = useState(items);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [callsDone, setCallsDone] = useState(1);
  const [listId, setListId] = useState(null);
  const [desktopUrl, setDesktopUrl] = useState(null);
  const [filteredRHS, setFilteredRHS] = useState([]);
  const adsMap = [];
  const [firstSet, setFirstSet] = useState([]);

  const [totalArticleCount, setTotalArticleCount] = useState(0);

  const relatedArticlesFetcher = (...args) => {
    const [apiEnum, methodName, contentId, language] = args;
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
    () => {
      let article = null;
      if (
        data &&
        data.catalog_list_items &&
        (data.catalog_list_items[2] || data.catalog_list_items[1])
      ) {
        article = data.catalog_list_items[1].catalog_list_items.find(
          (v) => v.content_type === 'article' || 'video'
        );
        if (!article) {
          article = data.catalog_list_items[2].catalog_list_items.find(
            (v) => v.content_type === 'article' || 'video'
          );
        }
      }
      return article
        ? [
            'CatalogList',
            'getArticleDetails',
            article.content_id,
            article.item_languages[0],
          ]
        : null;
    },

    relatedArticlesFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );

  useEffect(() => {
    // setListItems(reArrangeData(data));
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const { googletag } = window;

      setTimeout(() => {
        /*  const ads = document.querySelectorAll('.listing-ad');
        for (let i = 0; i < ads.length; i++) {
          let elem = ads[i];
          elem.parentNode.removeChild(elem);
        } */
        setIsDesktop(true);
      }, 10);
      if (callsDone === 1) {
        fetchMoreListItems();
      }
      document.addEventListener('load', () => {
        setTimeout(() => {
          // googletag.pubads().refresh();
        }, 1000);
      });
    }
  }, [data]);

  useEffect(() => {
    if (adData) {
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
      fetchMoreListItems();
    }
  }, [adData]);

  async function fetchMoreListItems() {
    if (
      payload &&
      callsDone <= totalCalls &&
      totalArticleCount + paginationCount < 100 &&
      desktopCall
    ) {
      if (callsDone === 1) {
        let initialArticleCount = totalItemsCount(reArrangeData(data));

        setTotalArticleCount(
          (totalArticleCount) => totalArticleCount + initialArticleCount
        );
      }
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
        let nextPageArticlesCount = totalItemsCount(reArrangeData(data));
        if (callsDone === 1) {
          setPaginationCount(nextPageArticlesCount);
        }
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
          return prevState.concat(items);
        });

        setCallsDone((callsDone) => callsDone + 1);

        setTotalArticleCount(
          (totalArticleCount) => totalArticleCount + nextPageArticlesCount
        );
      }
    } else if (payload && callsDone <= totalCalls && desktopCall) {
      if (desktopUrl) {
        const requestPayload = {
          ...payload,
          params: {
            ...payload.params,
            key: desktopUrl,
          },
          query: {
            ...payload.query,
            page_size: 16,
            pagination_url: window.location.pathname,
            page: callsDone,
            total_mobile_article_count: totalArticleCount,
          },
        };

        const listingResp = await api.CatalogList.getListing(requestPayload);

        setListItems((prevState) => {
          return prevState.concat(listingResp.data.data);
        });
        setCallsDone((callsDone) => callsDone + 1);
      } else {
        const response = await api.Listing.getListingApiKey({
          query: {
            app: 'web',
            url: window.location.pathname,
          },
        });
        const result = response.data;
        const desktoprequestPayload = {
          ...payload,
          params: {
            ...payload.params,
            key: result.home_link,
          },
        };
        const weblistingResp = await api.CatalogList.getListing(
          desktoprequestPayload
        );

        let id = undefined;
        let totalDesktopdata = undefined;
        loop1: for (
          var i = 0;
          i < weblistingResp.data.data.catalog_list_items.length;
          i++
        ) {
          if (
            weblistingResp.data.data.catalog_list_items[i].layout_type ===
            'list_content_pagination'
          ) {
            id = weblistingResp.data.data.catalog_list_items[i].list_id;
            totalDesktopdata =
              weblistingResp.data.data.catalog_list_items[i].total_items_count;
            break loop1;
          }
          loop2: for (
            var j = 0;
            j <
            weblistingResp.data.data.catalog_list_items[i].catalog_list_items
              .length;
            j++
          ) {
            if (
              weblistingResp.data.data.catalog_list_items[i].catalog_list_items[
                j
              ].catalog_list_items
            ) {
              loop3: for (
                var k = 0;
                k <
                weblistingResp.data.data.catalog_list_items[i]
                  .catalog_list_items[j].catalog_list_items.length;
                k++
              ) {
                if (
                  weblistingResp.data.data.catalog_list_items[i]
                    .catalog_list_items[j].catalog_list_items[k].layout_type ===
                  'list_content_pagination'
                ) {
                  id =
                    weblistingResp.data.data.catalog_list_items[i]
                      .catalog_list_items[j].catalog_list_items[k].list_id;
                  totalDesktopdata =
                    weblistingResp.data.data.catalog_list_items[i]
                      .catalog_list_items[j].catalog_list_items[k]
                      .total_items_count;
                  break loop1;
                }
              }
            }
          }
        }
        if (!id) {
          setDesktopCall(false);
        }
        if (id) {
          setTotalCalls(Math.ceil(totalDesktopdata / 16));
          const requestPayload = {
            ...payload,
            params: {
              ...payload.params,
              key: id,
            },
            query: {
              ...payload.query,
              page_size: 16,
              pagination_url: window.location.pathname,
              page: callsDone,
              total_mobile_article_count: totalArticleCount,
            },
          };

          const listingResp = await api.CatalogList.getListing(requestPayload);
          setDesktopUrl(id);
          setListItems((prevState) => {
            return prevState.concat(listingResp.data.data);
          });
          setCallsDone((callsDone) => callsDone + 1);
        }
      }
    }

    setIsFetching(false);
  }

  function renderLayout(catalog, ind) {
    let returnValue = null;

    switch (catalog.layout_type) {
      case 'staggered_group':
      case 'news_card_listing':
      case 'list_content_pagination':
      case 'news_listing':
        const len = catalog.catalog_list_items.length;
        const items = catalog.catalog_list_items;
        if (len % 2 === 1) {
          // items = catalog.catalog_list_items.slice(0, -1);
        }
        returnValue = items.map((article, index) => (
          <RectangleCard
            key={ind + article.content_id + index}
            article={article}
            className="rectangle-card bg-white mt-1 md:mt-2 md:w-1/2 rounded-md"
          />
        ));
        break;
      case 'ad_unit_square':
        if (catalog.ad_conf.responsive_ad) {
          if (
            adsMap.findIndex(
              (v) => v && v.gpt_id === catalog.ad_conf.responsive_ad.gpt_id
            ) === -1
          ) {
            adsMap.push(catalog);
          }
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
        returnValue =
          catalog.catalog_list_items.length > 0 ? (
            <CatalogWall
              key={catalog.friendly_id + ind}
              data={catalog.catalog_list_items}
            />
          ) : null;
        break;
      case 'staggered_grid_seeall':
      case 'slider_seeall':
      case 'news_grid_seeall':
        returnValue =
          catalog.catalog_list_items.length > 0 ? (
            <SliderSeeAll key={catalog.friendly_id + ind} data={catalog} />
          ) : null;
        break;

      case 'featured_mosaic_carousel':
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
        {desktopAdIndex !== -1 && adsMap[desktopAdIndex] ? (
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
      <MediaContextProvider>
        <Media at="xs" className="w-full mt-2">
          {listItems[0].layout_type == 'featured_topnews_seeall' ||
          listItems[0].layout_type == 'slider_seeall' ||
          listItems[0].layout_type == 'featured_staggered_grid' ||
          listItems[0].layout_type == 'news_card_listing' ? (
            <div>
              <div className="flex items-center font-extrabold float-left ml-3.5">
                {listItems[0].ml_title[0].text}
              </div>
              <div className="flex items-center font-semibold text-sm text-red-500 float-right mr-10">
                {listItems[0].url != '' ? (
                  <NavLink
                    href={listItems[0].url}
                    as={listItems[0].url}
                    passHref
                    onClick={() => {
                      GoogleTagManager.menuClick(listItems[0], 'headermenu');
                    }}
                  >
                    {t('see_all')}
                  </NavLink>
                ) : null}
              </div>
            </div>
          ) : null}

          {showStateModal ? (
            <ListingStateSelectModal
              data={dropdown.data}
              state={router.query.state}
              type={dropdown.type}
              onClose={() => {
                setShowStateModal(false);
              }}
              onStateSelect={(district) => {
                setShowStateModal(false);

                if (dropdown.title !== district.ml_title[0].text) {
                  let url = '';

                  if (
                    router.query.language === 'english' ||
                    (router.query.language === 'urdu' &&
                      router.query.state === 'national')
                  ) {
                    url = '/english/national/' + dropdown.type;
                    router.push(url + '/' + district.friendly_id);
                  } else {
                    if (dropdown.type === 'state') {
                      url =
                        '/' +
                        router.query.language +
                        '/' +
                        selected.state +
                        '/state';
                    } else {
                      url = dropdown.url + '/' + district.friendly_id;
                    }

                    router.push(url);
                  }
                }
              }}
            />
          ) : null}
          {dropdown ? (
            dropdown.data && dropdown.data.length > 1 ? (
              <div>
                <div className="flex items-center float-right mr-2.5">
                  <div className="pr-2 text-sm">{t('select')}</div>
                  <div
                    className="flex items-center capitalize text-sm border border-gray-600 px-2 py-0 cursor-pointer"
                    onClick={() => {
                      setShowStateModal(true);
                    }}
                  >
                    <div className="text-center" style={{ minWidth: '100px' }}>
                      {dropdown.title}
                    </div>
                    <span className="pl-1 caret text-gray-700 "> &#9660;</span>
                  </div>
                </div>
              </div>
            ) : null
          ) : null}
        </Media>
        <Media greaterThan="xs" className="w-full flex space-x-2">
          {listItems[0].layout_type == 'featured_topnews_seeall' ||
          listItems[0].layout_type == 'slider_seeall' ||
          listItems[0].layout_type == 'featured_staggered_grid' ||
          listItems[0].layout_type == 'news_card_listing' ? (
            <div style={{ width: '63%', marginLeft: '25px', marginTop: '7px' }}>
              <div className="flex items-center font-extrabold float-left ml-3.5">
                {listItems[0].ml_title[0].text}
              </div>
              <div className="flex items-center font-semibold text-sm text-red-500 float-right mr-10">
                {listItems[0].url != '' ? (
                  <NavLink
                    href={listItems[0].url}
                    as={listItems[0].url}
                    passHref
                    onClick={() => {
                      GoogleTagManager.menuClick(listItems[0], 'headermenu');
                    }}
                  >
                    {t('see_all')}
                  </NavLink>
                ) : null}
              </div>
            </div>
          ) : null}
          {showStateModal ? (
            <Modal
              title={'change_' + dropdown.type}
              open={!!showStateModal}
              isMobile={false}
              onClose={() => {
                setShowStateModal(false);
              }}
              width={null}
              height={null}
            >
              <div className="px-6 py-4 flex justify-around items-center h-24">
                <div className="text-md font-medium">{t(dropdown.type)}</div>
                <div className="w-40">
                  <select
                    value={selected.state}
                    onChange={(e) => {
                      setSelected({
                        state: e.target.value,
                        text: e.target.text,
                      });
                    }}
                    className="form-control"
                  >
                    <option value="select">
                      {t('select_' + dropdown.type)}
                    </option>
                    {dropdown.data.map((v) => {
                      return (
                        <option key={v.state} value={v.friendly_id}>
                          {v.ml_title[0].text}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end w-full p-4 pb-6">
                <div
                  className="button px-4 py-2 border-2 border-red-700 text-red-700 rounded-md cursor-pointer focus:text-white focus:bg-red-700"
                  onClick={() => {
                    setSelected({ language: '', state: '', text: '' });
                    setShowStateModal(false);
                  }}
                >
                  {t('cancel_capital')}
                </div>
                <div
                  className="button yes px-4 py-2 border-2 border-red-700 text-red-700 rounded-md ml-3 cursor-pointer"
                  onClick={() => {
                    setSelected({ language: '', state: '', text: '' });
                    setShowStateModal(false);

                    if (dropdown.title !== selected.text) {
                      let url = '';

                      if (
                        router.query.language === 'english' ||
                        (router.query.language === 'urdu' &&
                          router.query.state === 'national')
                      ) {
                        url = `/${router.query.language}/national/${dropdown.type}`;
                        router.push(url + '/' + selected.state);
                      } else {
                        if (dropdown.type === 'state') {
                          url =
                            '/' +
                            router.query.language +
                            '/' +
                            selected.state +
                            '/state';
                        } else {
                          url = dropdown.url + '/' + selected.state;
                        }

                        router.push(url);
                      }
                    }
                  }}
                >
                  {t('done_txt')}
                </div>
              </div>

              <style jsx>
                {`
                  select {
                    display: block;
                    width: 100%;
                    height: 34px;
                    padding: 6px 12px;
                    font-size: 14px;
                    line-height: 1.42857143;
                    color: #555;
                    background-color: #fff;
                    background-image: none;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                    -webkit-transition: border-color ease-in-out 0.15s,
                      -webkit-box-shadow ease-in-out 0.15s;
                    -o-transition: border-color ease-in-out 0.15s,
                      box-shadow ease-in-out 0.15s;
                    transition: border-color ease-in-out 0.15s,
                      box-shadow ease-in-out 0.15s;
                    cursor: pointer;
                  }

                  .form-control:focus {
                    border-color: #c53030;
                    outline: 0;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
                      0 0 8px rgba(233, 102, 102, 0.6);
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
                      0 0 8px rgba(233, 102, 102, 0.6);
                  }
                  .form-control::-moz-placeholder {
                    color: #999;
                    opacity: 1;
                  }
                  .form-control:-ms-input-placeholder {
                    color: #999;
                  }
                  .form-control::-webkit-input-placeholder {
                    color: #999;
                  }
                  .form-control::-ms-expand {
                    background-color: transparent;
                    border: 0;
                  }

                  .button:hover {
                    box-shadow: 0 0 0 3px rgba(197, 48, 48, 0.1);
                  }

                  .button:active {
                    background: #c53030;
                    color: white;
                  }
                `}
              </style>
            </Modal>
          ) : null}
          {dropdown ? (
            dropdown.data && dropdown.data.length > 1 ? (
              <div>
                <div
                  className="flex items-center float-right "
                  style={{ marginLeft: '41rem', marginTop: '10px' }}
                >
                  <div className="pr-2 text-sm">
                    {t('select') + ' ' + t(dropdown.type)}
                  </div>
                  <div
                    className="flex items-center capitalize text-sm border border-gray-600 px-2 py-0 cursor-pointer"
                    onClick={() => {
                      setShowStateModal(true);
                    }}
                  >
                    <div className="text-center" style={{ minWidth: '100px' }}>
                      {dropdown.title}
                    </div>
                    <span className="pl-1 caret text-gray-700 "> &#9660;</span>
                  </div>
                </div>
              </div>
            ) : null
          ) : null}
        </Media>
      </MediaContextProvider>
      <div
        className={`lg:container listing-container mt-2 lg:mx-auto bg-gray-200 relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10 ${
          isRTL ? 'md:flex-row-reverse rtl' : ''
        }`}
      >
        <div className="md:w-8/12 h-full px-2 md:flex md:flex-wrap">
          {/* Mobile listing */}
          <MediaContextProvider>
            {listItems && listItems.length > 0 ? (
              <>
                <Media at="xs" className="w-full">
                  <MobileMainArticles
                    list={listItems[0].catalog_list_items}
                    dropdown={dropdown}
                  />
                </Media>
                <Media greaterThan="xs" className="w-full flex space-x-2">
                  <MainArticles list={listItems[0].catalog_list_items} />
                </Media>
                {listItems[0].catalog_list_items.length > 3
                  ? listItems[0].catalog_list_items
                      .slice(3)
                      .map((article, index) => (
                        <RectangleCard
                          key={article.content_id + index}
                          article={article}
                          className="rectangle-card bg-white mt-1 md:mt-2 md:w-1/2 rounded-md"
                        />
                      ))
                  : null}
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

export default PageListing;

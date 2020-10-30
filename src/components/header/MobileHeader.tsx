import { useRouter } from 'next/router';
import useSWR from 'swr';
import { I18nContext } from 'next-i18next';
import { useContext, useState } from 'react';

import NavLink from '@components/common/NavLink';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import header from './Header.module.scss';
import Modal from '@components/modal/Modal';
import DesktopSubMenu from '@components/header/DesktopSubMenu';

const country = 'IN';
const auth_token = 'xBUKcKnXfngfrqGoF93y';
const access_token = 'TjeNsXehJqhh2DGJzBY9';

export default function MobileHeader({ data, className }) {
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [openStateModal, setOpenStateModal] = useState([]);
  const [sidebar, toggleSidebar] = useState(false);

  const [category, setCategory] = useState(null);

  const languageNStateSelect = (language, states) => {
    if (language === 'english') {
      setTimeout(() => {
        router.push(`/national`, `/${language}/national`);
      }, 100);
    } else {
      if (states.length === 1) {
        setTimeout(() => {
          router.push(`/${states[0].state}`, `/${language}/${states[0].state}`);
        }, 100);
      } else {
        setOpenStateModal(states);
      }
    }
  };

  const goToSelected = (selected) => {
    languageNStateSelect(selected.language, [{ state: selected.state }]);
    setOpenStateModal([]);
  };

  const containerOut = (ev) => {
    setCategory(null);
  };

  const api = API(APIEnum.CatalogList);

  const catalogFetcher = (...args) => {
    const [apiEnum, methodName] = args;
    return api[apiEnum][methodName]({
      query: {
        region: country,
        auth_token: auth_token,
        access_token: access_token,
        response: 'r2',
        item_languages: language,
      },
    }).then((res) => {
      return res.data.data;
    });
  };
  const stateData =
    data && data.languages
      ? data.languages[options['localeSubpaths'][language]].find(
          (v) => v.state.toLowerCase() === router.query.state
        )
      : null;

  const response = useSWR(
    ['CatalogList', 'getMobileMenuDetails'],
    catalogFetcher,
    { dedupingInterval: 15 * 60 * 1000 }
  );
  // menu: headerResp.data.data.catalog_list_items
  return (
    <>
      {openStateModal.length > 0 ? (
        <Modal
          title=""
          isMobile={true}
          open={!!openStateModal}
          onClose={() => {
            setOpenStateModal([]);
          }}
        >
          <>
            <div className="p-4 rounded-md"  style={{ background: '#f0f0f0' }}>
              <div className="flex justify-between pl-3 pb-4">
                <div className="text-gray-700 text-md pl-2">Select State</div>
                <div>
                  <button
                    type="button"
                    className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                    onClick={() => setOpenStateModal([])}
                  >
                    &#10005;
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-64 mx-auto px-2">
                {openStateModal.map((v) => {
                  return (
                    <div
                      key={v.state}
                      onClick={() => {
                        goToSelected({
                          language: openStateModal[0].item_languages[0],
                          state: v.state,
                        });
                      }}
                      className="py-1"
                      style={{ flexBasis: '50%' }}
                    >
                      {v.display_title}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        </Modal>
      ) : null}

      <div
        className={`${className} ${header['mobile-header']} block md:hidden`}
      >
        <div
          className={`${header['logo-container']} flex justify-start bg-white px-2 py-1 self-center border-b`}
        >
          <NavLink
            href={{
              pathname: '/[state]',
              query: { state: router.query.state },
            }}
            as={`/${options['localeSubpaths'][language]}/${router.query.state}`}
            passHref
          >
            <div
              className={`logo ${options['localeSubpaths'][language]}`}
              style={{ transform: `translate(-24px, -19px) scale(0.6)` }}
            ></div>
          </NavLink>
          <div className="flex items-center">
            {stateData ? (
              <div className="text-sm">
                <div className="border-b border-red-700">
                  {stateData.display_title}
                </div>
                <div>
                  {stateData.state
                    .split('-')
                    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
                    .join(' ')}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-hbg px-3 font-english border-b">
          <div className="flex justify-between items-center py-1 overflow-x-auto">
            <div className="flex space-x-6">
              {data.languages
                ? Object.entries(data.languages).map(([language, states]) => {
                    return (
                      <div
                        key={language}
                        onClick={() => languageNStateSelect(language, states)}
                        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
                      >
                        <div className={`language-icon ${language}`}></div>
                        <div className="text-white text-xs">
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${className} bg-hbg px-3 sticky block md:hidden -top-1 z-40`}
        onMouseLeave={containerOut}
      >
        <div className="lg:mx-auto flex items-center py-1 overflow-x-auto space-x-3 ">
          {response.data && response.data.catalog_list_items
            ? response.data.catalog_list_items.map((item) => {
                return (
                  <div
                    key={item.list_id + item.ml_title[0].text}
                    className={`${header['header-menu-item']} text-white cursor-pointer whitespace-no-wrap hover:text-red-700`}
                  >
                    <div className=" flex flex-col items-center relative  text-sm">
                      <div>{item.ml_title[0].text.toUpperCase()}</div>
                      {item.total_items_count > 0 ? (
                        <div
                          className={`${header['arrow-up']} absolute transform translate-y-5`}
                        ></div>
                      ) : null}
                    </div>

                    {item.total_items_count > 0 ? (
                      <div
                        className={`${header.submenu} lg:container absolute left-0 w-full z-10 text-black`}
                      >
                        <div className="h-3 bg-transparent"></div>
                        <div
                          className={`${header['submenu-container']} w-full bg-white shadow-md p-3`}
                          onMouseLeave={() => setCategory(null)}
                        >
                          <div className="flex w-full h-full">
                            <div
                              className={`h-full p-3 overflow-y-scroll flex-grow-0 flex-shrink-0 whitespace-pre-wrap ${header['lhs-content']}`}
                              style={{ flexBasis: '19%' }}
                            >
                              {/*   {item.catalog_list_items.map(subitem => {
                                                    return (
                                                        <div key={subitem.list_id} className="p-1 font-bold text-lg hover:text-red-700"
                                                            onMouseEnter={() => setCategory({ ...subitem, title: item.ml_title[0].text })}>
                                                            {subitem.ml_title[0].text}
                                                        </div>
                                                    )
                                                })} */}
                            </div>
                            {category &&
                            item.ml_title[0].text === category.title ? (
                              <DesktopSubMenu
                                key={item.ml_title[0].text}
                                category={category}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

import { useRouter } from 'next/router';
import { useState } from 'react';
import { I18nContext, WithTranslation } from 'next-i18next';
import { useContext } from 'react';

import header from './Header.module.scss';

import NavLink from '@components/common/NavLink';
import DesktopSidebar from '@components/header/DesktopSidebar';
import Modal from '@components/modal/Modal';
import DesktopSubMenu from '@components/header/DesktopSubMenu';
import { withTranslation } from '@i18n';

const DesktopHeader = ({ className, data, t }: IDesktopHeader) => {
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [selected, setSelected] = useState({ state: '', language: '' });
  const [openStateModal, setOpenStateModal] = useState([]);
  const [sidebar, toggleSidebar] = useState(false);
  const [category, setCategory] = useState(null);

  const [searchBox, toggleSearchBox] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const setInitialCategory = (item) => {
    const subitem = item.catalog_list_items ? item.catalog_list_items[0] : {};
    setCategory({ ...subitem, title: item.ml_title[0].text });
  };
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
        setSelected({ state: '', language: '' });
        setOpenStateModal(states);
      }
    }
  };

  const goToSelected = () => {
    languageNStateSelect(selected.language, [{ state: selected.state }]);
    setOpenStateModal([]);
    setSelected(null);
  };

  const containerOut = (ev) => {
    setCategory(null);
  };

  const searchitem = (e) => {
    const goTo = () => {
      toggleSearchBox(false);
      router.push(
        `/${router.query.state}/search/${searchInput}`,
        `/${options['localeSubpaths'][language]}/${router.query.state}/search/${searchInput}`
      );
    };
    if (e) {
      if (e.key === 'Enter') {
        goTo();
      }
    } else {
      goTo();
    }
  };

  const stateData =
    data && data.languages
      ? data.languages[options['localeSubpaths'][language]].find(
          (v) => v.state.toLowerCase() === router.query.state
        )
      : null;

  return (
    <>
      {openStateModal.length ? (
        <Modal
          title={'change_state'}
          open={!!openStateModal}
          isMobile={false}
          onClose={() => setOpenStateModal([])}
        >
          <div className="px-6 py-4 flex justify-around items-center h-24">
            <div className="text-md font-medium">{t('state')}</div>
            <div className="w-40">
              <select
                value={selected.state}
                onChange={(e) => {
                  setSelected({
                    language: openStateModal[0].item_languages[0],
                    state: e.target.value,
                  });
                }}
                className="form-control"
              >
                <option value="select">{t('select_state')}</option>
                {openStateModal.map((v) => {
                  return (
                    <option key={v.state} value={v.state}>
                      {v.display_title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end w-full p-4 pb-6">
            <div
              className="button px-4 py-2 border-2 border-red-700 text-red-700 rounded-md cursor-pointer focus:text-white focus:bg-red-700"
              onClick={() => setOpenStateModal([])}
            >
              {t('cancel_capital')}
            </div>
            <div
              className="button yes px-4 py-2 border-2 border-red-700 text-red-700 rounded-md ml-3 cursor-pointer"
              onClick={() => {
                selected.state && goToSelected();
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

      {sidebar ? <DesktopSidebar onClose={() => toggleSidebar(false)} /> : null}

      <div
        className={`${className} divide-y md:block hidden bg-hbg px-2 font-english border-b`}
      >
        <div
          className={`${header.scroll} lg:container lg:mx-auto flex justify-between items-center py-1 overflow-x-auto`}
        >
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

          <div className="flex flex-row items-center space-x-3">
            <div>
              <a href="https://www.facebook.com/ETVBharatEnglish">
                <p className="fb-icon"></p>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/eenadu_english">
                <p className="twitter-icon"></p>
              </a>
            </div>
            <div className="srch-container">
              <div
                className="search-icon cursor-pointer"
                onClick={() => toggleSearchBox((searchBox) => !searchBox)}
              ></div>
              {searchBox ? (
                <div className="absolute z-50">
                  <input
                    placeholder="Search stories"
                    value={searchInput}
                    onInput={(e) => setSearchInput(e.target['value'])}
                    onKeyPress={(e) => searchitem(e)}
                    type="text"
                    className="relative h-8 border border-gray-300 rounded-sm p-2 pr-6 w-48"
                  />

                  <button
                    onClick={() => searchitem(null)}
                    className="btn absolute right-0 top-0 h-8 p-0 m-0 bg-gray-300 text-lg w-8"
                    style={{
                      borderRadius: '0 3px 3px 0',
                      color: '#595959',
                      lineHeight: 1,
                    }}
                  >
                    {/* ❱ */}
                    &#x25ba;
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${className} bg-hbg md:block hidden px-2 sticky top-0 z-40`}
        onMouseLeave={containerOut}
      >
        <div
          className={`${header.scroll} lg:container lg:mx-auto flex items-center py-1 overflow-x-auto space-x-3 `}
        >
          <div
            className={header.hamburger}
            onClick={() => toggleSidebar(true)}
          ></div>

          {data.menu
            ? data.menu.map((item) => {
                return (
                  <div
                    key={item.list_id}
                    className={`${header['header-menu-item']} text-white cursor-pointer whitespace-no-wrap hover:text-red-700`}
                  >
                    <div
                      className=" flex flex-col items-center relative"
                      onMouseEnter={() => setInitialCategory(item)}
                    >
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
                              {item.catalog_list_items.map((subitem) => {
                                return (
                                  <div
                                    key={subitem.list_id}
                                    className="p-1 font-bold text-lg hover:text-red-700"
                                    onMouseEnter={() =>
                                      setCategory({
                                        ...subitem,
                                        title: item.ml_title[0].text,
                                      })
                                    }
                                  >
                                    {subitem.ml_title[0].text}
                                  </div>
                                );
                              })}
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

      <div className={`${className} md:block hidden border-b`}>
        <div className="lg:container lg:mx-auto  flex justify-start px-2 py-1 self-center">
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
            ></div>
          </NavLink>
          <div className="flex items-center pl-3">
            {stateData ? (
              <div className="text-md">
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

          <div className="flex justify-center items-center">
            {/* <iframe className="mx-auto" width={755} height={110} src={`https://www.etvbharat.com/banner-near-logo/${router.query.state}/business/728x90-1.htm`}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

interface IDesktopHeader extends WithTranslation {
  className: string;
  data: any;
}

export default withTranslation('common')(DesktopHeader);
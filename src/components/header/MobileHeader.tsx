import { useRouter } from 'next/router';
import useSWR from 'swr';
import { I18nContext } from 'next-i18next';
import { useContext, useState } from 'react';

import NavLink from '@components/common/NavLink';
import header from './Header.module.scss';
import Modal from '@components/modal/Modal';
import GoogleTagManager from '@utils/GoogleTagManager';
import { AMPContext } from '@pages/_app';

const country = 'IN';

export default function MobileHeader({ data, className }) {
  const isAMP = useContext(AMPContext);
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [openStateModal, setOpenStateModal] = useState([]);

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

  const getAMPHTML = (language, states) => {
    if (language === 'english') {
      return (
        <a
          key={language}
          href={`https://m.etvbharat.com/${language}/national`}
          className="flex-1 flex flex-col justify-center items-center cursor-pointer"
        >
          <div className={`language-icon ${language}`}></div>
          <div className="text-white text-xs">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </div>
        </a>
      );
    } else {
      if (states.length === 1) {
        return (
          <a
            key={language}
            href={`https://m.etvbharat.com/${language}/national`}
            className="flex-1 flex flex-col justify-center items-center cursor-pointer"
          >
            <div className={`language-icon ${language}`}></div>
            <div className="text-white text-xs">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </div>
          </a>
        );
      } else {
        return (
          <div key={language}>
            <amp-lightbox
              id={`my-lightbox-${language}`}
              className="lightbox"
              layout="nodisplay"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  className="p-3 pb-4 rounded-md"
                  style={{ background: '#f0f0f0' }}
                >
                  <div className="flex justify-between pb-4">
                    <div
                      className="text-gray-700 text-md pl-2"
                      style={{ fontSize: '1rem' }}
                    >
                      Select State
                    </div>
                    <div>
                      <button
                        type="button"
                        role="button"
                        tabIndex={0}
                        className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                        on={`tap:my-lightbox-${language}.close`}
                      >
                        &#10005;
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full px-3 text-sm mx-auto">
                    {states.map((v) => {
                      return (
                        <a
                          key={v.state}
                          href={`https://www.etvbharat.com/${
                            v.item_languages[0]
                          }/${
                            v.item_languages[0] === 'english'
                              ? 'national'
                              : v.state
                          }`}
                          className="py-1 capitalize"
                          style={{ flexBasis: '50%' }}
                        >
                          {v.display_title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </amp-lightbox>
            <div
              role="button"
              tabIndex={0}
              on={`tap:my-lightbox-${language}`}
              className="flex-1 flex flex-col justify-center items-center cursor-pointer"
            >
              <div className={`language-icon ${language}`}></div>
              <div className="text-white text-xs">
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </div>
            </div>
          </div>
        );
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

  const stateData =
    data && data.languages
      ? data.languages[options['localeSubpaths'][language]].find(
          (v) => v.state.toLowerCase() === router.query.state
        )
      : null;

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
          width={null}
          height={null}
        >
          <>
            <div className="p-4 rounded-md" style={{ background: '#f0f0f0' }}>
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
        next-page-hide="1"
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

        <div className="bg-mhbg px-3 font-english border-b">
          <div className="bg-mhbg flex justify-between items-center py-1 overflow-x-auto">
            <div className="flex space-x-6">
              {data.languages
                ? Object.entries(data.languages).map(([language, states]) => {
                    return isAMP ? (
                      getAMPHTML(language, states)
                    ) : (
                      <div
                        key={language}
                        onClick={() => languageNStateSelect(language, states)}
                        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
                      >
                        {/* <div className={`language-icon ${language}`}></div> */}
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
        className={`${className} bg-mhbg px-3  ${header['sub-header']} sticky block md:hidden -top-1 z-10`}
        next-page-hide="1"
        onMouseLeave={containerOut}
      >
        <div className="bg-mhbg lg:mx-auto flex items-center py-1 overflow-x-auto space-x-3 ">
          {data.menu && data.menu.mobile
            ? data.menu.mobile.map((item) => {
                return (
                  <div
                    key={item.list_id + item.ml_title[0].text}
                    className={`${header['header-menu-item']} text-white cursor-pointer whitespace-no-wrap hover:text-red-700`}
                  >
                    <div className=" flex flex-col items-center relative  text-sm">
                      <NavLink
                        href={
                          item.url.split('/').length > 3
                            ? {
                                pathname: '/[state]/[...slug]',
                                query: {
                                  state: item.url.split('/')[2],
                                  slug: item.url.split('/').slice(3).join('/'),
                                },
                              }
                            : {
                                pathname: '/[state]',
                                query: {
                                  state: item.url.split('/')[2],
                                },
                              }
                        }
                        as={item.url}
                        passHref
                        onClick={() => {
                          GoogleTagManager.menuClick(item, 'headermenu');
                        }}
                      >
                        <div>{item.ml_title[0].text.toUpperCase()}</div>
                      </NavLink>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

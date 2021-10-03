import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import React from 'react';

import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useEffect, useState } from 'react';
import {
  applicationConfig,
  accessToken as token,
  languageMap,
} from '@utils/Constants';
import { configStateCodeConverter, stateCodeConverter } from '@utils/Helpers';
import { usePromiseTracker } from 'react-promise-tracker';
import { useRouter } from 'next/router';
import eventBus from '@utils/EventBus';
import StateSelectModal from '@components/common/StateSelectModal';
import FileFetcher from '@services/api/FileFetcher';

const country = 'IN';
export const RTLContext = React.createContext(false);
export const MenuContext = React.createContext([]);
export const ScrollContext = React.createContext(false);


const Layout = ({ children, accessToken, appConfig, pageType }) => {
  const router = useRouter();

  const api = API(APIEnum.Catalog, APIEnum.CatalogList);
  const [data, setData] = useState({
    footer: [],
    header: { menu: { desktop: [], mobile: [] }, languages: null },
  });
  const language = languageMap[router.query.language];
  const state = router.query.state;
  const [showStateModal, setShowStateModal] = useState(null);
  const { promiseInProgress } = usePromiseTracker();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('script-loaded', () => {
      setTimeout(() => {
        setIsScrolled(true);
      }, 200);
    });
  });

  useEffect(() => {
    const populateData = async () => {
      if (!applicationConfig.value) {
        const res = await FileFetcher.getAppConfig({
          query: {
            response: 'r2',
            item_languages: 'en',
            current_version: '1.1',
            region: 'IN',
            version: 'v2',
          },
          isSSR: true,
        });

        appConfig = res.data.data;
        applicationConfig.value = appConfig;
      } else {
        appConfig = applicationConfig.value;
      }

      if (!data.footer.length) {
        const result = await FileFetcher.getFooterDetails({
          query: {
            region: country,
            response: 'r2',
            item_languages: language,
            // env: 'staging',
          },
        });
        const requiredData = result.data.data.params_hash2.footer;
        let languageData = {};
        requiredData.forEach((state) => {
          state.item_languages.forEach((language) => {
            languageData[language] = languageData[language] || [];
            if (state.state) {
              if (state.state === 'tamilnadu') {
                state.state = 'tamil-nadu';
              } else if (state.state === 'orissa') {
                state.state = 'odisha';
              } else if (state.state === 'maharastra') {
                state.state = 'maharashtra';
              } else if (state.state === 'Assam') {
                state.state = 'assam';
              } else if (state.state === 'tripura') {
              }
              state.display_title = state.display_title.replace(' ETV', '');
              if (state.state !== 'tripura') {
                languageData[language].push(state);
              }
            }
          });
        });
        languageData = Object.keys(languageData)
          .sort()
          .reduce((a, c) => ((a[c] = languageData[c]), a), {});

        setData({
          header: {
            ...data.header,
            languages: languageData,
          },
          footer: requiredData,
        });
      }
    };
    populateData();

    eventBus.on('state-selector', (data) => {
      setShowStateModal({ data: data });
    });

    eventBus.on('district-selector', (data) => {
      setShowDistrictModal(data.show);
    });

    return () => {
      eventBus.die('state-selector');
      eventBus.die('district-selector');
    };
  });


  useEffect(() => {
    const populateData = async () => {
      const menu = {
        desktop: [],
        mobile: [],
      };
      const response = await fetch(`/api/menu?url=${router.query.language+"/"+router.query.state}`);
      if (response.ok) {
        const data = await response.json()
        menu.desktop = data;
        menu.mobile = data;

         setData((data) => ({
          ...data,
          header: {
            ...data.header,
            menu: menu,
          },
        }));
      } else {
        let convertedState = configStateCodeConverter(state);
        convertedState =
          language === 'ur' && convertedState !== 'jk' ? 'urdu' : convertedState;
        const urlSuffix = language == 'ur' ? '-urdu' : '';
        const headerResp = await api.CatalogList.getMenuDetails({
          params: {
            suffix: `msite-new-left-menu${
              state !== 'national' ? '-' + state : urlSuffix
            }`,
          },
          query: {
            region: country,
            response: 'r2',
            item_languages: language,
            portal_state: stateCodeConverter(state),
            only_items: 'catalog_list',
            //  env: 'staging',
          },
          isSSR: true,
        });
        if (headerResp && headerResp.data) {
          menu.desktop = headerResp.data.data.catalog_list_items;
          menu.mobile = headerResp.data.data.catalog_list_items;
          await fetch(`/api/menu?url=${router.query.language+"/"+router.query.state}`, {
            method: 'POST',
            body: JSON.stringify({ data: menu.desktop }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          setData((data) => ({
            ...data,
            header: {
              ...data.header,
              menu: menu,
            },
          }));
        }
      }
    };

    if (accessToken && accessToken.mobile.length && router.query.language && router.query.state) {
      token.web = accessToken.web;
      token.mobile = accessToken.mobile;
      populateData();
    }

    if (typeof window !== 'undefined') {
      window['menu'] = data.header;
    }
  }, [language, router.query.state, accessToken]);

  return (
    <>
      {showStateModal ? (
        <StateSelectModal
          data={data ? data.footer : {}}
          callback={showStateModal.data.callback}
          onClose={() => {
            setShowStateModal(null);
          }}
        />
      ) : null}
      <RTLContext.Provider value={language === 'ur' ? true : false}>
        <ScrollContext.Provider value={isScrolled}>
          <MenuContext.Provider value={appConfig}>
            <Header data={data.header} language={language} />
            {promiseInProgress ? (
              <div
                style={{
                  width: '100%',
                  height: '100',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/*  <Loader
                type="ThreeDots"
                color="#2BAD60"
                height="100"
                width="100"
              /> */}
                Loading..
              </div>
            ) : (
              <section
                className={`content ${
                  pageType === 'listing' || pageType === 'navlisting'
                    ? 'bg-gray-200'
                    : 'bg-white'
                }`}
              >
                {children}
              </section>
            )}
            {isScrolled ? (
              <Footer
                data={data.footer}
                menu={data.header ? data.header['menu'] : null}
              />
            ) : null}
          </MenuContext.Provider>
        </ScrollContext.Provider>
      </RTLContext.Provider>
    </>
  );
};

export default Layout;

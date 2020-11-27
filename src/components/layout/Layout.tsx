import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import React from 'react';

import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useContext, useEffect, useState } from 'react';
import { I18nContext } from 'next-i18next';
import { accessToken as token } from '@utils/Constants';
import { configStateCodeConverter } from '@utils/Helpers';

const country = 'IN';
export const RTLContext = React.createContext(false);
export const MenuContext = React.createContext([]);

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}

const Layout = ({ children, accessToken, appConfig }) => {
  const api = API(APIEnum.Catalog, APIEnum.CatalogList);
  const [data, setData] = useState({
    footer: [],
    header: { menu: { desktop: [], mobile: [] }, languages: null },
  });
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(async function handleResize() {
      let doCall = null;
      const isDesktop = window.innerWidth > 768;

      if (isDesktop) {
        if (!(data.header['menu'] && data.header['menu'].desktop.length)) {
          doCall = 'desktop';
        }
      } else {
        if (!(data.header['menu'] && data.header['menu'].mobile.length)) {
          doCall = 'mobile';
        }
      }

      if (doCall) {
        const headerResp = await api.CatalogList.getMenuDetails({
          params: {
            suffix:
              appConfig.params_hash2.config_params[
                isDesktop ? 'web_lists' : 'msite_lists'
              ][configStateCodeConverter(location.pathname.split('/')[2])][
                isDesktop ? 'tabs' : 'left-menu'
              ],
          },
          isSSR: !isDesktop,
          query: {
            region: country,
            response: 'r2',
            item_languages: language,
          },
        });
        if (isDesktop) {
          data.header['menu'].desktop = headerResp.data.data.catalog_list_items;
        } else {
          data.header['menu'].mobile = headerResp.data.data.catalog_list_items;
        }

        setData({
          header: data.header,
          footer: data.footer,
        });
      }
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  useEffect(() => {
    const populateData = async () => {
      const result = await api.Catalog.getFooterDetails({
        query: {
          region: country,
          response: 'r2',
          item_languages: language,
        },
      });
      const requiredData = result.data.data.params_hash2.footer;

      let languageData = {};
      requiredData.forEach((state) => {
        state.item_languages.forEach((language) => {
          languageData[language] = languageData[language] || [];
          state.state && languageData[language].push(state);
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
      const menu = {
        desktop: [],
        mobile: [],
      };

      const isDesktop = window.innerWidth > 768;
      const headerResp = await api.CatalogList.getMenuDetails({
        params: {
          suffix:
            appConfig.params_hash2.config_params[
              isDesktop ? 'web_lists' : 'msite_lists'
            ][configStateCodeConverter(location.pathname.split('/')[2])][
              isDesktop ? 'tabs' : 'left-menu'
            ],
        },
        query: {
          region: country,
          response: 'r2',
          item_languages: language,
        },
        isSSR: !isDesktop,
      });
      if (isDesktop) {
        menu.desktop = headerResp.data.data.catalog_list_items;
      } else {
        menu.mobile = headerResp.data.data.catalog_list_items;
      }

      setData({
        header: {
          languages: languageData,
          menu: menu,
        },
        footer: requiredData,
      });
    };
    if (accessToken.mobile.length) {
      token.web = accessToken.web;
      token.mobile = accessToken.mobile;
      populateData();
    }
    if (typeof window !== 'undefined') {
      window['menu'] = data.header;
    }
  }, [language, accessToken]);

  return (
    <RTLContext.Provider value={language === 'ur' ? true : false}>
      <MenuContext.Provider value={appConfig}>
        <Header data={data.header} />
        <section className="content">{children}</section>
        <Footer
          data={data.footer}
          menu={data.header ? data.header['menu'] : null}
        />
      </MenuContext.Provider>
    </RTLContext.Provider>
  );
};

export default Layout;

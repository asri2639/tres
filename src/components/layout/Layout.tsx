import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import React from 'react';

import API from '@api/API';
import APIEnum from '@api/APIEnum';
import { useContext, useEffect, useState } from 'react';
import { I18nContext } from 'next-i18next';
import { accessToken as token } from '@utils/Constants';

const country = 'IN';
export const RTLContext = React.createContext(false);

const Layout = ({ children, accessToken }) => {
  const api = API(APIEnum.Catalog, APIEnum.CatalogList);
  const [data, setData] = useState({ footer: [], header: {} });
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

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

      const headerResp = await api.CatalogList.getMenuDetails({
        query: {
          region: country,
          response: 'r2',
          item_languages: language,
        },
      });

      setData({
        header: {
          languages: languageData,
          menu: headerResp.data.data.catalog_list_items,
        },
        footer: requiredData,
      });
    };
    if (accessToken.mobile.length) {
      console.log(token);
      token.web = accessToken.web;
      token.mobile = accessToken.mobile;
      populateData();
    }
  }, [language, accessToken]);

  return (
    <RTLContext.Provider value={language === 'ur' ? true : false}>
      <Header data={data.header} />
      <section className="content">{children}</section>
      <Footer
        data={data.footer}
        menu={data.header ? data.header['menu'] : null}
      />
    </RTLContext.Provider>
  );
};

export default Layout;

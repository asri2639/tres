import NavLink from '@components/common/NavLink';
import eventBus from '@utils/EventBus';
import GoogleTagManager from '@utils/GoogleTagManager';
import { configStateCodeConverter, linkInfoGenerator } from '@utils/Helpers';
import getTranslatedValue from '../../../translator'
import { I18nContext, withTranslation } from 'react-i18next';
import SquareCard from './SquareCard';
import DistrictSelectModal from '@components/common/DistrictSelectModal';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import useSWR from 'swr';
import { RTLContext } from '@components/layout/Layout';
import { languageMap } from '@utils/Constants';
import { MenuContext } from '@components/layout/Layout';

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};
const SeeAll = ({ data, article, className, t }) => {
  const isRTL = useContext(RTLContext);
  const router = useRouter();
  const config = useContext(MenuContext);

  const api = API(APIEnum.CatalogList);
  const language = languageMap[router.query.language];

  const [district, setDistrict] = useState(null);

  const [state, setState] = useState(null);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [displayData, setDisplayData] = useState(data);

  const constructPayload = (type, code) => {
    if (type === 'district') {
      return {
        params: {
          state: router.query.state,
        },
        query: {
          response: 'r2',
          item_languages: language,
          region: 'IN',
          dynamic_district: code,
        },
      };
    }

    return {
      params: {
        key:
          config.params_hash2.config_params.carousel_on_selection[
            configStateCodeConverter(code)
          ]['dynamic-list'],
      },
      query: {
        collective_ads_count: 0,
        page: 0,
        page_size: 8,
        version: 'v2',
        response: 'r2',
        item_languages: language,
        portal_state: router.query.state,
      },
    };
  };
  const apiCaller = (...args) => {
    startLoading();
    const [apiEnum, methodName, type, code] = args;
    const payload = constructPayload(type, code);

    return api[apiEnum][methodName](payload)
      .then((res) => {
        return res.data && res.data.data ? res.data.data : [];
      })
      .finally(() => {
        stopLoading();
      });
  };

  const { data: districtFetchedData, error: stateError } = useSWR(
    district
      ? ['CatalogList', 'getDistrictNews', 'district', district.code]
      : null,
    apiCaller,
    {
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  const { data: stateFetchedData, error } = useSWR(
    state ? ['CatalogList', 'getListing', 'state', state] : null,

    apiCaller,
    {
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (districtFetchedData && district) {
      setDisplayData(districtFetchedData);
    } else if (stateFetchedData && state) {
      setDisplayData(stateFetchedData);
    }
  }, [districtFetchedData, stateFetchedData]);

  const isEven = data.catalog_list_items.length % 2 === 0;
  const scope = {
    dropdown: false,
  };
  if (data.filter_type) {
    scope.dropdown = true;
    scope.text = 'select';
    switch (data.filter_type) {
      case 'select_cities':
        scope.type = 'city';
        break;
      case 'select_state':
        scope.type = 'state';
        break;
      case 'see_all':
        scope.dropdown = false;
		
        scope.text = data.filter_type;
        scope.see_all = true;
        scope.link_info = linkInfoGenerator(
          data.url.startsWith('/') ? data.url.slice(1) : data.url,
          router.query.state
        );
        break;
      default:
        scope.type = 'district';
        break;
    }
    scope.input_text = data[`dynamic_${scope.type}_name`]
      ? data[`dynamic_${scope.type}_name`][0].text
          .split(' ')
          .map(capitalize)
          .join(' ')
      : '';
  }

  const selectorModal = (scope) => {
    switch (scope.type) {
      case 'state':
        eventBus.dispatch(`${scope.type}-selector`, {
          show: true,
        /*   callback: (path) => {
            startLoading();
            setState(path.split('/').slice(-1)[0]);
          }, */
        });
        break;
      case 'district':
        setShowDistrictModal(true);
        break;
    }
  };

  const getSeeAllData = (displayData) => {
    let url = displayData.url.startsWith('/')
      ? displayData.url.slice(1)
      : displayData.url;

    if (url.endsWith('/district')) {
      url =
        url.split('/district')[0] + '/state/' + displayData.dynamic_district;
    }
    return {
      text: getTranslatedValue('see_all',language),
      url: url,
      thumbnails: displayData.catalog_list_items[3].thumbnails,
    };
  };

  return (
    <>
      {showDistrictModal ? (
        <DistrictSelectModal
          state={router.query.state}
          onClose={() => {
            setShowDistrictModal(false);
          }}
          onDistrictSelect={(district) => {
            startLoading();
            setDistrict(district);
            setShowDistrictModal(false);
          }}
        />
      ) : null}
      <div
        className={`my-2 flex w-full justify-between mb-1 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="text-base md:text-lg">{data.ml_title[0].text}</div>

        {scope.dropdown ? (
          <div className="flex items-center ">
            <div className="pr-2 text-sm">{getTranslatedValue(`${scope.text}`,language)}</div>
            <div
              className="flex items-center text-sm border border-gray-600 px-2 py-0 cursor-pointer"
              onClick={() => {
                selectorModal(scope);
              }}
            >
              <div>
                {district ? district.ml_title[0].text : scope.input_text}
              </div>
              <span className="pl-1 caret text-gray-700 "> &#9660;</span>
            </div>
          </div>
        ) : null}

        {scope.see_all ? (
          <NavLink
            className={`text-sm`}
            href={scope.link_info.href}
            as={scope.link_info.as}
            passHref
            onClick={() => {
              GoogleTagManager.articleClick(article);
            }}
          >
            {getTranslatedValue(scope.text,language)}
          </NavLink>
        ) : null}
      </div>

      <div className="w-full flex flex-wrap">
        {displayData.catalog_list_items
          .slice(0, isEven ? 2 : 3)
          .map((item, ind) => {
            return (
              <div className="w-1/2 p-1 " key={item.friendly_id}>
                <SquareCard className="bg-white" article={item} />
              </div>
            );
          })}
        {!isEven ? (
          <div className="w-1/2 p-1" key={displayData.friendly_id + 'see_all'}>
            <SquareCard
              className="bg-white w-full h-full flex justify-center items-center"
              data={getSeeAllData(displayData)}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default withTranslation('common')(SeeAll);

import NavLink from '@components/common/NavLink';
import eventBus from '@utils/EventBus';
import GoogleTagManager from '@utils/GoogleTagManager';
import { linkInfoGenerator } from '@utils/Helpers';
import { I18nContext, withTranslation } from 'react-i18next';
import SquareCard from './SquareCard';
import DistrictSelectModal from '@components/common/DistrictSelectModal';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import useSWR from 'swr';

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};
const SeeAll = ({ data, article, className, t }) => {
  const api = API(APIEnum.CatalogList);
  const {
    i18n: { language, options },
  } = useContext(I18nContext);
  const router = useRouter();

  const [district, setDistrict] = useState(null);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [displayData, setDisplayData] = useState(data);

  const apiCaller = (...args) => {
    startLoading();
    const [apiEnum, methodName, district] = args;

    return api[apiEnum][methodName]({
      params: {
        state: router.query.state,
      },
      query: {
        response: 'r2',
        item_languages: language,
        region: 'IN',
        dynamic_district: district.code,
      },
    })
      .then((res) => {
        return res.data && res.data.data ? res.data.data : [];
      })
      .finally(() => {
        stopLoading();
      });
  };

  const { data: districtFetchedData, error } = useSWR(
    district ? ['CatalogList', 'getDistrictNews', district] : null,
    apiCaller,
    {
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (districtFetchedData) {
      setDisplayData(districtFetchedData);
    }
  }, [districtFetchedData]);

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
          data.url.startsWith('/') ? data.url.slice(1) : data.url
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
        });
        break;
      case 'district':
        setShowDistrictModal(true);
        break;
    }
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
      <div className="my-2 flex w-full justify-between mb-1">
        <div className="text-base md:text-lg">{data.ml_title[0].text}</div>

        {scope.dropdown ? (
          <div className="flex items-center ">
            <div className="pr-2 text-sm">{t(`${scope.text}`)}</div>
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
            {t(scope.text)}
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
              data={{
                text: t('see_all'),
                url: displayData.url.startsWith('/')
                  ? displayData.url.slice(1)
                  : displayData.url,
                thumbnails: displayData.catalog_list_items[3].thumbnails,
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default withTranslation('common')(SeeAll);

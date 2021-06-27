import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { RTLContext } from '@components/layout/Layout';
import cacheData from 'memory-cache';
import eventBus from '@utils/EventBus';
import ListingStateSelectModal from '@components/common/ListingStateSelectModal';
import useTranslator from '@hooks/useTranslator';

const MobileMainArticles = ({ list, className, dropdown }) => {
  const isRTL = useContext(RTLContext);
  const [showStateModal, setShowStateModal] = useState(false);
  const router = useRouter();
   const { t, appLanguage } = useTranslator();
  const checkURL = (url, subUrl) => {
    return url.substring(url.length - subUrl.length) == subUrl;
  };

  const selectorModal = () => {
    eventBus.dispatch(`state-selector`, {
      show: true,
      callback: (path) => {
        const newState = path.split('/').slice(-1)[0];
      },
    });
  };

  return (
    <>
      {showStateModal ? (
        <ListingStateSelectModal
          data={dropdown.data}
          state={router.query.state}
          onClose={() => {
            setShowStateModal(false);
          }}
          onStateSelect={(district) => {
            setShowStateModal(false);

            if (dropdown.title !== district.ml_title[0].text) {
              let url = '';

              if (router.query.language === 'english') {
                url = '/english/national/state';
                router.push(url + '/' + district.friendly_id);
              } else {
                url =
                  '/' +
                  router.query.language +
                  '/' +
                  district.friendly_id +
                  '/state';
                router.push(url);
              }
            }
          }}
        />
      ) : null}
      {dropdown ? (
        dropdown.data && dropdown.data.length > 1 ? (
          <div className="flex items-center float-right">
            <div className="pr-2 text-sm">{t('select')}</div>
            <div
              className="flex items-center capitalize text-sm border border-gray-600 px-2 py-0 cursor-pointer"
              onClick={() => {
                setShowStateModal(true);
              }}
            >
              <div>{dropdown.title}</div>
              <span className="pl-1 caret text-gray-700 "> &#9660;</span>
            </div>
          </div>
        ) : null
      ) : null}

      <LargeSquareCard
        className="w-full bg-white mb-2"
        article={list[0]}
        styleObj={{ height: '30vh' }}
        main={true}
      />
      <div
        className={`w-full flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <SquareCard
          className="w-1/2 bg-white"
          article={list[1]}
          styleObj={{ height: '17vh' }}
          main={true}
        />

        <SquareCard
          className="w-1/2 bg-white"
          article={list[2]}
          styleObj={{ height: '17vh' }}
          main={true}
        />
      </div>
    </>
  );
};

export default MobileMainArticles;

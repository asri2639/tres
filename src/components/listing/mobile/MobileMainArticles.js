import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { RTLContext } from '@components/layout/Layout';
import cacheData from 'memory-cache';
import eventBus from '@utils/EventBus';

import useTranslator from '@hooks/useTranslator';

const MobileMainArticles = ({ list, className, dropdown }) => {
  const isRTL = useContext(RTLContext);

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

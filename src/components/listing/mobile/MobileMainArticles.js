import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';
import { useContext } from 'react';
import { RTLContext } from '@components/layout/Layout';

const MobileMainArticles = ({ list, className }) => {
  const isRTL = useContext(RTLContext);

  return (
    <>
      <LargeSquareCard
        className="w-full bg-white mb-2"
        article={list[0]}
        styleObj={{ height: '30vh' }}
      />
      <div
        className={`w-full flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <SquareCard
          className="w-1/2 bg-white"
          article={list[1]}
          styleObj={{ height: '17vh' }}
        />

        <SquareCard
          className="w-1/2 bg-white"
          article={list[2]}
          styleObj={{ height: '17vh' }}
        />
      </div>
    </>
  );
};

export default MobileMainArticles;

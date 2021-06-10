import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';

const MainArticles = ({ list, className }) => {
  return (
    <>
      <div className="w-2/3">
        <LargeSquareCard article={list[0]} className="bg-white" />
      </div>
      <div
        className="flex w-1/3 flex-col justify-between space-y-2"
        style={{ height: '500px' }}
      >
        <SquareCard
          className="w-full bg-white"
          article={list[1]}
          lineClamp="2"
          imgHeight={"80%"}
          style={{ height: '49%' }}
        />
        <SquareCard
          className="w-full bg-white"
          article={list[2]}
          lineClamp="2"
          imgHeight={"80%"}
          style={{ height: '49%' }}
        />
      </div>
    </>
  );
};

export default MainArticles;

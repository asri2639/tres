import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';

const MainArticles = ({ list, className }) => {
  return (
    <>
      {/*   <div className="w-1/2"  style={{ height: '330px' }}>
        <LargeSquareCard article={list[0]} className="bg-white" />
      </div> */}
      <div
        className="flex w-full justify-between space-x-4"
        style={{ margin: '5px' }}
      >
        <SquareCard
          className="w-1/3 bg-white"
          article={list[0]}
          lineClamp="2"
        />
        <SquareCard
          className="w-1/3 bg-white"
          article={list[1]}
          lineClamp="2"
        />
        <SquareCard
          className="w-1/3 bg-white"
          article={list[2]}
          lineClamp="2"
        />
      </div>
    </>
  );
};

export default MainArticles;

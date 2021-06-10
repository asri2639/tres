import SquareCard from '@components/listing/mobile/SquareCard';
import LargeSquareCard from '@components/listing/mobile/LargeSquareCard';

const MobileMainArticles = ({ list, className }) => {
  return (
    <>
      <LargeSquareCard
        className="w-full bg-white mb-2"
        article={list[0]}
        noDescription={true}
      />
      <div className="w-full flex space-x-2">
        <SquareCard className="w-1/2 bg-white" article={list[1]} />

        <SquareCard className="w-1/2 bg-white" article={list[2]} />
      </div>
    </>
  );
};

export default MobileMainArticles;

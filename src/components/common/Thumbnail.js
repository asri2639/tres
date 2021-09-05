import Image from 'next/image';
import { AMPContext } from '@pages/_app';
import { useContext, useState } from 'react';

const Thumbnail = ({ thumbnail, className, type, lazy }) => {
  const isAMP = useContext(AMPContext);
  const [state, setState] = useState({
    src: thumbnail.url,
    errored: false,
  });

  return (type === 'breaking_news' || type === 'news') && !state.src ? (
    <Image
      priority={!((lazy === undefined || lazy === true) && !isAMP)}
      layout="fill"
      src={`/assets/images/${'breakingplate'}.png`}
      className="breaking_news"
      alt="Breaking News"
    />
  ) : (
    <>
      <Image
        priority={!((lazy === undefined || lazy === true) && !isAMP)}
        layout="fill"
        src={state.src}
        className={`${className} ${type}`}
        alt={thumbnail.alt_tags}
      />
    </>
  );
};

export default Thumbnail;

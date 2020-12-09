import { useState } from 'react';

const Thumbnail = ({ thumbnail, className, type }) => {
  console.log(thumbnail);
  const [state, setState] = useState({
    src: thumbnail.url,
    errored: false,
  });
  const onError = () => {
    if (!state.errored) {
      setState({
        src: '/assets/images/placeholder.png',
        errored: true,
      });
    }
  };
  return type === 'breaking_news' && !state.src ? (
    <div className={`${className} breaking_news`}></div>
  ) : (
    <img
      src={state.src}
      onError={onError}
      className={`${className} ${type}`}
      alt={thumbnail.alt_tags}
    />
  );
};

export default Thumbnail;

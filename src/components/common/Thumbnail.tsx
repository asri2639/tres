import { useState } from 'react';

const Thumbnail = ({ thumbnail, className }) => {
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
  return (
    <img
      src={state.src}
      onError={onError}
      className={className}
      alt={thumbnail.alt_tags}
    />
  );
};

export default Thumbnail;

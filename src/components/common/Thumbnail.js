import { useState } from 'react';

const Thumbnail = ({
  thumbnail,
  className,
  type,
  creditSize = '',
  children,
  lazy,
  styleObj,
}) => {
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

  return (type === 'breaking_news' || type === 'news') && !state.src ? (
    <img
      loading={lazy === undefined || lazy === true ? 'lazy' : ''}
      className="breaking_news"
      alt="Breaking News"
      src="/assets/images/placeholder.png"
      data-src="/assets/images/breakingplate.jpg"
      src={`/assets/images/${
        lazy === undefined || lazy === true ? 'placeholder' : 'breakingplate'
      }.png`}
    />
  ) : (
    <>
      <img
        loading={lazy === undefined || lazy === true ? 'lazy' : ''}
        data-src={state.src}
        src={
          lazy === undefined || lazy === true
            ? '/assets/images/placeholder.png'
            : state.src
        }
        onError={onError}
        className={`${className} ${type}`}
        alt={thumbnail.alt_tags}
        style={styleObj}
      />
      {thumbnail.credit ? (
        <div className={`image-credit ${creditSize}`}>{thumbnail.credit}</div>
      ) : null}
    </>
  );
};

export default Thumbnail;

import { useEffect, useRef, useState } from 'react';

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
  const imgEl = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!!window.IntersectionObserver) {
        let observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '0px 0px 10px 0px' }
        );
        imgEl && observer.observe(imgEl.current);
      } else {
        imgEl && (imgEl.current.src = imgEl.current.dataset.src);
      }
    }
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
      ref={imgEl}
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
        ref={imgEl}
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

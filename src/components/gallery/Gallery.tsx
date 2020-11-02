import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AdContainer from '@components/article/AdContainer';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import gallery from './Gallery.module.scss';

const Gallery = ({
  contentId,
  data,
  className,
  rhs,
  nextGallery,
  scrollToNextGallery,
  webUrl,
  scrollPosition,
  count,
}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      const main = data[0];
      const contentIdFromUrl = window.location.href.split('/').slice(-1)[0];
      if (contentIdFromUrl === contentId) {
        return;
      } else {
        if (ref && ref.current) {
          const elBoundary = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (elBoundary.top > 0 && elBoundary.top < windowHeight) {
            document.title = main.title;
            window.history.pushState(
              { id: main.title },
              main.title,
              '/' + webUrl
            );

            var event = new CustomEvent<string>('newurl', {
              detail: contentId,
            });

            window.dispatchEvent(event);
            setTimeout(() => {
              /*   router.push({
                  pathname: '/[state]/[...slug]',
                  query: {
                    state,
                    slug: urlParts.slice(2)
                  },
                },
                  '/' + data.web_url, { shallow: true }) */
            }, 2000);
          }
        }
      }
      //  router.push(data.web_url, undefined, { shallow: true })
    }
  }, [inView, contentId, rhs]);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  const dateFormatter = (uts) => {
    const date = new Date(uts * 1000);
    return (
      date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      }) + ' IST'
    );
  };
  let filteredRHS = [];
  if (rhs) {
    filteredRHS = rhs.filter((v) => {
      return (
        v.layout_type.indexOf('ad_unit') >= 0 ||
        (v.layout_type.indexOf('ad_unit') === -1 &&
          v.catalog_list_items.length > 0)
      );
    });
  }
  return (
    <div
      data-content-id={contentId}
      className="article relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10"
    >
      <MediaContextProvider>
        <Media
          greaterThan="xs"
          className="lg-social hidden absolute md:flex flex-col justify-around pt-2 h-48 "
        >
          <SocialMedia data={data[0]} />
        </Media>
      </MediaContextProvider>

      <div className="md:w-8/12">
        <div
          className={`${className || ''} lg:container lg:mx-auto px-3 md:px-0 `}
        >
          <div className="flex flex-col md:flex-col-reverse md:mb-4">
            <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
              <h1
                ref={setRefs}
                className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold"
              >
                {data[0].display_title}
              </h1>
              {data[0].publish_date_uts ? (
                <div className="text-sm text-gray-600 md:text-black">
                  {data[0].publish_date_uts
                    ? `Published on: ${dateFormatter(data[0].publish_date_uts)}`
                    : ''}
                  <span className="hidden md:inline-block">
                    {data[0].publish_date_uts && data[0].update_date_uts
                      ? `  |  `
                      : ''}
                  </span>
                  <br className="md:hidden" />
                  {data[0].update_date_uts
                    ? `Updated on: ${dateFormatter(data[0].update_date_uts)}`
                    : ''}
                </div>
              ) : null}
            </div>

            <MediaContextProvider>
              <Media at="xs" className="flex justify-between mx-auto w-56 mb-2">
                <SocialMedia data={data[0]} />
              </Media>
            </MediaContextProvider>
          </div>

          <div className="space-y-5 p-3 pt-0">
            {data.map((image) => {
              if (
                image.layout_type &&
                image.layout_type.indexOf('ad_unit') >= 0 &&
                image.ad_url.length > 0
              ) {
                const [width, height] =
                  image.layout_type === 'ad_unit_sqaure_gallery'
                    ? [300, 250]
                    : [550, 250];
                return (
                  <iframe
                    className="mx-auto"
                    key={image.ad_unit_id}
                    width={width + 50}
                    height={height + 50}
                    src={image.ad_url}
                  />
                );
              } else {
                return (
                  <div key={image.order_no} className="relative">
                    <LazyLoadImage
                      className="rounded-lg"
                      alt={image.description || image.title}
                      placeholderSrc="/assets/images/placeholder.png"
                      scrollPosition={scrollPosition}
                      src={image.thumbnails.l_large.url}
                    ></LazyLoadImage>
                    <div className="text-md">{image.title}</div>
                    <div className={`${gallery.counter}`}>
                      <span>{image.order_no}</span>/ {count}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <MediaContextProvider>
        <Media at="xs">
          <div className="flex flex-col py-4 px-5  bg-mbg text-white cursor-pointer">
            <div className="flex items-center mb-1">
              <img
                alt="ETV"
                className="w-6"
                src="/assets/images/nextarticle.png"
              />
              <span className="text-lg font-thin pl-2">Next Gallery</span>
            </div>
            <div
              className="text-gray-500 tracking-tighter pl-2"
              onClick={scrollToNextGallery}
            >
              {nextGallery && nextGallery.ml_title
                ? nextGallery.ml_title[0].text
                : ''}
            </div>
          </div>
        </Media>
        <Media greaterThan="xs" className="md:block md:w-4/12">
          <div className="w-full flex flex-col items-center space-y-6 pt-4 pb-4">
            {!rhs ? 'Loading...' : <AdContainer data={filteredRHS} />}
          </div>
        </Media>
      </MediaContextProvider>
    </div>
  );
};

export default trackWindowScroll(Gallery);

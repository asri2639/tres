import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AdContainer from '@components/article/AdContainer';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import gallery from './Gallery.module.scss';
import GoogleTagManager from '@utils/GoogleTagManager';
import ComScore from '@utils/ComScore';
import { RTLContext } from '@components/layout/Layout';
import MobileNextArticle from '@components/article/MobileNextArticle';
import Sticky from 'wil-react-sticky';
import { dateFormatter } from '@utils/Helpers';
import { AMPContext } from '@pages/_app';
import BBCHeader from '@components/common/BBCHeader';
import React from 'react';
import MobileAd from '@components/article/MobileAd';
import FirstAd from '@components/article/FirstAd';

const Gallery = ({
  contentId,
  data,
  className,
  rhs,
  desktop,
  nextGallery,
  scrollToNextGallery,
  webUrl,
  scrollPosition,
  count,
  viewed,
  related,
  ads,
  index,
}) => {
  const isAMP = useContext(AMPContext);
  const router = useRouter();
  const isRTL = useContext(RTLContext);

  const [source, setSource] = useState(null);

  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });

  const ref = useCallback(
    (node) => {
      if (node !== null && node) {
        inViewRef(node);
        ref.current = node;
      }
    },
    [inViewRef]
  );

  /*   const {ref, inView, entry} = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });
 */
  useEffect(() => {
    if (data.source && data.source.indexOf('bbc_') === 0) {
      setSource(data.source);
    }
    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      // updateViewed(viewed);
      GoogleTagManager.articleViewScroll(data[0], { galleryArticle: true });

      if (viewed.length === 1) {
        ComScore.pageView();
      } else {
        ComScore.nextPageView();
      }
    }
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
              '/' + webUrl + location.search
            );

            var event = new CustomEvent('newurl', {
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
    }

    if (typeof window !== 'undefined' && !isAMP) {
      const isDesktop = window.innerWidth >= 768;
      const divStyle = isDesktop
        ? `width: 728px; height: 90px;`
        : `width: 300px; height: 250px;`;
      const slotArr = isDesktop ? '[728, 90]' : '[300, 250]';
      let adHTML = null;
      let adConf = null;
      if (data.ad_conf && Array.isArray(data.ad_conf) && data.ad_conf[0]) {
        if (data.ad_conf[0].web_msite && data.ad_conf[0].web_msite) {
          adConf = data.ad_conf[0].web_msite[0];
        } else {
          if (isDesktop) {
            adConf = data.ad_conf[0].web ? data.ad_conf[0].web[0] : null;
          } else {
            adConf = data.ad_conf[0].msite ? data.ad_conf[0].msite[0] : null;
          }
        }
      }

      const id = adConf ? adConf.gpt_id : null;
      const ad_id = adConf ? adConf.ad_unit_id : null;

      if (id && ad_id) {
        adHTML = `<div id='${id}' style='${divStyle}'></div>`;
        const el = document.querySelector(
          `[data-content-id="${contentId}"] .EtvadsSection`
        );

        if (el && el.querySelector('#adsContainer')) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          var code = `
          if(window.googletag && googletag.apiReady) {
            googletag.cmd.push(function() {
              googletag.pubads().collapseEmptyDivs();
              googletag.defineSlot('${ad_id}', ${slotArr}, '${id}').addService(googletag.pubads()); 
              googletag.enableServices(); 
            }); 
            googletag.cmd.push(function() { 
              googletag.display('${id}'); 
            });
        }`;
          s.appendChild(document.createTextNode(code));
          // document.body.appendChild(s);
          el.innerHTML = adHTML;
          el.querySelector('#' + id).appendChild(s);
        }
      }
    }

    if (isAMP) {
      let adConf = null;
      if (data.ad_conf && Array.isArray(data.ad_conf) && data.ad_conf[0]) {
        if (data.ad_conf[0].web_msite && data.ad_conf[0].web_msite) {
          adConf = data.ad_conf[0].web_msite[0];
        } else {
          adConf = data.ad_conf[0].msite ? data.ad_conf[0].msite[0] : null;
        }
      }

      const id = adConf ? adConf.gpt_id : null;
      const ad_id = adConf ? adConf.ad_unit_id : null;

      const parsedHtml = stringToHTML(html);
      if (ad_id) {
        const el = parsedHtml.querySelector(`.EtvadsSection`);
        if (el) {
          el.innerHTML = `<amp-ad width=300 height=250
                  type="doubleclick"
                  data-slot="${ad_id}">
                <div placeholder></div>
                <div fallback></div>
              </amp-ad>`;
        }
      }

      setAmpHtml(parsedHtml.innerHTML);
    }
  }, [inView, contentId]);

  return (
    <div
      data-content-id={contentId}
      className={`article relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10 ${
        isRTL ? 'md:flex-row-reverse rtl' : ''
      }`}
    >
      <MediaContextProvider>
        <Media
          greaterThan="xs"
          className={`lg-social hidden absolute md:flex flex-col justify-around pt-2 h-56 ${
            isRTL ? 'rtl-social' : ''
          }`}
        >
          <SocialMedia data={data[0]} />
        </Media>
      </MediaContextProvider>

      <div className="md:w-8/12">
        <Sticky
          containerSelectorFocus={`.article[data-content-id="${contentId}"]`}
          stickyEnableRange={[768, Infinity]}
          offsetTop={60}
        >
          <div
            className={`${
              className || ''
            } actual-content lg:container lg:mx-auto px-3 md:px-0 `}
          >
        {/*     {index > 0 && ads
              ?  <div className="pt-3">
               <MobileAd adData={ads ? ads[index * 2 + 1] : null} /> 
              </div> 
              : null} */}

            <MediaContextProvider>
              <Media at="xs">
                {index === 0 ? (
                  <FirstAd adData={ads ? ads[index * 2 + 1] : null} />
                ) : null}

                <h1 ref={ref} className="leading-tight text-xl font-bold p-2">
                  {data[0].display_title}{' '}
                </h1>

                <div className="px-2 text-sm text-gray-600 md:text-black always-english">
                  {data[0].publish_date_uts ? (
                    <div className="text-sm text-gray-600 md:text-black always-english">
                      {data[0].publish_date_uts
                        ? `Published on: ${dateFormatter(
                            data[0].publish_date_uts,
                            isAMP
                          )}`
                        : ''}
                      <span className="hidden md:inline-block">
                        {data[0].publish_date_uts && data[0].update_date_uts
                          ? `  |  `
                          : ''}
                      </span>
                      <br className="md:hidden" />
                      {data[0].update_date_uts
                        ? `Updated on: ${dateFormatter(
                            data[0].update_date_uts,
                            isAMP
                          )}`
                        : ''}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between px-2 w-56 mb-2">
                  <SocialMedia data={data} />
                </div>
              </Media>
            </MediaContextProvider>

            <BBCHeader source={source} />

            <div className="flex flex-col md:flex-col-reverse md:mb-4">
              <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                <MediaContextProvider>
                  <Media greaterThan="xs">
                    <h1
                      ref={ref}
                      className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold"
                    >
                      {data[0].display_title}
                    </h1>
                    {data[0].publish_date_uts ? (
                      <div className="text-sm text-gray-600 md:text-black always-english">
                        {data[0].publish_date_uts
                          ? `Published on: ${dateFormatter(
                              data[0].publish_date_uts,
                              isAMP
                            )}`
                          : ''}
                        <span className="hidden md:inline-block">
                          {data[0].publish_date_uts && data[0].update_date_uts
                            ? `  |  `
                            : ''}
                        </span>
                        <br className="md:hidden" />
                        {data[0].update_date_uts
                          ? `Updated on: ${dateFormatter(
                              data[0].update_date_uts,
                              isAMP
                            )}`
                          : ''}
                      </div>
                    ) : null}
                  </Media>
                </MediaContextProvider>
              </div>
            </div>

            <div className="space-y-5 p-3 pt-0">
              {data.map((image, ind) => {
                if (
                  image.layout_type &&
                  image.layout_type.indexOf('ad_unit') >= 0 &&
                  image.ad_url.length > 0
                ) {
                  if (isAMP) {
                    return (
                      <>
                        <amp-ad
                          width="300"
                          height="250"
                          type="doubleclick"
                          data-slot={image.ad_unit_id}
                        >
                          <div placeholder="true"></div>
                          <div fallback></div>
                        </amp-ad>
                      </>
                    );
                  } else {
                    const [width, height] =
                      image.layout_type === 'ad_unit_sqaure_gallery'
                        ? [300, 250]
                        : [550, 250];
                    return (
                      <iframe
                        className="mx-auto"
                        key={image.ad_unit_id + ' ' + ind}
                        width={width + 50}
                        height={height + 50}
                        src={image.ad_url}
                      />
                    );
                  }
                } else {
                  return (
                    <React.Fragment key={image.order_no + ' 1.' + ind}>
                      <div className="relative">
                        {isAMP ? (
                          <img
                            loading={ind > 2 ? 'lazy' : ''}
                            className="rounded-lg"
                            alt={image.description || image.title}
                            src={image.thumbnails.l_large.url}
                          />
                        ) : (
                          <LazyLoadImage
                            className="rounded-lg"
                            alt={image.description || image.title}
                            placeholderSrc="/assets/images/placeholder.png"
                            scrollPosition={scrollPosition}
                            src={image.thumbnails.l_large.url}
                          ></LazyLoadImage>
                        )}
                        <div className={`${gallery.counter}`}>
                          <span>{image.order_no}</span>/ {count}
                        </div>
                      </div>
                      <div className="text-md">
                        {image.description || image.title}
                      </div>
                    </React.Fragment>
                  );
                }
              })}
            </div>

            {source ? (
              <MediaContextProvider>
                <Media greaterThan="xs">
                  <div className="bbc-tag">
                    <img src="/assets/bbc/bbc_footer_22px.png" />
                  </div>
                </Media>
              </MediaContextProvider>
            ) : null}

            <InView
              as="div"
              className="pseudo quarter"
              triggerOnce={true}
              onChange={(inView, entry) => {
                if (inView) {
                  GoogleTagManager.articleViewScroll(
                    data,
                    { galleryArticle: true },
                    25
                  );
                }
              }}
            >
              <span></span>
            </InView>
            <InView
              as="div"
              className="pseudo half"
              triggerOnce={true}
              onChange={(inView, entry) => {
                if (inView) {
                  GoogleTagManager.articleViewScroll(
                    data,
                    { galleryArticle: true },
                    50
                  );
                }
              }}
            >
              <span></span>
            </InView>

            <InView
              as="div"
              className="pseudo three-quarter"
              triggerOnce={true}
              onChange={(inView, entry) => {
                if (inView) {
                  GoogleTagManager.articleViewScroll(
                    data,
                    { galleryArticle: true },
                    75
                  );
                }
              }}
            >
              <span></span>
            </InView>

            <InView
              as="div"
              className="pseudo full"
              triggerOnce={true}
              onChange={(inView, entry) => {
                if (inView) {
                  GoogleTagManager.articleViewScroll(
                    data,
                    { galleryArticle: true },
                    100
                  );
                }
              }}
            >
              <span></span>
            </InView>

            {/*   <MobileAd adData={ads ? ads[index * 2 + 2] : null} /> */}
          </div>
        </Sticky>
      </div>

      <MediaContextProvider>
        <Media at="xs">
          <MobileNextArticle
            label={'next_gallery'}
            scrollToNextArticle={scrollToNextGallery}
            nextArticle={nextGallery}
            data={data}
            related={related}
            showBbc={!!source}
          ></MobileNextArticle>
        </Media>
        <Media greaterThan="xs" className="md:block md:w-4/12">
          <div className="w-full flex flex-col items-center space-y-6 pt-4 pb-4">
            {!rhs ? 'Loading...' : <AdContainer data={rhs} index={index} />}
          </div>
        </Media>
      </MediaContextProvider>
    </div>
  );
};

export default trackWindowScroll(Gallery);

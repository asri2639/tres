import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AdContainer from '@components/article/AdContainer';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import video from './Video.module.scss';
import GoogleTagManager from '@utils/GoogleTagManager';
import ComScore from '@utils/ComScore';
import { RTLContext } from '@components/layout/Layout';
import MobileNextArticle from '@components/article/MobileNextArticle';
import Sticky from 'wil-react-sticky';
import { dateFormatter } from '@utils/Helpers';
import { AMPContext } from '@pages/_app';
import BBCHeader from '@components/common/BBCHeader';

const Video = ({
  contentId,
  data,
  className,
  rhs,
  desktop,
  nextVideo,
  scrollToNextVideo,
  iframeSource,
  viewed,
  related,
}) => {
  const isAMP = useContext(AMPContext);

  const isRTL = useContext(RTLContext);
  const [source, setSource] = useState(null);
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (data.source && data.source.indexOf('bbc_') === 0) {
      setSource(data.source);
    }
    if (inView) {
      const urlParts = data.web_url.split('/');
      const state = urlParts[1];
      const contentIdFromUrl = window.location.href.split('/').slice(-1)[0];
      if (contentIdFromUrl === contentId) {
        return;
      } else {
        if (ref && ref.current) {
          const elBoundary = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (elBoundary.top > 0 && elBoundary.top < windowHeight) {
            document.title = data.title;
            window.history.pushState(
              { id: data.title },
              data.title,
              '/' + data.web_url + location.search
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

    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      GoogleTagManager.articleViewScroll(data, { videoArticle: true });
      if (viewed.length === 1) {
        ComScore.pageView();
      } else {
        ComScore.nextPageView();
      }
    }

    if (typeof window !== 'undefined' && !isAMP) {
      const isDesktop = window.innerWidth >= 768;
      const divStyle = isDesktop
        ? `width: 728px; height: 90px;`
        : `width: 300px; height: 250px;`;
      const slotArr = isDesktop ? '[728, 90]' : '[300, 250]';
      let adHTML = null;
      let id, ad_id;
      if (isDesktop) {
        if (rhs && desktop) {
          id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].gpt_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
          ad_id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].ad_unit_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
        }
      } else {
        if (desktop) {
          id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].gpt_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
          ad_id =
            desktop && desktop.ad_conf && desktop.ad_conf.length > 0
              ? desktop.ad_conf[0].ad_unit_id
              : data.ad_conf.length && !!data.ad_conf[0]
              ? data.ad_conf[0].gpt_id
              : null;
        }
      }
      if (id) {
        adHTML = `<div id='${id + contentId}' style='${divStyle}'></div>`;
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
              googletag.defineSlot('${ad_id}', ${slotArr}, '${
            id + contentId
          }').addService(googletag.pubads()); 
              googletag.enableServices(); 
            }); 
            googletag.cmd.push(function() { 
              googletag.display('${id + contentId}'); 
            });
        }`;
          s.appendChild(document.createTextNode(code));
          // document.body.appendChild(s);
          el.innerHTML = adHTML;
          el.querySelector('#' + id + contentId).appendChild(s);
        }
      }
    }
  }, [inView, contentId, rhs, desktop, iframeSource]);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

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
          <SocialMedia data={data} />
        </Media>
      </MediaContextProvider>

      <div className={`${video.container} md:w-8/12  md:h-full`}>
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
            <BBCHeader source={source} />
            <div className="flex flex-col md:flex-col-reverse md:mb-1">
              <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                <h1
                  ref={setRefs}
                  className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold"
                >
                  {data.title}
                </h1>
                {data.publish_date_uts ? (
                  <div className="text-sm text-gray-600 md:text-black always-english">
                    {data.publish_date_uts
                      ? `Published on: ${dateFormatter(
                          data.publish_date_uts,
                          isAMP
                        )}`
                      : ''}
                    <span className="hidden md:inline-block">
                      {data.publish_date_uts && data.update_date_uts
                        ? `  |  `
                        : ''}
                    </span>
                    <br className="md:hidden" />
                    {data.update_date_uts
                      ? `Updated on: ${dateFormatter(
                          data.update_date_uts,
                          isAMP
                        )}`
                      : ''}
                  </div>
                ) : null}
              </div>

              <MediaContextProvider>
                <Media
                  at="xs"
                  className="flex justify-between mx-auto w-56 mb-2"
                >
                  <SocialMedia data={data} />
                </Media>
              </MediaContextProvider>
            </div>

            <div className={`${video.player}`}>
              {iframeSource ? (
                isAMP ? (
                  <amp-video-iframe
                    layout="responsive"
                    width="16"
                    height="9"
                    src={iframeSource}
                    poster="https://react.etvbharat.com/assets/images/placeholder.png"
                  ></amp-video-iframe>
                ) : (
                  <iframe src={iframeSource}></iframe>
                )
              ) : (
                <img
                  className="w-full rounded-md -mt-10"
                  src="/assets/images/placeholder.png"
                  alt="placeholder image"
                />
              )}
            </div>

            <div className="px-2 py-4 text-sm lg:text-base text-justify lg:text-left">
              {data.description}
            </div>

            <div className="EtvadsSection">
              <div id="adsContainer"></div>
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
                    { videoArticle: true },
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
                    { videoArticle: true },
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
                    { videoArticle: true },
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
                    { videoArticle: true },
                    100
                  );
                }
              }}
            >
              <span></span>
            </InView>
          </div>
        </Sticky>
      </div>

      <MediaContextProvider>
        <Media at="xs">
          <MobileNextArticle
            label={'next_videos'}
            data={data}
            scrollToNextArticle={scrollToNextVideo}
            nextArticle={nextVideo}
            related={related}
            showBbc={!!source}
          />
        </Media>
        {isAMP ? null : (
          <Media greaterThan="xs" className={`ad-content md:block md:w-4/12`}>
            <div className="w-full items-center space-y-6 pt-4 pb-4">
              {!rhs ? 'Loading...' : <AdContainer data={filteredRHS} />}
            </div>
          </Media>
        )}
      </MediaContextProvider>
    </div>
  );
};

export default Video;

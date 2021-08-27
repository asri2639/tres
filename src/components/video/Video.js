import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import video from './Video.module.scss';
import { articleViewScroll } from '@utils/GoogleTagManager';
import { pageView, nextPageView } from '@utils/ComScore';
import { RTLContext } from '@components/layout/Layout';
import Sticky from 'wil-react-sticky';
import { createHash, dateFormatter, loadJS } from '@utils/Helpers';
import { AMPContext } from '@pages/_app';
import AdContainer from '@components/article/AdContainer';
import useSWR from 'swr';
import {
  constructPlaybackUrl,
  smartUrlFetcher,
} from '@components/video/VideoList';
import getConfig from 'next/config';

const Video = ({
  contentId,
  data,
  className,
  rhs,
  desktop,
  iframeSource,
  viewed,
  index,
  userAgent,
}) => {
  const isAMP = useContext(AMPContext);
  const { publicRuntimeConfig } = getConfig();

  const isRTL = useContext(RTLContext);
  const [source, setSource] = useState(iframeSource);
  const [showVideo, setShowVideo] = useState(false);
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

  const { data: smartUrls, error: smartUrlError } = useSWR(
    () => {
      const isMobile = userAgent && userAgent.includes('Mobile');
      return isMobile && !isAMP
        ? [
            data.play_url.url,
            createHash('ywVXaTzycwZ8agEs3ujx' + data.play_url.url),
            publicRuntimeConfig,
          ]
        : null;
    },
    smartUrlFetcher,
    {
      dedupingInterval: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    const isMobile = userAgent && userAgent.includes('Mobile');
    if (isMobile && !isAMP && !source) {
      const source = constructPlaybackUrl(
        data,
        smartUrls,
        publicRuntimeConfig,
        isAMP,
        data.thumbnail
      );

      setSource(source);
    } else {
      setSource(iframeSource);
    }
  }, [smartUrls, iframeSource]);

  useEffect(() => {
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

      //  router.push(data.web_url, undefined, { shallow: true })
    }

    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      articleViewScroll(data, { videoArticle: true });
      if (viewed.length === 1) {
        pageView();
      } else {
        nextPageView();
      }
    }
    if (typeof window !== 'undefined' && !isAMP && desktop) {
      const isDesktop = window.innerWidth >= 768;
      const divStyle = isDesktop
        ? `width: 728px; height: 90px;`
        : `width: 300px; height: 250px;`;
      const slotArr = isDesktop ? [728, 90] : [300, 250];
      let adHTML = null;
      let adConf = null;
      if (
        desktop.ad_conf &&
        Array.isArray(desktop.ad_conf) &&
        desktop.ad_conf[0]
      ) {
        if (desktop.ad_conf[0].web_msite && desktop.ad_conf[0].web_msite) {
          adConf = desktop.ad_conf[0].web_msite[0];
        } else {
          if (isDesktop) {
            adConf = desktop.ad_conf[0].web ? desktop.ad_conf[0].web[0] : null;
          } else {
            adConf = desktop.ad_conf[0].msite
              ? desktop.ad_conf[0].msite[0]
              : null;
          }
        }
      }

      const id = adConf ? adConf.gpt_id : null;
      const ad_id = adConf ? adConf.ad_unit_id : null;

      window.ads = window.ads || new Set();
      const ads = window.ads;

      if (id && ad_id) {
        if (!ads.has(adConf.gpt_id)) {
          adHTML = `<div id='${id}' style='${divStyle}'></div>`;
          const el = document.querySelector(
            `[data-content-id="${contentId}"] .EtvadsSection`
          );
          if (el && el.querySelector('#adsContainer')) {
            // document.body.appendChild(s);
            el.innerHTML = adHTML;
            setTimeout(() => {
              if (window.googletag && googletag.apiReady) {
                googletag.cmd.push(function () {
                  googletag.pubads().collapseEmptyDivs();
                  googletag
                    .defineSlot(ad_id, slotArr, id)
                    .addService(googletag.pubads());
                  googletag.enableServices();
                });
                googletag.cmd.push(function () {
                  googletag.display(id);
                });
                window.ads.add(adConf.gpt_id);
              }
            }, 10);
          } else {
            console.log('In-Article ad container not found!!!', contentId);
          }
        }
      }
    }

    if (typeof window !== 'undefined' && isAMP) {
      let adConf = null;
      if (
        desktop.ad_conf &&
        Array.isArray(desktop.ad_conf) &&
        desktop.ad_conf[0]
      ) {
        if (desktop.ad_conf[0].web_msite && desktop.ad_conf[0].web_msite) {
          adConf = data.ad_conf[0].web_msite[0];
        } else {
          if (isDesktop) {
            adConf = desktop.ad_conf[0].web ? desktop.ad_conf[0].web[0] : null;
          } else {
            adConf = desktop.ad_conf[0].msite
              ? desktop.ad_conf[0].msite[0]
              : null;
          }
        }
      }
      const id = adConf ? adConf.gpt_id : null;
      const ad_id = adConf ? adConf.ad_unit_id : null;

      if (ad_id) {
        const el = document.querySelector(`.EtvadsSection`);
        if (el) {
          el.innerHTML = `<amp-ad width=300 height=250
                  type="doubleclick"
                  data-slot="${ad_id}">
                <div placeholder></div>
                <div fallback></div>
              </amp-ad>`;
        }
      }
    }
  }, [inView, contentId, rhs, desktop, source]);

  useEffect(() => {
    if (showVideo) {
      if (typeof window !== 'undefined' && !isAMP) {
        loadJS(
          'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
        );
        loadJS(
          'https://players-saranyu.s3.amazonaws.com/etvbharat_staging/saranyu_player/plugin/external-js/scroll-playpause1.js'
        );
      }
      setTimeout(() => {
        let iframe = document.getElementById('player' + contentId);
        iframe.onload = function (params) {
          setTimeout(() => {
            iframe.contentWindow.postMessage('SPWebSiteVodsPlay');
          }, 600);
        };
      }, 200);
    }
  }, [showVideo]);

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
            <div className="flex flex-col md:flex-col-reverse md:mb-1">
              <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                <h1
                  ref={ref}
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

            <div className={`${video.player} z-0`}>
              {source ? (
                isAMP ? (
                  <amp-video-iframe
                    layout="responsive"
                    width="16"
                    height="9"
                    src={source}
                    poster="https://www.etvbharat.com/assets/images/placeholder.png"
                  ></amp-video-iframe>
                ) : !showVideo ? (
                  <div
                    className="play-button"
                    onClick={() => {
                      setShowVideo(true);
                    }}
                  >
                    <img
                      className="w-full rounded-md -mt-10"
                      src={data.thumbnail.url}
                      alt="Thumbnail image"
                    />
                  </div>
                ) : (
                  <iframe id={'player' + contentId} src={source}></iframe>
                )
              ) : (
                <img
                  className="w-full rounded-md -mt-10"
                  src="https://etvbharatimages.akamaized.net/etvbharat/static/assets/images/placeholder.png"
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

            <InView
              as="div"
              className="pseudo quarter"
              triggerOnce={true}
              onChange={(inView, entry) => {
                if (inView) {
                  articleViewScroll(data, { videoArticle: true }, 25);
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
                  articleViewScroll(data, { videoArticle: true }, 50);
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
                  articleViewScroll(data, { videoArticle: true }, 75);
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
                  articleViewScroll(data, { videoArticle: true }, 100);
                }
              }}
            >
              <span></span>
            </InView>
          </div>
        </Sticky>
      </div>

      {/*     <MediaContextProvider>
        <Media at="xs">
          <MobileNextArticle
            label={'next_videos'}
            data={data}
            scrollToNextArticle={scrollToNextVideo}
            nextArticle={nextVideo}
            related={related}
            showBbc={!!source}
          ></MobileNextArticle>
        </Media>*/}

      <MediaContextProvider>
        {isAMP ? null : (
          <Media greaterThan="xs" className={`ad-content md:block md:w-4/12`}>
            <div className="w-full items-center space-y-6 pt-4 pb-4">
              {!rhs ? 'Loading...' : <AdContainer data={rhs} index={index} />}
            </div>
          </Media>
        )}
      </MediaContextProvider>
    </div>
  );
};

export default Video;

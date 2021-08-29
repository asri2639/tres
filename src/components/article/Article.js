import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { dateFormatter, thumbnailExtractor } from '@utils/Helpers';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import Sticky from 'wil-react-sticky';
import { AMPContext } from '@pages/_app';
import stringToHTML from '@utils/StringToHtml';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import dynamic from 'next/dynamic';
const options = {
  loading: () => <div>Loading...</div>,
};
const MobileAd = dynamic(() => import('@components/article/MobileAd'), options);
const MobileNextArticle = dynamic(
  () => import('@components/article/MobileNextArticle'),
  options
);
const AdContainer = dynamic(
  () => import('@components/article/AdContainer'),
  options
);

import { articleViewScroll } from '@utils/GoogleTagManager';
import { pageView, nextPageView } from '@utils/ComScore';

// initialPosition
// div height
// current Scroll position

export default function Article({
  contentId,
  data,
  html,
  className,
  rhs,
  nextArticle,
  scrollToNextArticle,
  viewed,
  related,
  ads,
  index,
  userAgent,
  htmlShow
}) {
  const isAMP = useContext(AMPContext);
  const [ampHtml, setAmpHtml] = useState(null);

  const contentRef = useRef(null);
  const isRTL = useContext(RTLContext);

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

  useEffect(() => {
    let api = null;

    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      articleViewScroll(data, { newsArticle: true });

      if (viewed.length === 1) {
        pageView();
      } else {
        nextPageView();
      }
    }
    if (inView) {
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
          }
        }
      }
    }

    if (typeof window !== 'undefined' && !isAMP) {
      console.log('inside non-amp!!!!');
      const isDesktop = window.innerWidth >= 768;
      const divStyle = isDesktop
        ? `width: 728px; height: 90px;`
        : `width: 300px; height: 250px;`;
      const slotArr = isDesktop ? [728, 90] : [300, 250];
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
      window.ads = window.ads || new Set();
      const ads = window.ads;

      const showAd = (ad_id, slotArr, id) => {
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
          window.ads.add(id);
        }
      };

      if (id && ad_id) {
        if (!ads.has(adConf.gpt_id)) {
          adHTML = `<div id='${id}' style='${divStyle}'></div>`;
          const el = document.querySelector(
            `[data-content-id="${contentId}"] .EtvadsSection`
          );
          if (el && el.querySelector('#adsContainer')) {
            el.innerHTML = adHTML;
            showAd(ad_id, slotArr, id);
          } else {
            const el = document.getElementById(adConf.gpt_id);
            if (el && !el.hasChildNodes()) {
              showAd(ad_id, slotArr, id);
            }

            console.log(window.ads);
            console.log(adConf.gpt_id);
            console.log('In-Article ad container not found!!!', contentId);
          }
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

      if (data.has_videos) {
        api = API(APIEnum.Video);
        let promises = [];

        const videos = parsedHtml.querySelectorAll('.videoDiv');
        for (let i = 0; i < videos.length; i++) {
          const el = videos[i];
          const iframe = el.querySelector('iframe.player-Iframe');

          promises.push(
            api.Video.decodeSmartUrl({
              params: { url: iframe.src },
            })
          );
        }

        Promise.all(promises).then((results) => {
          for (let i = 0; i < results.length; i++) {
            const el = videos[i];
            const res = results[i];
            const url = new URL(res);
            const iframeSource =
              'https://etvbharatimages.akamaized.net/etvbharat/static/assets/embed_etv.html' +
              url.search;

            el.innerHTML = `<amp-video-iframe
            layout="responsive"
            width="16"
            height="9"
            src=${iframeSource}
            poster="https://www.etvbharat.com/assets/images/placeholder.png"
            ></amp-video-iframe>`;

            if (i === results.length - 1) {
              setAmpHtml(parsedHtml.innerHTML);
            }
          }
        });

        // videos.forEach((el) => {

        // el.innerHTML = '<span>video</span>';
        // console.log(el);
        // });
      } else {
        setAmpHtml(parsedHtml.innerHTML);
      }
    }

    return () => {
      api && api.shutdown();
    };
  }, [inView, contentId, contentRef]);

  const thumbnail = thumbnailExtractor(
    data.thumbnails,
    '3_2',
    window.innerWidth >= 768 ? 'b2s' : 's2b',
    data.media_type
  );
  return (
    <>
      <div
        data-content-id={contentId}
        className={`article relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10 ${
          isRTL ? 'md:flex-row-reverse rtl' : ''
        }`}
      >
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className={`lg-social hidden absolute md:flex flex-col justify-around pt-0 h-56 ${
              isRTL ? 'rtl-social' : ''
            }`}
          >
            <SocialMedia data={data} />
          </Media>
        </MediaContextProvider>

        <div className="md:w-8/12 h-full bg-white">
          <Sticky
            containerSelectorFocus={`.article[data-content-id="${contentId}"]`}
            stickyEnableRange={[768, Infinity]}
            offsetTop={60}
          >
            <div
              className={`${
                className || ''
              } actual-content lg:container lg:mx-auto px-3 md:px-0 bg-white `}
              ref={contentRef}
            >
              {index > 0 && ads ? (
                <div className="pt-3">
                  <MobileAd
                    key={'art' + (index * 2 + 2)}
                    adData={ads['' + (index * 2 + 1)]}
                  />
                </div>
              ) : null}
              <MediaContextProvider>
                <Media at="xs">
                  {/*   {index === 0 ? (
                    <FirstAd adData={ads ? ads['' + (index * 2 + 1)] : null} />
                  ) : null} */}

                  <h1
                    ref={ref}
                    className="leading-tight text-xl font-bold p-2"
                  >
                    {data.title}
                  </h1>

                  <div className="px-2 mb-2 text-sm text-gray-600 md:text-black always-english">
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
                  <div className="flex justify-between px-2 w-56 mb-2">
                    <SocialMedia data={data} />
                  </div>
                </Media>
              </MediaContextProvider>
              <div className="flex flex-col md:flex-col-reverse md:mb-8">
                <div
                  className="-mx-3 md:mx-0 relative "
                  style={{ minWidth: '300px', minHeight: '200px' }}
                >
                  <Thumbnail
                    thumbnail={thumbnail}
                    className={'md:rounded-lg w-full'}
                    type={data.media_type}
                    lazy={false}
                  />
                </div>
                <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                  <MediaContextProvider>
                    <Media greaterThan="xs">
                      <h1
                        ref={ref}
                        className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold"
                      >
                        {data.title}
                      </h1>

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
                    </Media>
                  </MediaContextProvider>
                </div>
              </div>
              {isAMP && ampHtml ? (
                <div
                  className="text-base md:text-md"
                  dangerouslySetInnerHTML={{
                    __html: ampHtml,
                  }}
                />
              ) : null}
              {/** actual article content */}
				  {
					!isAMP && htmlShow && userAgent && userAgent.includes('Mobile') ? (
                <div
                  className={`text-base md:text-md `}
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                />
              ) : null
				  } 	 
               {
					!isAMP && userAgent && !userAgent.includes('Mobile') ? (
                <div
                  className={`text-base md:text-md `}
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                />
              ) : null
				  } 
              {ads ? (
                <div className="pt-3">
                  <MobileAd
                    key={'art' + (index * 2 + 2)}
                    adData={ads['' + (index * 2 + 2)]}
                  />
                </div>
              ) : null}
            </div>
          </Sticky>
        </div>

        <MediaContextProvider>
          <Media at="xs">
            <MobileNextArticle
              label={'next_article'}
              data={data}
              related={related}
              scrollToNextArticle={scrollToNextArticle}
              nextArticle={nextArticle}
            ></MobileNextArticle>
          </Media>
          {isAMP ? null : (
            <Media greaterThan="xs" className={`ad-content md:block md:w-4/12`}>
              <div className="w-full items-center space-y-6 pt-4 pb-4">
                {!rhs ? 'Loading...' : <AdContainer data={rhs} index={index} />}
              </div>
            </Media>
          )}
        </MediaContextProvider>
      </div>
    </>
  );
}

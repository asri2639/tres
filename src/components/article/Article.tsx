import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInView, InView } from 'react-intersection-observer';
// import { InView } from 'react-intersection-observer';
import AdContainer from '@components/article/AdContainer';
import { dateFormatter, thumbnailExtractor } from '@utils/Helpers';
import { Media, MediaContextProvider } from '@media';
import SocialMedia from '@components/article/SocialMedia';
import Thumbnail from '@components/common/Thumbnail';
import GoogleTagManager from '@utils/GoogleTagManager';
import ComScore from '@utils/ComScore';
import { RTLContext } from '@components/layout/Layout';
import MobileNextArticle from '@components/article/MobileNextArticle';
import Sticky from 'wil-react-sticky';
import { AMPContext } from '@pages/_app';
import BBCHeader from '@components/common/BBCHeader';
import stringToHTML from '@utils/StringToHtml';
import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import e from 'express';

// initialPosition
// div height
// current Scroll position

export default function Article({
  contentId,
  data,
  html,
  className,
  rhs,
  desktop,
  nextArticle,
  scrollToNextArticle,
  viewed,
  updateViewed,
  related,
}) {
  const isAMP = useContext(AMPContext);
  const [source, setSource] = useState(null);

  const [ampHtml, setAmpHtml] = useState(null);

  const contentRef = useRef(null);
  const isRTL = useContext(RTLContext);
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
    if (viewed.indexOf(contentId) === -1) {
      viewed.push(contentId);
      GoogleTagManager.articleViewScroll(data, { newsArticle: true });

      if (viewed.length === 1) {
        ComScore.pageView();
      } else {
        ComScore.nextPageView();
      }
    }
    if (inView) {
      const urlParts = data.web_url.split('/');
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
      let id, ad_id;

      if (isDesktop) {
        if (rhs && data.ad_conf) {
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
        if (data.ad_conf && data.ad_conf.length > 0 && !!data.ad_conf[0]) {
          id = data.ad_conf[0].gpt_id;
          ad_id = data.ad_conf[0].ad_unit_id;
        }
      }

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
          // el.innerHTML = adHTML;
          el.innerHTML = '';
         // el.querySelector('#' + id).appendChild(s);
        }
      }
    }

    if (isAMP) {
      let id, ad_id;
      if (data.ad_conf && data.ad_conf.length > 0 && !!data.ad_conf[0]) {
        id = data.ad_conf[0].gpt_id;
        ad_id = data.ad_conf[0].ad_unit_id;
      }
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
        const api = API(APIEnum.Video);
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
            const iframeSource = '/assets/embed_etv.html' + url.search;

            el.innerHTML = `<amp-video-iframe
            layout="responsive"
            width="16"
            height="9"
            src=${iframeSource}
            poster="https://react.etvbharat.com/assets/images/placeholder.png"
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
  }, [inView, contentId, rhs, contentRef]);

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

  const thumbnail = thumbnailExtractor(
    data.thumbnails,
    '3_2',
    'b2s',
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
              <BBCHeader source={source} />

              <div className="flex flex-col md:flex-col-reverse md:mb-8">
                <div className="-mx-3 md:mx-0 relative">
                  <Thumbnail
                    thumbnail={thumbnail}
                    className={'md:rounded-lg w-full'}
                    type={data.media_type}
                  />
                </div>
                <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
                  <h1
                    ref={setRefs}
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

              {isAMP && ampHtml ? (
                <div
                  className="text-sm md:text-md"
                  dangerouslySetInnerHTML={{
                    __html: ampHtml,
                  }}
                />
              ) : null}

              {!isAMP ? (
                <div
                  className="text-sm md:text-md"
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                />
              ) : null}

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
                onChange={async (inView, entry) => {
                  if (inView) {
                    GoogleTagManager.articleViewScroll(
                      data,
                      { newsArticle: true },
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
                      { newsArticle: true },
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
                      { newsArticle: true },
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
                      { newsArticle: true },
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
              label={'next_article'}
              data={data}
              related={related}
              scrollToNextArticle={scrollToNextArticle}
              nextArticle={nextArticle}
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
    </>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';
// import { InView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AdContainer from "@components/article/AdContainer";
import { thumbnailExtractor } from "@utils/Helpers";
import { Media, MediaContextProvider } from "@media";
import SocialMedia from "@components/article/SocialMedia";
import Thumbnail from "@components/common/Thumbnail";


export default function Article({ contentId, data, html, className, rhs, nextArticle, scrollToNextArticle }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    // triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      const urlParts = data.web_url.split('/');
      const state = urlParts[1]
      const contentIdFromUrl = window.location.href.split('/').slice(-1)[0]
      if (contentIdFromUrl === contentId) {
        return;
      } else {
        if (ref && ref.current) {
          const elBoundary = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (elBoundary.top > 0 && elBoundary.top < windowHeight) {
            document.title = data.title
            window.history.pushState({ "id": data.title }, data.title, '/' + data.web_url);

            var event = new CustomEvent<string>("newurl", {
              detail: contentId
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
            }, 2000)
          }
        }

      }
      //  router.push(data.web_url, undefined, { shallow: true })
    }
  }, [inView, contentId, rhs])


  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );


  /* const isInView = (inView, entry) => {
    if (inView) {

      const urlParts = data.web_url.split('/');
      const state = urlParts[1]
      const contentIdFromUrl = window.location.href.split('/').slice(-1)[0]

      const boundaries =

      if (contentIdFromUrl === contentId) {
        return;
      } else {

         router.push({
           pathname: '/[state]/[...slug]',
           query: {
             state,
             slug: urlParts.slice(2)
           },
         },
           '/' + data.web_url, { shallow: true })
       }

      }
    } */


  const dateFormatter = (uts) => {
    const date = new Date(uts * 1000);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric' }) + ' IST'
  }
  let filteredRHS = [];
  if (rhs) {
    filteredRHS = rhs.filter(v => {
      return v.layout_type.indexOf('ad_unit') >= 0 || (v.layout_type.indexOf('ad_unit') === -1 && v.catalog_list_items.length > 0)
    });

  }
  const thumbnail = thumbnailExtractor(data.thumbnails, '3_2', 'b2s')
  return (
    <div data-content-id={contentId} className="article relative flex flex-col md:flex-row w-full border-b-2 border-grey-500 md:space-x-10">

      <MediaContextProvider >
        <Media greaterThan="xs" className="lg-social hidden absolute md:flex flex-col justify-around pt-2 h-56 " >
          <SocialMedia data={data} />
        </Media>
      </MediaContextProvider>


      <div className="md:w-8/12">
        <div className={`${className || ''} lg:container lg:mx-auto px-3 md:px-0 `}>
          <div className="flex flex-col md:flex-col-reverse md:mb-8">
            <div className="-mx-3 md:mx-0">
            <Thumbnail thumbnail={thumbnail} className={'md:rounded-lg'} />
            </div>
            <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
              <h1 ref={setRefs} className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold">{data.title}</h1>
              <div className="text-sm text-gray-600 md:text-black">
                {data.publish_date_uts ? `Published on: ${dateFormatter(data.publish_date_uts)}` : ''}
                <span className="hidden md:inline-block">{data.publish_date_uts && data.update_date_uts ? `  |  ` : ''}</span>
                <br className="md:hidden" />
                {data.update_date_uts ? `Updated on: ${dateFormatter(data.update_date_uts)}` : ''}
              </div>
            </div>

            <MediaContextProvider >
              <Media at="xs" className="flex justify-between mx-auto w-56 mb-2">
                <SocialMedia data={data} />
              </Media>
            </MediaContextProvider>
          </div>

          <div
            className="text-sm md:text-md"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />

        </div>
      </div>

      <MediaContextProvider >
        <Media at="xs">
          <div className="flex flex-col py-4 px-5  bg-mbg text-white cursor-pointer" >
            <div className="flex items-center mb-1">
              <img alt="ETV" className="w-6" src="/assets/images/nextarticle.png" />
              <span className="text-lg font-thin pl-2">Next Article</span>
            </div>
            <div className="text-gray-500 tracking-tighter pl-2" onClick={scrollToNextArticle}>{nextArticle ? nextArticle.ml_title[0].text : ''}</div>
          </div>
        </Media>
        <Media greaterThan="xs" className="md:block md:w-4/12">
          <div className="w-full flex flex-col items-center space-y-6 pt-4 pb-4">
            {!rhs ? 'Loading...' : (
              <AdContainer data={filteredRHS} />
            )}
          </div>
        </Media>
      </MediaContextProvider>


    </div>)
}
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';
// import { InView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import AdContainer from "@components/article/AdContainer";
export default function Article({ contentId, data, html, className, rhs }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [inViewRef, inView, entry] = useInView({
    // delay: 200,
    triggerOnce: true,
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
  })


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
    console.log(contentId)
    console.log(entry)
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
      return v.list_type === 'ad_unit' || (v.list_type !== 'ad_unit' && v.catalog_list_items.length > 0)
    });

  }
  return (
    <div data-content-id={contentId} className="article flex w-full border-b-2 border-grey-500 space-x-10">
      <div className="md:w-8/12">
        <div data-content-id={contentId} className={`${className} lg:container lg:mx-auto px-3 md:px-0 `}>
          <div className="flex flex-col md:flex-col-reverse md:mb-8">
            <div className="-mx-3 md:mx-0">
              <img className="md:rounded-lg" src={data.thumbnails.web_3_2.url} alt={data.thumbnails.web_3_2.alt_tags} />
            </div>
            <div className="pt-4 pb-3 md:pt-0 md:pb-0 md:mb-3 md:border-b-2 md:border-gray-500">
              <h1 ref={setRefs} className="leading-tight text-xl md:text-2xl md:pt-3 md:pb-2 font-bold">{data.title}</h1>
              <div className="text-sm text-gray-600 md:text-black">
                {data.publish_date_uts ? `Published on: ${dateFormatter(data.publish_date_uts)}` : ''}
                {data.publish_date_uts && data.update_date_uts ? `  |  ` : ''}
                {data.udpate_date_uts ? `Updated on: ${dateFormatter(data.udpate_date_uts)}` : ''}
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />

        </div>
      </div>
      <div className="hidden md:block md:w-4/12 flex flex-col items-center space-y-6">
        {!rhs ? 'Loading...' : (
          <AdContainer data={filteredRHS} />
        )}
      </div>
    </div>)
}
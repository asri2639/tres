import React, { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { I18nContext } from 'next-i18next';
import { Media, MediaContextProvider } from 'media';

import API from '@services/api/API';
import APIEnum from '@services/api/APIEnum';
import { createHash, stateCodeConverter } from '@utils/Helpers';

import BottomRelatedBar from '@components/article/BottomRelatedBar';
import Breadcrumbs from '@components/article/Breadcrumbs';
import Video from '@components/video/Video';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import VideoAPI from '@services/api/Video';

const VideoList = ({ videoData }) => {
  const { publicRuntimeConfig } = getConfig();

  const router = useRouter();
  const api = API(APIEnum.CatalogList);
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const constructPlaybackUrl = (data, smartData) => {
    let urlSplit = data.web_url.split('/');
    let href =
      publicRuntimeConfig.APP_ENV !== 'development'
        ? `${window.location.origin}/${data.web_url}`
        : `https://www.etvbharat.com/${data.web_url}`;

    var s,
      r,
      a = 'live_stream' === data.media_type,
      o = urlSplit[0], //language
      l = urlSplit[1], // state
      c = urlSplit[2], // video
      d = urlSplit[3], //
      u = data.display_title,
      m = window.location.href;

    data.media_type,
      (s =
        '' == data.district[0] || void 0 == data.district[0]
          ? 'INDIA'
          : data.district[0]),
      (r =
        '' == data.city[0] || void 0 == data.district[0]
          ? 'INDIA'
          : data.city[0]);

    var h = 'english',
      p = {
        'andhra-pradesh': '10',
        assam: '11',
        english: '12',
        urdu: '13',
        bihar: '14',
        chhattisgarh: '15',
        delhi: '16',
        gujarat: '17',
        haryana: '18',
        'himachal-pradesh': '19',
        'jammu-and-kashmir': '20',
        jharkhand: '21',
        karnataka: '22',
        kerala: '23',
        'madhya-pradesh': '24',
        maharashtra: '25',
        odisha: '26',
        punjab: '27',
        rajasthan: '28',
        'tamil-nadu': '29',
        telangana: '30',
        'uttar-pradesh': '31',
        uttarakhand: '32',
        'west-bengal': '33',
      }[(h = 'national' == l ? o : l)],
      w = smartData.adaptive_urls[0].playback_url,
      g = smartData.adaptive_urls[0].video_duration,
      y =
        'https://etvbharatimages.akamaized.net/player/etvbharat-staging/embed_etv.html?contenturl=' +
        w +
        (a ? '' : '&video_duration=' + g) +
        '&thumbnailurl=https://etvwinvideo.akamaized.net/etv-bharat/images/placeholder.png&autoplay=' +
        (a ? 'true' : 'false') +
        '&mute=' +
        (a ? 'true' : 'false') +
        '&content_id=' +
        data.content_id +
        (a ? '&content_type=livestream' : '&content_type=vods') +
        '&comscorec3=' +
        p +
        '&ga_tracking=true&language=' +
        o +
        '&stateName=' +
        l +
        '&category=' +
        c +
        '&subcategory=' +
        d +
        '&videossection=true&videocity=' +
        r +
        '&videotitle=' +
        u +
        '&currentpageurl=' +
        href +
        '&videodistrict=' +
        s +
        '&constituency=INDIA';

    return y;
  };

  const relatedVideosFetcher = (...args) => {
    const [apiEnum, methodName, contentId] = args;
    if (methodName === 'getVideoDetails' && window.innerWidth < 769) {
      //  return null;
    }
    return api[apiEnum][methodName]({
      query: {
        response: methodName === 'getVideoDetails' ? 'r2' : 'r1',
        item_languages: language,
        page: 0,
        page_size: 10,
        content_id: contentId,
        gallery_ad: true,
        scroll_no: 0,
        // portal_state: english,
        state: stateCodeConverter(location.pathname.split('/')[2]),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const smartUrlFetcher = (...args) => {
    const [play_url, hash] = args;
    return VideoAPI(null)
      .getSmartUrls({
        params: {
          play_url: play_url,
          hash,
        },
        query: null,
        payload: null,
      })
      .then((response) => response.json())
      .then((resp) => {
        return resp.data;
      });
  };

  const { data: smartUrls, error: smartUrlError } = useSWR(
    [
      videoData.videos[0].data.play_url.url,
      createHash(
        'ywVXaTzycwZ8agEs3ujx' + videoData.videos[0].data.play_url.url
      ),
    ],
    smartUrlFetcher,
    {
      dedupingInterval: 5 * 60 * 1000,
    }
  );
  const { data: adData, error: adError } = useSWR(
    ['CatalogList', 'getVideoDetails', videoData.contentId],
    relatedVideosFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  const { data, error } = useSWR(
    ['CatalogList', 'getRelatedArticles', videoData.contentId],
    relatedVideosFetcher,
    { dedupingInterval: 5 * 60 * 1000 }
  );
  // Set videos from videoData
  useEffect(() => {
    if (videoData) {
      if (videoData.error) {
        // Handle error
      } else {
        setVideos(videoData.videos);
      }
    }
    if (data) {
      stopLoading();
      setRelated(data.catalog_list_items);
    } else {
      startLoading();
    }

    let video = videos.find(
      (article) => article.data.content_id === videoData.contentId
    );
    if (video && adData) {
      video.rhs = adData.catalog_list_items.slice(2)[0].catalog_list_items;
      setVideos((videos) => [...videos]);
    }

    if (video && smartUrls) {
      video.iframeSource = constructPlaybackUrl(video.data, smartUrls);
      setVideos((videos) => [...videos]);
    }
  }, [videoData, data, adData, smartUrls]);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = async () => {
    // To get page offset of last article
    const lastVideoLoaded = document.querySelector(
      '.article-list > .article:last-child'
    );
    if (lastVideoLoaded) {
      let offsetHeight = document.body.offsetHeight;
      if (window.innerWidth < 769) {
        offsetHeight -= 350;
      }
      if (window.innerHeight + window.pageYOffset >= offsetHeight) {
        const curIndex = related.findIndex(
          (v) =>
            v.content_id === lastVideoLoaded.getAttribute('data-content-id')
        );
        if (curIndex > -1 && curIndex < 9 && !loading) {
          startLoading();
          await api.CatalogList.getVideoDetails({
            query: {
              response: 'r2',
              item_languages: language,
              content_id: related[curIndex + 1].content_id, //variable
              // page_size: window.innerWidth < 769 ? 1 : 10,
              page_size: 10,
              portal_state: stateCodeConverter(location.pathname.split('/')[2]),
            },
          }).then(async (res) => {
            const newVideo =
              res.data.data.catalog_list_items[0].catalog_list_items[0];
            const rhs = res.data.data.catalog_list_items.slice(2)[0]
              .catalog_list_items;

            await VideoAPI(null)
              .getSmartUrls({
                params: {
                  play_url: newVideo.play_url.url,
                  hash: createHash(
                    'ywVXaTzycwZ8agEs3ujx' + newVideo.play_url.url
                  ),
                },
                query: null,
                payload: null,
              })
              .then((response) => response.json())
              .then(async (res1) => {
                const iframeSource = constructPlaybackUrl(newVideo, res1.data);

                const newList = [
                  ...videos,
                  {
                    data: newVideo,
                    rhs,
                    contentId: newVideo.content_id,
                    iframeSource,
                  },
                ];

                setVideos(newList);
                stopLoading();
              });
          });
        }
      }
    }
  };

  const scrollToVideo = (video) => {
    const articleEl = document.querySelector(
      `.article[data-content-id=${video.content_id}]`
    );
    if (articleEl) {
      // articleEl.scrollIntoView({ behavior: "smooth", inline: "nearest" });

      const y = articleEl.getBoundingClientRect().top + window.scrollY - 28;
      window.scroll({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* <div className="article-count fixed right-0 text-white top-0 z-50 p-3 text-2xl font-bold">{videos.length}</div> */}
      <MediaContextProvider>
        <Media greaterThan="xs" className="w-full">
          {' '}
          <Breadcrumbs />
        </Media>
      </MediaContextProvider>

      <ul className="article-list flex flex-col lg:container lg:mx-auto pt-4">
        {videos.length > 0 &&
          videos.map((video, i) => (
            <Video
              key={video.contentId}
              {...video}
              rhs={video.rhs}
              iframeSource={video.iframeSource}
              nextVideo={i < 9 ? related[i + 1] : null}
              scrollToNextVideo={() => scrollToVideo(related[i + 1])}
            />
          ))}
        {loading && (
          <h1 className="w-full text-red-700 text-2xl z-10">Loading ...</h1>
        )}
      </ul>

      {related ? (
        <MediaContextProvider>
          <Media
            greaterThan="xs"
            className="fixed bottom-0  z-20 w-screen h-16 "
          >
            {' '}
            <BottomRelatedBar data={related} />
          </Media>
        </MediaContextProvider>
      ) : null}
    </>
  );
};
export default VideoList;

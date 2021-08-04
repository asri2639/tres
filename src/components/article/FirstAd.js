import { useContext, useEffect, useRef, useState } from 'react';
import { AMPContext, TransitionContext } from '@pages/_app';
import { loadJS } from '@utils/Helpers';

const FirstAd = ({ adData, className, refresh }) => {
  const isTransitioning = useContext(TransitionContext);
  const [isDesktop, setIsDesktop] = useState(null);
  const isAMP = useContext(AMPContext);

  const adEl = useRef(null);
  let [width, height] = [300, 250];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadJS('https://www.googletagservices.com/tag/js/gpt.js');
      setIsDesktop(window.innerWidth >= 768);
    }
  }, [adData]);

  const showAd = (ad_id, slotArr, id) => {
    if (window.googletag && googletag.apiReady) {
      googletag.cmd.push(function () {
        // googletag.pubads().collapseEmptyDivs();
        googletag.defineSlot(ad_id, slotArr, id).addService(googletag.pubads());
        googletag.enableServices();
      });
      googletag.cmd.push(function () {
        googletag.display(id);
      });
      window.ads.add(id);
    }
  };

  useEffect(() => {
    const intervalID = window.setInterval(() => {
      if (typeof window !== undefined && isDesktop != null) {
        if (adData && adData.ad_unit) {
          window.ads = window.ads || new Set();
          const ads = window.ads;

          if (!ads.has(adData.gpt_id)) {
            const el = document.getElementById(adData.gpt_id);
            if (el && !el.hasChildNodes()) {
              showAd(adData.ad_unit, [width, height], adData.gpt_id);
            }
          } else {
            clearInterval(intervalID);
          }
        }
      }
    }, 500);
  }, [adData, isDesktop, adEl]);

  return (
    <div style={{ padding: '5px 0' }}>
      <div
        style={{
          display: 'table',
          width: width ? width + 'px' : 'auto',
          height: height ? height + 5 + 'px' : 'auto',
          background: 'rgb(228 228 228 / 68%)',
          margin: '0 auto',
        }}
      >
        {isDesktop != null && adData ? (
          isAMP ? (
            <amp-ad
              width="300"
              height="250"
              type="doubleclick"
              data-slot={adData.ad_unit}
            >
              <div placeholder></div>
              <div fallback></div>
            </amp-ad>
          ) : (
            <div
              ref={adEl}
              data-ad-unit={adData.ad_unit}
              id={adData.gpt_id}
              style={{
                width: width ? width + 'px' : 'auto',
                height: height ? height + 'px' : 'auto',
              }}
            ></div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default FirstAd;

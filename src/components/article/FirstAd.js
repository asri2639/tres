import { useContext, useEffect, useRef, useState } from 'react';
import { TransitionContext } from '@pages/_app';

const FirstAd = ({ adData, className, refresh }) => {
  const isTransitioning = useContext(TransitionContext);
  const [isDesktop, setIsDesktop] = useState(null);

  const adEl = useRef(null);
  let [width, height] = [300, 250];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, [adData]);

  useEffect(() => {
    if (!isTransitioning && typeof window !== undefined && isDesktop != null) {
      if (adData && adData.ad_unit) {
        window.ads = window.ads || new Set();
        const ads = window.ads;

        if (!ads.has(adData.gpt_id)) {
          if (adEl.current) {
            const adId = `ad_${adData.gpt_id.replace(/-/gi, '_')}`;
            if (window.googletag && googletag.apiReady) {
              window[adId] = googletag
                .defineSlot(adData.ad_unit, [width, height], adData.gpt_id)
                .addService(googletag.pubads());
              googletag.enableServices();

              googletag.cmd.push(function () {
                googletag.pubads().collapseEmptyDivs();
              });

              googletag.cmd.push(function () {
                googletag.display(adData.gpt_id);
              });
              window.ads.add(adData.gpt_id);
            }
          }
        }
      }
    }
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
          <div
            ref={adEl}
            data-ad-unit={adData.ad_unit}
            id={adData.gpt_id}
            style={{
              width: width ? width + 'px' : 'auto',
              height: height ? height + 'px' : 'auto',
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default FirstAd;

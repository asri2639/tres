import { useContext, useCallback, useEffect, useRef, useState } from 'react';
import { TransitionContext } from '@pages/_app';
import { InView } from 'react-intersection-observer';

const MobileAd = ({ adData, className, refresh }) => {
  const isTransitioning = useContext(TransitionContext);

  const [isDesktop, setIsDesktop] = useState(null);

  const adEl = useRef(null);
  let [width, height] = [null, null];
  if (
    adData &&
    adData.ad_unit &&
    adData.ad_unit.indexOf('728x90-300x250') === -1
  ) {
    [width, height] = adData.ad_unit
      .split('/')
      .slice(-1)[0]
      .split('x')
      .map((v) => {
        const num = /\d+/.exec(v);
        return num ? +num[0] : 400;
      });
  }

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

        var REFRESH_KEY = 'refresh';
        var REFRESH_VALUE = 'true';

        if (!ads.has(adData.gpt_id)) {
          if (adEl.current) {
            if (window.googletag && googletag.apiReady) {
              if (adData.ad_unit.indexOf('728x90-300x250') > 0) {
                window[adData.gpt_id] = googletag
                  .defineSlot(
                    adData.ad_unit,
                    [
                      [300, 250],
                      [728, 90],
                    ],
                    adData.gpt_id
                  )
                  .setTargeting(REFRESH_KEY, REFRESH_VALUE)
                  .addService(googletag.pubads());

                googletag
                  .pubads()
                  .addEventListener('impressionViewable', function (event) {
                    var slot = event.slot;
                    if (
                      slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1
                    ) {
                      setTimeout(function () {
                        googletag.pubads().refresh([slot]);
                      }, 10 * 1000);
                    }
                  });

                googletag.enableServices();
                var mapping = googletag
                  .sizeMapping()
                  .addSize([980, 90], [728, 90])
                  .addSize([320, 480], [300, 250])
                  .build();
                window[adData.gpt_id].defineSizeMapping(mapping);
              } else {
                window[adData.gpt_id] = googletag
                  .defineSlot(adData.ad_unit, [width, height], adData.gpt_id)
                  .setTargeting(REFRESH_KEY, REFRESH_VALUE)
                  .addService(googletag.pubads());

                googletag
                  .pubads()
                  .addEventListener('impressionViewable', function (event) {
                    var slot = event.slot;
                    if (
                      slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1
                    ) {
                      setTimeout(function () {
                        googletag.pubads().refresh([slot]);
                      }, 30 * 1000);
                    }
                  });
                googletag.enableServices();
              }

              googletag.cmd.push(function () {
                // googletag.pubads().collapseEmptyDivs();
              });

              googletag.cmd.push(function () {
                googletag.display(adData.gpt_id);
              });
              window.ads.add(adData.gpt_id);
            }
          }
        } else {
          if (adEl.current) {
            setTimeout(() => {
              if (adEl.current && !adEl.current.querySelector('iframe')) {
                googletag.cmd.push(function () {
                  // googletag.pubads().refresh([window[adData.gpt_id]]);
                });
              }
            }, 300);
          }
        }
      }
    }
  }, [adData, isDesktop, adEl]);

  return (
    <div
      style={{
        padding: '5px 0',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
      className={className}
    >
      {adData ? (
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
  );
};

export default MobileAd;

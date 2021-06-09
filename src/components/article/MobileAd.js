import { useEffect, useRef } from 'react';

const MobileAd = ({ adData, className, refresh }) => {
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
    if (adData && adData.ad_unit) {
      const id = 'gpt-script-' + adData.gpt_id;
      const adId = `ad_${adData.gpt_id.replace(/-/gi, '_')}`;

      let scriptContent = null;

      if (adData.ad_unit.indexOf('728x90-300x250') > 0) {
        scriptContent = `var ${adId} = googletag.defineSlot('${adData.ad_unit}', [[300, 250], [728, 90]], '${adData.gpt_id}').addService(googletag.pubads()); 
        googletag.enableServices(); 
        var mapping =
            googletag.sizeMapping().addSize([980, 90], [728, 90]).addSize([320, 480], [300, 250]).build();
            ${adId}.defineSizeMapping(mapping);
        `;
      } else {
        scriptContent = `var ${adId} = googletag.defineSlot('${adData.ad_unit}', [${width},${height}], '${adData.gpt_id}').addService(googletag.pubads()); 
                          googletag.enableServices(); `;
      }

      if (adEl.current) {
        if (!document.getElementById(id)) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.id = id;
          var code = `
                if(window.googletag && googletag.apiReady) {
                  googletag.cmd.push(function() {
                    googletag.pubads().collapseEmptyDivs();
                    ${scriptContent}
                    
                  }); 

                  setTimeout(()=>{
                    googletag.cmd.push(function() { 
                      googletag.display('${adData.gpt_id}'); 
                    });
                  },10)
              }`;
          s.appendChild(document.createTextNode(code));
          adEl.current.appendChild(s);
        }
      }
    }
  }, [adData]);

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

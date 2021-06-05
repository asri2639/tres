import { useEffect, useRef, useState } from 'react';

const FirstAd = ({ adData }) => {
  const adEl = useRef(null);

  let [width, height] = [300, 250];

  useEffect(() => {
    if (adData && adData.ad_unit) {
      const id = 'gpt-script- ' + adData.gpt_id;

      const scriptContent = `googletag.defineSlot('${adData.ad_unit}', [${width},${height}], '${adData.gpt_id}').addService(googletag.pubads()); 
                          googletag.enableServices(); `;

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
                  googletag.cmd.push(function() { 
                    googletag.display('${adData.gpt_id}'); 
                  });
              }`;
          s.appendChild(document.createTextNode(code));
          adEl.current.appendChild(s);
        }
      }
    }
  }, [adData]);

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
    </div>
  );
};

export default FirstAd;

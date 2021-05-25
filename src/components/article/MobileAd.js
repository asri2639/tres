import { useEffect } from 'react';

const MobileAd = ({ adData, className }) => {
  const slotArr = '[300, 250]';

  useEffect(() => {
    if (adData && document.querySelector(adData.gpt_id)) {
      console.log(adData);
      var s = document.createElement('script');
      s.type = 'text/javascript';
      var code = `
            if(window.googletag && googletag.apiReady) {
              googletag.cmd.push(function() {
                googletag.pubads().collapseEmptyDivs();
                googletag.defineSlot('${adData.ad_unit}', ${slotArr}, '${adData.gpt_id}').addService(googletag.pubads()); 
                googletag.enableServices(); 
              }); 
              googletag.cmd.push(function() { 
                googletag.display('${adData.gpt_id}'); 
              });
          }`;
      s.appendChild(document.createTextNode(code));
      document.querySelector('#' + adData.gpt_id).appendChild(s);
    }
  }, [adData]);

  return (
    <div id={adData.gpt_id} style={{ width: '300px', height: '250px' }}></div>
  );
  //   return <div>{JSON.stringify(adData)}</div>;
};

export default MobileAd;

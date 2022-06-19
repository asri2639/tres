import { useContext, useEffect, useRef, useState } from 'react';
import { TransitionContext } from '@pages/_app';

const MicroPayment = ({ contentId,title,index,url }) => {
  const isTransitioning = useContext(TransitionContext);

  useEffect(() => {
    
       

    const csc = window._csc;
                 csc('init', {
                 debug: false, // can be set to false to remove sdk non-error log output
                 contentId: contentId,
                 clientId: "6290aa6ba440b0205b72833b",
                 title: title,
                 isMobile: 'false',
                 screenType: 'beta',
                 accentColor: '#cc3333',
                 successCallback: 'console.log("hi")',
                 wrappingElementId: `csc-paywall-${contentId}`,
                 fullScreenMode: 'false',
                 })
  }, [index]);

  return (
    <>
    <div id={`csc-paywall-${contentId}`} />
    
    </>
  );
};

export default MicroPayment;

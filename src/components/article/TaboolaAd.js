import { useContext, useEffect, useRef, useState } from 'react';
import { TransitionContext } from '@pages/_app';

const TaboolaAd = ({ index,url }) => {
  const isTransitioning = useContext(TransitionContext);

  useEffect(() => {
    
        window._taboola = window._taboola || [];
        window._taboola.push({article:'auto', url:url});
    window._taboola.push({mode: 'thumbnails-a', 
    container: `taboola-below-article-thumbnails-${index}`, 
    placement: 'Below Article Thumbnails', target_type: 'mix'});
    window._taboola.push({ flush: true });
   

    
  }, [index]);

  return (
    <div id={`taboola-below-article-thumbnails-${index}`}></div>
  );
};

export default TaboolaAd;

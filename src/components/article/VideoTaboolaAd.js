import { useContext, useEffect, useRef, useState } from 'react';
import { TransitionContext } from '@pages/_app';

const VideoTaboolaAd = ({ index,url }) => {
  const isTransitioning = useContext(TransitionContext);

  useEffect(() => {
    
        window._taboola = window._taboola || [];
        _taboola.push({video:'auto'});
        // window._taboola.push({notify:'newPageLoad'});
        
        window._taboola.push({article:index, url:url});
    window._taboola.push({mode: 'alternating-thumbnails-a', 
    container: `taboola-below-videopage-thumbnails-${index}`, 
    placement: 'Below Videopage Thumbnails', target_type: 'mix'});
    window._taboola = window._taboola || [];
    window._taboola.push({ flush: true });
   

    
  }, [index]);

  return (
    <div id={`taboola-below-videopage-thumbnails-${index}`}></div>
  );
};

export default VideoTaboolaAd;

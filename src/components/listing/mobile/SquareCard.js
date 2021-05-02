import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { thumbnailExtractor } from '@utils/Helpers';
import { useContext, useEffect, useState } from 'react';

const SquareCard = ({ data, article, className }) => {
  const isRTL = useContext(RTLContext);

  const splitUrl = article.web_url.split('/');
  const thumbnail = thumbnailExtractor(article.thumbnails, '3_2', 's2b', null);
  return (
    <NavLink
      key={article.friendly_id}
      className={`flex flex-col pb-1 cursor-pointer rounded-md ${
        isRTL ? 'rtl' : ''
      } ${className}`}
      href={{
        pathname: '/[state]/[...slug]',
        query: { state: splitUrl[1], slug: splitUrl.slice(2).join('/') },
      }}
      as={`/${article.web_url}`}
      passHref
      onClick={() => {
        GoogleTagManager.articleClick(article);
      }}
    >
      <Thumbnail
        thumbnail={thumbnail}
        className={'rounded-t-md w-full'}
        type={''}
        creditSize={'no-size'}
      ></Thumbnail>

      <div className="video-icon"></div>

      <div className="h-12 my-2 pl-2 pr-1 text-sm text-gray-700 leading-tight">
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            WebkitLineClamp: '3',
          }}
        >
          {article.display_title}
        </div>
      </div>
    </NavLink>
  );
};

export default SquareCard;

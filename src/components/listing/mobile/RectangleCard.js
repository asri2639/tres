import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { thumbnailExtractor } from '@utils/Helpers';
import { useContext, useEffect, useState } from 'react';

const RectangleCard = ({ data, article, className }) => {
  const isRTL = useContext(RTLContext);

  const splitUrl = article.web_url.split('/');
  const thumbnail = thumbnailExtractor(article.thumbnails, '3_2', 's2b', null);

  return (
    <NavLink
      key={article.friendly_id}
      className={`flex justify-between px-1 pt-2 pb-1 cursor-pointer border ${
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
      <div className=" px-1 text-sm text-gray-700 leading-tight">
        {article.display_title}
      </div>

      <Thumbnail
        thumbnail={thumbnail}
        className={'rounded-md w-20'}
        type={''}
        creditSize={'no-size'}
      />
    </NavLink>
  );
};

export default RectangleCard;

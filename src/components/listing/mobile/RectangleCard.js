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
      className={`flex relative justify-between px-1 pt-2 pb-1 cursor-pointer border shadow ${
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
      <div className=" px-1 text-sm md:text-base text-gray-700 leading-tight">
        {article.display_title}
      </div>

      <Thumbnail
        thumbnail={thumbnail}
        className={'rounded-md w-24'}
        type={''}
        creditSize={'no-size'}
      />

      {article.has_videos ? (
        <img
          className="absolute w-5 bottom-2 right-2"
          src="/assets/images/video_big_icon-2x.png"
        />
      ) : null}
    </NavLink>
  );
};

export default RectangleCard;

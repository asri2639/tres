import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { thumbnailExtractor, linkInfoGenerator } from '@utils/Helpers';
import { useContext } from 'react';

const SquareCard = ({ data, article, className }) => {
  const isRTL = useContext(RTLContext);

  const linkInfo = linkInfoGenerator(article ? article.web_url : data.url);

  const thumbnail = article
    ? thumbnailExtractor(article.thumbnails, '3_2', 's2b', null)
    : data.thumbnails
    ? thumbnailExtractor(data.thumbnails, '3_2', 's2b', null)
    : null;

  return article ? (
    <NavLink
      key={article.friendly_id}
      className={`flex  flex-col pb-1 cursor-pointer rounded-md shadow ${
        isRTL ? 'rtl' : ''
      } ${className}`}
      href={linkInfo.href}
      as={linkInfo.as}
      passHref
      onClick={() => {
        GoogleTagManager.articleClick(article);
      }}
    >
      <div className="relative">
        <Thumbnail
          thumbnail={thumbnail}
          className={'rounded-t-md w-full'}
          type={''}
          creditSize={'no-size'}
        ></Thumbnail>

        {article.has_videos ? (
          <img
            className="absolute w-6 bottom-1 right-1"
            src="/assets/images/video_big_icon-2x.png"
          />
        ) : null}
      </div>
      <div className="video-icon"></div>

      <div className="h-12 my-2 pl-2 pr-1 text-gray-700 leading-tight">
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            WebkitLineClamp: '3',
          }}
          className="text-sm md:text-base relative -top-1"
        >
          {article.display_title}
        </div>
      </div>
    </NavLink>
  ) : data ? (
    <NavLink
      className={`flex md:text-lg relative flex-col pb-1 cursor-pointer rounded-md ${
        isRTL ? 'rtl' : ''
      } ${className}`}
      href={linkInfo.href}
      as={linkInfo.as}
      passHref
      onClick={() => {
        GoogleTagManager.seeAll(linkInfo);
      }}
    >
      {data.text}
      <div
        style={{
          backgroundImage: 'url(' + thumbnail.url + ')',
          backgroundSize: 'cover',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          zIndex: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: '0.3',
          borderRadius: '8px'
        }}
      ></div>
    </NavLink>
  ) : null;
};

export default SquareCard;

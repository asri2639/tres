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
    : null;

  return article ? (
    <NavLink
      key={article.friendly_id}
      className={`flex flex-col pb-1 cursor-pointer rounded-md shadow ${
        isRTL ? 'rtl' : ''
      } ${className}`}
      href={linkInfo.href}
      as={linkInfo.as}
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

      <div className="h-12 my-2 pl-2 pr-1 text-gray-700 leading-tight">
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            WebkitLineClamp: '3',
          }}
          className="text-sm md:text-base"
        >
          {article.display_title}
        </div>
      </div>
    </NavLink>
  ) : data ? (
    <NavLink
      className={`flex flex-col pb-1 cursor-pointer rounded-md ${
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
    </NavLink>
  ) : null;
};

export default SquareCard;

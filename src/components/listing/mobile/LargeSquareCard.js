import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { thumbnailExtractor, linkInfoGenerator } from '@utils/Helpers';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const LargeSquareCard = ({
  data,
  article,
  className,
  noDescription,
  styleObj,
}) => {
  const isRTL = useContext(RTLContext);
  const router = useRouter();

  const linkInfo = linkInfoGenerator(
    article ? article.web_url : data.url,
    router.query.state
  );

  const thumbnail = article
    ? thumbnailExtractor(article.thumbnails, '3_2', 's2b', 'breaking_news')
    : data.thumbnails
    ? thumbnailExtractor(data.thumbnails, '3_2', 's2b', 'breaking_news')
    : null;

  return article ? (
    <NavLink
      key={article.friendly_id}
      className={`flex h-full flex-col pb-1 cursor-pointer rounded-md shadow ${
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
          lazy={false}
          creditSize={'no-size'}
          styleObj={styleObj}
        ></Thumbnail>

        {article.overlay_tag ? (
          <img
            className="absolute bottom-0 left-0 h-full "
            src={`https://etvbharatimages.akamaized.net/images/live/${
              article.overlay_tag === 'live1' ? 'LIVE-1' : 'LIVE-2'
            }.png`}
          />
        ) : article.has_videos ? (
          <img
            className="absolute w-6 bottom-1 right-1"
            src="/assets/images/video_big_icon-2x.png"
          />
        ) : null}
      </div>

      <div className="h-12 my-2 pl-2 pr-1 text-gray-700 leading-tight">
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            WebkitLineClamp: '3',
          }}
          className={`text-sm md:text-base relative -top-1 ${
            isRTL ? 'rtl' : ''
          }`}
        >
          {noDescription ? '' : article.display_title}
        </div>
      </div>
    </NavLink>
  ) : null;
};

export default LargeSquareCard;

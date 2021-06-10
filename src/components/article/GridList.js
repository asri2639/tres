import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { thumbnailExtractor } from '@utils/Helpers';
import { useContext } from 'react';
import grid from './GridList.module.scss';
import { withTranslation } from '@i18n';

const GridList = ({ data }) => {
  const isRTL = useContext(RTLContext);
  return (
    <div className="w-full">
      <div className="text-xl font-bold text-gray-600 border-b">
        {data.ml_title[0].text.toUpperCase()}
      </div>
      <div className={`flex flex-wrap w-full ${grid.list} ${isRTL ? 'rtl' : ''}`}>
        {data.catalog_list_items.map((v) => {
          const splitUrl = v.web_url.split('/');
          const thumbnail = thumbnailExtractor(v.thumbnails, '3_2', 's2b','');

          return (
            <NavLink
              key={v.friendly_id}
              className="w-1/2 cursor-pointer relative"
              href={{
                pathname: '/[state]/[...slug]',
                query: {
                  state: splitUrl[1],
                  slug: splitUrl.slice(2).join('/'),
                },
              }}
              as={`/${v.web_url}`}
              passHref
              onClick={() => {
                GoogleTagManager.articleClick(v);
              }}
            >
              <Thumbnail thumbnail={thumbnail} className={'rounded-lg'} type={''} creditSize={'small'} />
              <div className="pt-2 leading-tight">{v.display_title}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default withTranslation('common')(GridList);

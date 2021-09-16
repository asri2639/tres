import NavLink from '@components/common/NavLink';
import Thumbnail from '@components/common/Thumbnail';
import { RTLContext } from '@components/layout/Layout';
import { linkInfoGenerator, thumbnailExtractor } from '@utils/Helpers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import popular from './PopularList.module.scss';
import { articleClick } from '@utils/GoogleTagManager';

const PopularList = ({ data }) => {
  const isRTL = useContext(RTLContext);
  const router = useRouter();

  const [currentSelection, setCurrentSelection] = useState(
    data.catalog_list_items[0].list_id
  );
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    setSelectedList(
      data.catalog_list_items.find((v) => v.list_id === currentSelection)
        .catalog_list_items
    );
  }, [currentSelection, selectedList]);

  return (
    <div className={`w-full border rounded-lg p-4`}>
      <div className="text-xl font-bold text-gray-600">
        {data.ml_title[0].text.toUpperCase()}
      </div>

      <div
        className={`py-4 ${
          isRTL ? 'text-base' : 'text-lg'
        } flex justify-center items-center space-x-2  border-t border-b font-bold divide-x divide-gray-600`}
      >
        {data.catalog_list_items.map((val) => {
          return (
            <div
              key={val.list_id}
              className={`pl-2 cursor-pointer ${
                currentSelection == val.list_id ? 'text-red-700' : ''
              }`}
              onClick={() => setCurrentSelection(val.list_id)}
            >
              {val.ml_title[0].text}
            </div>
          );
        })}
      </div>
      <div className={`space-y-5 my-3  ${popular.list}`}>
        {selectedList.map((v) => {
          const splitUrl = v.web_url.split('/');
          const thumbnail = thumbnailExtractor(
            v.thumbnails,
            '3_2',
            's2b',
            null
          );
          const linkInfo = linkInfoGenerator(v.web_url, router.query.state);

          return (
            <NavLink
              key={v.friendly_id}
              className={`flex cursor-pointer ${
                isRTL ? 'md:flex-row-reverse rtl' : ''
              } relative`}
              href={linkInfo.href}
              as={linkInfo.as}
              passHref
              onClick={() => {
                articleClick(v);
              }}
            >
              <div
                className="relative"
                style={{ flex: '1 0 30%', height: '80px' }}
              >
                <Thumbnail
                  thumbnail={{ ...thumbnail, alt_tags: v.alt_tags }}
                  className={'rounded-md w-32 max-w-32 min-w-32'}
                  type={''}
                  creditSize={'small'}
                />
              </div>
              <div className=" px-3 text-sm text-gray-700">
                {v.display_title}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default PopularList;

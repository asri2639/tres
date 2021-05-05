import NavLink from '@components/common/NavLink';
import eventBus from '@utils/EventBus';
import GoogleTagManager from '@utils/GoogleTagManager';
import { linkInfoGenerator } from '@utils/Helpers';
import { withTranslation } from 'react-i18next';
import SquareCard from './SquareCard';

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};
const SeeAll = ({ data, article, className, t }) => {
  const isEven = data.catalog_list_items.length % 2 === 0;
  const scope = {
    dropdown: false,
  };
  if (data.filter_type) {
    scope.dropdown = true;
    scope.text = 'select';
    switch (data.filter_type) {
      case 'select_cities':
        scope.type = 'city';
        break;
      case 'select_state':
        scope.type = 'state';
        break;
      case 'see_all':
        scope.dropdown = false;
        scope.text = data.filter_type;
        scope.see_all = true;
        scope.link_info = linkInfoGenerator(
          data.url.startsWith('/') ? data.url.slice(1) : data.url
        );
        break;
      default:
        scope.type = 'district';
        break;
    }
    scope.input_text = data[`dynamic_${scope.type}_name`]
      ? data[`dynamic_${scope.type}_name`][0].text
          .split(' ')
          .map(capitalize)
          .join(' ')
      : '';
  }

  return (
    <div className="my-2">
      <div className="flex w-full justify-between mb-1">
        <div className="pull-left eb-mostview-title">
          {data.ml_title[0].text}
        </div>

        {scope.dropdown ? (
          <div className="flex items-center ">
            <div className="pr-2 text-sm">{t(`${scope.text}`)}</div>
            <div className="flex items-center text-sm border border-gray-600 px-2 py-0 cursor-pointer"
             onClick={() => {
              eventBus.dispatch('state-selector', {
                show: true,
              });
            }}>
              <div>{scope.input_text}</div>
              <span className="pl-1 caret text-gray-700 "> &#9660;</span>
            </div>
          </div>
        ) : null}

        {scope.see_all ? (
          <NavLink
            className={`text-sm`}
            href={scope.link_info.href}
            as={scope.link_info.as}
            passHref
            onClick={() => {
              GoogleTagManager.articleClick(article);
            }}
          >
            {t(scope.text)}
          </NavLink>
        ) : null}
      </div>

      <div className="w-full flex flex-wrap">
        {data.catalog_list_items.map((item, ind) => {
          return (
            <div className="w-1/2 p-1 " key={item.friendly_id}>
              <SquareCard className="bg-white" article={item} />
            </div>
          );
        })}
        {!isEven ? (
          <div className="w-1/2 p-1" key={data.friendly_id + 'see_all'}>
            <SquareCard
              className="bg-white w-full h-full flex justify-center items-center"
              data={{
                text: t('see_all'),
                url: data.url.startsWith('/') ? data.url.slice(1) : data.url,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default withTranslation('common')(SeeAll);

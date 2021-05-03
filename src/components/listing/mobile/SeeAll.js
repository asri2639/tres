import SquareCard from './SquareCard';

const SeeAll = ({ data, article, className }) => {
  const records = {},
    x = {};
  return (
    <div className="row eb-auto most-viewed-auto">
      <div className="location-filter" ng-if="showfilter">
        <div className="container eb-section-headblock noborder">
          <div className="pull-left eb-mostview-title">
            {data.ml_title[0].text}
          </div>

          <div className="pull-right dropdown-group">
            <div className="eb-dropdown-key">
              <div
                className="eb-section-all-text"
                ng-click="selectLocation()"
                translate="{{queryText}}"
              ></div>
            </div>
            <div className="eb-drop-down-list" ng-click="selectLocation()">
              <div className="eb-section-all-data">
                {records.queryInputText}
              </div>
              <span className="caret"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap">
        {data.catalog_list_items.map((item, ind) => {
          return (
            <div className="w-1/2 p-1 " key={item.friendly_id}>
              <SquareCard className="bg-white" article={item} />
            </div>
          );
        })}
        <div className="w-1/2 p-1  " key={data.friendly_id + 'see_all'}>
          <SquareCard
            className="bg-white w-full h-full flex justify-center items-center"
            data={{
              text: 'See All',
              url: data.url.startsWith('/') ? data.url.slice(1) : data.url,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SeeAll;

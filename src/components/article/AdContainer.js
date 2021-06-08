import GridList from '@components/article/GridList';
import PopularList from '@components/article/PopularList';
import MobileAd from '@components/article/MobileAd';

const AdContainer = ({ data, className, listing, index }) => {
  return (
    <>
      {data.map((val, i) => {
        if (val.layout_type.indexOf('ad_unit') >= 0 && val.ad_conf) {
          let adData = null;
          if (!listing) {
            if (val.ad_conf.ads && val.ad_conf.ads[index + 1]) {
              adData = val.ad_conf.ads['' + (index + 1)];
            }
          } else {
            adData = val.ad_conf.responsive_ad;
          }
          console.log(adData);

          return adData ? (
            <MobileAd
              key={`ad-rhs-${i}-${adData.gpt_id}`}
              adData={{ ad_unit: adData.ad_unit_id, gpt_id: adData.gpt_id }}
            />
          ) : null;
        } else {
          switch (val.layout_type) {
            case 'most_popular':
              return <PopularList key={val.list_id} data={val} />;
            case 'four_plus_four_list':
            case 'latest_video_list':
              return <GridList key={val.list_id} data={val} />;
          }
        }
      })}
    </>
  );
};

export default AdContainer;

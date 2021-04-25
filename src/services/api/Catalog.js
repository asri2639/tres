import { APIRequest } from '@interfaces/API';

const controller = '/catalogs';

export default function Catalog(inst) {
  return {
    getLanguages({ params, query, config }= new APIRequest()) {
      return inst.get(
        `${controller}/city-state/items/india/languages?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getFooterDetails({ params, query, config }= new APIRequest()) {
      return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      );
    },
    getAppConfig({ params, query, config }= new APIRequest()) {
      // return inst.get(
      //   `${controller}/message/items/app-config-params.gzip?${new URLSearchParams(
      //     query
      //   )}`,
      //   config
      // );

      return Promise.resolve({
        data: {
          data: {
            title: 'app config params v2',
            platform_note: '',
            platform_code: 1020,
            content_id: '5e582ac06ad5506e72000000',
            text_message: '',
            app_code: 1020,
            params_hash: {},
            params_hash2: {
              config_params: {
                banner_ad: {
                  ad_unit_id: 'ca-app-pub-3940256099942544/2934735716',
                },
                web_lists: {
                  english: { tabs: 'web-left-menu' },
                  ka: { tabs: 'web-left-menu-karnataka' },
                  up: { tabs: 'web-left-menu-uttar-pradesh' },
                  ts: { tabs: 'web-left-menu-telangana' },
                  ap: { tabs: 'web-left-menu-andhra-pradesh' },
                  pb: { tabs: 'web-left-menu-punjab' },
                  kerala: { tabs: 'web-left-menu-kerala' },
                  'tamil-nadu': { tabs: 'web-left-menu-tamil-nadu' },
                  dl: { tabs: 'web-left-menu-delhi-1' },
                  or: { tabs: 'web-left-menu-odisha-1' },
                  ct: { tabs: 'web-left-menu-chhattisgarh-1' },
                  gj: { tabs: 'web-left-menu-gujarat' },
                  hp: { tabs: 'web-left-menu-himachal-pradesh' },
                  jh: { tabs: 'web-left-menu-jharkhand' },
                  uttarakhand: { tabs: 'web-left-menu-uttarakhand' },
                  assam: { tabs: 'web-left-menu-assam' },
                  haryana: { tabs: 'web-left-menu-haryana-1' },
                  jk: { tabs: 'web-left-menu-jammu-and-kashmir' },
                  rj: { tabs: 'web-left-menu-rajasthan' },
                  bh: { tabs: 'web-left-menu-bihar' },
                  mp: { tabs: 'web-left-menu-madhya-pradesh' },
                  mh: { tabs: 'web-left-menu-maharashtra' },
                  wb: { tabs: 'web-left-menu-west-bengal' },
                  urdu: { tabs: 'web-left-menu-urdu' },
                },
                msite_lists: {
                  english: {
                    tab: 'tabs-msite',
                    'left-menu': 'msite-new-left-menu',
                    'breaking-news': '',
                  },
                  'tamil-nadu': {
                    tab: 'tabs-msite-tamil-nadu',
                    'left-menu': 'msite-new-left-menu-tamil-nadu',
                    'breaking-news': '',
                  },
                  up: {
                    tab: 'tabs-msite-uttar-pradesh',
                    'left-menu': 'msite-new-left-menu-uttar-pradesh',
                    'breaking-news': '',
                  },
                  ts: {
                    tab: 'tabs-msite-telangana',
                    'left-menu': 'msite-new-left-menu-telangana',
                    'breaking-news': '',
                  },
                  ap: {
                    tab: 'tabs-msite-andhra-pradesh',
                    'left-menu': 'msite-new-left-menu-andhra-pradesh',
                    'breaking-news': '',
                  },
                  pb: {
                    tab: 'tabs-msite-punjab',
                    'left-menu': 'msite-new-left-menu-punjab',
                    'breaking-news': '',
                  },
                  kerala: {
                    tab: 'tabs-msite-kerala',
                    'left-menu': 'msite-new-left-menu-kerala',
                    'breaking-news': '',
                  },
                  or: {
                    tab: 'tabs-msite-odisha',
                    'left-menu': 'msite-new-left-menu-odisha',
                    'breaking-news': '',
                  },
                  dl: {
                    tab: 'tabs-msite-delhi',
                    'left-menu': 'msite-new-left-menu-delhi',
                    'breaking-news': '',
                  },
                  sk: {
                    tab: 'tabs-msite-sikkim',
                    'left-menu': 'left-menu-msite-sikkim',
                    'breaking-news': '',
                  },
                  ar: {
                    tab: 'tabs-msite-arunachal-pradesh',
                    'left-menu': 'left-menu-msite-arunachal-pradesh',
                    'breaking-news': '',
                  },
                  ct: {
                    tab: 'tabs-msite-chhattisgarh',
                    'left-menu': 'msite-new-left-menu-chhattisgarh',
                    'breaking-news': '',
                  },
                  gj: {
                    tab: 'tabs-msite-gujarat',
                    'left-menu': 'msite-new-left-menu-gujarat',
                    'breaking-news': '',
                  },
                  hp: {
                    tab: 'tabs-msite-himachal-pradesh',
                    'left-menu': 'msite-new-left-menu-himachal-pradesh',
                    'breaking-news': '',
                  },
                  jh: {
                    tab: 'tabs-msite-jharkhand',
                    'left-menu': 'msite-new-left-menu-jharkhand',
                    'breaking-news': '',
                  },
                  mn: {
                    tab: 'tabs-msite-manipur',
                    'left-menu': 'left-menu-msite-manipur',
                    'breaking-news': '',
                  },
                  urdu: {
                    tab: 'tabs-msite-urdu',
                    'left-menu': 'msite-new-left-menu-urdu',
                    'breaking-news': '',
                  },
                  wb: {
                    tab: 'tabs-msite-west-bengal',
                    'left-menu': 'msite-new-left-menu-west-bengal',
                    'breaking-news': '',
                  },
                  assam: {
                    tab: 'tabs-msite-assam',
                    'left-menu': 'msite-new-left-menu-assam',
                    'breaking-news': '',
                  },
                  uttarakhand: {
                    tab: 'tabs-msite-uttarakhand',
                    'left-menu': 'msite-new-left-menu-uttarakhand',
                    'breaking-news': '',
                  },
                  haryana: {
                    tab: 'tabs-msite-haryana',
                    'left-menu': 'msite-new-left-menu-haryana',
                    'breaking-news': '',
                  },
                  goa: {
                    tab: 'tabs-msite-goa',
                    'left-menu': 'left-menu-msite-goa',
                    'breaking-news': '',
                  },
                  rj: {
                    tab: 'tabs-msite-rajasthan',
                    'left-menu': 'msite-new-left-menu-rajasthan',
                    'breaking-news': '',
                  },
                  jk: {
                    tab: 'tabs-msite-jammu-and-kashmir',
                    'left-menu': 'msite-new-left-menu-jammu-and-kashmir',
                    'breaking-news': '',
                  },
                  bh: {
                    tab: 'tabs-msite-bihar',
                    'left-menu': 'msite-new-left-menu-bihar',
                    'breaking-news': '',
                  },
                  mp: {
                    tab: 'tabs-msite-madhya-pradesh',
                    'left-menu': 'msite-new-left-menu-madhya-pradesh',
                    'breaking-news': '',
                  },
                  mh: {
                    tab: 'tabs-msite-maharashtra',
                    'left-menu': 'msite-new-left-menu-maharashtra',
                    'breaking-news': '',
                  },
                  ka: {
                    tab: 'tabs-msite-karnataka',
                    'left-menu': 'msite-new-left-menu-karnataka',
                    'breaking-news': '',
                  },
                },
              
              
                fb_pages: {
                  english: {
                    fb_page_id: '535536636554265',
                    fb_og_url: 'https://www.etvbharat.com/english/national',
                  },
                  ka: {
                    fb_page_id: '237140823132274',
                    fb_og_url: 'https://www.etvbharat.com/kannada/karnataka',
                  },
                  up: {
                    fb_page_id: '437221806467127',
                    fb_og_url: 'https://www.etvbharat.com/hindi/uttar-pradesh',
                  },
                  ts: {
                    fb_page_id: '293625044364808',
                    fb_og_url: 'https://www.etvbharat.com/telugu/telangana',
                  },
                  ap: {
                    fb_page_id: '566258350226244',
                    fb_og_url:
                      'https://www.etvbharat.com/telugu/andhra-pradesh',
                  },
                  pb: {
                    fb_page_id: '197575554023880',
                    fb_og_url: 'https://www.etvbharat.com/punjabi/punjab',
                  },
                  kerala: {
                    fb_page_id: '360286340986057',
                    fb_og_url: 'https://www.etvbharat.com/malayalam/kerala',
                  },
                  'tamil-nadu': {
                    fb_page_id: '627365227415534',
                    fb_og_url: 'https://www.etvbharat.com/tamil/tamil-nadu',
                  },
                  dl: {
                    fb_page_id: '691931360950808',
                    fb_og_url: 'https://www.etvbharat.com/hindi/delhi',
                  },
                  or: {
                    fb_page_id: '891686374295219',
                    fb_og_url: 'https://www.etvbharat.com/oriya/odisha',
                  },
                  ct: {
                    fb_page_id: '849891471773067',
                    fb_og_url: 'https://www.etvbharat.com/hindi/chhattisgarh',
                  },
                  gj: {
                    fb_page_id: '1822104564740300',
                    fb_og_url: 'https://www.etvbharat.com/gujarati/gujarat',
                  },
                  hp: {
                    fb_page_id: '531064590374835',
                    fb_og_url:
                      'https://www.etvbharat.com/hindi/himachal-pradesh',
                  },
                  jh: {
                    fb_page_id: '958243007530700',
                    fb_og_url: 'https://www.etvbharat.com/hindi/jharkhand',
                  },
                  uttarakhand: {
                    fb_page_id: '1617170415208347',
                    fb_og_url: 'https://www.etvbharat.com/hindi/uttarakhand',
                  },
                  assam: {
                    fb_page_id: '1850384628581959',
                    fb_og_url: 'https://www.etvbharat.com/assamese/assam',
                  },
                  haryana: {
                    fb_page_id: '427691117414850',
                    fb_og_url: 'https://www.etvbharat.com/hindi/haryana',
                  },
                  jk: {
                    fb_page_id: '723564901128895',
                    fb_og_url:
                      'https://www.etvbharat.com/urdu/jammu-and-kashmir',
                  },
                  rj: {
                    fb_page_id: '1601467140140648',
                    fb_og_url: 'https://www.etvbharat.com/hindi/rajasthan',
                  },
                  bh: {
                    fb_page_id: '986686521351827',
                    fb_og_url: 'https://www.etvbharat.com/hindi/bihar',
                  },
                  mp: {
                    fb_page_id: '880493148688079',
                    fb_og_url: 'https://www.etvbharat.com/hindi/madhya-pradesh',
                  },
                  mh: {
                    fb_page_id: '280069825478171',
                    fb_og_url: 'https://www.etvbharat.com/marathi/maharashtra',
                  },
                  wb: {
                    fb_page_id: '528272720634806',
                    fb_og_url: 'https://www.etvbharat.com/bengali/west-bengal',
                  },
                  urdu: {
                    fb_page_id: '260522891333788',
                    fb_og_url: 'https://www.etvbharat.com/urdu/national',
                  },
                },
                ssr_details: {
                  english: {
                    video_details_link: 'web-video-details',
                    video_details_link_msite: 'video-details',
                  },
                  ka: {
                    video_details_link: 'web-video-details-karnataka-1',
                    video_details_link_msite: 'video-details-karnataka',
                  },
                  up: {
                    video_details_link: 'web-video-details-uttar-pradesh-1',
                    video_details_link_msite: 'video-details-uttar-pradesh',
                  },
                  ts: {
                    video_details_link: 'web-video-details-telangana-1',
                    video_details_link_msite: 'video-details-telangana',
                  },
                  ap: {
                    video_details_link: 'web-video-details-andhra-pradesh-1',
                    video_details_link_msite: 'video-details-andhra-pradesh',
                  },
                  pb: {
                    video_details_link: 'web-video-details-punjab-1',
                    video_details_link_msite: 'video-details-punjab',
                  },
                  kerala: {
                    video_details_link: 'web-video-details-kerala-1',
                    video_details_link_msite: 'video-details-kearala',
                  },
                  or: {
                    video_details_link: 'web-video-details-odisha-2',
                    video_details_link_msite: 'video-details-odisha-1',
                  },
                  dl: {
                    video_details_link: 'web-video-details-delhi-2',
                    video_details_link_msite: 'video-details-delhi-1',
                  },
                  sk: {
                    video_details_link: 'web-video-details-sikkim-2',
                    video_details_link_msite: 'video-details-sikkim-1',
                  },
                  ar: {
                    video_details_link: 'web-video-details-arunachal-pradesh-2',
                    video_details_link_msite:
                      'video-details-arunachal-pradesh-1',
                  },
                  ct: {
                    video_details_link: 'web-video-details-chhattisgarh-2',
                    video_details_link_msite: 'video-details-chhattisgarh-1',
                  },
                  gj: {
                    video_details_link: 'web-video-details-gujarat-1',
                    video_details_link_msite: 'video-details-gujarat',
                  },
                  hp: {
                    video_details_link: 'web-video-details-himachal-pradesh-1',
                    video_details_link_msite: 'video-details-himachal-pradesh',
                  },
                  jh: {
                    video_details_link: 'web-video-details-jharkhand-1',
                    video_details_link_msite: 'video-details-jharkhand',
                  },
                  mn: {
                    video_details_link: 'web-video-details-manipur-1',
                    video_details_link_msite: 'video-details-manipur',
                  },
                  wb: {
                    video_details_link: 'web-video-details-west-bengal-1',
                    video_details_link_msite: 'video-details-west-bengal',
                  },
                  assam: {
                    video_details_link: 'web-video-details-assam-1',
                    video_details_link_msite: 'video-details-assam',
                  },
                  uttarakhand: {
                    video_details_link: 'web-video-details-uttarakhand-1',
                    video_details_link_msite: 'video-details-uttarakhand',
                  },
                  haryana: {
                    video_details_link: 'web-video-details-haryana-2',
                    video_details_link_msite: 'video-details-haryana-1',
                  },
                  goa: {
                    video_details_link: 'web-video-details-goa-1',
                    video_details_link_msite: 'video-details-goa',
                  },
                  rj: {
                    video_details_link: 'web-video-details-rajasthan-1',
                    video_details_link_msite: 'video-details-rajasthan',
                  },
                  jk: {
                    video_details_link: 'web-video-details-jammu-and-kashmir-1',
                    video_details_link_msite: 'video-details-jammu-and-kashmir',
                  },
                  bh: {
                    video_details_link: 'web-video-details-bihar-1',
                    video_details_link_msite: 'video-details-bihar',
                  },
                  mp: {
                    video_details_link: 'web-video-details-madhya-pradesh-1',
                    video_details_link_msite: 'video-details-madhya-pradesh',
                  },
                  mh: {
                    video_details_link: 'web-video-details-maharashtra-1',
                    video_details_link_msite: 'video-details-maharashtra',
                  },
                  urdu: {
                    video_details_link: 'web-video-details-urdu-1',
                    video_details_link_msite: 'video-details-urdu',
                  },
                  'tamil-nadu': {
                    video_details_link: 'web-video-details-tamil-nadu-1',
                    video_details_link_msite: 'video-details-tamil-nadu',
                  },
                },
              },
              sticky_ads: { ad_id: 'ETB-APP-Test-300x250' },
            },
            app_version: { upgrade_type: 'no_upgrade', message: '' },
            regions: ['IN'],
            order: -1,
            type: 'config_params',
            friendly_id: 'app-config-params-v2',
            catalog_id: '58ef1e2399728d08aa000007',
          },
        },
      });
    },
    getPageAds({ params, query, config }= new APIRequest()) {
      return inst.get(`/page_ads?${new URLSearchParams(query)}`, config);
    },
  };
}

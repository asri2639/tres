import { APIRequest } from '@interfaces/API';

const controller = '/catalogs';

export default function Catalog(inst) {
  return {
    getLanguages({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/city-state/items/india/languages?${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    getFooterDetails({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/message/items/footer-api?${new URLSearchParams(query)}`,
        config
      );
    },
    getAppConfig({ params, query, ...config }: APIRequest) {
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
                reminder_interval: '7200000',
                feedback: {
                  email: 'feedback@etv.co.in',
                  catalog_id: '5a17e3132db2265f430006a8',
                  friendly_id: 'feedback',
                },
                qa: {
                  catalog_id: '58bfa9cc017785478f0000a6',
                  friendly_id: 'qa',
                },
                'post-a-query': {
                  catalog_id: '5a0ec2522db2265f43000150',
                  friendly_id: 'post-a-query',
                },
                newsroom_tabs: [{ en: 'home-1' }, { ka: 'home-karnataka-2' }],
                layout_web_tabs: [
                  { en: 'web-left-menu' },
                  { ka: 'web-left-menu-karnataka' },
                ],
                layout_android_tabs: [{ en: 'tabs' }, { ka: 'tabs-karnataka' }],
                android_version: {
                  current_version: '1.1.1',
                  min_version: '0.1',
                  force_upgrade: false,
                  message:
                    'App is below minimum version. Please upgrade the app to continue',
                },
                ios_version: {
                  current_version: '1.0.7',
                  min_version: '0.1',
                  force_upgrade: false,
                  message:
                    'App is below minimum version. Please upgrade the app to continue',
                },
                dnd: { start_time: '22:30', end_time: '06:30' },
                offline_preferences: [
                  { profile_name: 'sd_profile6', display_name: 'Low-144p' },
                  { profile_name: 'sd_profile5', display_name: 'Low-144p' },
                  { profile_name: 'sd_profile4', display_name: 'Low-144p' },
                  { profile_name: 'sd_profile3', display_name: 'Low-144p' },
                  { profile_name: 'sd_profile2', display_name: 'Medium-360p' },
                  { profile_name: 'sd_profile1', display_name: 'HD-720p' },
                  { profile_name: 'hd_profile1', display_name: 'HD-720p' },
                ],
                banner_ad: {
                  ad_unit_id: 'ca-app-pub-3940256099942544/2934735716',
                },
                upload_source: {
                  citizen_journalism: 'citizen',
                  consult_expert: 'cye',
                  url: 'https://citizen.etvbharat.com/',
                  session_id: '5cfa7abc82bb61c0e73f85a6285911f8',
                },
                about_us: { url: 'https://www.etvbharat.com/aboutus.html' },
                contact_us: { url: 'https://www.etvbharat.com/contactus.html' },
                tac: { url: 'https://www.etvbharat.com/tac.html' },
                privacy_policy: {
                  url: 'https://www.etvbharat.com/privacypolicy.html',
                },
                consult_your_expert: {
                  friendly_id: 'consult-your-expert-list',
                },
                subscription_list: {
                  list_id: '5a1ff9c62db2264dea0003a6',
                  friendly_id: 'subscription-list',
                },
                all_lists: {
                  english: {
                    tab: 'tabs',
                    'left-menu': 'app-new-left-menu',
                    'breaking-news': 'bharat-breaking-news-list',
                  },
                  ka: {
                    tab: 'tabs-karnataka',
                    'left-menu': 'app-new-left-menu-karnataka',
                    'breaking-news': 'bharat-breaking-news-list-karnataka',
                  },
                  up: {
                    tab: 'tabs-uttar-pradesh',
                    'left-menu': 'app-new-left-menu-uttar-pradesh',
                    'breaking-news': 'bharat-breaking-news-list-uttar-pradesh',
                  },
                  ts: {
                    tab: 'tabs-telangana',
                    'left-menu': 'app-new-left-menu-telangana',
                    'breaking-news': 'bharat-breaking-news-list-telangana',
                  },
                  ap: {
                    tab: 'tabs-andhra-pradesh',
                    'left-menu': 'app-new-left-menu-andhra-pradesh',
                    'breaking-news': 'bharat-breaking-news-list-andhra-pradesh',
                  },
                  pb: {
                    tab: 'tabs-punjab',
                    'left-menu': 'app-new-left-menu-punjab',
                    'breaking-news': 'bharat-breaking-news-list-punjab',
                  },
                  kerala: {
                    tab: 'tabs-kerala',
                    'left-menu': 'app-new-left-menu-kerala',
                    'breaking-news': 'bharat-breaking-news-list-kerala',
                  },
                  'tamil-nadu': {
                    tab: 'tabs-tamil-nadu',
                    'left-menu': 'app-new-left-menu-tamil-nadu',
                    'breaking-news': 'bharat-breaking-news-list-tamil-nadu',
                  },
                  dl: {
                    tab: 'tabs-delhi',
                    'left-menu': 'app-new-left-menu-delhi',
                    'breaking-news': 'bharat-breaking-news-list-delhi',
                  },
                  or: {
                    tab: 'tabs-odisha-1',
                    'left-menu': 'app-new-left-menu-odisha',
                    'breaking-news': 'bharat-breaking-news-list-odisha-1',
                  },
                  ct: {
                    tab: 'tabs-chhattisgarh',
                    'left-menu': 'app-new-left-menu-chhattisgarh',
                    'breaking-news': 'bharat-breaking-news-list-chhattisgarh-1',
                  },
                  gj: {
                    tab: 'tabs-gujarat-1',
                    'left-menu': 'app-new-left-menu-gujarat',
                    'breaking-news': 'bharat-breaking-news-list-gujarat-1',
                  },
                  hp: {
                    tab: 'tabs-himachal-pradesh',
                    'left-menu': 'app-new-left-menu-himachal-pradesh',
                    'breaking-news':
                      'bharat-breaking-news-list-himachal-pradesh',
                  },
                  jh: {
                    tab: 'tabs-jharkhand',
                    'left-menu': 'app-new-left-menu-jharkhand',
                    'breaking-news': 'bharat-breaking-news-list-jharkhand',
                  },
                  wb: {
                    tab: 'tabs-west-bengal',
                    'left-menu': 'app-new-left-menu-west-bengal',
                    'breaking-news': 'bharat-breaking-news-list-west-bengal',
                  },
                  uttarakhand: {
                    tab: 'tabs-uttarakhand',
                    'left-menu': 'app-new-left-menu-uttarakhand',
                    'breaking-news': 'bharat-breaking-news-list-uttarakhand',
                  },
                  assam: {
                    tab: 'tabs-assam',
                    'left-menu': 'app-new-left-menu-assam',
                    'breaking-news': 'bharat-breaking-news-list-assam',
                  },
                  haryana: {
                    tab: 'tabs-haryana',
                    'left-menu': 'app-new-left-menu-haryana',
                    'breaking-news': 'bharat-breaking-news-list-haryana-1',
                  },
                  jk: {
                    tab: 'tabs-jammu-and-kashmir',
                    'left-menu': 'app-new-left-menu-jammu-and-kashmir',
                    'breaking-news':
                      'bharat-breaking-news-list-jammu-and-kashmir',
                  },
                  rj: {
                    tab: 'tabs-rajasthan-2',
                    'left-menu': 'app-new-left-menu-rajasthan',
                    'breaking-news': 'bharat-breaking-news-list-rajasthan',
                  },
                  bh: {
                    tab: 'tabs-bihar',
                    'left-menu': 'app-new-left-menu-bihar',
                    'breaking-news': 'bharat-breaking-news-list-bihar',
                  },
                  mp: {
                    tab: 'tabs-madhya-pradesh',
                    'left-menu': 'app-new-left-menu-madhya-pradesh',
                    'breaking-news': 'bharat-breaking-news-list-madhya-pradesh',
                  },
                  mh: {
                    tab: 'tabs-maharashtra',
                    'left-menu': 'app-new-left-menu-maharashtra',
                    'breaking-news': 'bharat-breaking-news-list-maharashtra',
                  },
                  urdu: {
                    tab: 'tabs-urdu-1',
                    'left-menu': 'app-new-left-menu-urdu',
                    'breaking-news': 'bharat-breaking-news-list-urdu',
                  },
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
                ad_type: 'VAST',
                app_city_state: {
                  'tamil-nadu': {
                    district_page: 'common-district-pagetamil-nadu',
                    city_page: 'common-city-page-tamil-nadu',
                    state_page: '',
                    state_home_page: 'app-new-state-home-tamil-nadu',
                    city_home_page: 'city-home-screen-tamil-nadu',
                  },
                  up: {
                    district_page: 'common-district-pageuttar-pradesh',
                    city_page: 'common-city-page-uttar-pradesh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-uttar-pradesh',
                    city_home_page: 'city-home-screen-uttar-pradesh',
                  },
                  ts: {
                    district_page: 'common-district-pagetelangana',
                    city_page: 'common-city-page-telangana',
                    state_page: '',
                    state_home_page: 'app-new-state-home-telangana',
                    city_home_page: 'city-home-screen-telangana',
                  },
                  ap: {
                    district_page: 'common-district-pageandhra-pradesh',
                    city_page: 'common-city-page-andhra-pradesh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-andhra-pradesh',
                    city_home_page: 'city-home-screen-andhra-pradesh',
                  },
                  pb: {
                    district_page: 'common-district-pagepunjab',
                    city_page: 'common-city-page-punjab',
                    state_page: '',
                    state_home_page: 'app-new-state-home-punjab',
                    city_home_page: 'city-home-screen-punjab',
                  },
                  kerala: {
                    district_page: 'common-district-pagekerala',
                    city_page: 'common-city-page-kerala',
                    state_page: '',
                    state_home_page: 'app-new-state-home-kerala',
                    city_home_page: 'city-home-screen-kearala',
                  },
                  or: {
                    district_page: 'common-district-pageodisha',
                    city_page: 'common-city-page-odisha',
                    state_page: '',
                    state_home_page: 'app-new-state-home-odisha',
                    city_home_page: 'city-home-screen-odisha-1',
                  },
                  dl: {
                    district_page: 'common-district-pagedelhi',
                    city_page: 'common-city-page-delhi',
                    state_page: '',
                    state_home_page: 'app-new-state-home-delhi',
                    city_home_page: 'city-home-screen-delhi',
                  },
                  sk: {
                    district_page: 'common-district-pagesikkim',
                    city_page: 'common-city-page-sikkim',
                    state_page: '',
                    state_home_page: 'app-new-state-home-sikkim',
                    city_home_page: 'city-home-screen-sikkim-1',
                  },
                  ar: {
                    district_page: 'common-district-pagearunachal-pradesh',
                    city_page: 'common-city-page-arunachal-pradesh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-arunachal-pradesh',
                    city_home_page: 'city-home-screen-arunachal-pradesh-1',
                  },
                  ct: {
                    district_page: 'common-district-pagechhattisgarh',
                    city_page: 'common-city-page-chhattisgarh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-chhattisgarh',
                    city_home_page: 'city-home-screen-chhattisgarh-1',
                  },
                  gj: {
                    district_page: 'common-district-pagegujarat',
                    city_page: 'common-city-page-gujarat',
                    state_page: '',
                    state_home_page: 'app-new-state-home-gujarat',
                    city_home_page: 'city-home-screen-gujarat-1',
                  },
                  hp: {
                    district_page: 'common-district-pagehimachal-pradesh',
                    city_page: 'common-city-page-himachal-pradesh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-himachal-pradesh',
                    city_home_page: 'city-home-screen-himachal-pradesh',
                  },
                  jh: {
                    district_page: 'common-district-pagejharkhand',
                    city_page: 'common-city-page-jharkhand',
                    state_page: '',
                    state_home_page: 'app-new-state-home-jharkhand',
                    city_home_page: 'city-home-screen-jharkhand',
                  },
                  mn: {
                    district_page: 'common-district-pagemanipur',
                    city_page: 'common-city-page-manipur',
                    state_page: '',
                    state_home_page: 'app-new-state-home-manipur',
                    city_home_page: 'city-home-screen-manipur',
                  },
                  wb: {
                    district_page: 'common-district-pagewest-bengal',
                    city_page: 'common-city-page-west-bengal',
                    state_page: '',
                    state_home_page: 'app-new-state-home-west-bengal',
                    city_home_page: 'city-home-screen-west-bengal',
                  },
                  assam: {
                    district_page: 'common-district-pageassam',
                    city_page: 'common-city-page-assam',
                    state_page: '',
                    state_home_page: 'app-new-state-home-assam',
                    city_home_page: 'city-home-screen-assam',
                  },
                  uttarakhand: {
                    district_page: 'common-district-pageuttarakhand',
                    city_page: 'common-city-page-uttarakhand',
                    state_page: '',
                    state_home_page: 'app-new-state-home-uttarakhand',
                    city_home_page: 'city-home-screen-uttarakhand',
                  },
                  haryana: {
                    district_page: 'common-district-pageharyana',
                    city_page: 'common-city-page-haryana',
                    state_page: '',
                    state_home_page: 'app-new-state-home-haryana',
                    city_home_page: 'city-home-screen-haryana-1',
                  },
                  goa: {
                    district_page: 'common-district-pagegoa',
                    city_page: 'common-city-page-goa',
                    state_page: '',
                    state_home_page: 'app-new-state-home-goa',
                    city_home_page: 'city-home-screen-goa',
                  },
                  rj: {
                    district_page: 'common-district-pagerajasthan',
                    city_page: 'common-city-page-rajasthan',
                    state_page: '',
                    state_home_page: 'app-new-state-home-rajasthan',
                    city_home_page: 'city-home-screen-rajasthan',
                  },
                  jk: {
                    district_page: 'common-district-pagejammu-and-kashmir',
                    city_page: 'common-city-page-jammu-and-kashmir',
                    state_page: '',
                    state_home_page: 'app-new-state-home-jammu-and-kashmir',
                    city_home_page: 'city-home-screen-jammu-and-kashmir',
                  },
                  bh: {
                    district_page: 'common-district-pagebihar',
                    city_page: 'common-city-page-bihar',
                    state_page: '',
                    state_home_page: 'app-new-state-home-bihar',
                    city_home_page: 'city-home-screen-bihar',
                  },
                  mp: {
                    district_page: 'common-district-pagemadhya-pradesh',
                    city_page: 'common-city-page-madhya-pradesh',
                    state_page: '',
                    state_home_page: 'app-new-state-home-madhya-pradesh',
                    city_home_page: 'city-home-screen-madhya-pradesh',
                  },
                  mh: {
                    district_page: 'common-district-pagemaharashtra',
                    city_page: 'common-city-page-maharashtra',
                    state_page: '',
                    state_home_page: 'app-new-state-home-maharashtra',
                    city_home_page: 'city-home-screen-maharashtra',
                  },
                  ka: {
                    district_page: 'common-district-page-karnataka',
                    city_page: 'common-city-page-karnataka',
                    state_page: '',
                    state_home_page: 'app-new-state-home-karnataka',
                    city_home_page: 'city-home-screen-karnataka',
                  },
                  urdu: {
                    district_page: '',
                    city_page: 'common-city-page-urdu',
                    state_page: 'common-district-pageurdu',
                    state_home_page: 'app-new-state-home-urdu',
                    city_home_page: 'city-home-screen-urdu',
                  },
                  english: {
                    district_page: '',
                    city_page: 'common-city-page',
                    state_page: 'common-district-page',
                    state_home_page: 'app-new-state-home',
                    city_home_page: 'city-home-screen',
                  },
                },
                msite_city_state: {
                  ka: {
                    district_page: 'common-district-page-msite-karnataka',
                    city_page: 'common-city-page-msite-karnataka',
                    state_page: '',
                    state_home_page: 'state-home-msite-karnataka',
                    city_home_page: 'city-home-screen-msite-karnataka',
                  },
                  'tamil-nadu': {
                    district_page: 'common-district-page-msite-tamil-nadu',
                    city_page: 'common-city-page-msite-tamil-nadu',
                    state_page: '',
                    state_home_page: 'state-home-msite-tamil-nadu',
                    city_home_page: 'city-home-screen-msite-tamil-nadu',
                  },
                  up: {
                    district_page: 'common-district-page-msite-uttar-pradesh',
                    city_page: 'common-city-page-msite-uttar-pradesh',
                    state_page: '',
                    state_home_page: 'state-home-msite-uttar-pradesh',
                    city_home_page: 'city-home-screen-msite-uttar-pradesh',
                  },
                  ts: {
                    district_page: 'common-district-page-msite-telangana',
                    city_page: 'common-city-page-msite-telangana',
                    state_page: '',
                    state_home_page: 'state-home-msite-telangana',
                    city_home_page: 'city-home-screen-msite-telangana',
                  },
                  ap: {
                    district_page: 'common-district-page-msite-andhra-pradesh',
                    city_page: 'common-city-page-msite-andhra-pradesh',
                    state_page: '',
                    state_home_page: 'state-home-msite-andhra-pradesh',
                    city_home_page: 'city-home-screen-msite-andhra-pradesh',
                  },
                  pb: {
                    district_page: 'common-district-page-msite-punjab',
                    city_page: 'common-city-page-msite-punjab',
                    state_page: '',
                    state_home_page: 'state-home-msite-punjab',
                    city_home_page: 'city-home-screen-msite-punjab',
                  },
                  kerala: {
                    district_page: 'common-district-page-msite-kerala',
                    city_page: 'common-city-page-msite-kerala',
                    state_page: '',
                    state_home_page: 'state-home-msite-kerala',
                    city_home_page: 'city-home-screen-msite-kerala',
                  },
                  or: {
                    district_page: 'common-district-page-msite-odisha',
                    city_page: 'common-city-page-msite-odisha',
                    state_page: '',
                    state_home_page: 'state-home-msite-odisha',
                    city_home_page: 'city-home-screen-msite-odisha',
                  },
                  dl: {
                    district_page: 'common-district-page-msite-delhi',
                    city_page: 'common-city-page-msite-delhi',
                    state_page: '',
                    state_home_page: 'state-home-msite-delhi',
                    city_home_page: 'city-home-screen-msite-delhi',
                  },
                  sk: {
                    district_page: 'common-district-page-msite-sikkim',
                    city_page: 'common-city-page-msite-sikkim',
                    state_page: '',
                    state_home_page: 'state-home-msite-sikkim',
                    city_home_page: 'city-home-screen-msite-sikkim',
                  },
                  ar: {
                    district_page:
                      'common-district-page-msite-arunachal-pradesh',
                    city_page: 'common-city-page-msite-arunachal-pradesh',
                    state_page: '',
                    state_home_page: 'state-home-msite-arunachal-pradesh',
                    city_home_page: 'city-home-screen-msite-arunachal-pradesh',
                  },
                  ct: {
                    district_page: 'common-district-page-msite-chhattisgarh',
                    city_page: 'common-city-page-msite-chhattisgarh',
                    state_page: '',
                    state_home_page: 'state-home-msite-chhattisgarh',
                    city_home_page: 'city-home-screen-msite-chhattisgarh',
                  },
                  gj: {
                    district_page: 'common-district-page-msite-gujarat',
                    city_page: 'common-city-page-msite-gujarat',
                    state_page: '',
                    state_home_page: 'state-home-msite-gujarat',
                    city_home_page: 'city-home-screen-msite-gujarat',
                  },
                  hp: {
                    district_page:
                      'common-district-page-msite-himachal-pradesh',
                    city_page: 'common-city-page-msite-himachal-pradesh',
                    state_page: '',
                    state_home_page: 'state-home-msite-himachal-pradesh',
                    city_home_page: 'city-home-screen-msite-himachal-pradesh',
                  },
                  jh: {
                    district_page: 'common-district-page-msite-jharkhand',
                    city_page: 'common-city-page-msite-jharkhand',
                    state_page: '',
                    state_home_page: 'state-home-msite-jharkhand',
                    city_home_page: 'city-home-screen-msite-jharkhand',
                  },
                  mn: {
                    district_page: 'common-district-page-msite-manipur',
                    city_page: 'common-city-page-msite-manipur',
                    state_page: '',
                    state_home_page: 'state-home-msite-manipur',
                    city_home_page: 'city-home-screen-msite-manipur',
                  },
                  wb: {
                    district_page: 'common-district-page-msite-urdu',
                    city_page: 'common-city-page-msite-urdu',
                    state_page: '',
                    state_home_page: 'state-home-msite-urdu',
                    city_home_page: 'city-home-screen-msite-urdu',
                  },
                  assam: {
                    district_page: 'common-district-page-msite-assam',
                    city_page: 'common-city-page-msite-assam',
                    state_page: '',
                    state_home_page: 'state-home-msite-assam',
                    city_home_page: 'city-home-screen-msite-assam',
                  },
                  uttarakhand: {
                    district_page: 'common-district-page-msite-uttarakhand',
                    city_page: 'common-city-page-msite-uttarakhand',
                    state_page: '',
                    state_home_page: 'state-home-msite-uttarakhand',
                    city_home_page: 'city-home-screen-msite-uttarakhand',
                  },
                  haryana: {
                    district_page: 'common-district-page-msite-haryana',
                    city_page: 'common-city-page-msite-haryana',
                    state_page: '',
                    state_home_page: 'state-home-msite-haryana',
                    city_home_page: 'city-home-screen-msite-haryana',
                  },
                  goa: {
                    district_page: 'common-district-page-msite-goa',
                    city_page: 'common-city-page-msite-goa',
                    state_page: '',
                    state_home_page: 'state-home-msite-goa',
                    city_home_page: 'city-home-screen-msite-goa',
                  },
                  rj: {
                    district_page: 'common-district-page-msite-rajasthan',
                    city_page: 'common-city-page-msite-rajasthan',
                    state_page: '',
                    state_home_page: 'state-home-msite-rajasthan',
                    city_home_page: 'city-home-screen-msite-rajasthan',
                  },
                  jk: {
                    district_page:
                      'common-district-page-msite-jammu-and-kashmir',
                    city_page: 'common-city-page-msite-jammu-and-kashmir',
                    state_page: '',
                    state_home_page: 'state-home-msite-jammu-and-kashmir',
                    city_home_page: 'city-home-screen-msite-jammu-and-kashmir',
                  },
                  bh: {
                    district_page: 'common-district-page-msite-bihar',
                    city_page: 'common-city-page-msite-bihar',
                    state_page: '',
                    state_home_page: 'state-home-msite-bihar',
                    city_home_page: 'city-home-screen-msite-bihar',
                  },
                  mp: {
                    district_page: 'common-district-page-msite-madhya-pradesh',
                    city_page: 'common-city-page-msite-madhya-pradesh',
                    state_page: '',
                    state_home_page: 'state-home-msite-madhya-pradesh',
                    city_home_page: 'city-home-screen-msite-madhya-pradesh',
                  },
                  mh: {
                    district_page: 'common-district-page-msite-maharashtra',
                    city_page: 'common-city-page-msite-maharashtra',
                    state_page: '',
                    state_home_page: 'state-home-msite-maharashtra',
                    city_home_page: 'city-home-screen-msite-maharashtra',
                  },
                  english: {
                    district_page: '',
                    city_page: 'common-city-page-msite',
                    state_page: 'common-district-page-msite',
                    state_home_page: 'state-home-msite',
                    city_home_page: 'city-home-screen-msite',
                  },
                  urdu: {
                    district_page: '',
                    city_page: 'common-city-page-msite-urdu',
                    state_page: 'common-district-page-msite-urdu',
                    state_home_page: 'state-home-msite-urdu',
                    city_home_page: 'city-home-screen-msite-urdu',
                  },
                },
                thumbnails: {
                  breaking_lower: {
                    url:
                      'https://etvbharatimages.akamaized.net/etvbharat/images/breaking-lower.png',
                  },
                  breaking_plate: {
                    url:
                      'https://etvbharatimages.akamaized.net/etvbharat/images/breaking-plate.jpg',
                  },
                  live1: {
                    url:
                      'https://etvbharatimages.akamaized.net/images/live/LIVE-1.png',
                  },
                  live2: {
                    url:
                      'https://etvbharatimages.akamaized.net/images/live/LIVE-2.png',
                  },
                  live3: {
                    url:
                      'https://etvbharatimages.akamaized.net/images/live/LIVE-3.png',
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
                carousel_on_selection: {
                  english: {
                    'dynamic-list': 'app-new-headlines-district-carousel1',
                  },
                  'tamil-nadu': {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-tamil-nadu',
                  },
                  up: {
                    'dynamic-list':
                      'friendly_id:app-new-headlines-district-carousel1-uttar-pradesh',
                  },
                  ts: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-telangana',
                  },
                  ap: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-andhra-pradesh',
                  },
                  pb: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-punjab',
                  },
                  kerala: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-kerala',
                  },
                  or: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-odisha',
                  },
                  dl: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-delhi',
                  },
                  ct: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-chhattisgarh',
                  },
                  gj: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-gujarat',
                  },
                  hp: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-himachal-pradesh',
                  },
                  jh: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-jharkhand',
                  },
                  urdu: {
                    'dynamic-list': 'app-new-headlines-district-carousel1-urdu',
                  },
                  wb: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-west-bengal',
                  },
                  assam: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-assam',
                  },
                  uttarakhand: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-uttarakhand',
                  },
                  haryana: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-haryana',
                  },
                  rj: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-rajasthan',
                  },
                  jk: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-jammu-and-kashmir',
                  },
                  bh: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-bihar',
                  },
                  mp: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-madhya-pradesh',
                  },
                  mh: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-maharashtra',
                  },
                  ka: {
                    'dynamic-list':
                      'app-new-headlines-district-carousel1-karnataka',
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
    getPageAds({ params, query, ...config }: APIRequest) {
      return inst.get(`/page_ads?${new URLSearchParams(query)}`, config);
    },
  };
}

import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;
const controller = '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      const url = new URL(params.play_url);
      return fetch(
        `https://prod.suv.etvbharat.com/v2/smart_urls/${
          url.pathname.split('/').slice(-1)[0]
        }?service_id=10&play_url=yes&video_duration=yes&protocol=hls&us=${
          params.hash
        }&auth_token=xBUKcKnXfngfrqGoF93y`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          // mode: 'no-cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    },
  };
}

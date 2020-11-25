import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;
// const controller = '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      const promise = new Promise(function (resolve, reject) {
        const url = new URL(params.play_url);
        let xhr = new XMLHttpRequest();
        xhr.open(
          'GET',
          `https://prod.suv.etvbharat.com/v2/smart_urls/${
            url.pathname.split('/').slice(-1)[0]
          }?service_id=10&play_url=yes${
            env === 'staging' ? '&env=staging' : ''
          }&video_duration=yes&protocol=hls&us=${
            params.hash
          }&auth_token=xBUKcKnXfngfrqGoF93y`
        );
        xhr.responseType = 'json';
        xhr.send();

        xhr.onload = function () {
          let responseObj = xhr.response;
          resolve(responseObj);
        };

        xhr.onerror = function (err) {
          reject(err);
        };
      });

      return promise;
    },
  };
}

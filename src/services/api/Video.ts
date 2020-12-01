import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;
// const controller = '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      if (env === 'development') {
        return inst.get(
          `/v2/smart_urls/${params.play_url.split('smart_urls')[1].slice(1)}${
            params.hash
          }&auth_token=xBUKcKnXfngfrqGoF93y`,
          config
        );
      }

      const promise = new Promise(function (resolve, reject) {
        const url = new URL(params.play_url);

        const apiUrl =
          `https://prod.suv.etvbharat.com/v2/smart_urls/` + env === 'staging'
            ? `${
                url.pathname.split('/').slice(-1)[0]
              }?service_id=10&play_url=yes${
                env === 'staging' ? '&env=staging' : ''
              }&video_duration=yes&protocol=hls&us=${params.hash}&auth_token=${
                params.auth || 'xBUKcKnXfngfrqGoF93y'
              }`
            : `${params.play_url.split('smart_urls')[1].slice(1)}${
                params.hash
              }&auth_token=xBUKcKnXfngfrqGoF93y`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl);
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

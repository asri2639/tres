import { APIRequest } from '@interfaces/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = publicRuntimeConfig.APP_ENV;

const controller = '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}v2/smart_urls/${
          params.play_url.split('/').slice(-1)[0]
        }?service_id=10&play_url=yes${
          env === 'staging' ? '&env=staging' : ''
        }&video_duration=yes&protocol=hls&us=${
          params.hash
        }&auth_token=xBUKcKnXfngfrqGoF93y`,
        config
      );
    },
  };
}

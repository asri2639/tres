import { APIRequest } from '@interfaces/API';
import { stateCodeConverter } from '@utils/Helpers';
const env = process.env.NEXT_PUBLIC_APP_ENV;

const controller = env === 'staging' ? '/api/' : '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}v2/smart_urls/${
          params.play_url.split('/').slice(-1)[0]
        }?service_id=10&play_url=yes&video_duration=yes&protocol=hls&us=${
          params.hash
        }&auth_token=xBUKcKnXfngfrqGoF93y`,
        config
      );
    },
  };
}

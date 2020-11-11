import { APIRequest } from '@interfaces/API';
import { stateCodeConverter } from '@utils/Helpers';

const controller = '/';

export default function Video(inst) {
  return {
    getSmartUrls({ params, query, ...config }: APIRequest) {
      const url = new URL(params.play_url);
      return inst.get(
        `${controller}v2/smart_urls/${
          url.pathname.split('/').slice(-1)[0]
        }?service_id=10&play_url=yes&video_duration=yes&protocol=hls&us=${
          params.hash
        }&auth_token=xBUKcKnXfngfrqGoF93y`,
        config
      );
    },
  };
}

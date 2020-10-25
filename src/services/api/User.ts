import { APIRequest } from '@interfaces/API';

const controller = '/sessions';

export default function User(inst) {
  return {
    getUserPreferences({ params, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${params.sessionId}/preferences${new URLSearchParams(
          query
        )}`,
        config
      );
    },
    updateUserPreferences({ params, payload, query, ...config }: APIRequest) {
      return inst.get(
        `${controller}/${params.sessionId}/preferences${new URLSearchParams(
          query
        )}`,
        payload,
        config
      );
    },
  };
}

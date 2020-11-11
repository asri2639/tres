import axios from 'axios';
import Constants, { accessToken } from '@utils/Constants';
// import toast from '@utils/ToastHelper';
import getConfig from 'next/config';
import { APIRequest } from '@interfaces/API';
const { publicRuntimeConfig } = getConfig();

const CancelToken = axios.CancelToken;
const defaultControllers = [];

const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  false,
  /[\w]+\.ts$/
);

const apis = {};
// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  if (fileName.search(/\.\/(?:(index|API|APIEnum))\.ts$/g) === -1) {
    apis[fileName.match(/\.\/(\w+)\.ts$/)[1]] =
      componentConfig.default || componentConfig;
  }
});

export const apiStatusHandler = (error, hideMessage = false) => {
  let message = '';

  if (error.response) {
    if (error.response.status === 401) {
      message = 'unauthorized';
    }
    if (!hideMessage) {
      // toast.error(message);
    }

    return;
  }

  /*    if (error.response.status === 403) {
      message += `"Error" ${error.response.status}: ${
        error.response.data.error_code
      }
      ${error.response.data.message || ''}`;

    } else if (error.response.status === 400) {
      message += `"Validation Error" ${error.response.status}: ${
        error.response.data.error_code
      }
      ${error.response.data.message || ''}`;
    }
 */
  if (message) {
    //   toast.error(message);
    return true;
  } else {
    return false;
  }
};

class APIError extends Error {
  name: string;
  data: any;

  constructor(message, data?) {
    super(message);
    this.name = 'APIError';
    this.data = data;
  }
}

async function errorResponseHandler(error) {
  if (
    error.response &&
    error.response.status === 422 &&
    error.response.data.error.message.indexOf('access_token') >= 0
  ) {
    const api = API();
    const result1 = await api.getAccessToken({
      params: {
        auth_token: Constants.authToken,
      },
    });
    accessToken.web = result1.data.data.access_token;

    const result = await api.getAccessToken({
      params: {
        auth_token: Constants.mAuthToken,
      },
    });
    accessToken.mobile = result.data.data.access_token;
  }
  // check for errorHandle config
  if (
    error &&
    error.config &&
    error.config.hasOwnProperty('errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }
  // if has response show the error
  if (error.response) {
    const handled = apiStatusHandler(error);
    if (!handled) {
      const message = error.response.data ? error.response.data.error_code : '';
      // return Promise.reject(new APIError(message, error.response.data));
      return Promise.reject(error);
      // throw new APIError(message, error.response.data);
    }
    return Promise.reject(new APIError(error)); // here it was Promise.resolve
  } else {
    return Promise.reject(error);
  }
}

export default function API(...controllers): any {
  let inst = null;
  const requiredServices = {};
  const source = CancelToken.source();

  inst = axios.create({
    baseURL: Constants.baseURL,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    cancelToken: source.token,
  });

  inst.interceptors.request.use((config) => {
    if (
      publicRuntimeConfig.APP_ENV !== 'development' &&
      config.config &&
      config.config.suv
    ) {
      config.baseURL = 'https://prod.suv.etvbharat.com';
    } else {
      if (!config.url.startsWith('/access_token')) {
        if (config.url.indexOf('msite') >= 0) {
          config.url = `${config.url}&auth_token=${Constants.mAuthToken}&access_token=${accessToken.mobile}`;
        } else {
          config.url = `${config.url}&auth_token=${Constants.authToken}&access_token=${accessToken.web}`;
        }
      }
    }
    return config;
  });

  inst.interceptors.response.use(async (response) => {
    // Do something with response data
    if (response.error != null) {
      await errorResponseHandler(response);
      return Promise.reject(response);
    }
    return response;
  }, errorResponseHandler);

  /* controllers from mounted() method */

  controllers = controllers.concat(defaultControllers);
  if (controllers.length) {
    controllers.forEach((controller) => {
      if (controller) {
        requiredServices[controller] = {
          ...apis[controller](inst),
        };
      } else {
        throw new Error(
          `Failed to load api! Given enum of controller - ${controller} doesn't exist`
        );
      }
    });
  }

  return {
    shutdown() {
      source.cancel();
      inst = null;
    },
    getAccessToken({ params, query, ...config }: APIRequest) {
      return inst.get(`/access_token?auth_token=${params.auth_token}`, config);
    },
    ...requiredServices,
  };
}

// export const getTokenDetails = async () => {
//   if(typeof window === 'undefined') {
//     fetch('https://staging.api.etvbharat.com/access_token?auth_token=kmAJAH4RTtqHjgoauC4o')
//   }
// }

export default {
  getFooterDetails({ params, query, config } = new APIRequest()) {
    return import('../../static/footer').then((r) => r.default);
  },
  getAppConfig({ params, query, ...config }) {
    return import('../../static/appConfig')
      .then((r) => r.default)
      .catch((e) => {});
  },
  getAccessToken({ params, query, ...config }) {
    return import('../../static/accessToken')
      .then((r) => r.default)
      .catch((e) => {});
  },
};

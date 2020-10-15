const PROXY_URL = '';
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://prod.api.etvbharat.com/api'
    : PROXY_URL + 'http://localhost:3000/api';

const Constants = Object.freeze({
  baseURL: baseURL,
});

export default Constants;

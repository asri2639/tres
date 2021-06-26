"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CatalogList;

var _API = require("@interfaces/API");

var _config = _interopRequireDefault(require("next/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _getConfig = (0, _config["default"])(),
    publicRuntimeConfig = _getConfig.publicRuntimeConfig;

var env = publicRuntimeConfig.APP_ENV;
var controller = '/catalog_lists';

var getProperParam = function getProperParam(params, options) {
  if (!params && typeof window !== 'undefined') {
    params = {
      state: location.pathname.split('/')[1] === 'urdu' ? 'urdu' : location.pathname.split('/')[2]
    };
  }

  return params && params.state && (options.exclude || ['national', 'kerala', 'odisha']).indexOf(params.state) === -1 ? '-' + params.state : '';
};

function CatalogList(inst) {
  return {
    getArticleDetails: function getArticleDetails() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref.params,
          query = _ref.query,
          config = _ref.config;

      config = config || {};
      return inst.get("".concat(controller, "/").concat(config['isSSR'] ? '' : 'web-', "news-details").concat(getProperParam(params, {
        exclude: !config['isSSR'] ? ['national'] : null
      }), ".gzip?").concat(new URLSearchParams(query)), config);
    },
    getVideoDetails: function getVideoDetails() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref2.params,
          query = _ref2.query,
          config = _ref2.config;

      config = config || {};
      return inst.get("".concat(controller, "/").concat(config['isSSR'] ? 'video-details' : params.suffix, ".gzip?").concat(new URLSearchParams(query)), config);
    },
    getRelatedArticles: function getRelatedArticles() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref3.params,
          query = _ref3.query,
          config = _ref3.config;

      return inst.get("/get_related_articles.gzip?".concat(new URLSearchParams(query)), config);
    },
    getMenuDetails: function getMenuDetails() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref4.params,
          query = _ref4.query,
          config = _ref4.config;

      return inst.get("".concat(controller, "/").concat(params.suffix).concat(getProperParam(params), ".gzip?").concat(new URLSearchParams(_objectSpread({}, query))), config);
    },
    getSubMenuDetails: function getSubMenuDetails() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref5.params,
          query = _ref5.query,
          config = _ref5.config;

      return inst.get("".concat(controller, "/").concat(params.key, ".gzip?").concat(new URLSearchParams(query)), config);
    },
    getListing: function getListing() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref6.params,
          query = _ref6.query,
          config = _ref6.config;

      return inst.get("".concat(controller, "/").concat(params.key, ".gzip?").concat(new URLSearchParams(query)), config);
    },
    getSearchResults: function getSearchResults() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          query = _ref7.query,
          config = _ref7.config;

      return inst.get("".concat(controller, "/search-page-list?").concat(new URLSearchParams(query)), config);
    },
    // https://prod.api.etvbharat.com/catalog_lists/app-new-headlines-district-carousel1-andhra-pradesh?item_languages=te&auth_token=kmAJAH4RTtqHjgoauC4o&region=IN&response=r2&access_token=woB1UukKSzZ5aduEUxwt&dynamic_district=chittoor&portal_state=ap
    getDistrictNews: function getDistrictNews() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _API.APIRequest(),
          params = _ref8.params,
          query = _ref8.query,
          config = _ref8.config;

      return inst.get("".concat(controller, "/app-new-headlines-district-carousel1-").concat(params.state, "?").concat(new URLSearchParams(query)));
    }
  };
}
import { languageMap } from '@utils/Constants';
import { stateCodeConverter } from '@utils/Helpers';

export default {
  languageChange: (e) => {
    var t = languageMap[e],
      a = languageMap[location.pathname.split('/')[1]],
      n = window.location.href;
    'en' != a &&
      'en' == t &&
      window['dataLayer'].push({
        event: 'native_to_english',
        from_language: a,
        current_page_url: n,
      }),
      'en' == a &&
        'en' != t &&
        window['dataLayer'].push({
          event: 'english_to_native',
          to_language: t,
          current_page_url: n,
        }),
      'en' != a &&
        'en' != t &&
        a != t &&
        window['dataLayer'].push({
          event: 'native_to_native',
          from_language: a,
          to_language: t,
          current_page_url: n,
        });
  },
  menuClick: (e, t) => {
    var a = (t + '|' + e.ml_title[0].text).toLowerCase();
    window['dataLayer'].push({
      event: 'menu_clicks',
      clicked_menu_item: a,
      current_page_url: window.location.href,
    });
  },
  subMenuClick: function (e, t) {
    var a = e.url.split('/')[4],
      n = window.location.href.split('/')[6];
    if ('' != t && void 0 != t) {
      s = 'sidemenu|' + t.ml_title[0].text + '|' + e.ml_title[0].text;
      'state' == e.url.split('/')[3] &&
        a != n &&
        window['dataLayer'].push({
          event: 'change_state',
          current_page_url: window.location.href,
        });
    } else
      var s = 'headermenu|' + e.ml_title[0].text + '|' + e.ml_title[0].text;
    if (a != n) {
      var r = s.toLowerCase();
      window['dataLayer'].push({
        event: 'menu_clicks',
        clicked_menu_item: r,
        current_page_url: window.location.href,
      });
    }
  },
  stateChange: function (e) {
    var t = e.item_languages[0],
      a = stateCodeConverter(e.state),
      n = window.location.href.split('/')[3],
      r = languageMap[t],
      o = stateCodeConverter(location.pathname.split('/')[2]);

    n == t &&
      o != a &&
      window['dataLayer'].push({
        event: 'state_change',
        from_state: o,
        to_state: a,
        common_language: r,
        current_page_url: window.location.href,
      });
  },
  share: function (e) {
    var t = 'INDIA',
      a = 'INDIA',
      n = 'INDIA',
      i = 'INDIA',
      s = 'en',
      r = e.title,
      o = e.content_id,
      f = { detailsUrl: '' };
    void 0 != e.city && '' != e.city
      ? void 0 != e.city[0] && '' != e.city[0] && (t = e.city[0])
      : (t = 'INDIA'),
      void 0 != e.district && '' != e.district
        ? void 0 != e.district[0] && '' != e.district[0] && (a = e.district[0])
        : (a = 'INDIA'),
      void 0 != e.state && '' != e.state
        ? void 0 != e.state[0] && '' != e.state[0] && (n = e.state[0])
        : (n = 'INDIA'),
      void 0 != e.constituency && '' != e.constituency
        ? void 0 != e.constituency[0] &&
          '' != e.constituency[0] &&
          (i = e.constituency[0])
        : (i = 'INDIA'),
      void 0 != e.item_languages && '' != e.item_languages
        ? void 0 != e.item_languages[0] &&
          '' != e.item_languages[0] &&
          (s = e.item_languages[0])
        : (s = 'en'),
      (f.detailsUrl = e.web_url.split('/')),
      window['dataLayer'].push({
        event: 'article_share',
        item_id: o,
        item_name: r,
        item_category: f.detailsUrl[2],
        item_sub_category: f.detailsUrl[3],
        state: n,
        city: t,
        district: a,
        constituency: i,
        app_language: s,
        current_page_url: window.location.href,
      });
  },
  comment: function (e) {
    var t = 'INDIA',
      a = 'INDIA',
      n = 'INDIA',
      i = 'INDIA',
      s = 'en',
      r = e.title,
      o = e.content_id,
      f = { detailsUrl: '' };
    void 0 != e.city && '' != e.city
      ? void 0 != e.city[0] && '' != e.city[0] && (t = e.city[0])
      : (t = 'INDIA'),
      void 0 != e.district && '' != e.district
        ? void 0 != e.district[0] && '' != e.district[0] && (a = e.district[0])
        : (a = 'INDIA'),
      void 0 != e.state && '' != e.state
        ? void 0 != e.state[0] && '' != e.state[0] && (n = e.state[0])
        : (n = 'INDIA'),
      void 0 != e.constituency && '' != e.constituency
        ? void 0 != e.constituency[0] &&
          '' != e.constituency[0] &&
          (i = e.constituency[0])
        : (i = 'INDIA'),
      void 0 != e.item_languages && '' != e.item_languages
        ? void 0 != e.item_languages[0] &&
          '' != e.item_languages[0] &&
          (s = e.item_languages[0])
        : (s = 'en'),
      (f.detailsUrl = e.web_url.split('/')),
      window['dataLayer'].push({
        event: 'add_comment',
        item_id: o,
        item_name: r,
        item_category: f.detailsUrl[2],
        item_sub_category: f.detailsUrl[3],
        state: n,
        city: t,
        district: a,
        constituency: i,
        app_language: s,
        current_page_url: window.location.href,
      });
  },
  searchItem: function (searchTerm) {
    if ('' != searchTerm.trim()) {
      var e = window.location.href,
        n = searchTerm;
      window['dataLayer'].push({
        event: 'search',
        search_term: n,
        current_page_url: e,
      });
    }
  },
  articleClick: function (e) {
    if (e && e.web_url) {
      var t = e.content_id,
        a = e.title,
        n = e.web_url.split('/'),
        i = window.location.href,
        s = 'INDIA',
        r = 'INDIA',
        o = 'INDIA',
        l = 'INDIA',
        c = 'en';
      void 0 != e.city && '' != e.city
        ? void 0 != e.city[0] && '' != e.city[0] && (s = e.city[0])
        : (s = 'INDIA'),
        void 0 != e.district && '' != e.district
          ? void 0 != e.district[0] &&
            '' != e.district[0] &&
            (r = e.district[0])
          : (r = 'INDIA'),
        void 0 != e.state && '' != e.state
          ? void 0 != e.state[0] && '' != e.state[0] && (o = e.state[0])
          : (o = 'INDIA'),
        void 0 != e.constituency && '' != e.constituency
          ? void 0 != e.constituency[0] &&
            '' != e.constituency[0] &&
            (l = e.constituency[0])
          : (l = 'INDIA'),
        void 0 != e.item_languages && '' != e.item_languages
          ? void 0 != e.item_languages[0] &&
            '' != e.item_languages[0] &&
            (c = e.item_languages[0])
          : (c = 'en'),
        window['dataLayer'].push({
          event: 'click_item',
          item_id: t,
          item_name: a,
          item_category: n[2],
          item_sub_category: n[3],
          state: o,
          city: s,
          district: r,
          constituency: l,
          app_language: c,
          destination_page_url: i,
        });
    }
  },

  
  newArticleView: function (e) {
    if (f.newsArticle) {
      var t = 'INDIA',
        a = 'INDIA',
        n = 'INDIA',
        i = 'INDIA',
        s = 'en',
        r = e.data.catalog_list_items[0].catalog_list_items[0].title,
        o = e.data.catalog_list_items[0].catalog_list_items[0].content_id;
      void 0 != e.data.catalog_list_items[0].catalog_list_items[0].state &&
      '' != e.data.catalog_list_items[0].catalog_list_items[0].state
        ? void 0 !=
            e.data.catalog_list_items[0].catalog_list_items[0].state[0] &&
          '' != e.data.catalog_list_items[0].catalog_list_items[0].state[0] &&
          (n = e.data.catalog_list_items[0].catalog_list_items[0].state[0])
        : (n = 'INDIA'),
        void 0 != e.data.catalog_list_items[0].catalog_list_items[0].city &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].city
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0].city[0] &&
            '' != e.data.catalog_list_items[0].catalog_list_items[0].city[0] &&
            (t = e.data.catalog_list_items[0].catalog_list_items[0].city[0])
          : (t = 'INDIA'),
        void 0 != e.data.catalog_list_items[0].catalog_list_items[0].district &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].district
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0].district[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0].district[0] &&
            (a = e.data.catalog_list_items[0].catalog_list_items[0].district[0])
          : (a = 'INDIA'),
        void 0 !=
          e.data.catalog_list_items[0].catalog_list_items[0].constituency &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].constituency
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0] &&
            (i =
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0])
          : (i = 'INDIA'),
        void 0 !=
          e.data.catalog_list_items[0].catalog_list_items[0].item_languages &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].item_languages
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0] &&
            (s =
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0])
          : (s = 'en'),
        (f.detailsUrl = e.data.catalog_list_items[0].catalog_list_items[0].web_url.split(
          '/'
        )),
        window['dataLayer'].push({
          event: 'view_item',
          item_id: o,
          item_name: r,
          item_category: f.detailsUrl[2],
          item_sub_category: f.detailsUrl[3],
          state: n,
          city: t,
          district: a,
          constituency: i,
          app_language: s,
          current_page_url: window.location.href,
        });
    }
    if (f.galleryArticle || f.videoArticle) {
      $(document).ready(function () {
        var t = [];
        $(window).scroll(function (a) {
          var n =
              $(window).scrollTop() /
              ($(document).height() - $(window).height()),
            i = Math.round(100 * n);
          if (25 == i || 50 == i || 75 == i || 100 == i) {
            if (0 == t.includes(i)) {
              t.push(i);
              var s = 'INDIA',
                r = 'INDIA',
                o = 'INDIA',
                l = 'INDIA',
                c = 'en',
                d = e.data.catalog_list_items[0].catalog_list_items[0].title,
                m =
                  e.data.catalog_list_items[0].catalog_list_items[0].content_id;
              void 0 !=
                e.data.catalog_list_items[0].catalog_list_items[0].state &&
              '' != e.data.catalog_list_items[0].catalog_list_items[0].state
                ? void 0 !=
                    e.data.catalog_list_items[0].catalog_list_items[0]
                      .state[0] &&
                  '' !=
                    e.data.catalog_list_items[0].catalog_list_items[0]
                      .state[0] &&
                  (o =
                    e.data.catalog_list_items[0].catalog_list_items[0].state[0])
                : (o = 'INDIA'),
                void 0 !=
                  e.data.catalog_list_items[0].catalog_list_items[0].city &&
                '' != e.data.catalog_list_items[0].catalog_list_items[0].city
                  ? void 0 !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .city[0] &&
                    '' !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .city[0] &&
                    (s =
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .city[0])
                  : (s = 'INDIA'),
                void 0 !=
                  e.data.catalog_list_items[0].catalog_list_items[0].district &&
                '' !=
                  e.data.catalog_list_items[0].catalog_list_items[0].district
                  ? void 0 !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .district[0] &&
                    '' !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .district[0] &&
                    (r =
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .district[0])
                  : (r = 'INDIA'),
                void 0 !=
                  e.data.catalog_list_items[0].catalog_list_items[0]
                    .constituency &&
                '' !=
                  e.data.catalog_list_items[0].catalog_list_items[0]
                    .constituency
                  ? void 0 !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .constituency[0] &&
                    '' !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .constituency[0] &&
                    (l =
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .constituency[0])
                  : (l = 'INDIA'),
                void 0 !=
                  e.data.catalog_list_items[0].catalog_list_items[0]
                    .item_languages &&
                '' !=
                  e.data.catalog_list_items[0].catalog_list_items[0]
                    .item_languages
                  ? void 0 !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .item_languages[0] &&
                    '' !=
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .item_languages[0] &&
                    (c =
                      e.data.catalog_list_items[0].catalog_list_items[0]
                        .item_languages[0])
                  : (c = 'en'),
                (f.detailsUrl = window.location.href.split('/'));
              c = u.getLanguageCode();
              window['dataLayer'].push({
                event: 'article_scroll_count',
                item_id: m,
                item_name: d,
                item_category: f.detailsUrl[5],
                item_sub_category: f.detailsUrl[6],
                state: o,
                city: s,
                district: r,
                constituency: l,
                app_language: c,
                current_page_url: window.location.href,
                article_scroll_count: i,
              });
            }
          }
        });
      });
      var t = 'INDIA',
        a = 'INDIA',
        n = 'INDIA',
        i = 'INDIA',
        s = 'en',
        r = e.data.catalog_list_items[0].catalog_list_items[0].title,
        o = e.data.catalog_list_items[0].catalog_list_items[0].content_id;
      void 0 != e.data.catalog_list_items[0].catalog_list_items[0].state &&
      '' != e.data.catalog_list_items[0].catalog_list_items[0].state
        ? void 0 !=
            e.data.catalog_list_items[0].catalog_list_items[0].state[0] &&
          '' != e.data.catalog_list_items[0].catalog_list_items[0].state[0] &&
          (n = e.data.catalog_list_items[0].catalog_list_items[0].state[0])
        : (n = 'INDIA'),
        void 0 != e.data.catalog_list_items[0].catalog_list_items[0].city &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].city
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0].city[0] &&
            '' != e.data.catalog_list_items[0].catalog_list_items[0].city[0] &&
            (t = e.data.catalog_list_items[0].catalog_list_items[0].city[0])
          : (t = 'INDIA'),
        void 0 != e.data.catalog_list_items[0].catalog_list_items[0].district &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].district
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0].district[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0].district[0] &&
            (a = e.data.catalog_list_items[0].catalog_list_items[0].district[0])
          : (a = 'INDIA'),
        void 0 !=
          e.data.catalog_list_items[0].catalog_list_items[0].constituency &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].constituency
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0] &&
            (i =
              e.data.catalog_list_items[0].catalog_list_items[0]
                .constituency[0])
          : (i = 'INDIA'),
        void 0 !=
          e.data.catalog_list_items[0].catalog_list_items[0].item_languages &&
        '' != e.data.catalog_list_items[0].catalog_list_items[0].item_languages
          ? void 0 !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0] &&
            '' !=
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0] &&
            (s =
              e.data.catalog_list_items[0].catalog_list_items[0]
                .item_languages[0])
          : (s = 'en'),
        (f.detailsUrl = window.location.href.split('/'));
      s = u.getLanguageCode();
      window['dataLayer'].push({
        event: 'view_item',
        item_id: o,
        item_name: r,
        item_category: f.detailsUrl[5],
        item_sub_category: f.detailsUrl[6],
        state: n,
        city: t,
        district: a,
        constituency: i,
        app_language: s,
        current_page_url: window.location.href,
      });
    }
  },
  articleScroll: function () {
    $(document).ready(function () {
      var e = [];
      $(window).scroll(function (a) {
        var n = $(window).scrollTop(),
          s = n / ($(document).height() - $(window).height()),
          r = Math.round(100 * s);
        if (
          (25 == r || 50 == r || 75 == r || 100 == r) &&
          0 == e.includes(r) &&
          n >= '500'
        ) {
          e.push(r);
          var o = t.itemNameGtm.display_title,
            l = t.itemNameGtm.display_title,
            c = 'INDIA',
            d = 'INDIA',
            u = 'en',
            m = window.location.pathname.split('/')[3],
            h = window.location.pathname.split('/')[4],
            d = i.getUserState(),
            u = i.getLanguageCode();
          void 0 == m && (m = l),
            void 0 == h && (h = l),
            void 0 != t.itemNameGtm.state && '' != t.itemNameGtm.state
              ? void 0 != t.itemNameGtm.state[0] &&
                '' != t.itemNameGtm.state[0] &&
                (d = t.itemNameGtm.state[0])
              : (d = 'INDIA'),
            void 0 != t.itemNameGtm.city && '' != t.itemNameGtm.city
              ? void 0 != t.itemNameGtm.city[0] &&
                '' != t.itemNameGtm.city[0] &&
                (c = t.itemNameGtm.city[0])
              : (c = 'INDIA'),
            window['dataLayer'].push({
              event: 'article_scroll_count',
              item_id: o,
              item_name: l,
              item_category: m,
              item_sub_category: h,
              state: d,
              city: c,
              district: 'INDIA',
              constituency: 'INDIA',
              app_language: u,
              current_page_url: window.location.href,
              article_scroll_count: r,
            });
        }
      });
    });
  },
  horoscope: function (e) {
    var a = e.display_title,
      n = t.getLanguageCode(),
      i = t.getUserState(),
      s = window.location.href;
    window['dataLayer'].push({
      event: 'horoscope_click',
      item_id: a,
      item_name: a,
      item_category: a,
      item_sub_category: a,
      state: i,
      city: 'INDIA',
      district: 'INDIA',
      constituency: 'INDIA',
      app_language: n,
      current_page_url: s,
    });
  },
  /*  getTabsOfSearch: function(a.query).then(function(e) {
    e.data.catalog_list_items && (angular.forEach(e.data.catalog_list_items, function(e) {
      i.tabsGtm.push(e),
      e.total_items_count > 0 && i.tabs.push(e)
    }),
    0 === i.tabs.length && (i.noResults = !0)),
    i.curHome_link = i.tabs[0].home_link,
    i.currentPage[i.curHome_link] = 1,
    i.getTabDetails(i.tabs[0].home_link, s, 39),
    angular.forEach(i.tabs, function(e) {
      0 != e.total_items_count && (i.totalItems += e.total_items_count,
      i.isSearchResults = !0)
    }),
    angular.forEach(i.tabsGtm, function(e) {
      var t = e.total_items_count
        , n = a.query
        , i = e.title
        , s = window.location.href;
      window['dataLayer'].push({
        event: "view_search_results",
        number_of_search_results: t,
        search_term: n,
        content_type: i,
        current_page_url: s
      })
    }),
    o && "null" !== o && t.createSearchEntry(a.query, o.session).then(function(e) {
      console.log("message", e)
    })
  }), */
};

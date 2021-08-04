import { mediaStyles } from 'media';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class ETVDocument extends Document {
  render() {
    const isAMP = this.props.__NEXT_DATA__.query.amp === '1';
    return (
      <Html lang="en">
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          {!isAMP ? (
            <>
              {
                <script
                  dangerouslySetInnerHTML={{
                    __html: ` if (location.protocol === 'http:' && !location.hostname === 'localhost') {
                window.location.href = window.location.href.replace('http:', 'https:');
              }`,
                  }}
                ></script>
              }

              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || []; 
                           window.googletag=window.googletag||{cmd:[]};
                           var _comscore = _comscore || [];
                            _comscore.push({
                                c1: "2",
                                c2: "20416623"
                            });`,
                }}
              ></script>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: `{
                    "@context": "https://schema.org",
                    "@type": "NewsMediaOrganization",
                    "name": "ETV Bharat",
                    "url": "https://www.etvbharat.com",
                    "logo": "https://www.etvbharat.com/assets/images/etvlogo/english.png",
                    "sameAs": "https://www.facebook.com/ETVBharatEnglish/"
                }`,
                }}
              ></script>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: `{
                              "@context": "https://schema.org/",
                              "@type": "WebSite",
                              "name": "ETV Bharat",
                              "url": "https://www.etvbharat.com",
                              "potentialAction": {
                                  "@type": "SearchAction",
                                  "target": "https://www.etvbharat.com/english/national/search/{search_term_string}",
                                  "query-input": "required name=search_term_string"
                              }
                          }`,
                }}
              ></script>
            </>
          ) : null}
        </Head>
        <body>
          {!isAMP ? (
            <>
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-K3BH7X9"
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                ></iframe>
              </noscript>

              <noscript>
                <img
                  style={{ height: 0, width: 0, visibility: 'hidden' }}
                  src="https://sb.scorecardresearch.com/p?c1=2&c2=20416623&cv=2.0&cj=1"
                />
              </noscript>
            </>
          ) : null}
          {isAMP ? (
            <>
              <amp-analytics
                config="https://www.googletagmanager.com/amp.json?id=GTM-KQ4QPLR"
                data-credentials="include"
              ></amp-analytics>
            </>
          ) : null}
          <Main />
          {/* Here we will mount our modal portal */}
          <div id="modal" style={{ height: 'auto' }} />

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){
                var scrollDepth = false;
                window.addEventListener(
                  "scroll",
                  function () {
                    ((document.documentElement.scrollTop && false === scrollDepth) ||
                      (document.body.scrollTop && false === scrollDepth)) &&
                      (!(function () {
                        
                        (function (w, d, s, l, i) {
                          w[l] = w[l] || [];
                          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                          var f = d.getElementsByTagName(s)[0],
                            j = d.createElement(s),
                            dl = l != "dataLayer" ? "&l=" + l : "";
                          j.async = true;
                          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                          f.parentNode.insertBefore(j, f);
                        })(window, document, "script", "dataLayer", "GTM-K3BH7X9");
                
                        (function () {
                          var e = document.createElement("script");
                          e.type = "text/javascript";
                          e.async = !0;
                          e.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
                          var a = document.getElementsByTagName("script")[0];
                          a.parentNode.insertBefore(e, a);
                        })();
                
                        (function () {
                          var s = document.createElement("script"),
                            el = document.getElementsByTagName("script")[0];
                          s.async = true;
                          s.src = "https://sb.scorecardresearch.com/beacon.js";
                          el.parentNode.insertBefore(s, el);
                        })();
                        
                      })(),
                      (scrollDepth = true));
                  },
                  true
                );
              })()
             `,
            }}
          ></script>
        </body>
        <NextScript />
      </Html>
    );
  }
}

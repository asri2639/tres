import { mediaStyles } from 'media';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ETVDocument extends Document {
  render() {
    return (
      <Html lang="">
        <Head>
          <meta charset="UTF-8" />
          <link
            rel="preconnect"
            href="https://etvbharatimages.akamaized.net"
          ></link>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
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
        </Head>
        <body>
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

          <Main />
          {/* Here we will mount our modal portal */}
          <div id="modal" style={{ height: 'auto' }} />

          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                var scrollDepth = false;
                window.addEventListener(
                  "scroll",
                  function () {
                    ((document.documentElement.scrollTop && false === scrollDepth) ||
                      (document.body.scrollTop && false === scrollDepth)) &&
                      (!(function () {
                        loadScripts();
                      })(),
                      (scrollDepth = true));
                  },
                  true
                );
              })();
              
              let __loaded = false;
              window.addEventListener("script-load", () => {
                __loaded = true;
                setTimeout(()=>{
                  const event = new Event("script-loaded");
                  window.dispatchEvent(event);
                },200)
              });
              
              window.onload = ()=> {
                setTimeout(() => {
                  if (!__loaded) {
                    loadScripts();
                  }
                }, 60000);
              }
              
              const loadScripts = () => {
                  try {
                    var scripts = [
                        "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
                        "https://sb.scorecardresearch.com/beacon.js",
                        "https://www.googletagmanager.com/gtm.js?id=GTM-K3BH7X9",
                      ],
                      src,
                      pendingScripts = [],
                      firstScript = document.scripts[0];
                    //polyfil checks and loads here
                    if (
                      typeof IntersectionObserver === "undefined" ||
                      IntersectionObserver.toString().indexOf("[native code]") === -1
                    ) {
                      scripts.unshift("js/libs/polyfil/intersection-observer.js");
                    }
                    // Watch scripts load in IE
                    function stateChange() {
                      // Execute as many scripts in order as we can
                      var pendingScript;
                      while (pendingScripts[0] && pendingScripts[0].readyState == "loaded") {
                        pendingScript = pendingScripts.shift();
                        // avoid future loading events from this script (eg, if src changes)
                        pendingScript.onreadystatechange = null;
                        // can't just appendChild, old IE bug if element isn't closed
                        firstScript.parentNode.insertBefore(pendingScript, firstScript);
                      }
                      console.log("scripts should be loaded now");
                    }
                    // loop through our script urls
                    while ((src = scripts.shift())) {
                      if ("async" in firstScript) {
                        // modern browsers
                        script = document.createElement("script");
                        script.async = true;
                        script.src = src;
                        document.body.appendChild(script);
                      } else if (firstScript.readyState) {
                        // IE<10 // create a script and add it to our todo pile
                        script = document.createElement("script");
                        pendingScripts.push(script); // listen for state changes
                        script.onreadystatechange = stateChange; // must set src AFTER adding onreadystatechange listener // else we’ll miss the loaded event for cached scripts
                        script.src = src;
                      } else {
                        // fall back to defer
                        document.write('<script src="' + src + '" defer></' + "script>");
                      }
                    }
                  } catch (error) {
                    alert(error);
                  }
              
                  setTimeout(() => {
                    if (window.googletag && googletag.apiReady) {
                      // Register event handlers to observe lazy loading behavior.
                      window.googletag
                        .pubads()
                        .addEventListener("slotRequested", function (event) {
                          console.log(event.slot.getSlotElementId(), "fetched");
                        });
              
                      window.googletag
                        .pubads()
                        .addEventListener("slotOnload", function (event) {
                          console.log(event.slot.getSlotElementId(), "rendered");
                        });
                    }
                  }, 200);
              
                (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                })(window, document, "script", "dataLayer", "GTM-K3BH7X9");
              
                const event = new Event("script-load");
                window.dispatchEvent(event);
              };
              
             `,
            }}
          ></script>
        </body>
        <NextScript />
      </Html>
    );
  }
}

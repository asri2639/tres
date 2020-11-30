import { mediaStyles } from 'media';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ETVDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K3BH7X9');`,
            }}
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `  var _comscore = _comscore || [];
              _comscore.push({
                  c1: "2",
                  c2: "20416623"
              });
              (function () {
                  var s = document.createElement("script"),
                      el = document.getElementsByTagName("script")[0];
                  s.async = true;
                  s.src = "https://sb.scorecardresearch.com/beacon.js";
                  el.parentNode.insertBefore(s, el);
              })();`,
            }}
          ></script>
          <script
            async
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.googletag=window.googletag||{cmd:[]};`,
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
        </body>
        <NextScript />
      </Html>
    );
  }
}

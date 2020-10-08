import Layout from '@components/layout/Layout';
import '../styles/globals.css'

function App({ Component, pageProps, data }) {
  return (<Layout menuData={data}><Component {...pageProps} /></Layout>)
}

App.getInitialProps = async ({ Component, ctx }) => {

  const menuRes = await fetch(`https://prod.api.etvbharat.com/catalog_lists/web-left-menu.gzip?auth_token=xBUKcKnXfngfrqGoF93y&response=r2&item_languages=en&access_token=TjeNsXehJqhh2DGJzBY9&only_items=catalog_list&pagination=false&portal_state=na`);
  const menuData = await menuRes.json();


  const res = await fetch(
    `https://prod.api.etvbharat.com/catalogs/city-state/items/india/languages?region=IN&auth_token=xBUKcKnXfngfrqGoF93y&access_token=TjeNsXehJqhh2DGJzBY9`
  );
  const langData = await res.json();

  const resp = await fetch(`https://prod.api.etvbharat.com/catalogs/message/items/footer-api?auth_token=xBUKcKnXfngfrqGoF93y&response=r2&item_languages=en&access_token=TjeNsXehJqhh2DGJzBY9&region=IN`);
  const footerData = await resp.json();

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const data = {
    languages: langData.data,
    footer: footerData.data,
    menu: menuData.data
  }

  return { pageProps, data };
};

export default App

export default async function sitemapFunc(req, res) {
  res.setHeader('Content-Type', 'text/xml');
  try {
    console.log(req);

    const url =
      req.url.indexOf('/') === 0 ? req.url : new URL(req.url).pathname;

    fetch('https://old.etvbharat.com' + url)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        res.write(data);
        res.end();
      });
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}

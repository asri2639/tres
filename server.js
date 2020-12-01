/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const devProxy = {
  '/api/v2': {
    target: 'https://prod.suv.etvbharat.com/',
    pathRewrite: { '^/api/v2': '/v2' },
    changeOrigin: true,
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'http://localhost:3000': 'https://www.etvbharat.com',
    },
  },
  '/api': {
    target: 'https://prod.api.etvbharat.com/',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'http://localhost:3000': 'https://www.etvbharat.com',
    },
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NEXT_PUBLIC_APP_ENV;
const dev = env !== 'production' && env !== 'staging';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
   // console.log(err);
  });

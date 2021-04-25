/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const fetch = require('node-fetch');
const he = require('he');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const shouldCompress = (req, res) => {
  // don't compress responses asking explicitly not
  if (req.headers['x-no-compression']) {
    return false;
  }

  // use compression filter function
  return compression.filter(req, res);
};

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

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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

    server.use(compression({ filter: shouldCompress }));

    // Set up the proxy.
    if ((dev && devProxy) || process.env.NEXT_TEST) {
      const { createProxyMiddleware } = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => {
      if (req.url.startsWith('/amp/')) {
        const id = req.url.split('/').slice(-1)[0];
        fetch(
          env === 'staging'
            ? `http://staging.api.etvbharat.com/amp/${id}?auth_token=xNppFXL5h4qhA7XsE4Nx`
            : `http://prod.api.etvbharat.com/amp/${id}?auth_token=fLd6UcV8zesqNpVRif8N`,
          { headers: { 'Content-Type': 'application/json' } }
        )
          .then((response) => {
            return response.json();
          })
          .then(function (rest) {
            res.set('Content-Type', 'text/html');
            res.send(rest.data.amp);
          })
          .catch((e) => {
            return handle(req, res);
          });
      } else {
        return handle(req, res);
      }
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
    console.log(err);
  });

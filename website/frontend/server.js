const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'prod';
const app = next({ dev });
const handle = app.getRequestHandler();

const apiPaths = {
  '/back': {
    target: 'http://localhost:3050',
    pathRewrite: {
      '^/back': '/back',
    },
    changeOrigin: true,
  },
};

const isDevelopment = process.env.NODE_ENV !== 'prod';

app
  .prepare()
  .then(() => {
    const server = express();

    if (isDevelopment) {
      server.use('/back', createProxyMiddleware(apiPaths['/back']));
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log('Error:::::', err);
  });

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://123.111.37.232:12522',
      changeOrigin: true,
    })
  );
};
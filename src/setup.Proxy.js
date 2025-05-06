// src/setupProxy.js (para Create React App)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Tu backend
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '' // Elimina el prefijo /api al redirigir
      }
    })
  );
};
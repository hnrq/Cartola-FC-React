const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use(proxy('/api', {
        target: 'https://api.cartolafc.globo.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/api/': '/'}
        }
      ));
}
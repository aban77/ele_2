// vue.config.js

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

module.exports = {
  runtimeCompiler: true,
  devServer: {
    before: function before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        });
      });
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        });
      });
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        });
      });
    },
    port: 8888,
    // proxy: {
    //   '/api': {
    //     target: 'https://elm.cangdu.org',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   },
    //   '/': {
    //     target: 'http://localhost:8001',
    //     changeOrigin: true,
    //     bypass: function (req, res, proxyOptions) {
    //       if (req.headers.accept.indexOf('html') !== -1) {
    //         console.log('Skipping proxy for browser request.');
    //         return '/index.html';
    //       }
    //     }
    //   }
    // },
    proxy: 'http://localhost:8001',
    'open': true

  }
};

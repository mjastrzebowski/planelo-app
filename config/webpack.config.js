var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
  if (process.env.IONIC_TARGET) {
    useDefaultConfig.resolve.alias = {
      'app/config': path.resolve('src/config.' + process.env.IONIC_TARGET + '.ts'),
      app: path.resolve('src')
    };
  } else {
    useDefaultConfig.resolve.alias = {
      app: path.resolve('src')
    };
  }
  return useDefaultConfig;
}

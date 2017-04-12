// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
var useDefaultConfig = require('@ionic/app-scripts/config/copy.config.js');

module.exports = function () {
  useDefaultConfig.copyFontAwesomeCss = {
    src: ['{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
    dest: '{{WWW}}/assets/css'
  };
  useDefaultConfig.copyFontAwesome = {
    src: ['{{ROOT}}/node_modules/font-awesome/fonts/*'],
    dest: '{{WWW}}/assets/fonts'
  };
  return useDefaultConfig;
}

var appDir = 'src';
var vendorSrcDir = 'node_modules';
var vendorDestDir = 'vendor';

var buildDir = 'build';
var compileDir = 'dist';

var vendorStyles = [
  'bootstrap/dist/css/bootstrap.css',
  'font-awesome/css/font-awesome.css',
  'leaflet/dist/leaflet.css',
];
var vendorScripts = [
  'lodash/dist/lodash.js',
  'jquery/dist/jquery.js',
  'react/dist/react-with-addons.js',
  'leaflet/dist/leaflet-src.js',
  'leaflet-routing-machine/dist/leaflet-routing-machine.js',
  'numeral/numeral.js',
];
var vendorOthers = [
  'bootstrap/dist/css/bootstrap.css.map',
  'font-awesome/fonts/fontawesome-webfont.eot',
  'font-awesome/fonts/fontawesome-webfont.svg',
  'font-awesome/fonts/fontawesome-webfont.ttf',
  'font-awesome/fonts/fontawesome-webfont.woff',
  'font-awesome/fonts/FontAwesome.otf',
  'leaflet/dist/images/layers.png',
  'leaflet/dist/images/marker-icon.png',
  'leaflet/dist/images/marker-shadow.png',
];

var appStyles = [
  'vendor/bootstrap/dist/css/bootstrap.css',
  'vendor/font-awesome/css/font-awesome.css',
  'vendor/leaflet/dist/leaflet.css',
  'app/app.css',
  'app/header/header.css',
  'app/sidebar/sidebar.css',
  'app/sidebarBox/sidebarBox.css',
  'app/waypointsBox/waypointBox.css',
  'app/routeStatsBox/routeStatsBox.css',
  'app/map/map.css',
];
var appScripts = [
  'vendor/lodash/dist/lodash.js',
  'vendor/jquery/dist/jquery.js',
  'vendor/react/dist/react-with-addons.js',
  'vendor/leaflet/dist/leaflet-src.js',
  'vendor/leaflet-routing-machine/dist/leaflet-routing-machine.js',
  'vendor/numeral/numeral.js',
  'app/app.js',
  'app/header/header.js',
  'app/sidebar/sidebar.js',
  'app/sidebarBox/sidebarBox.js',
  'app/waypointsBox/waypointsBox.js',
  'app/waypointsBox/waypointBox.js',
  'app/routeStatsBox/routeStatsBox.js',
  'app/map/map.js',
  'app/map/mapRouting.js',
  'app/init.js',
];
var appOthers = []; // TODO

var externalStyles = [];
var externalScripts = [];

var indexFile = 'index.html';

module.exports = {

  // ----- Build config -----

  build: {
    dest: buildDir,
    vendor: {
      src: [].concat.call([], vendorStyles, vendorScripts, vendorOthers).map(function(x) { return vendorSrcDir + '/' + x; }),
      base: vendorSrcDir,
      dest: buildDir + '/' + vendorDestDir,
    },
    styles: {
      src: appDir + '/**/*.less',
      dest: buildDir,
    },
    scripts: {
      src: [appDir + '/**/*.js', appDir + '/**/*.jsx'],
      dest: buildDir,
    },
    index: {
      src: appDir + '/' + indexFile,
      dest: buildDir,
      options: {
        styles: [].concat.call([], externalStyles, appStyles),
        scripts: [].concat.call([], externalScripts, appScripts),
      },
    },
  },

  // ----- Compile config -----

  compile: {
    dest: compileDir,
    vendor: {
      src: vendorOthers.map(function(x) { return vendorSrcDir + '/' + x; }),
      base: vendorSrcDir,
      dest: compileDir + '/' + vendorDestDir,
    },
    styles: {
      src: appStyles.map(function(x) { return buildDir + '/' + x; }),
      base: buildDir,
      dest: compileDir,
    },
    scripts: {
      src: appScripts.map(function(x) { return buildDir + '/' + x; }),
      base: buildDir,
      dest: compileDir,
    },
    index: {
      src: appDir + '/' + indexFile,
      dest: compileDir,
      options: {
        styles: [].concat.call([], externalStyles, appStyles),
        scripts: [].concat.call([], externalScripts, appScripts),
      },
    }
  },

};

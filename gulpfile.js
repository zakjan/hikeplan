'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var ejs = require('gulp-ejs');


gulp.task('build-vendor', function() {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap/dist/css/bootstrap.css.map',
    'node_modules/react/dist/react.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet/dist/leaflet-src.js',
    'node_modules/leaflet/dist/images/layers.png',
    'node_modules/leaflet/dist/images/marker-icon.png',
    'node_modules/leaflet/dist/images/marker-shadow.png',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js',
    'node_modules/leaflet-routing-yours/src/L.Routing.YOURS.js',
  ], { base: 'node_modules' })
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('build-app-css', function() {
  return gulp.src('src/app/**/*.css')
    .pipe(gulp.dest('build/app'));
});

gulp.task('build-app-js', function() {
  return gulp.src('src/app/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('build/app'));
});

gulp.task('build-app-index', function() {
  var styles = [
    'vendor/bootstrap/dist/css/bootstrap.css',
    'vendor/leaflet/dist/leaflet.css',
    'app/app.css',
  ];
  var scripts = [
    'vendor/react/dist/react.js',
    'vendor/jquery/dist/jquery.js',
    'vendor/leaflet/dist/leaflet-src.js',
    'vendor/leaflet-routing-machine/dist/leaflet-routing-machine.js',
    'vendor/leaflet-routing-yours/src/L.Routing.YOURS.js',
    'app/app.js',
    'app/header.js',
    'app/sidebar.js',
    'app/waypointForm.js',
    'app/waypointInput.js',
    'app/map.js',
    'app/init.js',
  ];

  return gulp.src('src/index.html')
    .pipe(ejs({
      styles: styles,
      scripts: scripts,
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build-app', ['build-app-css', 'build-app-js', 'build-app-index'])

gulp.task('build', ['build-vendor', 'build-app']);

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.css', ['build-app-css']);
  gulp.watch('src/**/*.jsx', ['build-app-js']);
  gulp.watch('src/index.html', ['build-app-index']);
});

gulp.task('default', ['build']);

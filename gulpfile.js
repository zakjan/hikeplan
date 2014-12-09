'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var ejs = require('gulp-ejs');
var less = require('gulp-less');
var react = require('gulp-react');
var to5 = require('gulp-6to5');
var uglify = require('gulp-uglify');

var config = require('./build.config.js');


// ----- Clean -----

gulp.task('build-clean', function() {
  return gulp.src(config.build.dest)
    .pipe(clean());
});

gulp.task('compile-clean', function() {
  return gulp.src(config.compile.dest)
    .pipe(clean());
});

gulp.task('clean', ['build-clean', 'compile-clean']);


// ----- Styles / scripts / assets -----

gulp.task('build-vendor', function() {
  return gulp.src(config.build.vendor.src, { base: config.build.vendor.base })
    .pipe(gulp.dest(config.build.vendor.dest));
});

gulp.task('build-styles', function() {
  return gulp.src(config.build.styles.src)
    .pipe(less())
    .pipe(gulp.dest(config.build.styles.dest));
});

gulp.task('build-scripts', function() {
  return gulp.src(config.build.scripts.src)
    .pipe(react())
    .pipe(to5())
    .pipe(gulp.dest(config.build.scripts.dest));
});

gulp.task('compile-vendor', function() {
  return gulp.src(config.compile.vendor.src, { base: config.compile.vendor.base })
    .pipe(gulp.dest(config.compile.vendor.dest));
});

gulp.task('compile-styles', function() {
  return gulp.src(config.compile.styles.src, { base: config.compile.styles.base })
    .pipe(cssmin())
    .pipe(gulp.dest(config.compile.styles.dest));
});

gulp.task('compile-scripts', function() {
  return gulp.src(config.compile.scripts.src, { base: config.compile.scripts.base })
    .pipe(uglify())
    .pipe(gulp.dest(config.compile.scripts.dest));
});


// ----- Index -----

gulp.task('build-index', function() {
  return gulp.src(config.build.index.src)
    .pipe(ejs(config.build.index.options))
    .pipe(gulp.dest(config.build.index.dest));
});

gulp.task('compile-index', function() {
  return gulp.src(config.compile.index.src)
    .pipe(ejs(config.compile.index.options))
    .pipe(gulp.dest(config.compile.index.dest));
});


// ----- Main tasks -----

gulp.task('default', ['build']);

gulp.task('build', function(done) {
  runSequence('clean', ['build-vendor', 'build-styles', 'build-scripts', 'build-index'], done);
});

gulp.task('compile', function(done) {
  runSequence('build', 'compile-clean', ['compile-vendor', 'compile-styles', 'compile-scripts', 'compile-index'], done);
});

gulp.task('watch', ['build'], function() {
  gulp.watch('build.config.js', ['build']);
  gulp.watch(config.build.styles.src, ['build-styles']);
  gulp.watch(config.build.scripts.src, ['build-scripts']);
  gulp.watch(config.build.index.src, ['build-index']);
});

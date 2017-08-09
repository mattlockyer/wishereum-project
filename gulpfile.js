
/*! gulpfile.js */

//gulp utils
const gulp = require('gulp');
const gutil = require('gulp-util');
//local to project
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
//const server = require('gulp-express');
//const shell = require('gulp-shell');
//const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');


/**************************************
* Sources
**************************************/
const staticSources = ['./src/**/*', '!./src/js/*.js'];
const jsSources = ['./src/js/*.js'];
const entries = './src/js/app.js';
/**************************************
* Tasks
**************************************/
gulp.task('babel', function() {
  return browserify({
      entries,
      debug: true,
  }).transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(livereload());
});

gulp.task('bundle', ['browserify'], function() {
  return gulp.src(jsSources).pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('move', () => {
  return gulp.src(staticSources)
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

// gulp.task('contracts', shell.task([
//   'truffle migrate --all'
// ]));

//server
gulp.task('watch', function () {
  gulp.start(['move', 'babel']);
  livereload.listen();
  gulp.watch(staticSources, ['move']);
  gulp.watch(jsSources, ['babel']);
});
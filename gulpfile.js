'use strict';

//Type: String Default: nested Values: nested, expanded, compact, compressed

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');

gulp.task('site-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['site-reload'], function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });
});

gulp.task('sass', function(){
  return gulp.src(['src/sass/base.scss','src/sass/layout.scss'])
    .pipe(concat('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('assets/css/'))
});




gulp.task('sass:watch', function () {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch(['index.html', 'assets/css/*.css'], ['site-reload']);
});

gulp.task('default', ['sass:watch', 'browser-sync']);
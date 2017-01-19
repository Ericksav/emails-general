'use strict';

var gulp            = require('gulp'),
    emailBuilder    = require('gulp-email-builder'),
    plumber         = require('gulp-plumber'),
    del             = require('rimraf'),
    sequence        = require('run-sequence'),
    browserSync     = require('browser-sync').create();


// HTML
gulp.task('html', function() {
  return gulp.src([
   './src/**/*.html'
    ])
    .pipe(plumber())
    .pipe(emailBuilder().build())
    .pipe(gulp.dest('./dist'));
});


// SERVER
gulp.task('server', function(done){
  browserSync.init({
    server: './dist',
      reloadDelay: 1000
  });
  done();
});


// CLEAN
gulp.task('clean', function(done) {
  return del('./dist', done);
});


// BUILD THE "DIST" FOLDER BY RUNNING ALL OF THE ABOVE TASKS
gulp.task('build', function() {
  return sequence('clean', 'html');
});


// BUILD EMAILS, RUN THE SERVER, AND WATCH FOR FILE CHANGES
gulp.task('default', ['build', 'server'], function(){
  gulp.watch([
    './src/**/*.html',
    './src/assets/css/*.css'
    ],
    ['html']).on('change', browserSync.reload);
});








const gulp = require('gulp')
const sender = require('gulp-ws-sender')
const babel = require('gulp-babel')
const WebSocket = require('ws')
const server = require('./tools/server/core')

const ws = new WebSocket('ws://localhost:9999')

const path = {
  js: 'src/**/*.js',
  style: 'src/**/*.css',
  build: 'public',
};

gulp.task('styles', () => {
  return gulp.src(path.style)
    .pipe(sender({
      client: ws,
      type: 'css'
    }))
    .pipe(gulp.dest(path.build))
})

gulp.task('script', () => {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(sender({
      client: ws,
      type: 'js'
    }))
    .pipe(gulp.dest(path.build))
})

gulp.task('watchAll', () => {
  gulp.watch(path.style, gulp.series('styles'))
  gulp.watch(path.js, gulp.series('script'))
})

gulp.task('default', gulp.parallel('watchAll'))

const gulp = require('gulp')
const sender = require('gulp-ws-sender')
const WebSocket = require('ws')
const server = require('./tools/server/core')

const ws = new WebSocket('ws://localhost:9999')

gulp.task('styles', () => {
  return gulp.src('src/**/*.css')
    .pipe(sender({
      client: ws,
      type: 'css'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('script', () => {
  return gulp.src('src/**/*.js')
    .pipe(sender({
      client: ws,
      type: 'js'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('watchAll', () => {
  gulp.watch('src/**/*.css', gulp.series('styles'))
  gulp.watch('src/**/*.js', gulp.series('script'))
})

gulp.task('default', gulp.parallel('watchAll'))

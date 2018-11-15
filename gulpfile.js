const gulp = require('gulp')
const babel = require('gulp-babel')
const sender = require('gulp-ws-sender').broadcast(9999)
const server = require('gulp-ws-sender').server
// const sender = require('../gulp-ws-sender/index').broadcast(9999)
// const server = require('../gulp-ws-sender/index').server


const path = {
  js: 'src/**/*.js',
  style: 'src/**/*.css',
  build: 'build',
};

gulp.task('styles', () => {
  return gulp.src(path.style)
    .pipe(sender({ type: 'css' }))
    .pipe(gulp.dest(path.build))
})

gulp.task('script', () => {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(sender({ type: 'js' }))
    .pipe(gulp.dest(path.build))
})

gulp.task('wsServer', () => server({ port: 9999 }))

gulp.task('watchAll', () => {
  gulp.watch(path.style, gulp.series('styles'))
  gulp.watch(path.js, gulp.series('script'))
})

gulp.task('default', gulp.parallel('watchAll', 'wsServer'))

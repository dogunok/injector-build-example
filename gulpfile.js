const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sender = require('gulp-ws-sender')(9998)
// const sender = require('gulp-ws-sender')(9995)

const path = {
  js: 'src/**/*.js',
  scss: 'src/**/*.scss',
  build: 'build',
}

gulp.task('scss', () => {
  return gulp.src(path.scss)
    .pipe(autoprefixer({ browsers: ['ie 10'] }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sender({ type: 'css' }))
    .pipe(gulp.dest(path.build))
})

gulp.task('script', () => {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(sender({ type: 'js', waitForKam: true }))
    .pipe(gulp.dest(path.build))
})

gulp.task('watchAll', () => {
  gulp.watch(path.scss, gulp.series('scss'))
  gulp.watch(path.js, gulp.series('script'))
})


gulp.task('default', gulp.parallel('watchAll'))

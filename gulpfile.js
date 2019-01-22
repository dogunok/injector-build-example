const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sender = require('gulp-ws-sender')(9998)

const path = {
  js: 'src/**/*.js',
  jsEntry: 'src/index.js',
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
  return browserify( path.jsEntry, { transform: [babelify] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sender({ type: 'js' }))
    .pipe(gulp.dest(path.build))
})

gulp.task('watchAll', () => {
  gulp.watch(path.scss, gulp.series('scss'))
  gulp.watch(path.js, gulp.series('script'))
})

gulp.task('default', gulp.parallel('watchAll'))

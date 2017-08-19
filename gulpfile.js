var gulp = require('gulp');
var del = require('del');
var minify = require('gulp-minifier');
var gulpSequence = require('gulp-sequence')
var imagemin = require('gulp-imagemin');

gulp.task('clean', function () {
  return del.sync(['dist/**/*']);
});

gulp.task('minify', function() {
  return gulp.src('src/**/*')
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('src/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', gulpSequence('clean', 'minify', 'images'));

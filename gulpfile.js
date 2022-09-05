const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sayHello', function(callback) {
  console.log("Hello");
  callback();
});

gulp.task('copyJS', function() {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('public/js/'));
});

gulp.task('sassToCSS', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass({
      errorLogToConsole: true//,
      //outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('clone-files', function() {
  return gulp.src('app/**/*.*')
    .pipe(gulp.dest('public/'));
});

gulp.task('minifyCSS', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('minifyJS', function() {
  return pipeline(
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('public/js/')
  );
});

gulp.task('autoPrefixCSS', function() {
  return gulp.src('app/css/*.css')
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/'));
});

//gulp.task('deleteFiles', function() {
//  return del('public/css/');
//});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watchFiles', function() {
  //gulp.watch('app/css/*.css', gulp.series('autoPrefixCSS'));
  gulp.watch('app/js/*.js', gulp.series('copyJS'));
  gulp.watch('app/scss/*.scss', gulp.series('sassToCSS'));
});

gulp.task('watch', async function() {
  return gulp.series('watchFiles');
});

//gulp.task('build', gulp.series('deleteFiles', 'autoPrefixCSS', 'minifyJS', 'my-second-task'));
gulp.task('default', gulp.parallel('watchFiles', 'serve'));

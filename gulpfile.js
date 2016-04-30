var gulp = require('gulp'),
    connect = require('gulp-connect'),
    // cordova = require('gulp-cordova'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    pngquant = require('imagemin-pngquant');
    imageminJpegtran = require('imagemin-jpegtran');

var paths = {
  bowerDir: './bower_components',
  sassDir: './resources/sass',
  jsDir: './resources/scripts',
  fontDir: './resources/fonts',
  imageDir: './resources/images/**/*',
  // htmlDir: './application/views',

  scripts: ['./resources/scripts/**'],
  sass: ['./resources/sass/**.scss'],

  rootDir: ['./public'],
};

gulp.task('icons', function() {
    return gulp.src([
        paths.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*',
        paths.bowerDir + '/font-awesome/fonts/**.*',
        // paths.bowerDir + '/mdi/fonts/**.*'
      ])
      .pipe(gulp.dest(paths.rootDir + '/fonts'));
});
gulp.task('fonts', function() {
    return gulp.src([
        paths.fontDir + '/**.*'
      ])
      .pipe(gulp.dest(paths.rootDir + '/fonts'));
});

gulp.task('connect', function() {
  connect.server({
    port: 3000,
    root: paths.rootDir,
    livereload: true
  });
});
 
 
gulp.task('scripts',function() {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src([
    // paths.scripts,
    paths.bowerDir + '/jquery/dist/jquery.min.js',
    paths.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    paths.bowerDir + '/bootstrap-material-design/scripts/material.js',
    paths.bowerDir + '/bootstrap-material-design/scripts/ripples.js',
    ])
    .pipe(concat('app.js'))
    // .pipe(watch(paths.scripts))
    .pipe(gulp.dest(paths.rootDir + '/js'))
    .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src(paths.sassDir + '/app.scss')
    .pipe(sass())
    .on("error", notify.onError(function (error) {
      return "Error: " + error.message;
    }))
    .pipe(prefixer({
      browsers: ['last 8 versions'],
      cascade: false
    }))
    .pipe(concat('app.css'))
    // .pipe(cssnano({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});
 
// Copy all static images 
gulp.task('images', function() {
  return gulp.src(paths.imageDir)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.rootDir + '/img'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsDir + '/*.js', ['scripts']);
  // gulp.watch(paths.sassDir + '/**/*.scss', ['styles']);
  gulp.watch(paths.bowerDir + '/bootstrap-sass/assets/stylesheets/**/*.scss', ['styles']);
  gulp.watch(paths.bowerDir + '/bootstrap-material-design/sass/**/*.scss', ['styles']);
  gulp.watch(paths.sassDir + '/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles']);
gulp.task('see', ['watch']);
// gulp.task('watch', ['watch', 'scripts', 'styles']);

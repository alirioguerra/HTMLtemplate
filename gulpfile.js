// Start Gulp Modules
const { watch, src, dest } = require('gulp');
const sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  plumber = require('gulp-plumber');

function css() {
  return src('assets/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: false, outputStyle: 'compressed' }))
    .on('error', function(err) {
      notify().write(err);
      this.emit('end');
    })
    .pipe(dest('./'));
}

function pluginScript() {
  return src('assets/js/plugins/*.js')
    .pipe(plumber())
    .pipe(concat('plugins.min.js'))
    .pipe(
      uglify().on('error', function(uglify) {
        console.error(uglify.message);
        this.emit('end');
      }),
    )
    .pipe(dest('./assets/js'));
}

function mainScript() {
  return src('assets/js/main/*.js')
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(
      uglify().on('error', function(uglify) {
        console.error(uglify.message);
        this.emit('end');
      }),
    )
    .pipe(dest('./assets/js'));
}

exports.default = function() {
  // You can use a single task
  watch('assets/sass/**/*.scss', css);
  // Or a composed task
  watch('assets/js/main/*.js', mainScript);
  watch('assets/js/plugins/*.js', pluginScript);
};

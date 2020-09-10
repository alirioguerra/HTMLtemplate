const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compileScss() {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

gulp.task("scss", compileScss);

function compileJavaScript() {
  return gulp
    .src("assets/javascript/main/*.js")
    .pipe(concat("main.min.js"))
    .pipe(babel({ presets: ["env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("assets/javascript/"))
    .pipe(browserSync.stream());
}

gulp.task("javaScript", compileJavaScript);

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

gulp.task("browserSync", browser);

function watch() {
  gulp.watch("assets/scss/**/*.scss", compileScss);
  gulp.watch("assets/javascript/main/*.js", compileJavaScript);
  gulp.watch("*.html").on("change", browserSync.reload);
}

gulp.task("watch", watch);

gulp.task(
  "default",
  gulp.parallel("watch", "browserSync", "scss", "javascript")
);

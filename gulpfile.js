var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concatcss = require('gulp-concat-css');

var browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: ["app/scss/ambience/*.scss", "app/scss/base/*.scss", "app/scss/components/*.scss", "app/scss/index.scss"],
    dest: "dist/css/"
  }
};

function reload(done) {
  browserSync.reload();
  done();
}

function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(concatcss("style.min.css"))
      .pipe(gulp.dest(paths.styles.dest))
  );
}

function watch() {
  style();

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.styles.src, style);
  // gulp.watch(paths.styles.src, reload);
  gulp.watch("index.html", reload);
}

exports.style = style;
exports.watch = watch;

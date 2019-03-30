var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

var browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: ["app/scss/ambience/*.scss", "app/scss/base/*.scss", "app/scss/components/*.scss", "app/scss/index.scss"],
    dest: "dist/css/"
  }
};

function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
  );
}

function reload() {
  browserSync.reload();
  done();
}

function watch() {
  style();

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch("index.html", reload);
}

exports.style = style;
exports.watch = watch;

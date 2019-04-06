var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concatcss = require('gulp-concat-css'),
    injectpartials = require('gulp-inject-partials');

var browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: ["app/assets/stylesheets/ambience/*.scss", "app/assets/stylesheets/base/*.scss", "app/assets/stylesheets/components/*.scss", "app/assets/stylesheets/components/primeiros-passos/*.scss", "app/assets/stylesheets/index.scss"],
    dest: "dist/css/"
  },

  html: {
    src: ["app/views/partials/*.html",
          "app/views/index.html",
          "app/views/primeiros-passos/index.html",
          "app/views/primeiros-passos/partials/*.html"],
    dest: "./"
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

function html() {
  return (
    gulp
      .src("app/views/index.html")
      .pipe(injectpartials())
      .pipe(gulp.dest(paths.html.dest))
  )
}

function htmlSmartHome() {
  return (
    gulp
      .src("app/views/primeiros-passos/index.html")
      .pipe(injectpartials())
      .pipe(gulp.dest("./primeiros-passos/"))
  )
}

function watch() {
  style();
  html();

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.html.src, htmlSmartHome);
  gulp.watch(paths.html.src, reload);
}

exports.style = style;
exports.watch = watch;
exports.html = html;
exports.htmlSmartHome = htmlSmartHome;

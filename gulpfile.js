// plugin
const gulp = require('gulp');

// plugin for ejs
const fs = require('fs'),
      ejs = require('gulp-ejs'),
      rename = require('gulp-rename');

// plugin for sass
const sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

//plugin for js
const uglify = require('gulp-uglify')

// plugin for imagemin
const imagemin = require('gulp-imagemin'),
      mozjpeg  = require('imagemin-mozjpeg'),
      changed  = require('gulp-changed');

// plugin for gulptask
const browsersync = require("browser-sync").create(),
      gulpif = require('gulp-if'),
      minimist = require('minimist');

// development or production
const envOption = {
        string: 'env',
        // default is development
        default: { env: process.env.NODE_ENV || 'development' }
      },
      options = minimist(process.argv.slice(2), envOption);
const isProduction = (options.env === 'production') ? true : false;

//paths
const paths = {
  ejs: {
    srcRoot: './src/ejs/',
    src: './src/ejs/**/*.ejs',
    dest: './docs/'
  },
  json: {
    meta: './src/data/meta.json',
    albums: './src/data/albums.json'
  },
  sass: {
    src: './src/sass/*.scss',
    dest: './docs/css/'
  },
  js: {
    src: './src/js/*.js',
    dest: './docs/js/'
  },
  img: {
    src: './src/img/**/*.jpg',
    dest: './docs/img/albums/'
  }
}

// sass
function styles() {
  return gulp
  .src(paths.sass.src)
  .pipe(gulpif(isProduction,
    sass({
      // productionなら圧縮
      outputStyle: 'compressed'
    }),
    sass({
      // developmentなら圧縮しない
      outputStyle: 'expanded'
    })
  ))
  .pipe(autoprefixer({
    cascade: false,
    grid: 'autoplace'
  }))
  .pipe(gulp.dest(paths.sass.dest))
}

// ejs
function html(done) {
  const   metaObj = JSON.parse(fs.readFileSync(paths.json.meta, 'utf8')),
          albumsObj = JSON.parse(fs.readFileSync(paths.json.albums, 'utf8')),
          siteMeta = metaObj.site,
          devSiteMeta = metaObj.devSite,
          pagesMeta = metaObj.pages,
          albumList = albumsObj.pages;

  var pageMeta,
      pageName,
      album;

  for(var i = 0; i < pagesMeta.length; i++){
    pageMeta = pagesMeta[i];
    pageName = pageMeta.name

    if(!pageMeta.temp){
      gulp
      .src(paths.ejs.srcRoot+pageName+'.ejs')
      .pipe(gulpif(isProduction,
        ejs({
          siteMeta: siteMeta,
          pageMeta: pageMeta,
          pagesMeta: pagesMeta,
          albumList: albumList
        }),
        ejs({
          siteMeta: devSiteMeta,
          pageMeta: pageMeta,
          pagesMeta: pagesMeta,
          albumList: albumList
        })
      ))
      .pipe(rename({
        extname: '.html'
      }))
      .pipe(gulp.dest(paths.ejs.dest));
    }else{
      for (var i = 0; i < albumList.length; i++) {
        album = albumList[i]

        gulp
        .src(paths.ejs.srcRoot+pageName+'Template.ejs')
        .pipe(gulpif(isProduction,
          ejs({
            siteMeta: siteMeta,
            pageMeta: pageMeta,
            pagesMeta: pagesMeta,
            album: album
          }),
          ejs({
            siteMeta: devSiteMeta,
            pageMeta: pageMeta,
            pagesMeta: pagesMeta,
            album: album
          })
        ))
        .pipe(rename({
          dirname: pageName,
          basename: album.id,
          extname: '.html'
        }))
        .pipe(gulp.dest(paths.ejs.dest));
      }
    }
  }

  done();
}

// js
function scripts() {
  return gulp
  .src(paths.js.src)
  .pipe(uglify())
  .pipe(gulp.dest(paths.js.dest));
}

// imagemin
function imageMin() {
  return gulp
  .src(paths.img.src, {
    base: 'src/img/'
  })
  .pipe(changed(paths.img.src))
  .pipe(imagemin([
      mozjpeg({
        quality: 80,
      }),
    ]))
  .pipe(gulp.dest(paths.img.dest));
}

// browsersync
function browserSync(done){
  browsersync.init({
    server: {
      baseDir: "./docs/"
    },
    notify: false
  });
  done();
}

//watch
function watchFiles(done){
  const browserReload = () => {
    browsersync.reload();
    done();
  };
  gulp.watch(paths.sass.src).on('change', gulp.series(styles, browserReload));
  gulp.watch(paths.ejs.src).on('change', gulp.series(html, browserReload));
  gulp.watch(paths.js.src).on('change', gulp.series(scripts, browserReload));
  gulp.watch(paths.img.src).on('change', gulp.series(imageMin, browserReload));
}

gulp.task('browser-reload', function (done){
    browsersync.reload();
    done();
});

gulp.task('default', gulp.series(gulp.parallel(styles, html, scripts, imageMin), gulp.series(browserSync, watchFiles)));

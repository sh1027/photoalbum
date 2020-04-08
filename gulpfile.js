// plugin
const gulp = require("gulp"),
      fs = require('fs'),
      ejs = require("gulp-ejs"),
      rename = require('gulp-rename');

// json
const siteFile = './src/data/site.json',
      siteMeta = JSON.parse(fs.readFileSync(siteFile, 'utf8')),
      pagesFile = './src/data/pages.json'
      pageMetaList = JSON.parse(fs.readFileSync(pagesFile, 'utf8'))

// watch
gulp.task( "default", function(done) {
  gulp.watch("", gulp.parallel("index"));
  gulp.watch("", gulp.parallel("profile"));
  gulp.watch("", gulp.parallel("works"));
  gulp.watch("", gulp.parallel("portraits"));
  done();
});

// Index EJS
gulp.task("index", function(done) {
  var ejsFile = './src/ejs/index.json'

  gulp.src([ejsFile])
    .pipe(ejs({
      siteMeta: siteMeta,
      pageMeta: pageMetaList.index
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));

  done();
});

// Profile EJS
gulp.task("profile", function(done) {
  var ejsFile = './src/ejs/profile.json'

  gulp.src([ejsFile])
    .pipe(ejs({
      siteMeta: siteMeta,
      pageMeta: pageMetaList.profile
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));

  done();
});

// Portraits EJS
gulp.task("portraits", function(done){
  var jsonFile = './src/data/portraits.json',
      listFile = './src/ejs/portraits.ejs',
      tempFile = './src/ejs/portraitsTemplate.ejs',
      json = JSON.parse(fs.readFileSync(jsonFile, 'utf8')),
      pages = json.pages,
      id;

  gulp.src(listFile)
    .pipe(ejs({
      siteMeta: siteMeta,
      pageMeta: pageMetaList.portraits,
      jsonDataList: pages
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));

  for (var i = 0; i < pages.length; i++) {
    id = pages[i].id;

    gulp.src(tempFile)
      .pipe(ejs({
        siteMeta: siteMeta,
        pageMeta: pageMetaList.portraitsTemplate,
        jsonData: pages[i]
      }))
      .pipe(rename(id + '.html'))
      .pipe(gulp.dest('./docs/portraits'));
  }

  done();
});

// Works EJS
gulp.task("works", function(done){
  var jsonFile = './src/data/works.json',
      listFile = './src/ejs/works.ejs',
      tempFile = './src/ejs/worksTemplate.ejs',
      json = JSON.parse(fs.readFileSync(jsonFile, 'utf8')),
      pages = json.pages,
      id;

  gulp.src(listFile)
    .pipe(ejs({
      siteMeta: siteMeta,
      pageMeta: pageMetaList.works,
      jsonDataList: pages
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));

  for (var i = 0; i < pages.length; i++) {
    id = pages[i].id;

    gulp.src(tempFile)
      .pipe(ejs({
        siteMeta: siteMeta,
        pageMeta: pageMetaList.worksTemplate,
        jsonData: pages[i]
      }))
      .pipe(rename(id + '.html'))
      .pipe(gulp.dest('./docs/works'));
  }

  done();
});

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
gulp.task( "default", function() {
  gulp.watch("./src/ejs/**/*.ejs", gulp.series("ejs"));
});

// index EJS
gulp.task("ejs", function() {
  return gulp.src(["./src/ejs/**/*.ejs", '!' + "./src/ejs/**/_*.ejs"])
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));
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

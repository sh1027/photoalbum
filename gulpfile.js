// plugin
var gulp = require("gulp"),
    fs = require('fs'),
    ejs = require("gulp-ejs"),
    rename = require('gulp-rename');

// watch
gulp.task( "default", function() {
  gulp.watch("./src/ejs/**/*.ejs", gulp.series("ejs"));
});

// Index and Profile EJS
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
      jsonDataList: pages
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));

  for (var i = 0; i < pages.length; i++) {
    id = pages[i].id;

    gulp.src(tempFile)
      .pipe(ejs({
        jsonData: pages[i]
      }))
      .pipe(rename(id + '.html'))
      .pipe(gulp.dest('./docs/works'));
  }

  done();
});

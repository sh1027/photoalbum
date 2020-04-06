// plugin
var gulp = require("gulp");
var fs = require('fs');
var ejs = require("gulp-ejs");
var rename = require('gulp-rename');

// var json = JSON.parse(fs.readFileSync("src/data/data.json"));

// watch
gulp.task( "default", function() {
  gulp.watch("./src/ejs/**/*.ejs", gulp.series("ejs"));
});

// EJS
gulp.task("ejs", function() {
  return gulp.src(["./src/ejs/**/*.ejs", '!' + "./src/ejs/**/_*.ejs"])
    // .pipe(ejs({data:json}))
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./docs"));
});

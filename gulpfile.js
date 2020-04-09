// plugin
const gulp = require('gulp'),
      fs = require('fs'),
      ejs = require('gulp-ejs'),
      rename = require('gulp-rename');

// // json
// const siteFile = './src/data/site.json',
//       siteMeta = JSON.parse(fs.readFileSync(siteFile, 'utf8')),
//       pagesFile = './src/data/pages.json'
//       pageMetaList = JSON.parse(fs.readFileSync(pagesFile, 'utf8'))

// // watch
// gulp.task( "default", function(done) {
//   gulp.watch("./src/ejs/*.ejs", gulp.parallel("index"));
//   gulp.watch("./src/ejs/*.ejs", gulp.parallel("profile"));
//   gulp.watch("./src/ejs/*.ejs", gulp.parallel("works"));
//   gulp.watch("./src/ejs/*.ejs", gulp.parallel("portraits"));
//   done();
// });

// ejs
gulp.task("ejs", function(done) {
  const meta = JSON.parse(fs.readFileSync('./src/data/meta.json', 'utf8')),
        siteMeta = meta.site,
        pagesMeta = meta.pages,
        albums = JSON.parse(fs.readFileSync('./src/data/albums.json', 'utf8')),
        albumList = albums.pages
        ejsPath = './src/ejs/';

  var pageMeta,
      pageName,
      album;

  for(var i = 0; i < pagesMeta.length; i++){
    pageMeta = pagesMeta[i];
    pageName = pageMeta.name

    if(!pageMeta.temp){
      if(pageName=="albums"){
        gulp.src(ejsPath+pageName+'.ejs')
        .pipe(ejs({
          siteMeta: siteMeta,
          pageMeta: pageMeta,
          pagesMeta: pagesMeta,
          albumList: albumList
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest("./docs"));
      }else{
        gulp.src(ejsPath+pageName+'.ejs')
        .pipe(ejs({
          siteMeta: siteMeta,
          pageMeta: pageMeta,
          pagesMeta: pagesMeta
        }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest("./docs"));
      }
    }else{
      for (var i = 0; i < albumList.length; i++) {
        album = albumList[i]

        gulp.src(ejsPath+pageName+'Template.ejs')
          .pipe(ejs({
            siteMeta: siteMeta,
            pageMeta: pageMeta,
            pagesMeta: pagesMeta,
            album: album
          }))
          .pipe(rename(album.id + '.html'))
          .pipe(gulp.dest('./docs/'+pageName));
        }
    }
  }

  done();
});

// // Index EJS
// gulp.task("index", function(done) {
//   var ejsFile = './src/ejs/index.ejs'
//
//   gulp.src([ejsFile])
//     .pipe(ejs({
//       siteMeta: siteMeta,
//       pageMeta: pageMetaList.index
//     }))
//     .pipe(rename({extname: '.html'}))
//     .pipe(gulp.dest("./docs"));
//
//   done();
// });
//
// // Profile EJS
// gulp.task("profile", function(done) {
//   var ejsFile = './src/ejs/profile.ejs'
//
//   gulp.src([ejsFile])
//     .pipe(ejs({
//       siteMeta: siteMeta,
//       pageMeta: pageMetaList.profile
//     }))
//     .pipe(rename({extname: '.html'}))
//     .pipe(gulp.dest("./docs"));
//
//   done();
// });
//
// // Portraits EJS
// gulp.task("portraits", function(done){
//   var jsonFile = './src/data/portraits.json',
//       listFile = './src/ejs/portraits.ejs',
//       tempFile = './src/ejs/portraitsTemplate.ejs',
//       json = JSON.parse(fs.readFileSync(jsonFile, 'utf8')),
//       pages = json.pages,
//       id;
//
//   gulp.src(listFile)
//     .pipe(ejs({
//       siteMeta: siteMeta,
//       pageMeta: pageMetaList.portraits,
//       jsonDataList: pages
//     }))
//     .pipe(rename({extname: '.html'}))
//     .pipe(gulp.dest("./docs"));
//
//   for (var i = 0; i < pages.length; i++) {
//     id = pages[i].id;
//
//     gulp.src(tempFile)
//       .pipe(ejs({
//         siteMeta: siteMeta,
//         pageMeta: pageMetaList.portraitsTemplate,
//         jsonData: pages[i]
//       }))
//       .pipe(rename(id + '.html'))
//       .pipe(gulp.dest('./docs/portraits'));
//   }
//
//   done();
// });
//
// // Works EJS
// gulp.task("works", function(done){
//   var jsonFile = './src/data/works.json',
//       listFile = './src/ejs/works.ejs',
//       tempFile = './src/ejs/worksTemplate.ejs',
//       json = JSON.parse(fs.readFileSync(jsonFile, 'utf8')),
//       pages = json.pages,
//       id;
//
//   gulp.src(listFile)
//     .pipe(ejs({
//       siteMeta: siteMeta,
//       pageMeta: pageMetaList.works,
//       jsonDataList: pages
//     }))
//     .pipe(rename({extname: '.html'}))
//     .pipe(gulp.dest("./docs"));
//
//   for (var i = 0; i < pages.length; i++) {
//     id = pages[i].id;
//
//     gulp.src(tempFile)
//       .pipe(ejs({
//         siteMeta: siteMeta,
//         pageMeta: pageMetaList.worksTemplate,
//         jsonData: pages[i]
//       }))
//       .pipe(rename(id + '.html'))
//       .pipe(gulp.dest('./docs/works'));
//   }
//
//   done();
// });

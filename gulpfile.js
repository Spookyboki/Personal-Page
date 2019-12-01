'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var iconfont = require('gulp-iconfont');
var async = require('async');
var consolidate = require('gulp-consolidate');
var sassLint = require('gulp-sass-lint');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('sass-lint', function () {
    return gulp.src('app/scss/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('watch', gulp.series('sass', function (done){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass' , 'sass-lint' ));
    done();
}));

gulp.task('iconfont', function(done){
    var iconStream = gulp.src(['app/images/svg/*.svg'])
      .pipe(iconfont({
        fontName: 'icons',
      }));
      async.parallel([
        function handleGlyphs(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('conf/_iconfont-template.scss')
                  .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'icons',
                    fontPath: '../fonts/',
                    className: 's'
                  }))
                  .pipe(gulp.dest('app/scss/utilities/'))
                  .on('finish', cb);
              });
            },
            function handleFonts (cb) {
                iconStream
                    .pipe(gulp.dest('app/fonts/'))
                    .on('finish', cb);
            }
          ], done);
});


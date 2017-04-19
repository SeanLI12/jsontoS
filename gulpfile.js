var gulp = require('gulp');
var webserver = require('gulp-webserver');

var jsonToSass = require('gulp-json-to-sass');


gulp.task('sasss', function () {
    return gulp.src('scss/*.scss')
        .pipe(jsonToSass({
            jsonPath: 'json/vars.json',
            scssPath: 'sass/_variables.scss'
        }))
       
        .pipe(gulp.dest('dist/css'));
});



gulp.task('default',['sasss']);
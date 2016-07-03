function onLessError(err) {
    'use strict';
    console.log('!!! Less ERROR !!!', err);
    this.emit('end');
}

var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    path = require('path');


var paths = {
    lessFilesFolder: 'less/**/**/*.less',
    lessMainFile: 'less/main.less',
    outputCssFolder: 'css'
};

//---------- Задачи Start ----------
gulp.task('less', function () {
    'use strict';
    return gulp.src(paths.lessMainFile)
        .pipe(less({
            paths: [ path.join(paths.lessFilesFolder, 'less', 'includes') ]
        }))
        .on('error', onLessError)
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        .on('error',  onLessError)
        .pipe(gulp.dest(paths.outputCssFolder));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    'use strict';
    gulp.watch(paths.lessFilesFolder, ['less']);
});
//---------- Задачи End ----------

gulp.task('default', ['watch', 'less']);
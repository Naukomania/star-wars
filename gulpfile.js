var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

gulp.task('less', function() {
    return gulp.src('less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// Run everything
gulp.task('default', ['less']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "star-wars.loc/index.html",
		notify: false
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less'], function() {
    gulp.watch('less/*.less', ['less']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('/**/*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
const gulp = require('gulp');
const svgSymbols  = require('gulp-svg-symbols');

gulp.task('svgsprite', function () {
    return gulp.src('src/assets/svg/*.svg')
        .pipe(svgSymbols({
            templates: ['default-svg']
        }))
        .pipe(gulp.dest('src/assets/svg'));
});

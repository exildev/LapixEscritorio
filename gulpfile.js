const g = require('gulp');
const c = require('gulp-concat');
const u = require('gulp-uglify');
const sc = require('gulp-sass');
const sm = require('gulp-sourcemaps');
const del = require('del');

const dist = 'assets';

// g.task('serve', ['build'],  s('dist'));
// g.task('run', ['copy','js-dev', 'css-dev'], s('dist'));

g.task('clean', () => {
    return del('dist/*');
});

g.task('copy', () => {
    return g.src([
        'src/**',
        '!src/{js,js/**}',
        '!src/{scss,scss/**}',
        ]).pipe(g.dest(dist));
});

g.task('js', () => {
    return g.src(['src/js/**/*.js'])
        .pipe(c('app.js'))
        .pipe(g.dest('dist/js'))
        .pipe(u({ preserveComments: 'license' }))
        .pipe(g.dest(dist+'/js'));
});

g.task('css', () => {
    return g.src(['src/scss/**/*.scss'])
        .pipe(sc({outputStyle: 'compressed'}).on('error', sc.logError))
        .pipe(g.dest(dist+'/css'));
});

g.task('js-dev', () => {
    return g.src(['src/js/**/*.js'])
        .pipe(sm.init())
        .pipe(c('app.js'))
        .pipe(g.dest(dist+'/js'))
        .pipe(u({ preserveComments: 'license' }))
        .pipe(sm.write('./'))
        .pipe(g.dest(dist+'/js'));
});

g.task('css-dev', () => {
    return g.src(['src/scss/**/*.scss'])
        .pipe(sm.init())
        .pipe(sc({outputStyle: 'compact'}).on('error', sc.logError))
        .pipe(sm.write('./'))
        .pipe(g.dest(dist+'/css'));
});

g.task('build', ['copy','js', 'css'], () => {});

g.task('dev', () => {
    g.watch([ 'src/**', '!src/{js,js/**}', '!src/{scss,scss/**}'], ['copy']);
    g.watch('src/js/**/*.js', ['js-dev']);
    g.watch('src/scss/**/*.scss', ['css-dev']);
});


g.task('default', ['clean', 'build'], () => {});

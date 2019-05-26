const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const path = require('path');
const del = require('del');

const plugins = gulpLoadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
    nonJs: ['./package.json', './.env'],
    tests: './server/tests/*.js',
};

function cleanTask() {
    del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']);
}

function copyTask() {
    gulp
        .src(paths.nonJs)
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'));
}

function babelTask() {
    gulp
        .src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['@babel/preset-env'],
            plugins: ['istanbul'],
        }))
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            },
        }))
        .pipe(gulp.dest('dist'));
}

function defaultTask(cb) {
    cleanTask();
    copyTask();
    babelTask();
    cb();
}

function nodemonTask() {
    copyTask();
    babelTask();
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel'],
    });
}

function serveTask() {
    cleanTask();
    nodemonTask();
}

exports.default = defaultTask;
exports.clean = cleanTask;
exports.copy = copyTask;
exports.babel = babelTask;
exports.nodemon = nodemonTask;
exports.serve = serveTask;

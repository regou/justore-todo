var opt = {
	DOMAIN: 'http://localhost:63342/justore-todo', // prefix domain in the `name` param when upload file. Leave blank to use path. Do not add trailing slash
	API_URL: 'https://app.getsentry.com/api/0/projects/patsnap/justore-todo/',
	API_KEY: 'a3b1c90015a54c458adecfe45c63dc14',
	debug: true ,
	versionPrefix: 'release-' // Append before the version number in package.json
};
var clientApiUrl = 'https://2ca5c9fc49a24072a962d85f51f3f924@app.getsentry.com/57824';

var sentryRelease = require('gulp-sentry-release')('./package.json', opt);
var sourcemaps = require('gulp-sourcemaps');

var path = require('path');
var fs =require('fs');

var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var browserify = require('browserify');
var exorcist = require('exorcist');
var gutil = require('gulp-util');
var src = './js/app.js';
var sentrySrc = [
	'./dest/**/*.*'
];
var base = './';
var dest = path.join(__dirname, './dest');
var mapfile = path.join(dest, 'bundle.js.map');
var version = require('./package.json').version;

/*
 gulp sentry:release // Use package.json version
 gulp sentry:release -v 'version'
 gulp sentry:release --version 'version'
 */
gulp.task('sentry:release',['js','sentry:delete'], function () {

	return gulp.src(sentrySrc, { base: base })
		.pipe(sentryRelease.release(version));
});

/*
 gulp sentry:delete -v 'version'
 gulp sentry:delete --version 'version'
 */
gulp.task('sentry:delete', function () {
	var v = gutil.env.version || gutil.env.v || version;
	return gulp.src(sentrySrc, { base: base })
		.pipe(sentryRelease.deleteVersion(v));
});

/*
 gulp sentry:create -v 'version'
 gulp sentry:create --version 'version'
 */
gulp.task('sentry:create', function () {
	//var version = gutil.env.version || gutil.env.v;
	return gulp.src(sentrySrc, { base: base })
		.pipe(sentryRelease.createVersion(version));
});



gulp.task('replaceCatcher', function() {
	return gulp.src('./catcher_template.js')
		.pipe(replace('${clientApiUrl}', clientApiUrl))
		.pipe(replace('${releaseVersion}', version))
		.pipe(rename('catcher.js'))
		.pipe(gulp.dest(dest));
});

gulp.task('js', function() {
	return browserify({ debug: true })
		.require(require.resolve(src), { entry: true })
		.bundle()
		.pipe(exorcist(mapfile))
		.pipe(fs.createWriteStream(path.join(dest, 'bundle.js'), 'utf8'))
});

gulp.task('watch',['js'], function() {
	return gulp.watch('./js', ['js']);
});
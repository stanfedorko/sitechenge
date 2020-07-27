/*
	Gulpfile for Design to HTML workflow. Includes SASS, Pug compilation, Images Optimization, Server/Livereload
*/

const gulp = require('gulp');

// Server
const browserSync = require('browser-sync'); // server
const reload = browserSync.reload; // livereload

// Pug
const pug = require('gulp-pug'); // pug to html compilation
const pugInheritance = require('gulp-pug-inheritance'); // determine which files in a project extend and include modified files, and only compile those that are affected.
const prettify = require('gulp-html-prettify'); // prettify html output

// SASS
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob'); // import all files from folder. For example @import "components/**/*"

// // SASS to SCSS
// var converter = require('sass-convert');

// Images Optimization
const image = require('gulp-image'); // images optimization - jpg, png, svg

// Different
const clean = require('gulp-clean'); // delete files. For example before new compilation
const runSequence =  require('run-sequence'); // run tasks in sequence
const notify = require('gulp-notify'); // show desktop notifications on error
const filter = require('gulp-filter'); // don't remember what is it but include _mixins does not work without it
const cached = require('gulp-cached'); // process only changed files. very important in Pug. To process only changed, not dozens of files




// Paths
const paths = {
	dist: {
		html: './', // same directory
		css: 'css/',
		js: 'js/',
		img: 'img/',
		server: './' // same directory
	},

	src: {
		pug: ['pug/**/*.pug'],
		pugDir: 'pug/',
		sass: 'sass/application.sass',
		js: 'js/**/*.js',
		img: 'img/**/*'
	},

	watch: {
		pug: 'pug/**/*.pug',
		js: 'js/**/*.js',
		sass: 'sass/**/*',
		img: 'img/**/*'
	},

	clean: {
		css: 'css/',
		html: '*.html',
		favicons: 'android-chrome-192x192.png, android-chrome-512x512.png, apple-touch-icon.png, browserconfig.xml, favicon-16x16.png, favicon-32x32.png, favicon.ico, mstile-70x70.png, mstile-144x144.png, mstile-150x150.png, mstile-310x150.png, mstile-310x310.png, safari-pinned-tab.svg, site.webmanifest'
	}
};



// Pug compilation
gulp.task('pug', function() {
	gulp.src(paths.src.pug)
		.pipe(cached('pug')) // process only changed
		.pipe(pugInheritance({ // process files that contains changed files
			basedir: paths.src.pugDir,
			extension: '.pug',
			skip:'node_modules/'
		}))
		.pipe(filter(function (file) { // don't remember what is it but include _mixins does not work without it
			return !/\/_/.test(file.path) && !/^_/.test(file.relative);
		}))
		.pipe(pug())
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(prettify({
			indent_size: 1, // 1 tab
			indent_char: '	' // tab instead spaces
		}))
		.pipe(gulp.dest(paths.dist.html))
		.pipe(reload({stream: true}));
})



// SASS compilation - with Sourcemaps
gulp.task('sass', function () {
	gulp.src(paths.src.sass)
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist.css))    
		.pipe(reload({stream: true}));
});




// SASS Production compilation - without soursemaps, minified CSS
gulp.task('sass-production', function () {
	gulp.src(paths.src.sass)
		.pipe(sassGlob())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', notify.onError(function (error) {
			return error.message;
		}))
		.pipe(gulp.dest(paths.dist.css))    
		.pipe(reload({stream: true}));
});



// Images Optimization
gulp.task('img', function () {
	gulp.src(paths.src.img)
		.pipe(cached(paths.src.img)) // process only changed
		.pipe(image())
		.pipe(gulp.dest(paths.dist.img));
});


// Clean Task - delete files
gulp.task('clean', function () {
	
	// clean html/css
	gulp.src(
		[
			paths.clean.css,
			paths.clean.html
		],
		{ read: false }
	)
	.pipe(clean());

});


// Clean Task - Favicon
gulp.task('clean-fav', function () {

	// get favicon filenames stroing, remove white spaces and split to array
	const favicons = paths.clean.favicons.replace(/ /g, '').split(',');

	// clean favicon files
	favicons.forEach((favicon) => {

		gulp.src(
			favicon,
			{ read: false }
		)
		.pipe(clean());
	})

});



// Server
gulp.task('server', function() {
	browserSync({
		host: 'localhost',
		port: 3000,
		server: {
			baseDir: paths.dist.server
		},
		notify: false, // don't show message "Connected to BrowserSync"
		open: false, // Stop the browser from automatically opening
		// external: "http://192.168.0.102:3000" // external URL - 
	});
});



// Watch Tasks - Livereload - watch changes and compile
gulp.task('watch-pug', () => {
	gulp.watch(paths.watch.pug, function(event, cb) {
		gulp.start('pug');
	}, reload);
});

gulp.task('watch-sass', () => {
	gulp.watch(paths.watch.sass, function(event, cb) {
		gulp.start('sass');
	});
});

gulp.task('watch-sass-production', () => {
	gulp.watch(paths.watch.sass, function(event, cb) {
		gulp.start('sass-production');
	});
});

gulp.task('watch-js', () => {
	gulp.watch(paths.watch.js).on('change', reload);
});


// Watch Task - Livereload - for development
gulp.task('watch', ['watch-pug', 'watch-sass', 'watch-js']);


// Watch Task - Livereload - for Production
gulp.task('watch-production', ['watch-pug', 'watch-sass-production', 'watch-js']);



// Default Task - for development. Includes Sourcemaps and NOT-minifed CSS
gulp.task('default', ['server', 'pug', 'sass', 'watch']);



// Production Task - Includes Minified CSS and No Sourcemaps
gulp.task('prod', function() {
	
	runSequence(
		// 'clean', ['server', 'pug', 'sass-production', 'img', 'watch-production']
		'clean', ['server', 'pug', 'sass-production', 'watch-production']
	);

});










var critical = require( 'critical' );
var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	csslint = require( 'gulp-csslint' ),
	jshint = require( 'gulp-jshint' ),
	htmlhint = require( 'gulp-htmlhint' ),
	bootlint = require( 'gulp-bootlint' ),
	del = require( 'del' ),
	concat = require( 'gulp-concat' ),
	jsmin = require( 'gulp-jsmin' ),
	htmlmin = require( 'gulp-htmlmin' ),
	csso = require( 'gulp-csso' ),
	imagemin = require( 'gulp-imagemin' ),
	zopfli = require( 'imagemin-zopfli' ), //imagemin plugin
	pngcrush = require( 'imagemin-pngcrush' ), //imagemin plugin
	jpegrecompress = require( 'imagemin-jpeg-recompress' ), //imagemin plugin
	responsive = require( 'gulp-responsive' ),
	rename = require( 'gulp-rename' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	replace = require( 'gulp-replace' );
runSequence = require( 'run-sequence' ),
	rev = require( 'gulp-rev' ),
	pump = require( 'pump' ),
	reporters = require( 'reporters' ),
	logCapt = require( 'gulp-log-capture' );

//set report collection level
reporters.debug = true;

//run validation checks
gulp.task( 'html_check', function () {
	gulp.src( 'src/*.html' )
		.pipe( htmlhint() )
		.pipe( htmlhint.reporter() );
} );


gulp.task( 'css_check', function () {
	gulp.src( 'src/css/*.css' )
		.pipe( csslint() )
		.pipe( csslint.reporter( reporters( 'gulp-csslint' ) ) );
} );

gulp.task( 'js_check', function () {
	return gulp.src( 'src/js/*.js' )
		.pipe( jshint() )
		.pipe( jshint.reporter( reporters( 'gulp-jshint' ) ) );
} );

//collect debug report
gulp.task( 'reports', function () {
	logCapt.start( console, 'build' )
	reporters.output = function ( messages ) {
		messages && messages.forEach( function ( message ) {
			console.log( message.description );
		} );
	}
	logCapt.stop( 'xml' )
} );

//optimize and minify HTML
gulp.task( 'minHTML', function () {
	return gulp.src( 'src/*.html' )
		.pipe( replace( '.js', '.min.js' ) )
		.pipe( replace( '.min.min.js', '.min.js' ) )
		.pipe( replace( '.css', '.min.css' ) )
		.pipe( replace( '.min.min.css', '.min.css' ) )
		.pipe( htmlmin( {
			collapseWhitespace: false
		} ) )
		.pipe( htmlmin( {
			removeComments: true
		} ) )
		.pipe( htmlmin( {
			HTML5: true
		} ) )
		.pipe( gulp.dest( 'dist' ) );
} );

//optimize and minify CSS
gulp.task( 'minCSS', function () {
	return gulp.src( 'src/css/*.css' )
		.pipe( csso( {
			restructure: true,
			sourceMap: true,
			debug: true,
			comments: false
		} ) )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( gulp.dest( 'dist/css' ) );
} );

//optimize and minify JS
gulp.task( 'minJS', function () {
	gulp.src( 'src/js/*.js' )
		.pipe( jsmin() )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( gulp.dest( 'dist/js' ) );
} );

//copy 3rd party libraries help file
gulp.task( 'copyLib', function () {
	gulp.src( 'src/lib/*.*' ).pipe( gulp.dest( 'dist/lib/' ) );
} );


//copy markdown help file
gulp.task( 'copyMD', function () {
	gulp.src( 'src/*.md' ).pipe( gulp.dest( 'dist/' ) );
} );

//delete dist folder in preparation for next build.
gulp.task( 'wipe_dist', function () {
	return del.sync( 'dist/**/*' );
} );

gulp.task( 'resetBuild', [ 'wipe_dist' ] );

gulp.task( 'lintSource', [ 'html_check', 'css_check', 'js_check', 'reports' ] );

gulp.task( 'makeBuild', [ 'minHTML', 'minCSS', 'minJS', 'copyMD', 'copyLib' ] );

gulp.task( 'critical', [ 'makeBuild' ], function ( cb ) {
	critical.generate( {
		inline: true,
		base: 'dist/',
		src: 'index.html',
		dest: 'dist/index-critical.html',
		minify: true,
		width: 320,
		height: 480
	} );
} );

gulp.task( 'backupIndex', function () {
	gulp.src( "./dist/index.html" )
		.pipe( rename( 'index.bak' ) )
		.pipe( gulp.dest( "./dist" ) );
} );

gulp.task( 'renameIndexCritical', function () {
	gulp.src( "./dist/index-critical.html" )
		.pipe( rename( 'index.html' ) )
		.pipe( gulp.dest( "./dist" ) );
} );

gulp.task( 'replaceIndex', function () {
	return runSequence( 'backupIndex', 'renameIndexCritical' );
} );

gulp.task( 'buildIt', function () {
	return runSequence( [ 'wipe_dist' ], 'critical', 'replaceIndex' );
} );

gulp.task( 'default', function () {
	return gutil.log( 'The available task group options are: resetBuild, lintSource, imgProcess, makeBuild or critical (makebuild with critical path inline-CSS.)' );
} );

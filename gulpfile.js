/*******************************
 *                             *
 * 			Gulpfile           *
 *                             *
 * *****************************
 * 
 * Available tasks:
 * 
 * 
 * 
 ******************************/

/*******************************
 *                             *
 * 			Modules            *
 *                             *                     
 * ***************************** 
 * gulp: The streaming build system
 * https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
 * 
 * gulp-flatten: Remove or replace relative path for files
 * https://github.com/armed/gulp-flatten
 * 
 * gulp-if: Conditionally run a task
 * https://github.com/robrich/gulp-if
 * 
 * gulp-load-plugins: Automatically load any gulp plugins in your package.json
 * https://github.com/jackfranklin/gulp-load-plugins
 * 
 * gulp-notify: gulp plugin to send messages based on Vinyl Files or Errors to Mac OS X, Linux or Windows 
 * https://github.com/mikaelbr/gulp-notify
 * 
 * gulp-sass: Sass plugin for Gulp.
 * https://github.com/dlmanning/gulp-sass
 * 
 * gulp-uglify: Minify files with UglifyJS
 * https://github.com/terinjokes/gulp-uglify
 ******************************/

/*******************************
 *                             *
 * 			Declarations       *
 *                             *
 * ****************************/
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var options = {
    info: {
        name: "TR SUPPORT TOOLS"
    },

    minified: false,

    paths: {
        nodeFolder: "./node_modules/",

        resourcesFolder: "./resources/",
        resources: {
            angular: "./node_modules/angular*/**/*.min.js",
            sass: "./resources/sass/*.scss",
            js: "./resources/js/**/*.js",
            icons: "./resources/logos_tech/"
        },
        publicFolder: "./extension/",
        public: {
            css: "./extension/css",
            js: "./extension/js"
        }
    }
};

gulp.task("default", ["sass", "js", "watch"], function() {

});

gulp.task('watch', function() {
    gulp.watch(options.paths.resources.sass, ["sass"]);
    gulp.watch(options.paths.resources.js, ["js"]);
})

gulp.task("sass", function() {
    gulp.src(options.paths.resources.sass)
        .pipe(plugins.sass({ outputStyle: "extended" }))
        .pipe(gulp.dest(options.paths.public.css))
        .pipe(plugins.notify({
            "title": "Project web site: " + infos.name,
            "subtitle": "SASS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": options.paths.resources.icons + "sass_logo.png",
            "onLast": true,
        }));
})

gulp.task("js", function() {
    console.log(options.paths.resources.icons);
    gulp.src([options.paths.resources.js, options.paths.resources.angular])
        .pipe(plugins.if(options.minified, plugins.uglify()))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(options.paths.public.js))
        .pipe(plugins.notify({
            "title": "Project web site: " + options.info.name,
            "subtitle": "JS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": options.paths.resources.icons + "sass_logo.png",
            "onLast": true,
        }));
})
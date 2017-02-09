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
var $ = require("gulp-load-plugins")();

var options = {
    name: "TR SUPPORT TOOLS"
};

var paths = {
    nodeFolder: "./node_modules/",
    resourcesFolder: "./resources/",
    publicFolder: "./extension/"
};

var angular = {
    modules: "./node_modules/angular*/**/*.min.js",
    componentsControllers: "./resources/components/**/*.js",
    componentsTemplates: "./resources/components/**/*.pug"
};

var resources = {
    bootstrap: "./node_modules/bootstrap/dist/**/*.min",
    view: "./resources/views/*.pug",
    sass: "./resources/sass/*.scss",
    js: "./resources/js/**/*.js",
    icons: "./resources/logos_tech/"
};

var dist = {
    build: false,

    view: "./extension/",
    css: "./extension/css/",
    js: "./extension/js/",
    components: "./extension/components/"
};


/*******************************
 *                             *
 * 			Tasks              *
 *                             *
 * ****************************/
gulp.task("default", ["view", "sass", "js", "components:controllers", "components:templates", "watch"], function() {

});

gulp.task("watch", function() {
    gulp.watch(resources.view, ["view"]);
    gulp.watch(resources.sass, ["sass"]);
    gulp.watch(resources.js, ["js"]);
    gulp.watch(angular.componentsControllers, ["components:controllers"]);
    gulp.watch(angular.componentsTemplates, ["components:templates"]);
})

gulp.task("view", function() {
    gulp.src(resources.view)
        .pipe($.if(dist.build, $.pug({ doctype: "html" }), $.pug({ pretty: true, doctype: "html" })))
        .pipe($.flatten())
        .pipe(gulp.dest(dist.view))
        .pipe($.notify({
            "title": "Project web site: " + options.name,
            "subtitle": "VIEW - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": resources.icons + "pug_logo.png",
            "onLast": true,
        }));
})

gulp.task("sass", function() {
    gulp.src([resources.sass, resources.bootstrap + ".css"])
        .pipe($.if(dist.build, $.sass(), $.sass({ outputStyle: "extended" })))
        .pipe($.flatten())
        .pipe(gulp.dest(dist.css))
        .pipe($.notify({
            "title": "Project web site: " + options.name,
            "subtitle": "SASS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": resources.icons + "sass_logo.png",
            "onLast": true,
        }));
})

gulp.task("js", function() {
    gulp.src([resources.js, , resources.bootstrap + ".js", angular.modules])
        .pipe($.if(dist.build, $.uglify()))
        .pipe($.flatten())
        .pipe(gulp.dest(dist.js))
        .pipe($.notify({
            "title": "Project web site: " + options.name,
            "subtitle": "JS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": resources.icons + "sass_logo.png",
            "onLast": true,
        }));
});

gulp.task("components:controllers", function() {
    gulp.src(angular.componentsControllers)
        .pipe($.if(dist.build, $.uglify()))
        .pipe(gulp.dest(dist.components))
        .pipe($.notify({
            "title": "Project web site: " + options.name,
            "subtitle": "COMPONENTES CONTROLLER - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": resources.icons + "js_logo.png"
        }));
});

gulp.task("components:templates", function() {
    gulp.src(angular.componentsTemplates)
        .pipe($.if(dist.build, $.pug({ doctype: "html" }), $.pug({ pretty: true, doctype: "html" })))
        .pipe(gulp.dest(dist.components))
        .pipe($.notify({
            "title": "Project web site: " + options.name,
            "subtitle": "COMPONENTES TEMPLATES - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog",
            "icon": resources.icons + "pug_logo.png"
        }));
});
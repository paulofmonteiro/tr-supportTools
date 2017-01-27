var gulp = require("gulp");
var notify = require("gulp-notify");

var flatten = require("gulp-flatten");

var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

var paths = {
    resources: {
        folder: "./resources/"
    },

    public: {
        folder: "./extension/"
    },

    node: {
        folder: "./node_modules/"
    }
};

paths.resources.sass = paths.resources.folder + "sass/*.scss";
paths.resources.js = paths.resources.folder + "js/**/*.js";
paths.resources.icons = paths.resources.folder + "logos_tech/";

paths.node.angular = paths.node.folder + "angular*/**/*.min.js";

paths.public.view = paths.public.folder;
paths.public.css = paths.public.folder + "css";
paths.public.js = paths.public.folder + "js";

var infos = {
    name: "TR SUPPORT TOOLS"
}

gulp.task("default", ["sass", "js", "watch"], function() {

});

gulp.task('watch', function() {
    gulp.watch(paths.resources.sass, ["sass"]);
    gulp.watch(paths.resources.js, ["js"]);
})

gulp.task("sass", function() {
    gulp.src(paths.resources.sass)
        .pipe(sass({ outputStyle: "extended" }))
        .pipe(gulp.dest(paths.public.css))
        .pipe(notify({
            "title": "Project web site: " + infos.name,
            "subtitle": "SASS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog", // case sensitive
            //"icon": paths.resources.icons + "sass_logo.png", // case sensitive
            "onLast": true,
        }));
})

gulp.task("js", function() {
    gulp.src([paths.resources.js, paths.node.angular])
        //.pipe(uglify())
        .pipe(flatten())
        .pipe(gulp.dest(paths.public.js))
        .pipe(notify({
            "title": "Project web site: " + infos.name,
            "subtitle": "JS - COMPILED",
            "message": "<%= file.relative %>",
            "sound": "Frog", // case sensitive
            //"icon": paths.resources.icons + "sass_logo.png", // case sensitive
            "onLast": true,
        }));
})
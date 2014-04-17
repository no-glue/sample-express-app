var gulp = require('gulp');

var uglify = require('gulp-uglify');

var concat = require('gulp-concat');

var paths = {
    scripts: [
      './public/javascripts/controlPanel.js',
      './public/javascripts/models/*.js',
      './public/javascripts/collections/*.js',
      './public/javascripts/views/*.js',
      './public/javascripts/options/*.js',
      './public/javascripts/controllers/*.js',
      './public/javascripts/router.js',
      './public/javascripts/start.js',
      '!./public/javacscripts/lib/*'
    ]
};

gulp.task('scripts', function() {
  // join scripts and minify

  return gulp.src(paths.scripts).
    pipe(uglify()).
    pipe(concat('include.js')).
    pipe(gulp.dest('./public/javascripts'));
});

gulp.task('default', ['scripts']);
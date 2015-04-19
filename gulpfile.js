var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat= require('gulp-concat'),
   jshint= require('gulp-jshint'),
   nodemon = require('gulp-nodemon');

gulp.task('minify', function () {
   gulp.src('app.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});

gulp.task('lint', function () {
   return gulp.src('app.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      //.pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('demon', function () {
  nodemon({
    script: '*.js',
    ext: 'html js css',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

//Running server automatically (and restarting when there is an error) and also automatic updates when there is .js file change happening.
//$forever start -c nodemon app.coffee

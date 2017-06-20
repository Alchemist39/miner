//подключаем используемые модули
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var uglifycss = require('gulp-uglifycss');


gulp.task('scripts', function() {
  return gulp
  	.src(['js/!(main)*.js', 'js/main.js'])
    .pipe(concat('allgame.min.js'))
    .pipe(gulp.dest('./'));
});
/*
this.src = function(path) {
	this.setPath(path);
	...
	return this;
}*/

// уродование js в es6 не поддерживается
gulp.task('uglify', function() {
	/*var gulpInstance = gulp;
	var another = gulpInstance.src('dist/allgame.min.js');
	var uglyJs = uglify('allgame.min.js');
	var someone = another.pipe(uglyJs);
	var destination = gulp.dest('./');
	someone.pipe(destination);
	*/
  gulp.src('dist/allgame.min.js').pipe(uglify('allgame.min.js')).pipe(gulp.dest('./'))});

//создаем функцию объединения стилей
gulp.task('styles', function() {
	//пооередно задаем последовательность стилей в конечном файле
	return gulp.src(['styles/*.css'])
	// задаем имя объединенного файла
	.pipe(concat('main.min.css'))
	// помещаем его в текущую директорию (или другую, при необходимости)
	.pipe(gulp.dest('./'));
});

// преобразование стилейв уродливый файл
gulp.task('css', function () {
	// преобразуемый файл
	gulp.src('main.min.css')
	.pipe(uglifycss({
		"maxLineLen": 80,
		"uglyComments": true
		}))
	.pipe(gulp.dest('./'));
});



// форма вызова скрипта с перечислением в массиве команд к выполнению в определенной последовательности
// gulp
gulp.task('default', ['scripts', 'styles', 'css']);
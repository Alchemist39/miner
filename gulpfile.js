//подключаем используемые модули
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var uglifycss = require('gulp-uglifycss');

var babel = require('gulp-babel');

gulp.task('js', () => {
  return gulp.src([
      	'./client/js/!(main)*.js',
      	'./client/js/main.js'
    ])
  	// перегоняем все в es5
  	// объединяем
  	// уродуем и складываем полученный файл в другую директорию во избежание зацикливания
    .pipe(babel({presets: ['es2015']})) // <= добавили эту строку
    .pipe(concat('allgame.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client'));
});
//создаем функцию объединения стилей
gulp.task('styles', function() {
	//пооередно задаем последовательность стилей в конечном файле
	return gulp.src(['./client/styles/*.css'])
	// задаем имя объединенного файла
	.pipe(concat('main.min.css'))
	// уродуем файл
	.pipe(uglifycss({
		"maxLineLen": 80,
		"uglyComments": true
		}))
	// помещаем его в текущую директорию (или другую, при необходимости)
	.pipe(gulp.dest('./client'));
});

// форма вызова скрипта с перечислением в массиве команд к выполнению в определенной последовательности
// gulp
gulp.task('default', ['js', 'styles']);
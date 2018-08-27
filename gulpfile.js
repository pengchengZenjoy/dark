var gulp = require('gulp');
var uglify = require('gulp-uglify');   ////用于压缩js文件
var babel = require('gulp-babel');

gulp.task('es6',function(){
    /////找到文件
    gulp.src('build/wechatgame/cocos2d-js-min.js')
    //////把ES6代码转成ES5代码
    .pipe(babel())
    /////压缩文件
    .pipe(uglify())
    /////另存压缩后文件
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['es6']);
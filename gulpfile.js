var gulp = require('gulp');
var server = require('gulp-webserver');
var concat = require('gulp-concat');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var path = require('path');
var fs = require('fs');
var url = require('url');

var listJson = require('./mock/list.json');

//编译sass、压缩css
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8800,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/list') {
                    var key = url.parse(req.url, true).query.key;
                    var target = [];
                    listJson.forEach(function(item) {
                        if (item.title.match(key)) {
                            target.push(title);
                        }
                    })
                    res.end(JSON.stringify({ code: 1, data: listJson }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

//压缩js
gulp.task('minjs', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

//监听watch自动刷新
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'minjs', 'server', 'watch'));
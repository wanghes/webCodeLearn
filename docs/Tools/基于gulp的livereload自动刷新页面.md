# gulp-livereload <https://github.com/vohof/gulp-livereload>
说在前边：在开始前端自动刷新浏览器，需要在浏览器中安装livereload，然后还需要通过npm安装静态资源服务器，有gulp-webserver，http-server, anywhere等好多
1. 谷歌浏览器或火狐安装livereload插件：
 * 说明：谷歌浏览器安装插件需要翻墙，我已经下载了最新版本2.1.0到本地，[点击下载](http://item.mousebird.cn/common/livereload.rar "livereload插件")（谷歌为.crx文件，火狐为.xpi文件）
 * 安装方法：谷歌浏览器安装crx插件方法、火狐浏览器直接将xpi文件拖进浏览器即可安装
2. 安装**anywhere**，我全局安装了 ```npm i anywhere -g```,为了测验同时安装了**http-server,less** ```npm i http-server -g``` ```npm i gupl-less``` **less** 是用来编译``.less``后缀文件为css文件
3. 安装主角 **gulp-livereload** ```npm i gulp-livereload ```。OK到这基本的gulp刷新构建功能插件都安装完成了。

## anywhere做静态资源服务器自动刷新浏览器
首先进新建一个__gulpfile.js__的gulp默认执行的文件,以便于直接执行```gulp task```,默认不写task,gulp会自动执行__default__任务，如果文件名字不是他的话也可以使用其他的命令```gulp --gulpfile xxx.js task ```
```javascript
//gulpfile.js文件
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less'] ,function(file){
        livereload.changed(file.path); //可以不写
    });
});
```
livereload.listen({ basePath: 'dist' }); livareload可以设置basePath来保证监测的目录。

然后新建一个index.html,以便于执行```anywhere```命令直接找到默认执行文件，html文件中引入XXX.css文件【前提是我们的less文件也是xxx.less文件】；

执行``` gulp watch ```,任务就跑了起来，然后打开浏览器，anywhere默认会监听8000的断开，输入127.0.0.1:8000，然后点亮浏览器的livereload的插件样式图标，然后修改xxx.less样式，浏览器**自动刷新**了并更新为最新的样式

## http-server做静态资源服务器自动刷新浏览器
http-server其实和anywhere是同一个事情 运行```http-server -p 1234``` 也会启动一个静态资源服务器，而且还会有请求的log,打印在console中；

## 用http模块创建一个静态服务器
安装模块```npm i st --save-dev```这是一个服务静态资源文件，Etag, 和缓存的一个文件

创建一个名为static-server.js文件
```javascript
//static-server.js
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
  livereload.listen({ basePath: './' });
  gulp.watch('less/*.less', ['less']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/', index: 'index.html', cache: false })
  ).listen(8080, done);
});
```
然后新建一个index.html,以便于执行```gulp watch```命令直接找到默认执行文件，这里通过配置文件会自动启动一个静态服务器了，html文件中引入XXX.css文件【前提是我们的less文件也是xxx.less文件】；

## gulp-webserver 创建静态资源服务器
安装模块``npm instal gulp-livereload gulp-webserver --save-dev``

在项目根目录中，创建gulpfile.js文件，用来配置和定义任务（task）

打开Gulpfile.js文件中，填写相关配置
```javascript
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'), // 网页自动刷新（服务器控制客户端同步刷新）
    webserver = require('gulp-webserver'); // 本地服务器

// 注册任务
gulp.task('webserver', function() {
    gulp.src( './' ) // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
        livereload: true, // 启用LiveReload
        open: true // 服务器启动时自动打开网页
    }));
});

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});


// 监听任务
gulp.task('watch',function(){
    gulp.watch( 'less/*.less', ['less']) // 监听less下所有.less文件
});

// 默认任务
gulp.task('default',['webserver','watch']);
```
这里由于注册了default任务，直接执行```gulp```命令就启动了静态资源服务器，会自动打开基于端口8080的本地服务器，然后修改less文件，浏览器自动刷新，跟新最新的修改样式。

以上便是基于gulp的多种自动刷新浏览器的的功能。
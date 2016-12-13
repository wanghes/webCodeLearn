# gulp-rev-append


制作庞大项目中经常会遇到修改了js或者css文件，刷新浏览器发现不起作用，一般可以定为文件存在缓存，处理方式大概有两种：

* 第一种方式：给请求文件的末尾添加变化查询参数，也就是经常说的加版本号【但由于我们每次修改完就手动的手改这样太麻烦，尤其是耦合比较大要改许多的文件，这种情况可想而知】，所以用一种自动化的方案添加版本号。
* 第二种方式：变化修改的文件名就是给文件名把后边加盐，生成新的资源文件，浏览器就自然而然的请求新的资源文件。

这部分只说明文件加版本号的方法：
## gulp通过查询参数清除文件缓存
利用gulp-rev-append给文件后缀添加版本号，gulp-rev-append 允许你添加声明一个查询字符串的hash添加到文件中
1. 首先准备一个index.html文件：
```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css?rev=@@hash">
    <script src="script/script-one.js?rev=@@hash"></script>
    <script src="script/script-two.js?rev=@@hash"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js?rev=@@hash"></script>
  </body>
</html>
```
2. 然后再script文件夹中准备script-one.js\script-two.js\script-three.js这些js文件
3. 最后在准备在style文件夹准备style-one.css文件
```@@hash```可以替换为任何值，但是必须要有```?rev=```，因为这个根据 正则: (?:href|src)="(.*)[\?]rev=(.*)[\"] 去匹配的

运行gulp将会把index.html文件修改成下边这样:
```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css?rev=75faaf4d19ad6a98ef527b6ee507500f">
    <script src="script/script-one.js?rev=17834a8fc76a9b10f743eff8ddfd5c7a"></script>
    <script src="script/script-two.js?rev=f831f7743b1eee678a9939f11387f795"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js?rev=feee7fe5c2b3e5a830d60c768d179d50"></script>
  </body>
</html>
```
我们的gulp文件是这样的【gulpfile.js】
```javascript
var gulp = require('gulp');
var rev = require('gulp-rev-append');

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch('./style/style-one.css', ['rev']);
    gulp.watch('./script/script-one.js', ['rev']);
    gulp.watch('./script/script-two.js', ['rev']);
    gulp.watch('./script/script-three.js', ['rev']);
});

gulp.task('default', ['rev','watch']);
```
在这里我们需要实时监测这些index.html依赖的文件的变化，一旦变化就会触发rev任务，重新生成新的版本号。所以无需手动修改版本号就可以实现文件的不缓存行为。




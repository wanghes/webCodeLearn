# 利用grunt自编译sass文件
## grunt-contrib-sass
这里我们需要安装 ``` npm i grunt grunt-contrib-sass grunt-contrib-watch ``` grunt-contrib-watch会检测文件变化自动重新编译sass文件

根目录下创建Gruntfile.js文件
```javascript
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            basePath: '',
            srcPath: 'assets/sass/',
            deployPath: 'assets/css/'
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

        // Task configuration.
        sass: {
            dist: {
                files: {
                    'assets/css/style.css': 'assets/sass/style.scss'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= meta.srcPath %>/**/*.scss'
                ],
                tasks: ['sass']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['sass']);
};

```
目录结构如下

![目录结构01](/images/20161213pm01.jpg)

assets 目录结构如下

![目录结构02](/images/20161213pm02.jpg)
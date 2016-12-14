# webpack构建React应用
* 首先安装开发环境依赖 ```npm i babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server --save-dev```
* 然后再安装生产环境依赖项 ```npm i react react-dom --save```

## 创建webpack.config.js位置文件
```
var config = {
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js', //输出文件名字
    },
    devServer: {
        inline: true,
        port: 7777,
        color:true,
        hot:true,
        progress:true
    },
    devtool: 'eval-source-map', //一旦代码出错可以定义出错位置
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}

module.exports = config;

```
## 在根目录创建一个index.html文件，引入加载的js文件。
```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset = "UTF-8">
      <title>React App</title>
   </head>
   <body>
      <div id = "app"></div>
      <script src = "index.js"></script>
   </body>
</html>
```
## 然后在根目录创建main.js
```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'))

```
## 然后在根目录创建App.jsx
```
import React from 'react';
class App extends React.Component {
   render() {
      return (
         <div>
            <h1>Hello World!</h1>
         </div>
      );
   }
}
export default App;
```

## 查看package.json 生成了：
```
{
  "name": "react-start",
  "version": "1.0.0",
  "description": "开始react",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --progress --colors --hot"
  },
  "author": "wanghes",
  "license": "MIT",
  "dependencies": {
    "react": "^0.14.7",
    "react-dom": "^0.14.7"
  },
  "devDependencies": {
    "babel-core": "^6.20.0",
    "babel-loader": "^6.2.9",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.14.1"
  }
}

```
在package.json中 scripts字段中 ``"start": "webpack-dev-server --progress --colors --hot"``,当运行npm start 就会开始实施构建任务了。
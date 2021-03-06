var JS = [
  {title:"JS排序算法",path:"/JS/JSSort"},
  {title:"JS去重算法",path:"/JS/arrayUnique"},
  {title:"异步表单提交方式",path:"/JS/异步表单提交方式"},
  {title:"html5-history制作路由",path:"/JS/html5-history制作路由"},
];

var Angularjs = [
  {title: 'uiState', path: '/Angularjs/uiState'},
];

var Backbonejs = [
  {title: 'Backbonejs', path: '/Backbonejs/'},
];

var React = [
  {title: 'React-router', path: '/React/reactRouter'},
];

var Tools = [
  {title: '编译ES2015', path: '/Tools/编译ES2015'},
  {title: "怎样使用webpack", path:"/Tools/webpackHowTo"},
  {title: 'gulp通过查询参数清除文件缓存', path: '/Tools/gulp通过查询参数清除文件缓存'},
  {title: '利用grunt自编译sass文件', path: '/Tools/利用grunt自编译sass文件'},
  {title: '基于gulp的livereload自动刷新页面', path: '/Tools/基于gulp的livereload自动刷新页面'},
  {title: "webpack构建React应用",path: '/Tools/webpack构建React应用'},
];



self.$config = {
  title: 'javascript_examples',
  repo: 'wanghes',
  nav: {
    default: [
      {
        title: '首页', path: '/'
      },
      {
        title: '前端工具', path: '/Tools/',type: 'dropdown', items: Tools
      },
      {
        title: 'JS技巧', path: '/JS/',type: 'dropdown', items: JS
      },
      {
        title: 'React', path: '/React/',type: 'dropdown', items: React
      },
      {
        title: 'Angularjs', path: '/Angularjs/',type: 'dropdown', items: Angularjs
      },
      {
        title: 'Backbonejs', path: '/Backbonejs/',type: 'dropdown', items: Backbonejs
      }
    ]
  }
}
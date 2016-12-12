var JS = [
  {title:"JS排序算法",path:"/JS/JSSort"},
  {title:"JS排序算法",path:"/JS/arrayUnique"},
];

var Angularjs = [
  {title: 'uiState', path: '/Angularjs/uiState'},
];

var Backbonejs = [
  {title: 'Angularjs', path: '/Backbonejs/'},
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
        title: 'JS技巧', path: '/JS/',type: 'dropdown', items: JS
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
var langs = [
  {title: 'English', path: '/'},
  {title: '简体中文', path: '/lan/zh-Hans'}
]

self.$config = {
  title: 'javascript_examples',
  repo: 'wanghes',
  twitter: 'rem_rin_rin',
  nav: {
    default: [
      {
        title: 'Home', path: '/'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs
      }
    ],
    'zh-Hans': [
      {
        title: '首页', path: '/lan/zh-Hans'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs
      }
    ]
  }
}
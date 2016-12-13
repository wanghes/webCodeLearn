# history制作路由
## 简单制作一个路由，但是只是url地址栏发生变化
### 先创建一个html文件
```html
<!DOCTYPE html>
<html>
<head>
  <title>history</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <style type="text/css">
    body{
      margin:0;
      height:100vh;
      background: #f5f5f5;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items:center;
    }
    button{
      display: inline-block;
      font-size:16px;
      background: #666;
      color:#fff;
      border:0;
      padding:15px;
    }
  </style>
</head>
<body>
<button onclick="jump()">跳转</button>
</body>
</html>
```

### js代码
```javascript
function jump(){
    var json={time:new Date().getTime()};
        window.history.pushState(json,"","http://localhost:4500/pageone");
        console.log(json);
}
window.onpopstate=function(){
  // 获得存储在该历史记录点的json对象
  var json = window.history.state;
  console.log(json);
}
```
如下图页面效果：

![page](/images/20161212pm01.jpg)

反馈结果：
* 点击跳转调用 history.pushState,将会在历史栈推入一个状态【地址栏变为 /pageone，获得json为{time:1369647895656}】
* 点击回退按钮触发 onpopstate 的事件将会将上一次推入的状态推出 【地址栏变为 /index.html，获得的json为null】

## 一个带有animate.css动画的，html5-history路由
由于页面属于单页面，所有的跳转的页面就是单页面的具体的一个盒子下面的内容

原理是通过在history.state中存储盒子的ID,带表要显示盒子的ID,通过pushState方法和popState事件实现ID的变化，来显示隐藏对应的id;
### html文件
```html
<!DOCTYPE html>
<html>
<head>
    <title>history</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/animations.css">
  <link rel="stylesheet" type="text/css" href="css/page.css">
  <script type="text/javascript" src="js/jquery-2.0.2.js"></script>
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/modernizr.custom.js"></script>
  <script type="text/javascript" src="js/animate.js"></script>
</head>
<body >
<div class="pt-perspective" id="pt-main">
  <div class="pt-page pt-page-current" id="partyHome" >
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="jumbotron"><h1>页面1</h1></div>
                  <div class="panel panel-default">
                      <div class="panel-body">
                          <div>页面1
                          <br><br><br><br><br><br><br><br><br><br><br>
                          </div>
                          <a id="partyDetailBtn" class="btn btn-primary">查看</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="pt-page" id="partyDetail">
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="jumbotron"><h1>页面2</h1></div>
                  <div class="panel panel-default">
                      <div class="panel-body">
                          <div>页面2</div>
                          <a id="partyChaBtn" class="btn btn-primary">查看</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="pt-page" id="partyCha">
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="jumbotron"><h1>页面3</h1></div>
                  <div class="panel panel-default">
                      <div class="panel-body">
                          <div>页面3</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</body>
```
### animate.css样式
```css
/* animation sets */

/* move from / to  */

.pt-page-moveToLeft {
    -webkit-animation: moveToLeft .3s ease both;
    -moz-animation: moveToLeft .3s ease both;
    animation: moveToLeft .3s ease both;
}

.pt-page-moveFromLeft {
    -webkit-animation: moveFromLeft .3s ease both;
    -moz-animation: moveFromLeft .3s ease both;
    animation: moveFromLeft .3s ease both;
}

.pt-page-moveToRight {
    -webkit-animation: moveToRight .3s ease both;
    -moz-animation: moveToRight .3s ease both;
    animation: moveToRight .3s ease both;
}

.pt-page-moveFromRight {
    -webkit-animation: moveFromRight .3s ease both;
    -moz-animation: moveFromRight .3s ease both;
    animation: moveFromRight .3s ease both;
}

.pt-page-moveToTop {
    -webkit-animation: moveToTop .6s ease both;
    -moz-animation: moveToTop .6s ease both;
    animation: moveToTop .6s ease both;
}

.pt-page-moveFromTop {
    -webkit-animation: moveFromTop .6s ease both;
    -moz-animation: moveFromTop .6s ease both;
    animation: moveFromTop .6s ease both;
}

.pt-page-moveToBottom {
    -webkit-animation: moveToBottom .6s ease both;
    -moz-animation: moveToBottom .6s ease both;
    animation: moveToBottom .6s ease both;
}

.pt-page-moveFromBottom {
    -webkit-animation: moveFromBottom .6s ease both;
    -moz-animation: moveFromBottom .6s ease both;
    animation: moveFromBottom .6s ease both;
}
....省略
```
### 需要配合js文件实现页面之间的平滑动画，简单整合：
```javascript
var endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
    },
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    support = Modernizr.cssanimations;
    console.log(animEndEventName)

    /********
     * @return void
     * @param currPage 当前的页面
     * @param nextPage 跳转的页面
     * @param animation 动画数值参数
     * *******/
    function AnimatePage(currPage,nextPage,animation,callback){
        var $currPage = $(currPage);
        var $nextPage = $(nextPage);
        var animation = animation ? animation : 45;
        turnPage(animation,$currPage,$nextPage,callback);
    }

    function turnPage( animation,$currPage,$nextPage,callback ) {
        var  outClass = '', inClass = '';
        switch( animation ) {

            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 3:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 4:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            .
            .
            .
            .
            case 67:
            break;
        }
        $nextPage.addClass( 'pt-page-current' );
        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        $nextPage.addClass( inClass ).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        if( !support ) {
            onEndAnimation( $currPage, $nextPage );
        }

    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', 'pt-page' );
        $inpage.attr( 'class', 'pt-page pt-page-current' );
    }

```
### 所以业务层的代码就变为
```javascript
 /***刷新页面操作跳显示相应的hashID页面****/
    if(location.hash){
        $(location.hash).addClass('pt-page-current');
    }

    $(function(){
        var $main = $( '#pt-main' ),
            $pages = $main.children( 'div.pt-page' );

        var pageData = {
            name:'guan',
            sex:'男'
        };

        $('#partyDetailBtn').click(function(){
            pageData.name = "liu";
            go('partyDetail');
        });

        $('#partyChaBtn').click(function(){
            pageData.name = "zhang";
            go('partyCha');
        });

        function go(page){
            var hashID = '#'+page;

            var url = location.origin + location.pathname + hashID;
            window.history.pushState({id:hashID}, '', url);
            AnimatePage('.pt-page-current',hashID,1);
        }

        $(window).on('popstate',function(){
            var id;
            var json = window.history.state;
            if(json){
              id = json.id;
            }else{
              id='#partyHome';
            }
            AnimatePage('.pt-page-current',id,2);
        });

    });
```

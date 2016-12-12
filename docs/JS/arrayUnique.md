## 数组去重
1. 遍历数组，一一比较，比较到相同的就删除后面的
2. 遍历数组，一一比较，比较到相同的，跳过前面重复的，不相同的放入新数组
3. 任取一个数组元素放入新数组，遍历剩下的数组元素任取一个，与新数组的元素一一比较，如果有不同的，放入新数组。
4. 遍历数组，取一个元素，作为对象的属性，判断属性是否存在

```javascript
alert("hello world");
```

### 删除后面重复的
```javascript
/*1. 删除后面重复的：*/
function ov1(arr){
    var a1=((new Date).getTime());
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]===arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }

    console.info((new Date).getTime()-a1);
    console.log(arr)
    return arr.sort(function(a,b){
        return a-b;
    });

}
```
### 相同则跳出循环
```javascript
/*2. 这个是常规的方法，比较好理解，如果相同则跳出循环*/
function ov2(a) {
    var a1=((new Date).getTime());
    var b = [], n = a.length, i, j;
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++){
            if (a[i] === a[j]){
                j=false;break;
            }
        }
        if(j)b.push(a[i]);
    }
    console.info((new Date).getTime()-a1);
    console.log(b)
    return b.sort(function(a,b){
        return a-b
    });
}
```
### 放入新数组
```javascript
/*3. 这个我花了好长时间明白的，这里j循环虽然继续了，但是i值已经改变了。就等于是一个新的i循环：*/
function ov3(a) {
    var a1=((new Date).getTime());
    var b = [], n = a.length, i, j;
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++){
            if (a[i] === a[j])j=++i
        }
        b.push(a[i]);
    }
    console.info((new Date).getTime()-a1);
    console.log(b)
    return b.sort(function(a,b){return a-b});
}
```
### 保证数组的唯一性
```javascript
/*4. 保证新数组中的都是唯一的*/
function ov4(ar){
    var a1=((new Date).getTime());
    var m=[],f;
    for(var i=0;i<ar.length;i++){
        f=true;
        for(var j=0;j<m.length;j++){
            if(ar[i]===m[j]){f=false;break;};
        }
        if(f)m.push(ar[i])
    }
    console.info((new Date).getTime()-a1);
    console.log(m);
    return m.sort(function(a,b){return a-b});
}
```
### 判断属性是否存在
```javascript
/*5. 用对象属性*/
function ov5(ar){
    var a1=(new Date).getTime();
    var m,n=[],o= {};
    for (var i=0;(m= ar[i])!==undefined;i++){
        if (!o[m]){
            n.push(m);o[m]=true;
        }
    }
    console.info((new Date).getTime()-a1);
    console.log(n);
    return n.sort(function(a,b){return a-b});;
}
```

#### 输出以上的结果
```javascript
window.status='Hello'
var str = "1232412589534545331543456751349587"
var arr1 = str.split(''),
    arr2 = str.split(''),
    arr3 = str.split(''),
    arr4 = str.split(''),
    arr5 = str.split('');
ov1(arr1);
ov2(arr2);
ov3(arr3);
ov4(arr4);
ov5(arr5);

```
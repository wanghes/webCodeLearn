## 冒泡排序
```javascript
function bubbleSort(arr) {
    var len = arr.length,
        b, j, i = 0;
    for (; i < len; i++) {
        console.log(i + '----------------------------------------');
        for (j = 0; j < len; j++) {
            if (arr[i] < arr[j]) {
                b = arr[j];
                arr[j] = arr[i];
                arr[i] = b;
                console.log('arr[i]=' + arr[i]);
                console.log('arr[j]=' + arr[j]);
                console.log('####');
            }
            console.log(arr);
        }
    }
    return arr;
}

//运行一下
var arr = [2, 5, 1, 4];
console.log(bubbleSort(arr));
//输出[5,4,2,1]
```
## 随机颜色
```javascript
function rondomColors() {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var str = "#";
    var color;
    for (var i = 0; i < 6; i++) {
        color = Math.round(Math.random() * 15);
        str += arr[color]
    }
    return str;
}
console.log(rondomColors());
//输出#f02123
```
## 获取字符串的大小
```javascript
function GetBytes(str) {
    console.log(str);
    var len = str.length,
        bytes = len;
    console.log(bytes);
    console.log(str.charCodeAt(2));
    console.log('--')
    for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            bytes++;
        }
    }
    return bytes;
}

console.log(GetBytes("往哈斯")); //6
```
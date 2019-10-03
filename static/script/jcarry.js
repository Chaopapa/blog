function getRandomColor() {
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    var color = '#';
    for (var i = 0; i < 6; i++) {
        var rand = Math.round(Math.random() * 15);
        color += arr[rand];
    }
    return color;
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//获取元素距离浏览器窗口的距离

function offset(dom) {
    var left = 0,
        top = 0;
    var bordLeft = dom.clientLeft;
    var bordTop = dom.clientTop;
    while (dom) {
        left += dom.offsetLeft + dom.clientLeft;
        top += dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }

    return {
        left: left - bordLeft,
        top: top - bordTop
    };

}

//获取满足条件的一个元素
function $(selector) {
    return document.querySelector(selector);
}

//获取满足条件的所有元素
function _$(selector) {
    return document.querySelectorAll(selector);
}

//缓冲运动
function bufferMove(dom, target, callback) {
    dom.timer = null;
    clearInterval(dom.timer);
    dom.timer = setInterval(function() {
        //X目标
        var left = target.left;
        //Y目标
        var top = target.top;

        //横轴移动
        var speedX = (left - dom.offsetLeft) / 10;

        speedX = speedX > 0 ? Math.ceil(speedX) : Math.floor(speedX);

        if (Math.abs(left - dom.offsetLeft) <= Math.abs(speedX)) {
            dom.style.left = left + 'px';
        } else {
            dom.style.left = dom.offsetLeft + speedX + 'px';
        }

        //纵轴移动
        var speedY = (top - dom.offsetTop) / 10;

        speedY = speedY > 0 ? Math.ceil(speedY) : Math.floor(speedY);

        if (Math.abs(top - dom.offsetTop) <= Math.abs(speedY)) {
            clearInterval(dom.timer);
            dom.style.top = top + 'px';
            callback();
        } else {
            dom.style.top = dom.offsetTop + speedY + 'px';

        }

    }, 30);
}

//ajax的封装
function ajax(obj) {
    //创建ajax对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //兼容IE 5,6
        var xhr = new ActiveXObject(Microsoft.XMLHTTP);
    }

    if (obj.type == 'GET' || obj.type == "get") {
        //连接服务器
        xhr.open(obj.type, obj.url + '?' + obj.data + '&_=' + new Date().getTime(), true);
        //发送数据
        xhr.send(null);

    } else if (obj.type == "POST" || obj.type == "post") {
        //连接服务器
        xhr.open(obj.type, obj.url + '?_=' + new Date().getTime(), true);
        //将请求模拟成form表单的post请求
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(obj.data);

    } else {
        alert('当前仅支持get和post请求');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { //4表示请求完成
            if (xhr.status == 200) { //请求ok
                obj.success(xhr.responseText);
            } else {
                obj.error(xhr.status);
            }
        }
    }

}


//promise版ajax
function ajaxPromise(obj) {
    return new Promise(function(resolve, reject) {
        //创建ajax对象
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //兼容IE 5,6
            var xhr = new ActiveXObject(Microsoft.XMLHTTP);
        }

        if (obj.type == 'GET' || obj.type == "get") {
            //连接服务器
            xhr.open(obj.type, obj.url + '?' + obj.data + '&_=' + new Date().getTime(), true);
            //发送数据
            xhr.send(null);

        } else if (obj.type == "POST" || obj.type == "post") {
            //连接服务器
            xhr.open(obj.type, obj.url + '?_=' + new Date().getTime(), true);
            //将请求模拟成form表单的post请求
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(obj.data);

        } else {
            alert('当前仅支持get和post请求');
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) { //4表示请求完成
                if (xhr.status == 200) { //请求ok
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });

}




/*cookie相关方法*/

//获取cookie
function getCookie(key) {
    var cookies = document.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var arr = cookies[i].split('=');
        if (arr[0] == key) {
            return arr[1];
        }
    }
    return null;
}

//设置cookie
function setCookie(key, value, day) {
    var d = new Date();
    if (day) {
        d.setDate(d.getDate() + day);
        document.cookie = key + "=" + value + " ;expires=" + d;
    } else {
        document.cookie = key + "=" + value;
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key, null, -1);
}

module.exports={
    getRandomColor: getRandomColor
}
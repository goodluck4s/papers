/**
 * Created by sf on 2018/8/3.
 */
var areaArr = []

var trackHost = 'https://segmentfault.com';
var viewApi = trackHost + '/ad/track/view'
var clickApi = trackHost + '/ad/track/click'

function ajax(opt) {
    opt = opt || {};//opt以数组方式存参，如果参数不存在就为空。
    opt.method = opt.method.toUpperCase() || 'POST';//转为大写失败，就转为POST
    opt.url = opt.url || '';//检查URL是否为空
    opt.async = opt.async || true;//是否异步
    opt.data = opt.data || null;//是否发送参数，如POST、GET发送参数
    opt.success = opt.success || function () {}; //成功后处理方式
    var xmlHttp = null;//定义1个空变量
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();//如果XMLHttpRequest存在就新建，IE大于9&&非IE有效
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');//用于低版本IE
    }
    var params = [];//定义1个空数组
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);//将opt里的data存到push里
    }
    var postData = params.join('&');//追加个& params
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);//开始请求
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');//发送头信息，与表单里的一样。
        xmlHttp.send(postData);//发送POST数据
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url, opt.async);//GET请求
        xmlHttp.send(null);//发送空数据
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {//readyState有5个状态，可以百度一下看看都有什么。当请求完成，并且返回数据成功
            opt.success(xmlHttp.responseText);//返回成功的数据
        }
    };
}

var sTitle="";
window.SFGridAd = {};
SFGridAd.d = function(o) {
    sTitle = o.getAttribute('stitle');
    document.getElementById("gridMapHoverBox").style.display = "block"
}

SFGridAd.e = function(o) {
    sTitle = "";
    document.getElementById("gridMapHoverBox").style.display = "none"
}

SFGridAd.c = function(id) {

    var clickApi2 = clickApi + '?id=' + id

    ajax({url: clickApi2, method: 'GET'})
};

// 这里 data 需要注入
[{"id":"1750000022197859","user_id":"1030000021973652","box_ad_id":"0","started":"1585584000","ended":"1615824000","cycles":"50","status":"0","banner":"\/378\/574\/3785747598-5e81590ee6bb2","link":"https:\/\/zhuanfou.com\/article\/79276602_063","title":"\u840c\u641c \u5c0f\u4f17\u641c\u7d22\u5f15\u64ce","area_info":{"area":"O8:O8","height":"17","width":"17","left":"238","top":"119","pos":{"rowTop":8,"rowBottom":8,"columnLeft":15,"columnRight":15},"size":1},"created":"1585533985","modified":"1585535350"},{"id":"1750000022460532","user_id":"1030000006669669","box_ad_id":"0","started":"1587916800","ended":"1590336000","cycles":"4","status":"0","banner":"\/146\/246\/1462460668-5ea2ea9877541","link":"https:\/\/docs.apipost.cn\/","title":"\u8d85\u597d\u7528\u7684\u63a5\u53e3\u7ba1\u7406\u5de5\u5177","area_info":{"area":"J5:N5","height":"17","width":"85","left":"153","top":"68","pos":{"rowTop":5,"rowBottom":5,"columnLeft":10,"columnRight":14},"size":5},"created":"1587735004","modified":"1587735262"},{"id":"1750000022486245","user_id":"1030000022463352","box_ad_id":"0","started":"1588089600","ended":"1589299200","cycles":"1","status":"0","banner":"\/257\/158\/2571588735-5ea68aa864d8a","link":"https:\/\/www.alisen39.com\/?from=sf","title":"\u9762\u5411\u5f00\u53d1\u8005\u7684\u5de5\u5177\u7f51\u7ad9","area_info":{"area":"A1:A1","height":"17","width":"17","left":"0","top":"0","pos":{"rowTop":1,"rowBottom":1,"columnLeft":1,"columnRight":1},"size":1},"created":"1587972206","modified":"1587972781"},{"id":"1750000022520600","user_id":"1030000000091295","box_ad_id":"0","started":"1588262400","ended":"1589472000","cycles":"2","status":"0","banner":"\/389\/754\/3897549598-5eaa8241884df","link":"https:\/\/t.cn\/A6wXxLiE","title":"\u534e\u4e3a\u4e911\u68382G\u670d\u52a1\u566899\u5143\u8d77","area_info":{"area":"C8:I8","height":"17","width":"119","left":"34","top":"119","pos":{"rowTop":8,"rowBottom":8,"columnLeft":3,"columnRight":9},"size":7},"created":"1588232723","modified":"1588232815"},{"id":"1750000022567304","user_id":"1030000005746880","box_ad_id":"0","started":"1588867200","ended":"1589472000","cycles":"1","status":"0","banner":"\/304\/485\/3044856935-5eb3aae081f22","link":"https:\/\/www.yetu.run\/sf","title":"\u77ed\u7f51\u5740\u751f\u6210\u5e73\u53f0","area_info":{"area":"G4:G4","height":"17","width":"17","left":"102","top":"51","pos":{"rowTop":4,"rowBottom":4,"columnLeft":7,"columnRight":7},"size":1},"created":"1588832613","modified":"1588833016"}].forEach(function(item) {
    var html = '<area shape="rect" ' +
        'target="_blank" ' +
        'onmouseover="SFGridAd.d(this)" ' +
        'onmouseout="SFGridAd.e(this)" ' +
        'onclick="SFGridAd.c(' + item.id + ')" ' +
        'coords="' + item.area_info.left + ',' + item.area_info.top + ',' + ((+item.area_info.left)+(+item.area_info.width)) + ',' + ((+item.area_info.top)+(+item.area_info.height)) + '" ' +
        'href="' + (item.id ? '/sponsor/' + item.id + '/redirect' : item.link) + '" ' +
        'stitle="' + item.title + '" />'

    areaArr.push(html)
})

document.getElementById('gridsMap').innerHTML = areaArr.join('')

document.getElementById('gridsMap').onmousemove = function(e) {
    var pos = getMousePos(e)

    document.getElementById("gridMapHoverBox").style.left = pos.x + 20 + 'px'
    document.getElementById("gridMapHoverBox").style.top = pos.y + 20 + 'px'

    document.getElementById("gridMapHoverBox").innerHTML = sTitle
}

// 增加 view 统计
setTimeout(function() {
    isShow = document.querySelector('img[src^="https://cdn.segmentfault.com/sponsor"]').clientHeight > 0
    if (isShow) ajax({url: viewApi, method: 'GET'})
}, 0)

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}

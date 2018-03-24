// ==UserScript==
// @name                堆糖商品信息获取
// @name:zh-CN          堆糖商品信息获取
// @name:zh-TW          堆糖商品信息获取
// @description         Avoid link redirect for duitang.com
// @description:zh-CN   在控制台中输出商品名以及淘宝对应连接
// @description:zh-TW   在控制台中输出商品名以及淘宝对应连接

// @author              huonimei
// @namespace           huonimei.com
// @homepageURL         https://github.com/huonimei/DuiTangHelper4huonimei
// @supportURL          https://github.com/huonimei/DuiTangHelper4huonimei
// @license             GPL-3.0
// @icon                http://www.duitang.com/favicon.ico
// @require             http://code.jquery.com/jquery-2.1.1.min.js

// @grant               none
// @run-at              document-idle
// @include             https://www.duitang.com/*

// @date                03/22/2018
// @modified            03/22/2018
// @version             0.1
// ==/UserScript==
// 关闭弹出的登录框校验次数 只运行一次
var callcount = 0;
// 关闭窗口部分
function closeWindow() {
    callcount++;
    $(".mask-close").click();
}
// 转换商品对应url 并在控制台输出 这页面的a标签写的非常鬼畜暂时没写好a标签替换url直接点击跳转
function decodeURI2Console() {
    if (window.location.pathname == '/blog/') {
        if ($(".l-title").length > 0) {
            var hrefs = $(".l-title");
            for (var a = 0; a < hrefs.length; a++) {
                var AfterUrlDecode = decodeURI(hrefs[a].getAttribute("href").substring(64, hrefs[a].getAttribute("href").length));
                hrefs[a].setAttribute("href", AfterUrlDecode);
                hrefs[a].setAttribute("target", "view_window");
                $(".l-title")[a].setAttribute("onmousedown", alert(1));
                console.error($(".l-title>span").html());
                console.error(decodeURIComponent(AfterUrlDecode));
            }
        }
        if ($(".match-cnt>a").length > 0) {
            var hrefArray = $(".match-cnt>a");
            for (var b = 0; b < hrefArray.length; b++) {
                var AfterDecodeUrl = decodeURI($(".match-cnt>a")[b].getAttribute("href").substring(36, $(".match-cnt>a")[b].getAttribute("href").length));
                hrefArray[b].setAttribute("href", AfterDecodeUrl);
                hrefArray[b].setAttribute("target", "view_window");
                $(".match-cnt>a")[b].setAttribute("onmousedown", doReplaceUrlJump(AfterDecodeUrl));
                console.error($(".match-item>div>p.match-text")[b].innerHTML);
                console.error(decodeURIComponent(AfterDecodeUrl));
            }
        }
    }
}
// 替换跳转连接
function doReplaceUrlJump(AfterDecodeUrl) {
    window.open(decodeURIComponent(AfterDecodeUrl), '_blank');
}

$(function () {
    if (callcount < 1) {
        closeWindow();
    }
    decodeURI2Console();
});
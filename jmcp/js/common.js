/**
 * Created by Administrator on 2017-10-11.
 */

var resVersion = "2.0";	//资源文件的版本号，每次发布或者升级都需改变此版本号
var resourcePath = "http://192.168.8.67:8080"
/**
 * 加了版本号码的js引用
 * url js的url
 */
function requireJs(url){
    document.writeln('<script type="text/javascript" src="' + resourcePath + '/' + url + '?v=' + resVersion + '" charset="utf-8"><\/script>');
}

/**
 * 加了版本号码的css引用
 * url css的url
 */
function requireCss(url){
    document.writeln('<link type="text/css" rel="stylesheet" href="' + resourcePath + '/' + url + '?v=' + resVersion + '" />');
}
/**
 * 加了版本号码的图片引用
 * url img的url
 */
function requireImg(url,alt,cs){
    document.writeln('<img src="' + resourcePath + '/' + url + '?v=' + resVersion + '"  alt="' + alt + '"   class="' + cs + '" />');
}

!function(e, t) {
    var r = e.documentElement
        , o = "orientationchange"in window ? "orientationchange" : "resize"
        , i = function() {
        var e = r.clientWidth;
        var t = r.clientHeight;
        if (!e)
            return;
        if (e >= 750) {
            r.style.fontSize = "100px"
        } else {
            r.style.fontSize = 100 * (e / 750) + "px"
        }
    };
    i();
    if (!e.addEventListener)
        return;
    t.addEventListener(o, i, false);
    e.addEventListener("DOMContentLoaded", i, false)
}(document, window);
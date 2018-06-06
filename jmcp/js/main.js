/**
 * Created by Administrator on 2018-01-30.
 */
var APP={
    type:3,
    version:'1.0.0',
    url:'http://106.14.95.17:8011/',
    res:'http://106.14.95.17:8011/ress/',
    error:{
        ajaxError:"通讯失败,请重试!"
    }
},X={
    load:function(){
        $("#load").show();
    },
    unload:function(){
        $("#load").hide();
    },
    S:function(n,kk){
        if(n){
            var V= n.split('#'),i= 0,h='',d,d0,d1;
            for(i;i< V.length;i++){
                d= V[i].split('//');
                d0=d[0].split('/');
                if(kk){h+='<span>';}
                h+='<i>'+d0.join('</i><i>')+'</i>';
                if(kk){h+='</span>';}
                if(d[1]){
                    h+='<span>'
                    d1=d[1].split('/');
                    h+='<b>'+d1.join('</b><b>')+'</b>';
                }
                if(kk){h+='</span>';}
                h+='<br/>';
            }
        }else{
            h='--';
        }
        return h;
    },
    T:function(x){
        var sz=[10000,10001,10002,10003,10004,10005,30007],
            gp=[20000,20001,20002,20003,20004,20005,20006],
            gyj=[30008],
            jc=[30000,30001,30002,30003,30004,30005,30006];
        if(sz.indexOf(x)!=-1 || gp.indexOf(x)!=-1){
            return 1;
        }else if(jc.indexOf(x)!=-1){
            return 3;
        }else if(gyj.indexOf(x)!=-1){
            return 4;
        }else{
            return 0;
        }
    },
    status:function(){
        $.get(APP.url+'user/checkLogin',function(data){
            if(X.UCB){X.UCB(data);}
        });
    },
    urlHash:function(argName){
        if(!argName){return false;}
        var args = {},query = location.hash.substring(1),pairs = query.split("&");
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
            value = decodeURIComponent(value);
            if(argName==argname){
                return value;
            }
        }
    },
    urlSearch:function(argName){
        if(!argName){return false;}
        var args = {},query = location.search.substring(1),pairs = query.split("&");
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
            value = decodeURIComponent(value);
            if(argName==argname){
                return value;
            }
        }
    },
    input:{
        open:function(o){
            $('#jmcp').hide();
            $('#InputBox').show();
            $('#InputBoxTitle').html(o.t);
            $('#InputBoxContent').html(o.c);
            $('#InputBoxContent input').eq(0).focus();
        },
        close:function(){
            $('#jmcp').show();
            $('#InputBox').hide();
        }
    }
};
Number.prototype.add0=function(){
    if(this<10){
        return "0"+this;
    }else{
        return this;
    }
};
Number.prototype.isInt=function(){
    var r = /^\+?[1-9][0-9]*$/;
    return r.test(this);
}
$.extend(Array.prototype,{
    indexOf   : function(val){var pos=-1;$(this).each(function(i,v){if(v==val){pos=i;return;}});return pos;},
    del       : function(value){var pos = this.indexOf(value);if(pos==-1)return;this.splice(pos,1);return this;},
    max       : function(){var max;$(this).each(function(i,v){v = Number(v);max = i==0?v:(v>max?v:max);});	return max;},
    min       : function(){var min;$(this).each(function(i,v){v = Number(v);min = i==0?v:(v<min?v:min);});	return min;},
    hasRepeat : function(){var b = {};var a = this;for(var i=0,l=a.length; i<l&&!b[a[i]];b[a[i++]]=1);return i<l;	},
    clone     : function(){var a=[];for(var i=0;i<this.length;i++)a[i] = this[i];return a;},
    del       : function(value,isPos){var pos=!isPos?this.indexOf(value):value;if(pos==-1)return;this.splice(pos,1);return this;},
    random : function(o){
        o = $.extend({
            len    : 1,//号码长度
            repeat : false,//是否可以重复
            sort   : false,//是否需要排序
            zero   : false//是否需要补0
        },o);
        var s=this,a=[],no;
        var r = function(){return s[Math.round(Math.random()*(s.length-1))];};
        while(a.length!=o.len){
            no = r();
            if(!o.repeat && a.indexOf(no)!=-1)continue;
            a.push(no);
        }
        return a;
    },
    inArray2:function(arr1){//判断二维数组包含关系
        var i=0,len=this.length;
        for(i=0;i<len;i++){
            var j=0,jlen=this[i].length,x=0;
            for(j;j<jlen;j++){
                if(arr1[j]==this[i][j]){
                    x++;
                }
            }
            if(x==jlen){
                return true;
            }
        }
        return false;
    },
    indexof1:function(){//计算存在多少个最小的数
        var pos=-1;
        var arr=[]
        for(var j=0;j<this.length;j++){
            if(this[j]==this.min()){
                arr.push(j)
            }
        }
        return arr.length;
    }
});

$.extend(String.prototype,{
    toArray:function(s){if(s)return this.split(s);var arr=[];for(var i=0;i<this.length;i++)arr.push(this.substring(i,i+1));return arr;},
    isID:function() {
        var errors = [0, '身份证号码位数不对!', '身份证号码出生日期超出范围或含有非法字符!', '身份证号码校验错误!', '身份证地区非法!'],
            area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
            idcard = this,
            Y,
            JYM,
            S,
            M,
            idcard_array = idcard.split('');
        //地区检验
        if (!area[parseInt(idcard.substr(0, 2))]){
            return errors[4];
        }
        //身份号码位数及格式检验
        switch(idcard.length) {
            case 15:
                var ereg;
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )){
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                }else{
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                }
                if (ereg.test(idcard)){
                    return errors[0];
                }else{
                    return errors[2];
                }
                break;
            case 18:
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)){
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                    //闰年出生日期的合
                }else{
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                }
                //平年出生日期的合法性正则表达式
                if (ereg.test(idcard)) {
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    //判断校验位
                    if (M == idcard_array[17]){
                        return errors[0];
                        //检测ID的校验位
                    }else{
                        return errors[3];
                    }
                } else{
                    return errors[2];
                }
                break;
            default:
                return errors[1];
        }
    },
    isPhone:function(){
        var r = /^\+?[1-9][0-9]*$/;
        if(!r.test(this) || this.length!=11){
            return false;
        }else{
            return true;
        }
    },
    trim:function() { return this.replace(/(^\s*)|(\s*$)/g, ""); },
    isInt:function(){
        var r = /^\+?[1-9][0-9]*$/;
        return r.test(this);
    }
});
function fmoney(s, n)
{
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for(var i = 0; i < l.length; i ++ )
    {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
// 定义一个判断函数
function in_array (arr) {
// 判断参数是不是数组
    var isArr = arr && console.log(
            typeof arr === 'object' ? arr.constructor === Array ? arr.length ? arr.length === 1 ? arr[0] : arr.join(',') : 'an empty array' : arr.constructor : typeof arr
        );
// 不是数组则抛出异常
    if (!isArr) {
        throw "arguments is not Array";
    }
// 遍历是否在数组中
    for (var i = 0, k = arr.length; i < k; i++) {
        if (this == arr[i]) {
            return true;
        }
    }
}

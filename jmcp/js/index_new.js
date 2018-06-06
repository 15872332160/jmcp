/**
 * Created by Administrator on 2018-01-31.
 */
X.UCB=function(d){//身份验证 回调
    if(d.flag==1){
        $(".side_lg").hide();
        $(".side").find("li:lt(5)").show();
        $("#showName").html(d.username);
        $("#showMoney").html(d.money);
        $("#login_p").show();
    }else{
        $(".side_lg").show();
        $(".side").find("li:lt(5)").hide();
        $("#showName").html('');
        $("#login_p").hide();
    }
};
X.index={
    lotteryArr:[],
    load:function(){
        var d={
            version:APP.version,
            requestType:APP.type
        };
        $.get(APP.url+'lottery/lottery_list',d,function(data){
            var i= 0,D=data.list,len= D.length,arr=[10004,30007,10000,10001];
            for(i;i<len;i++) {
                var h=[];
                if (arr.indexOf(D[i].clientLotteryId) != -1) {
                    h.push('<section class="direct clearfiix">');
                    if(D[i].clientLotteryId==10000||D[i].clientLotteryId==10001) {
                        h.push('<p> <span class="dirpond"> 当前奖池：<em>'+D[i].message.split(":")[1]+'</em></span>');
                    }else{
                        h.push('<p> <span class="dirpond">最高奖金1040元</span>');
                    }
                    h.push('<span class="direndtime">截止时间：<em>' + D[i].indexStopTime + '</em></span></p>');
                    h.push('<p>');
                    h.push('<span class="dirnum">');
                    h.push(' </span>');
                    h.push('<span class="dirchange" onclick="begin.dirChange();" b="'+D[i].clientLotteryId+'">换一注 <i class="fm"></i></span>');
                    h.push('</p>');
                    h.push('<p class="tc"><a class="dirbuy" onclick="begin.dirBuy();" b="'+D[i].clientLotteryId+'">购 买</a>');
                    if(D[i].clientLotteryId==10000||D[i].clientLotteryId==10001){
                        h.push('<a class="diropt" href="html/lottery.html#lid='+D[i].clientLotteryId+'">自 选</a></p>');
                    }else{
                        h.push('<a class="diropt" href="html/szc.html#lid='+D[i].clientLotteryId+'">自 选</a></p>');
                    }
                    X.index.lotteryArr.push(h.join(" "));
                }else{
                    continue;
                }
            }
            i=0;D=data.urlAddress;len= D.length;
            var h=[],k;
            if(len>0){
                for(i;i<len;i++){
                    k=D[i].split('|');
                    h.push('<a href="'+k[2]+'"><img src="'+k[1]+'"  class="notice"/></a>');
                }
                $('.scroll').html(h.join(''));
            }else{
                $('.scroll').hide();
            }
            $("#main").html(X.index.lotteryArr[0]);
            begin.todo(5,2,36,13,1,true);
        });
    }
}
X.status();
X.index.load();
Array.prototype.clone=function(){
    var a=[],i=0;len=this.length;
    for(i;i<len;i++){
        a[i] = this[i];
    };
    return a;
}
Array.prototype.random=function() {
    var tmpArr=[],num=this.length,arr=[],x = 0, y=0, z = 0;
    for (x ; x < num; x++) {
        tmpArr[x] = x;
    }
    for (y ; y < num; y++) {
        var iRand = parseInt(num * Math.random()), temp = tmpArr[y];
        tmpArr[y] = tmpArr[iRand];
        tmpArr[iRand] = temp;
    }
    for(z;z<num;z++){
        arr.push(this[tmpArr[z]]);
    }
    return arr;
}
Number.prototype.addZero=function(){
    if(this<10){
        return "0"+this;
    }else{
        return this;
    }
}

var begin={
    container:0,
    init:function(x,y,n,m,z,tf){
        var arrS=[],arrS2=[];
        for(var i=z;i<n;i++){
            arrS.push(i);
            if(i<m){
                arrS2.push(i);
            }
        }
        var arr2=arrS.random(),arr3=arr2.clone(),arr1=arr3.slice(0,x).sort(function(a,b){return a - b;}),i=0;
        var arr21=arrS2.random(),arr31=arr21.clone(),arr11=arr31.slice(0,y).sort(function(a,b){return a - b;}),j= 0,t=[];
        for(i;i<x;i++){
            t.push('<span class="ball_red">'+(tf?Number(arr1[i]).addZero():Number(arr1[i]))+'</span>');
        }
        for(j;j<y;j++){
            t.push('<span class="ball_blue">'+(tf?Number(arr11[j]).addZero():Number(arr11[j]))+'</span>');
        }
        $('.dirnum').html(t.join(''));
    },
    todo:function(x,y,n,m,z,tf){
        var g = 0, q = 250;
        clearInterval(this.container);
        begin.init(x,y,n,m,z,tf);
        $('.dirnum span').addClass('rotate');
        this.container = setInterval(function () {
            $('.dirnum span:eq('+g+')').removeClass('rotate');
            g++;
            if (g > x+y-1) {
                return false;
            }
        }, q);
    },
    dirChange:function(){
        var clientLi=$('.dirchange').attr("b");
        if(clientLi==10001){
            begin.todo(5, 2, 36, 13, 1,true);
        }else if(clientLi==10000){
            begin.todo(6, 1, 34, 17, 1,true);
        }else{
            begin.todo(3, 0, 10, 0, 0,false);
        }
    },
    dirBuy:function(){
        var a=$(".ball_red"),b=$(".ball_blue"),c=[],d=[];
        var clientLi=$('.dirbuy').attr("b");
        a.each(function(i,v){
            c.push($(v).html());
        });
        b.each(function(i,v){
            d.push($(v).html());
        });
        c.join(',');
        d.join(',');
        if(clientLi==10001||clientLi==10000) {
            location.href = 'html/lottery.html#lid='+clientLi+'&pt=a0&w1=' + c + '&w2=' + d;
        }else{
            location.href = 'html/szc.html#lid='+clientLi+'&pt=a0&w1=' + c + '&w2=' + d;
        }
    },
    dirOpt:function(){
        var clientLi=$('.diropt').attr("b");
        if(clientLi==10001){
            begin.todo(5, 2, 36, 13, 1,true);
        }else if(clientLi==10000){
            begin.todo(6, 1, 34, 17, 1,true);
        }else{
            begin.todo(3, 0, 10, 0, 0,false);
        }
    }
}
$(".return").click(function () {
    if ($("#zjcp  .side").hasClass("leftt0")) {
        $("#zjcp").css("height", "auto");
        $("#zjcp  .side").removeClass("leftt0");
        $("#zjcp  .homeTrans").removeClass("paleft200");
        $("#zjcp").removeClass("hidden1");
    } else {
        $("#zjcp").css("height", $(window).height());
        $("#zjcp  .side").addClass("leftt0");
        $("#zjcp  .homeTrans").addClass("paleft200");
        $("#zjcp").addClass("hidden1");
    }
});

$("#short_digit p").click(function () {
    if ($(this).siblings("ul").hasClass("hidden")) {
        $(this).siblings("ul").removeClass("hidden");
        $(this).find(".fr").text('');
    } else {
        $(this).siblings("ul").addClass("hidden");
        $(this).find(".fr").text('');
    }
});
$("#short_athletics p").click(function () {
    if ($(this).siblings("ul").hasClass("hidden")) {
        $(this).siblings("ul").removeClass("hidden");
        $(this).find(".fr").text('');
    } else {
        $(this).siblings("ul").addClass("hidden");
        $(this).find(".fr").text('');
    }
});
$("#short_freq p").click(function () {
    if ($(this).siblings("ul").hasClass("hidden")) {
        $(this).siblings("ul").removeClass("hidden");
        $(this).find(".fr").text('');
    } else {
        $(this).siblings("ul").addClass("hidden");
        $(this).find(".fr").text('');
    }
});
$(".nav2 li").click(function () {
    $(".nav2 a").removeClass("focus");
    $(this).find("a").addClass("focus");
    $("#main").html(X.index.lotteryArr[$(".nav2 li").index(this)]);
    if($(".nav2 li").index(this)==0) {
        begin.todo(5, 2, 36, 13, 1,true);
    }else if($(".nav2 li").index(this)==1){
        begin.todo(6, 1, 34, 17, 1,true);
    }else{
        begin.todo(3, 0, 10, 0, 0,false);
    }
});
$("#short_award").click(function(){
    location.href='html/draw.html';
});
$("#short_hmHal").click(function(){
    location.href='html/market.html';
});
$("#sub_ssq").click(function(){
    location.href='html/lottery.html#lid=10000&pt=a0';
});
$("#sub_dlt").click(function(){
    location.href='html/lottery.html#lid=10001&pt=a0';
});
$("#sub_f3d").click(function(){
    location.href='html/szc.html#lid=30007&pt=a0';
});
$("#sub_pl3").click(function(){
    location.href='html/szc.html#lid=10004&pt=a0';
});
$("#sub_pl5").click(function(){
    location.href='html/lottery.html#lid=10005&pt=a0';
});
$("#sub_jcz").click(function(){
    location.href='html/competitive.html?pt=a3&l=0';
});
$("#sub_jcl").click(function(){
    location.href='html/basketball.html';
});
$("#sub_ctzc").click(function(){
    location.href='html/chuantong.html';
});
$("#sub_bjdc").click(function(){
    location.href='html/beidan.html';
});
$("#sub_bjdc").click(function(){
    location.href='html/11x5.html#lid=20001&pt=a8';
});






/**
 * Created by s2253 on 2017/8/27.
 */
var APP2={
    type:3,
    version:'1.0.0',
    url:'http://ews.500.com/',
    res:'http://data.500.com/',
    error:{
        ajaxError:"通讯失败,请重试!"
    }
};

$(function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);

    var vtype = $.getUrlParam('vtype');
    var expect = $.getUrlParam('expect');
    if (vtype == null) { vtype = "jczq";}
    if (expect == null) { expect = "";}
    if (vtype =='jclq') {
        $('.toggle-cz li:eq(1)').addClass('cur').siblings().removeClass('cur');
    }
    $('#sx').on('click',function(){
        //window.location.reload();
        $(this).addClass('refresh-rorate');
        setTimeout(function(){
            $(this).removeClass('refresh-rorate');
        },10000)
    });
    /*************************请求比赛数据********************/
    $.ajax({
        url:APP2.url+'/score/'+ vtype.substring(2,4) +'/info?vtype='+ vtype +'&expect='+ expect +'&t='+(new Date).getTime(),
        methot:'post',
        async:true,
        dataType:'json',
        beforeSend: function () {
            //alert("远程调用开始。。。");
            //$('.list').before(
            //     '<div class="loading">'+
            //     '<div class="icon"></div>'+
            //     '<div class="icon-shadow"></div>'+
            //     '</div>'
            //)
            $('#load').show();
        },
        success:function(data){
            //alert('开始回调，状态文本值：'+textStatus+' 返回数据：'+data);
            var UNDATA=data.data;
            var indexs=UNDATA.matches;
            var s = data.data.curr_expect;
            var dataText=( "周"+"日一二三四五六 ".charAt(new Date(s).getDay()));
            var time=UNDATA.expect_list;
            if(data.message=='OK'){
                var Tdata=[];
                for(var i=0;i<time.length;i++) {
                    Tdata.push(time[i]);
                    var k=0;
                    if(time[i] == s) {
                        k=i;
                        var str = "location.href='?vtype=" + vtype + "&expect=" + time[i+1] + "&t=" + (new Date).getTime() + "'";
                        var str2 = "location.href='?vtype=" + vtype + "&expect=" + time[i-1] + "&t=" + (new Date).getTime() + "'";
                    }
                }
                var li='';
                if(s == time[0]) {
                    li+='<li onclick="' + str + '">前一期</li>' + '<li class="qiqh">' + UNDATA.curr_expect + '&nbsp;&nbsp;' + dataText + '<i class="qi-arrow"></i></li>' + '<li class="noClick">后一期</li>';
                }else if(s == time[time.length-1]){
                    li+='<li class="noClick">前一期</li>' + '<li class="qiqh">' + UNDATA.curr_expect + '&nbsp;&nbsp;' + dataText + '<i class="qi-arrow"></i></li>' + '<li onclick="'+str2+'">后一期</li>';
                }else{
                    li+='<li onclick="'+str+'" class="noCilck">前一期</li>'+'<li class="qiqh">'+UNDATA.curr_expect+'&nbsp;&nbsp;'+dataText+'<i class="qi-arrow"></i></li>'+'<li onclick="'+str2+'">后一期</li>';
                }
                $('.no_zanqu').append(
                    '<div class="qi-list-box">'+
                    '<div class="qi-list">'+
                    '<ul class="responsive">'+li+'</ul>'+
                    '</div>'+
                    '</div>'
                );
                if(indexs.length==0){
                    $(".fang").fadeIn();
                }else{
                    $(".fang").fadeOut();
                };

                $('.qiqh').on('click',function(e){
                    $(document).one("click", function(){
                        $(".qi-pop-box").remove();
                        $('.ui-alert-layer').remove();
                        $(this).find('i').removeClass('qi_bottom');
                    });
                    e.stopPropagation();
                    $(this).find('i').toggleClass('qi_bottom');
                    $(this).parents('.qi-list-box').siblings().toggle();
                    if($('.qi-pop-box').length == 0 || $('.ui-alert-layer').length == 0){
                        var li='';
                        for(var i=0;i<time.length;i++){
                            var str="location.href='?vtype="+vtype+"&expect="+time[i]+"&t="+(new Date).getTime()+"'";
                            if(data.data.curr_expect == time[i]){
                                li += '<li onclick="'+str+'" class="select"><span>'+time[i]+'</span></li>'
                            }else {
                                li += '<li onclick="'+str+'"><span>' + time[i] + '</span></li>';
                            }

                        }
                        $(this).parents('.qi-list-box').after(
                            '<div class="qi-pop-box" style="display: block;">'+
                            '<div class="ui-navbox-item">'+
                            '<ul>'+li+'</ul>'+
                            '</div>'+
                            '</div>'+
                            '<div class="ui-alert-layer"></div>'
                        )
                    }else{
                        $(".qi-pop-box").remove();
                        $('.ui-alert-layer').remove();
                    }
                    /*************************请求日期********************/
                });
                $(".qi-pop-box").on("click", function(e){
                    e.stopPropagation();
                });
                $('.list').html('');
                for(var i=0;i<indexs.length;i++){
                    var bcSpan=''; var zq_bfSpan=''; var lq_bfSpan=''; var zfSpan='';var sub='';
                    var noSpan=''; var fcSpan=''; var timeSpan='';var homePai='';var awayPai='';
                    var h=parseInt(indexs[i].match_at/60);
                    if(vtype=='jczq'){

                        //  中
                        if(indexs[i].zlc == 1){
                            sub='<sub class="team-site f22">(中)</sub>'
                        }

                        //  罚红牌
                        if(indexs[i].home_red_counts != 0 && indexs[i].away_red_counts != 0){
                            homePai='<i class="red-pai f22">'+indexs[i].home_red_counts+'</i>';
                            awayPai='<i class="red-pai f22">'+indexs[i].away_red_counts+'</i>';
                        }else if(indexs[i].away_red_counts != 0){
                            awayPai='<i class="red-pai f22">'+indexs[i].away_red_counts+'</i>';
                        }else if(indexs[i].home_red_counts != 0) {
                            homePai='<i class="red-pai f22">'+indexs[i].home_red_counts+'</i>';
                        }else{
                            homePai='';awayPai='';
                        }
                        //  加时
                        if(indexs[i].status == 0){   //未开始状态
                            noSpan='<span class="list-state color3 list-state-pos">'+indexs[i].status_desc+'</span>';
                            zq_bfSpan='';
                            timeSpan='<span class="list-time color3  list-time-pos">'+indexs[i].matchtime.substr(5,11)+'</span>';
                        }else if(indexs[i].status == 4){   //完场状态
                            noSpan='<span class="list-state color3">'+indexs[i].status_desc+'</span>';
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            zq_bfSpan='<p class="score">'+'<em class="score-itm"><i>'+indexs[i].homescore+'</i> <i>'+indexs[i].homescore+'</i></em>'+'<span class="score-c">:</span>'+'<em class="score-itm"><i>'+indexs[i].awayscore+'</i> <i>'+indexs[i].awayscore+'</i></em>'+'</p>';
                            bcSpan='<span>半场'+indexs[i].homehalfscore+':'+indexs[i].awayhalfscore+'&nbsp;</span>';
                        }else if(indexs[i].status == 2){   //中场休息
                            noSpan='<span class="list-state green">'+indexs[i].status_desc+'</span>';
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            zq_bfSpan='<p class="score green">'+'<em class="score-itm"><i>'+indexs[i].homescore+'</i> <i>'+indexs[i].homescore+'</i></em>'+'<span class="score-c">:</span>'+'<em class="score-itm"><i>'+indexs[i].awayscore+'</i> <i>'+indexs[i].awayscore+'</i></em>'+'</p>';
                            bcSpan='<span>半场'+indexs[i].homehalfscore+':'+indexs[i].awayhalfscore+'&nbsp;</span>';
                        }else if(indexs[i].status ==1){   //上半场 下半场
                            //function startRequest(){
                            //setInterval(function(){
                            //var h=parseInt(indexs[i].match_at/60);
                            //},5000);
                            //if(h >= 45){h="45+";}else{h+=1;}
                            //var h=0;
                            h>=45 ? h='45+' : h+=1;
                            //}
                            noSpan='<span class="list-state green">'+h+'<i class="dian">\'\</i></span>';
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            zq_bfSpan='<p class="score green">'+'<em class="score-itm"><i>'+indexs[i].homescore+'</i> <i>'+indexs[i].homescore+'</i></em>'+'<span class="score-c">:</span>'+'<em class="score-itm"><i>'+indexs[i].awayscore+'</i> <i>'+indexs[i].awayscore+'</i></em>'+'</p>';
                            //bcSpan='<span>半场'+indexs[i].homehalfscore+':'+indexs[i].awayhalfscore+'&nbsp;</span>';
                        }else if(indexs[i].status ==3){
                            //function startRequest(){startRequest
                            //    setInterval(function(){
                            //        h=parseInt(indexs[i].match_at/60);
                            //},5000)
                            //if(h >= 45){h="90+"}else{h+=46;}
                            h >= 45 ? h='90+' :h+=46;
                            noSpan='<span class="list-state green">'+h+'<i class="dian">\'\</i></span>';
                            //}
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            zq_bfSpan='<p class="score green">'+'<em class="score-itm"><i>'+indexs[i].homescore+'</i> <i>'+indexs[i].homescore+'</i></em>'+'<span class="score-c">:</span>'+'<em class="score-itm"><i>'+indexs[i].awayscore+'</i> <i>'+indexs[i].awayscore+'</i></em>'+'</p>';
                            bcSpan='<span>半场'+indexs[i].homehalfscore+':'+indexs[i].awayhalfscore+'&nbsp;</span>';
                        }
                        $('.list').append(
                            '<div id="'+indexs[i].fid+'" class="list-item">'+
                            '<div class="list-tit">'+
                            '<span class="list-day">'+indexs[i].order+'&nbsp;&nbsp;'+indexs[i].simpleleague+'</span>'+
                            noSpan+
                            timeSpan+
                            '</div>'+
                            '<div class="list-team">'+
                            '<div class="team team-l f30">'+
                            '<img src="'+indexs[i].homelogo+'">'+indexs[i].homesxname+''+sub+homePai+
                            '</div>'+
                            '<div class="team-c color4">'+zq_bfSpan+'</div>'+
                            '<div class="team team-r f30">'+awayPai+indexs[i].awaysxname+''+
                            '<img src="'+indexs[i].awaylogo+'">'+
                            '</div>'+
                            '</div>'+
                            '<div class="list-info f22">'+bcSpan+'</div>'+
                            '</div>'+
                            '</div>'
                        );
                    }else{
                        if(indexs[i].status == 1){  //未开始状态
                            noSpan='<span class="list-state color3 list-state-pos">'+indexs[i].status_desc+'</span>';
                            lq_bfSpan='';
                            timeSpan='<span class="list-time color3  list-time-pos">'+indexs[i].matchtime.substr(5,11)+'</span>';
                        }else if(indexs[i].status == 11){   //完场状态
                            noSpan='<span class="list-state color3">'+indexs[i].status_desc+'</span>';
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            lq_bfSpan='<p class="score">'+'<em class="score-itm"><i>'+indexs[i].awayscore+'</i> <i>'+indexs[i].awayscore+'</i></em>'+'<span class="score-c">:</span>'+'<em class="score-itm"><i>'+indexs[i].homescore+'</i> <i>'+indexs[i].homescore+'</i></em>'+'</p>';
                            fcSpan='<span>总分:'+indexs[i].total+'&nbsp;&nbsp;分差'+indexs[i].diff+'</span>';
                        }else{      //其他比赛状态
                            noSpan='<span class="list-state green">'+indexs[i].match_at+indexs[i].status_desc+'</span>';
                            timeSpan='<span class="list-time">'+indexs[i].matchtime.substr(5,11)+'</span>';
                            lq_bfSpan = '<p class="score green">' + '<em class="score-itm"><i>' + indexs[i].awayscore + '</i> <i>' + indexs[i].awayscore + '</i></em>' + '<span class="score-c">:</span>' + '<em class="score-itm"><i>' + indexs[i].homescore + '</i> <i>' + indexs[i].homescore + '</i></em>' + '</p>';
                            fcSpan='';
                        }
                        $('.list').append(
                            '<div id="'+indexs[i].fid+'" class="list-item">' +
                            '<div class="list-tit">' +
                            '<span class="list-day">'+indexs[i].order+'&nbsp;&nbsp;'+indexs[i].simpleleague+'</span>' +
                            noSpan + timeSpan+
                            '</div>' +
                            '<div class="list-team">' +
                            '<div class="team team-l f30">' +
                            '<img src="'+indexs[i].awaylogo+'">'+indexs[i].awaysxname+'<i class="red-pai f22" style="display: none;">0</i>' +
                            '</div>' +
                            '<div class="team-c color4">' +
                            lq_bfSpan +
                            '</div><div class="team team-r f30">'+indexs[i].homesxname+''+
                            '<img src="'+indexs[i].homelogo+'">' +
                            '</div></div><div class="list-info f22">'+fcSpan+'</span>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                }
            }
            $("#load").hide();
        },
        complete:function(XMLHttpRequest,textStatus){
            //alert('远程调用成功，状态文本值：'+textStatus);
            $("#load").hide();
        },
        error: function () {alert(APP.error.ajaxError);}
    });
});
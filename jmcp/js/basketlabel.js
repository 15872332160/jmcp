/**
 * Created by acer on 2015/9/24.
 */
$(function(){
    //加载数据

    $("#main").ajaxhtml({
        type: s_type,
        bodynum:s_pt,
        lotteryId:s_ld
    })
    s_dang=s_type
    if(s_pt==2){
        $(".TnameCon ul .cur").removeClass("cur")
        $(".TnameCon ul .menubg2").addClass("cur")
        $('#TName').html('让分胜负')
    }else if(s_pt==3){
        $(".TnameCon ul .cur").removeClass("cur")
        $(".TnameCon ul .menubg3").addClass("cur")
        $('#TName').html('胜分差')
    }else if(s_pt==4){
        $(".TnameCon ul .cur").removeClass("cur")
        $(".TnameCon ul .menubg4").addClass("cur")
        $('#TName').html('大小分')
    }else if(s_pt==5){
        $(".TnameCon ul .cur").removeClass("cur")
        $(".TnameCon ul .menubg5").addClass("cur")
        $('#TName').html('混合')
    }else{
        $(".TnameCon ul .cur").removeClass("navSelect")
        $(".TnameCon ul .menubg1").addClass("navSelect")
        $('#TName').html('胜负')
    }
    $(".TnameCon ul .menubg1").bind("click",function(){
        window.location.href='basketball.html?type='+s_dang
    })
    $(".TnameCon ul .menubg2").bind("click",function(){
        window.location.href='basketball.html?bodynum=2&type='+s_dang+'&&title=竞彩篮球让分胜负投注&lotteryId=506&left=0'
    })
    $(".TnameCon ul .menubg3").bind("click",function(){
        window.location.href='basketball.html?bodynum=3&type='+s_dang+'&&title=竞彩篮球胜分差投注&lotteryId=507&left=0'
    })
    $(".TnameCon ul .menubg4").bind("click",function(){
        window.location.href='basketball.html?bodynum=4&type='+s_dang+'&&title=竞彩篮球大小分投注&lotteryId=508&left=0'
    })
    $(".TnameCon ul .menubg5").bind("click",function(){
        window.location.href='basketball.html?bodynum=5&type='+s_dang+'&&title=竞彩篮球混合投注&lotteryId=510&left=0'
    })
    var docu=false
    $("#one,#selectData").on("click",".pul li",function(event){
        if(docu==false){
            $(this).select1(s_type)
        }
        docu=false
        //event.stopPropagation()
        event.preventDefault()
    })
    $(".back").click(function(){
        $("#selectData").hide()
        $("#one").show()
    })
    $("#selectData").on("click",".delspan",function(){
        $(this).delsel(s_type)
    })
    $("#substra").click(function(){
        $(this).substra()
    })
    $("#add").click(function(){
        $(this).add()
    })
    $(".intext").bind('input propertychange',function(){
        $(this).checkinput()
    })
    $("#clearall").click(function(){
        $(this).clearall()
    })
    function handleTouchEvent(ev){
        docu=true
    }
    function handleTouchEvent1(ev){
        docu=false
    }
    document.addEventListener("touchmove", handleTouchEvent, false)
    document.addEventListener("touchstart", handleTouchEvent1, false)
    $("#del").click(function(){
        $.fn.clearall()
    })

    $("#jmcp").on("click",".tit",function(){
        $(this).zhedie()
        //
        //if($(this).index()==$(".tit").length&&$(this).next().is(":hidden")){
        //    $(this).css("border-bottom",'1px solid #c6c7c6')
        //}else{
        //    $(this).css("border-bottom-width","0")
        //}
        event.preventDefault()

    })
    $(".midfo").click(function(){
        $(this).buySelect(s_type)
    })
    //拖动菜单
    //$(".nav ul li").css("width",$(document).width()/3)
    //$(".nav ul").css("width",$(".nav ul li").width()*$(".nav ul li").length+10)

    //var l=0
    //if(s_left){
    //    l= X.urlSearch("left")
    //}
    //if(l<0){
    //    $(".ar-1").hide()
    //    $(".ar-2").show()
    //}else{
    //    $(".ar-1").show()
    //    $(".ar-2").hide()
    //}
    //$(".nav").swipe({
    //    swipe:function(event, direction, distance, duration, fingerCount) {
    //
    //        if(direction=='left'&&$(".nav ul").offset().left+$(".nav ul").width()>$(".nav").offset().left+$(".nav").width()){
    //            l=$(".nav ul").offset().left-$(".nav").width()
    //            $(".ar-1").hide()
    //            $(".ar-2").show()
    //        }
    //
    //        if(direction=='right'&&$(".nav ul").offset().left<$(".nav").offset().left){
    //            l=$(".nav ul").offset().left+$(".nav").width()
    //            $(".ar-1").show()
    //            $(".ar-2").hide()
    //        }
    //
    //        if(Math.abs(l)<=$(".nav").width()){
    //            $(".nav ul").animate({
    //                "left":[l,'easeOutBack']
    //            })
    //        }
    //
    //    }
    //})
    //$(".ar-1").click(function(){
    //    if($(".nav ul").offset().left+$(".nav ul").width()>$(".nav").offset().left+$(".nav").width()){
    //        l=$(".nav ul").offset().left-$(".nav").width()
    //        $(".ar-1").hide()
    //        $(".ar-2").show()
    //    }
    //    if($(".nav ul").offset().left+$(".nav ul").width()<$(".nav").offset().left+$(".nav").width()){
    //        l=$(".nav ul").offset().left;
    //    }
    //    $(".nav ul").animate({
    //        "left":[l,'easeOutBack']
    //    })
    //})
    //$(".ar-2").click(function(){
    //    if($(".nav ul").offset().left<$(".nav").offset().left){
    //        l=$(".nav ul").offset().left+$(".nav").width()
    //        $(".ar-1").show()
    //        $(".ar-2").hide()
    //
    //    }
    //    if($(".nav ul").offset().left>$(".nav").offset().left){
    //        l=$(".nav ul").offset().left;
    //    }
    //    $(".nav ul").animate({
    //        "left":[l,'easeOutBack']
    //    })
    //})
    $("#cuan").click(function(){

        if(s_type==0){
            //var s=$("#cuan").text().trim()
            //var s1=s.substr(0,s.lastIndexOf('串'))
            var s=0
            $("#selectData .pul").each(function(){
                if($(this).find(".on").length>0){
                    s+=1
                }
            })
            var pd=false
            $(".lview").each(function(){
                if($(this).hasClass("on")){
                    pd=true
                }
            })
            if(s>4&&s_pt==3){
                s=4
            }else if(s>4&&pd==true){
                s=4
            }else if(s>8&&s_pt!=3){
                s=8
            }
            $(this).selectCuan(s)

        }

    })
    $("#buy").click(function(){
        if(submitPD==true||submitPD=='true'){
            $(this).submitform('core/lottery/buySubmit',s_title)
            submitPD=false
        }

    })
    $(document).on("click",".view",function(){
       var code=$(this).attr('matchcode');
        $('.openwin').each(function(){
            if($(this).attr('matchcode')==code){
                $(this).openWin()
            }
        })
    })
    $(document).on("click",".btn1x",function(){
        $(".openwin:visible").hide()
        $(".mask").hide()
    })
    $(document).on("touchstart",".sfeng li",function(){
        if($(this).hasClass("tit_n")){

        }else{
            $(this).toggleClass("on")
        }

    })
    $(document).on("click",".btn2x",function(){
        $(this).viewok(s_type)
    })
    //过关单关切换
    if(s_dang==0){
        $("header ul li:eq(0)").addClass("active")
        $(".menubg:eq(4)").show()
    }else{
        $("header ul li:eq(1)").addClass("active")
        $(".whitespan").removeClass("bgarrow")
        $(".whitespan").css("background-color","#fff")
        $(".menubg:eq(4)").hide()
    }


    $("header ul li").click(function(){
        if($(this).index()==1&&$(".navSelect").text()!='混合'){
            window.location.href='basketball.html?bodynum='+s_pt+'&type=1&title='+s_title+'&lotteryId='+s_ld+'&left='+s_left
        }else{
            window.location.href='basketball.html?bodynum='+s_pt+'&type=0&title='+s_title+'&lotteryId='+s_ld+'&left='+s_left
        }
    })
    $(".HeadTit span:eq(0)").text(s_title)
})
$('.TName').bind('click',function(e){
    $(document).one('click',function(){
        $('.TnameCon').hide();
        $('.mask').hide()
    });
    e.stopPropagation();
    if($('.TnameCon').is(":visible")){
        $(this).find('i').removeClass('qi_bottom')
        $('.TnameCon').hide();
        $('.mask').hide()
    }else if($('#shai').is(':visible')){
    }else{
        $(this).find('i').addClass('qi_bottom')
        $('.TnameCon').show();
        $('.mask').show()
    }
})
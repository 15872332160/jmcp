/**
 * Created by acer on 2015/9/24.
 */
$(function(){
    //加载数据

    var submitPD=true;//避免客户重复提交
    $("#main").ajaxhtml({
        bodynum:s_pt,
        lotteryId:s_ld
    })

    var docu=false
    $("#one,#selectData").on("touchend",".pul li",function(event){
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
        $(this).delsel()
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


    $(".whitebg").click(function(){
        $(this).buySelect()
    })


    $("").click(function(){
        if(disabledbtn==true||disabledbtn=='true'){
            $(this).submitform('core/lottery/buySubmit',s_title)
        }

    })
    $(document).on("touchend",".view",function(){
        if(docu==false){
            $(this).view()
        }
        docu=false
    })
    $(document).on("touchstart",".btn1x",function(){
        $(".openwin:visible").hide()
        $("#mask").remove()
    })
    $(document).on("touchstart",".sfeng li",function(){
        if($(this).hasClass("redbg")||$(this).hasClass("greenbg")){

        }else{
            $(this).toggleClass("on")
        }

    })
    $(document).on("touchstart",".btn2x",function(){
        $(this).viewok()
    })

    $(".headerTo span:eq(1)").text(s_title)
    $(".toggle-cz li:eq(0)").click(function(){
        window.location='chuantong.html?bodynum=2&lotteryId=103&title=传统足球任选九'
    })
    $(".toggle-cz li:eq(1)").click(function(){
        window.location='chuantong.html'
    })
    if(s_ld==103){
        $(".toggle-cz li").removeClass('cur')
        $(".toggle-cz li:eq(0)").addClass("cur")
        $(".help").parent().attr('href','/news/30002.html')
    }else{
        $(".toggle-cz li").removeClass('cur')
        $(".toggle-cz li:eq(1)").addClass("cur")
        $(".help").parent().attr('href','/news/30001.html')
    }
})
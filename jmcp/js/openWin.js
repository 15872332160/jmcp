// JavaScript Document
(function($){
    $.fn.openWin=function(def){
        str={
            width:'6.4rem',
            height:'auto'
        };
        var s=$.extend(str,def);
        var _thi=this;

        $(".mask").show();
        $(".mask").css({"height":$(document).height(),"z-index":13});
        $("body").css("overflow","hidden")
        this.css({'position':'absolute','display':'block','padding':'.3rem','width':s.width,'height':s.height,'z-index':'13'})
        var left1=($(document).width()-this.innerWidth())/2;
        var top=$(document).scrollTop()+($(window).height()-this.innerHeight())/2
        this.css({'top':top,'left':"50%",'margin-left':'-3.5rem'});

        $("#jmcp").on("click","#close,.mask",function(){
            _thi.hide();
            $(".mask").hide().css({'z-index':12});
            $("body").css("overflow","auto")
        })
    }

})(jQuery);
 function popup(content){
     var text='', par=$('#showText');
     text += '<div class="showText">'+content+'</div>';
     par.html(text);
     var _w=par.width()/2 ,doc=par.height()/2;
     par.css({'margin-left':-_w,'margin-top':-doc});
     setTimeout(function(){
         par.empty();
     },3000)
 };
function cuanpopup(){
    var _h= $('#cuan1').height();
    if($('#cuan1').is(':visible')){
        $('.mask').hide()
        $('#cuan1').animate({
            'bottom':-_h
        },500,function(){
            //$('#cuan1').hide();
        })
    }
}
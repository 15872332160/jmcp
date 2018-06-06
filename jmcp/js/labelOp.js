/**
 * Created by acer on 2015/8/26.
 */

$(".tab").on("click",".pul li",function(event){
    if($(this).text().trim()==""||$(this).text().trim()=='未开售'||$(this).text().trim()=='展开全部'||$(this).text().trim().indexOf('已选')!=-1){
        return false;
    }else{
        if(docu==false){
            X.c.select(this)
        }
        docu=false
    }
    event.stopPropagation()

})
var docu=false
var submitPD=true//用来避免用户重户提交
function handleTouchEvent(ev){
    docu=true
}
//document.addEventListener("click", handleTouchEvent, false)
$("#del").click(function(){//清空选项
    X.c.delC();
})
var glo_open=false
$(".midfo").click(function(){

    if($("#count").text().trim()=='我要购买'){
        glo_open=true

        var lenc

        if(pt=='a1'){
            X.c.getDat()
            if($(".getshop").length>8){
                lenc=8
            }else{
                lenc=$(".getshop").length
            }
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                $(".cuan").text(lenc+'串1')
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                $(".cuan").text('单关')
                $("#total").text($(".getshop .on").length*$(".intext").val())
                $("#money").text($("#total").text()*2)
                X.c.danguanprice()
            }

        }else if(pt=='a2'){
            $(".choose .header span:eq(1)").text("总进球")
            X.c.getDat1()
            if($(".getshop").length>6){
                lenc=6
            }else{
                lenc=$(".getshop").length
            }
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                $(".cuan").text(lenc+'串1')
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                $(".cuan").text('单关')
                $("#total").text($(".getshop .on").length*$(".intext").val())
                $("#money").text($("#total").text()*2)
                X.c.danguanprice()
            }

        }else if(pt=="a3"){
            $(".choose .header span:eq(1)").text("混合投注")
            X.c.getDat1()
            if($(".getshop").length>8){
                lenc=8
            }else{
                lenc=$(".getshop").length
            }
            var te= 0,ta= 0,tbf= 0,tjq= 0,tbqc= 0,scheme=X.c.schemes
            for (var i in scheme) {

                for(var a=0;a<scheme[i].v.length;a++){
                    if(/['R']/.test(scheme[i].v[a])){
                        te+=1
                    }else if(/[':']/.test(scheme[i].v[a])){
                        tbf+=1
                    }else if(/['_']/.test(scheme[i].v[a])){
                        tbqc+=1
                    }else if(/['B']/.test(scheme[i].v[a])){
                        tjq+=1
                    }else{
                        ta+=1
                    }
                }

            }
            if(tjq>0){
                if($(".getshop").length>6){
                    lenc=6
                }
            }
            if(tbf>0||tbqc>0){
                if($(".getshop").length>4){
                    lenc=4
                }
            }

            $(".cuan").text(lenc+'串1')
            X.c.hunhecompute()
        }else if(pt=="a4"){
            $(".choose .header span:eq(1)").text("让球胜平负")
            X.c.getDat1()
            if($(".getshop").length>8){
                lenc=8
            }else{
                lenc=$(".getshop").length
            }
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                $(".cuan").text(lenc+'串1')
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                $(".cuan").text('单关')
                $("#total").text($(".getshop .on").length*$(".intext").val())
                $("#money").text($("#total").text()*2)
                X.c.danguanprice()
            }

        }else if(pt=='a5'){
            $(".choose .header span:eq(1)").text("比分")
            X.c.getDat2()
            if($(".getshop").length>4){
                lenc=4
            }else{
                lenc=$(".getshop").length
            }
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                $(".cuan").text(lenc+'串1')
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                $(".cuan").text('单关')

                X.c.danguanprice1()
            }

        }else {
            $(".choose .header span:eq(1)").text("半全场")
            X.c.getDat2()
            if($(".getshop").length>4){
                lenc=4
            }else{
                lenc=$(".getshop").length
            }
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false') {
                $(".cuan").text(lenc + '串1')
                $("#total").text(X.c.computeZHu() * $(".intext").val())
                $("#money").text($('#total').text() * 2)
                X.c.computePrice()
            }else{
                $(".cuan").text('单关')

                X.c.danguanprice1()
            }
        }

        if(X.c.setDan($(".cuan").text())){
            $(".getshop .dan").each(function(){
                $(this).addClass("dangray")
            })
        }else{
            $(".getshop .dan").each(function(){
                $(this).removeClass("dangray")
                $(this).removeClass("danselect")
            })
        }
        if($(".cuan").text().trim()=='单关'){

            $(".getshop .dan").addClass('dangray')
        }
    }


})
$(".tab").on("click",".tit",function(){

    if($(this).next().is(":visible")){
        $(this).next().hide()
    }else{
        $(this).next().show()
    }
})

//var _gi
$(".tab,.shopdiv").on("click",".opendoc",function(){
    var _gi=$(this).attr('numIndex')
    // $(this).attr("numIndex",_gi)
    $(".openwin").each(function(){
        if($(this).attr('i')==_gi){
            $(this).openWin()
        }
    })

})
$(".shopdiv").on("click",".delspan",function(){
    if($(".getshop").length<=2&&(X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false||X.urlSearch('danguan')===undefined)){
        popup("至少2场")
        return false
    }else if($(".getshop").length==1&&(X.urlSearch('danguan')=='true'||X.urlSearch('danguan')==true)){
        popup("至少1场")
        return false
    }else{
        $(this).parent().parent().remove()
    }



    if($(".getshop").length>8&&(X.urlSearch('danguan')=='false'||X.urlSearch('danguan'))==false){
        $(".cuan").text('8串1')
    }else if($(".getshop").length>6&&( X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false)&&pt=='a2'){
        $(".cuan").text('6串1')
    }else if($(".getshop").length>4&&(X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false)&&pt=='a6'){
        $(".cuan").text('4串1')
    }else if($(".getshop").length>4&& (X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false)&&pt=='a5'){
        $(".cuan").text('4串1')
    }else if(X.urlSearch('danguan')=='true'||X.urlSearch('danguan')==true){
        $(".cuan").text('单关')
    }else{
        $(".cuan").text($(".getshop").length+'串1')
    }



    if(X.c.setDan($(".cuan").text())){
        $(".getshop .dan").each(function(){
            $(this).addClass("dangray")
            $(this).removeClass("danselect")
        })
    }else{
        $(".getshop .dan").each(function(){
            $(this).removeClass("dangray")
        })
    }
    if(pt=='a5'||pt=='a6'){
        var no=$(this).parent().parent().find(".bfdl").attr("data")
    }else{
        var no=$(this).parent().prev().find("li").eq(0).attr("data")
    }
    if(pt=="a1"||pt=="a4"||pt=='a2'){
        //var json=eval('(' + no+ ')')
        //delete X.c.schemes[json.no]
        X.c.pushsche()
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            $("#total").text($(".getshop .on").length*$(".intext").val())
            $("#money").text($("#total").text()*2)
            X.c.danguanprice()
        }

    }else if(pt=='a6'||pt=='a5'){
        X.c.pushsche1()
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            X.c.danguanprice1()
        }

    }else if(pt=='a3'){
        X.c.pushsche2()
        var te= 0,ta= 0,tbf= 0,tjq= 0,tbqc= 0,scheme=X.c.schemes,len=$(".getshop").length>8?8:$(".getshop").length
        for (var i in scheme) {
            for(var a=0;a<scheme[i].v.length;a++){
                if(/['R']/.test(scheme[i].v[a])){
                    te+=1
                }else if(/[':']/.test(scheme[i].v[a])){
                    tbf+=1
                }else if(/['_']/.test(scheme[i].v[a])){
                    tbqc+=1
                }else if(/['B']/.test(scheme[i].v[a])){
                    tjq+=1
                }else{
                    ta+=1
                }
            }
        }
        if(tjq>0){
            if($(".getshop").length>6){
                len=6
            }
        }
        if(tbf>0||tbqc>0){
            if($(".getshop").length>4){
                len=4
            }
        }
        $(".cuan").text(len+'串1')
        X.c.hunhecompute()
    }


})
$(".opbtn:eq(1)").click(function(){
    X.c.add()
    if(pt=="a1"||pt=="a4"||pt=='a2'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            $("#total").text($(".getshop .on").length*$(".intext").val())
            $("#money").text($("#total").text()*2)
            X.c.danguanprice()
        }

    }else if(pt=='a6'||pt=='a5'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            X.c.danguanprice1()
        }

    }else if(pt=="a3"){
        X.c.pushsche2()
        X.c.hunhecompute()
    }

})
$(".opbtn:eq(0)").click(function(){
    X.c.subtra()
    if(pt=="a1"||pt=="a4"||pt=='a2'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            $("#total").text($(".getshop .on").length*$(".intext").val())
            $("#money").text($("#total").text()*2)
            X.c.danguanprice()
        }

    }else if(pt=='a6'||pt=='a5'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            X.c.danguanprice1()
        }

    }else if(pt=="a3"){
        X.c.pushsche2()
        X.c.hunhecompute()
    }
})
$(".intext").bind('input propertychange',function(){
    X.c.checkdata($(this).val())
    if(pt=="a1"||pt=="a4"||pt=='a2'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            $("#total").text($(".getshop .on").length*$(".intext").val())
            $("#money").text($("#total").text()*2)
            X.c.danguanprice()
        }

    }else if(pt=='a6'||pt=='a5'){
        if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
            $("#total").text(X.c.computeZHu()*$(".intext").val())
            $("#money").text($('#total').text()*2)
            X.c.computePrice()
        }else{
            X.c.danguanprice1()
        }

    }else if(pt=="a3"){
        X.c.pushsche2()
        X.c.hunhecompute()
    }
})
/***
 $(".editbtn").click(function(){
    X.c.edit()
    $(".cuan").text($(".getshop").length+'串1')
})
 ***/
$(".allclear").click(function(){
    glo_open=false
    X.c.delSelect()


    //$(".cuan").text($(".getshop").length+'串1')
})
$(".cuan").click(function(){
    var len=0
    if((pt=='a5'||pt=='a6')&&$(".getshop").length>4){
        len=4
    }else if($(".getshop").length>6&&pt=='a2'){
        len=6
    }else if($(".getshop").length>4&&pt=='a3'){
        len=$(".getshop").length>8?8:$(".getshop").length
        var te= 0,ta= 0,tbf= 0,tjq= 0,tbqc= 0,scheme=X.c.schemes
        for (var i in scheme) {
            for(var a=0;a<scheme[i].v.length;a++){
                if(/['R']/.test(scheme[i].v[a])){
                    te+=1
                }else if(/[':']/.test(scheme[i].v[a])){
                    tbf+=1
                }else if(/['_']/.test(scheme[i].v[a])){
                    tbqc+=1
                }else if(/['B']/.test(scheme[i].v[a])){
                    tjq+=1
                }else{
                    ta+=1
                }
            }
        }
        if(tjq>0){
            if($(".getshop").length>6){
                len=6
            }
        }
        if(tbf>0||tbqc>0){
            if($(".getshop").length>4){
                len=4
            }
        }
    }else if($(".getshop").length>8){
        len=8
    }else{
        len=$(".getshop").length
    }
    X.c.getcuan(len,$(this).text())
})
$(".datasel").on("click","li",function(){
    if($(this).hasClass("selectdata")){
        $(this).removeClass("selectdata")
    }else{
        $(this).addClass("selectdata")
    }
})

$("#allright").click(function(){
    var h=$(".opwin").height()
    if($(".selectdata").length==0){
        popup("必须选择一项")
    }else if($(".selectdata").length>5){
        popup("选项不能超过5个")
    }else{
        $(".cuan").empty()
        $(".selectdata").each(function(){
            $(".cuan").append(" "+$(this).text())
        })
        if($(".opwin").is(":visible")){
            $(".mask").hide()
            $(".opwin").animate({
                "bottom":-h
            },function(){
                $(".opwin").hide()
            })
        }
    }
    if(X.c.setDan($(".cuan").text())){
        $(".getshop .dan").each(function(){
            $(this).addClass("dangray")
            $(this).removeClass("danselect")
        })
    }else{
        $(".getshop .dan").each(function(){
            $(this).removeClass("dangray")
            $(this).removeClass("danselect")
        })
    }
    if(pt=="a1"||pt=='a4'||pt=="a2"){
        X.c.pushsche()
        $("#total").text(X.c.computeZHu()*$(".intext").val())
        $("#money").text($('#total').text()*2)
        X.c.computePrice()
    }else if(pt=='a6'||pt=='a5'){
        X.c.pushsche1()
        $("#total").text(X.c.computeZHu()*$(".intext").val())
        $("#money").text($('#total').text()*2)
        X.c.computePrice()
    }else if(pt=='a3'){
        X.c.pushsche2()
        X.c.hunhecompute()
    }


})
//设置胆
$(".shopdiv").on("click",".dan",function(){
    if(pt=='a5'||pt=='a6'){
        var no=$(this).parent().parent().find('.bfdl').attr("data")
    }else{
        var no=$(this).parent().next().find("li").eq(0).attr("data")
    }

    var json=eval('(' + no+ ')')
    if($(this).hasClass("dangray")){

    }else{
        if($(this).hasClass("danselect")){
            $(this).removeClass("danselect")
            if(pt=="a1"||pt=="a4"||pt=='a2'){
                X.c.pushsche()
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else if(pt=='a6'||pt=='a5'){
                X.c.pushsche1()
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else if(pt=="a3"){
                X.c.pushsche2()
                X.c.hunhecompute()
            }

        }else{
            $(this).addClass("danselect")
            if(pt=="a1"||pt=="a4"||pt=="a2"){
                X.c.pushsche()
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else if(pt=='a6'||pt=='a5'){
                X.c.pushsche1()
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else if(pt=='a3'){
                X.c.pushsche2()
                X.c.hunhecompute()
            }

        }
    }
    if(X.c.setDan($(".cuan").text())){
        $(".getshop .dan:not(.danselect)").each(function(){
            $(this).addClass("dangray")
        })
    }else{
        $(".getshop .dan").removeClass("dangray")
    }

})

$(".shopdiv").on("click",".pul li",function(){
    if($(this).text()=='未开售'||$(this).text()==""||$(this).text()=='展开全部'||$(this).text().trim().indexOf('已选')!=-1){ return false}
    docu=false
    if($(this).hasClass("on")||$(this).hasClass("whitebfdl")) {
        var no = $(this).parent().find("li").eq(0).attr("data")
        var json = eval('(' + no + ')')

        var axx = 0
        var _thi = $(this)
        _thi.removeClass("on")

        $(".shopdiv .getshop").each(function () {

            if ($(".pul", this).find(".on").length == 0&&$(".pul", this).find(".whitebfdl").length == 0) {

            } else {
                axx += 1
            }
        })

        if($(".getshop").length>8&& X.urlSearch("danguan")=="false"|| X.urlSearch("danguan")==false){
            $(".cuan").text('8串1')
        }else if(X.urlSearch("danguan")=="true"|| X.urlSearch("danguan")==true){
            $(".cuan").text("单关")
        }else if(axx<2&&(X.urlSearch("danguan")=="false"|| X.urlSearch("danguan")==false||X.urlSearch("danguan")=='undefined'||X.urlSearch("danguan")==undefined)){
            _thi.addClass("on")
            $(".cuan").text('2串1')
            popup('选择场数不能少于2场')
        }else{
            $(".cuan").text(axx+"串1")
        }
        if(axx<=2&& (X.urlSearch("danguan")=="true"|| X.urlSearch("danguan")==true)){
            console.log(1)
            if (pt == "a1" || pt == "a4" || pt == "a2") {
                X.c.pushsche()
                $("#total").text($(".getshop .on").length*$(".intext").val())
                $("#money").text($("#total").text()*2)

                X.c.danguanprice()
            }else{
                X.c.pushsche1()
                X.c.danguanprice1()
            }

        }
        if (axx >=2) {

            if (pt == "a1" || pt == "a4" || pt == "a2") {

                if (X.urlSearch('danguan') == false || X.urlSearch('danguan') == 'false') {
                    X.c.pushsche()
                    $("#total").text(X.c.computeZHu() * $(".intext").val())
                    $("#money").text($('#total').text() * 2)
                    X.c.computePrice()
                } else {
                    X.c.pushsche()
                    $("#total").text($(".getshop .on").length*$(".intext").val())
                    $("#money").text($("#total").text() * 2)
                    X.c.danguanprice()
                }
            } else if (pt == 'a6' || pt == 'a5') {
                if (X.urlSearch('danguan') == false || X.urlSearch('danguan') == 'false') {
                    X.c.pushsche1()

                    $("#total").text(X.c.computeZHu() * $(".intext").val())
                    $("#money").text($('#total').text() * 2)
                }else{
                    X.c.danguanprice1()
                }


            } else if (pt == 'a3') {

                X.c.pushsche2()
                X.c.hunhecompute()
            }

        }

        /***
         if(axx>=2){

            var index=$(this).index()
            $(".borderTop .pul").each(function(x){
                var j=$("li:eq(0)",this).attr("data")
                var jx=eval('(' + j+ ')')
                if(jx.no==json.no){
                    $("li",this).each(function(){
                        if($(this).index()==index){
                            $(this).removeClass("on")
                        }
                    })
                }
            })
        }
         ***/

    }else{

        $(this).addClass("on")

        if(pt=="a1"||pt=="a4"||pt=='a2'){


            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                X.c.pushsche()
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                X.c.pushsche()
                $("#total").text($(".getshop .on").length*$(".intext").val())
                $("#money").text($("#total").text()*2)
                X.c.danguanprice()
            }

        }else if(pt=='a6'||pt=='a5'){
            X.c.pushsche1()
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false') {
                $("#total").text(X.c.computeZHu() * $(".intext").val())
                $("#money").text($('#total').text() * 2)
                X.c.computePrice()
            }else{
                X.c.danguanprice1()
            }
        }else if(pt=="a3"){
            X.c.pushsche2()
            X.c.hunhecompute()
        }


        /***
         var index=$(this).index()
         $(".borderTop .pul").each(function(x){
            var j=$("li:eq(0)",this).attr("data")
            var jx=eval('(' + j+ ')')
            if(jx.no==json.no){
                $("li",this).each(function(){
                    if($(this).index()==index){
                        $(this).addClass("on")
                    }
                })
            }
        })***/
    }

})
$(".choose .back").click(function(){
    $(".shopdiv").empty()
    $(".header").show()
    $(".qi-list-box ").show()
    $(".tab").show();
    $("footer").show()
    $(".choose").hide()
    X.c.chooseStr=[]
    $("body").css("overflow","auto")
    glo_open=false
})
$(".intext").blur(function(){
    if($(this).val()==""){
        $(this).val(1)
    }
})
$("#buy").click(function(){
    if($("#money").text()==0){
        popup("购彩金额不能为零")
        return false
    }
    if(submitPD==true||submitPD=='true'){
        X.c.buysubmit()
        submitPD=false
    }

})

var closewin=false//判断是否能关闭图层
$("#jmcp").on("click","#ok",function(){
    var gettext='',score='',_thi=$(this)
    $(".bfli").each(function(){
        if($(this).hasClass("on")&&$(this).parent().parent().is(":visible")){
            gettext+=$(this).find("em").text()+" "
            score+=$(this).attr("sc")+" "
        }
    })

    $(".bfdl").each(function () {
        if ($(this).attr("numIndex") ==$(".openwin:visible").attr("i")) {
            if(gettext==""){
                $(this).text("点此展开投注区")
                $(this).removeAttr("sc")
                $(this).removeClass("whitebfdl")
            }else{
                $(this).text(gettext).attr("sc", score)
                $(this).addClass("whitebfdl")
            }
        }
    })


    var cn=0
    $(".tab .bfdl").each(function(){
        if($(this).text().trim()!='点此展开投注区'){
            cn+=1
        }

    })

    $("body").css("overflow","auto")
    $(".cho").text("已选择"+cn+"场")
    if(cn>1&&X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false){
        $("#count").text("我要购买")
    }else if(cn>0&&X.urlSearch('danguan')=='true'||X.urlSearch('danguan')==true){
        $("#count").text("我要购买")
    }else{
        $("#count").text("至少2场")
    }
    var cnx=0
    $(".getshop .bfdl").each(function(){
        if($(this).text().trim()!='点此展开投注区'){
            cnx+=1
        }
    })

    if(glo_open==true){
        if(cn>1||cnx>1&& X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false){
            $(".cuan").text(cnx+"串1")
            X.c.pushsche1()
            if(X.urlSearch('danguan')==false||X.urlSearch('danguan')=='false'){
                $("#total").text(X.c.computeZHu()*$(".intext").val())
                $("#money").text($('#total').text()*2)
                X.c.computePrice()
            }else{
                X.c.danguanprice1()
            }

        }else if(X.urlSearch('danguan')=='true'||X.urlSearch('danguan')==true){
            popup('至少1场')
            $(".cuan").text("单关")
            X.c. pushsche1()
            X.c.danguanprice1()
        }else{
            popup("至少2场")
            return false
        }

    }

    $(".mask").hide()
    $(".openwin").hide()
})
$("#jmcp").on("click",".bfli",function(){

    if ($(this).hasClass("on")) {
        $(this).removeClass("on")
        //$(o).attr("flag",0)
    } else {
        $(this).addClass("on")
        //$(o).attr("flag",1)
    }
})
$("#jmcp").on("click",".hhbfli ,.hhbqcli ,.hhzjqli",function(){

    if ($(this).hasClass("on")) {
        $(this).removeClass("on")
        //$(o).attr("flag",0)
    } else {
        $(this).addClass("on")
        //$(o).attr("flag",1)
    }
})

$("#jmcp").on("click","#hhok",function(){
    var gettext='',score='',getValue='',ctn=0,_thi=$(this)
    $('.openwin[i=' + $(this).parent().parent().attr('i') + ']').find(".hhbfli.on").each(function(){
        if($(this).hasClass("on")&&$(this).parent().parent().is(":visible")){
            gettext+=$(this).find("em").text()+" "
            score+=$(this).attr("sc")+" "
            getValue+=$(this).attr("value")+" "
            ctn++
        }
    })
    $('.openwin[i=' + $(this).parent().parent().attr('i') + ']').find(".hhbqcli.on").each(function(){
        if($(this).hasClass("on")&&$(this).parent().parent().is(":visible")){
            gettext+=$(this).find("em").text()+" "
            score+=$(this).attr("sc")+" "
            getValue+=$(this).attr("value")+" "
            ctn++
        }
    })
    $('.openwin[i=' + $(this).parent().parent().attr('i') + ']').find(".hhzjqli.on").each(function(){
        if($(this).hasClass("on")&&$(this).parent().parent().is(":visible")){
            gettext+=$(this).find("em").text()+" "
            score+=$(this).attr("sc")+" "
            getValue+=$(this).attr("value")+" "
            ctn++
        }
    })

    var opendoc = $('.opendoc[numindex='+$(this).parent().parent().attr('i')+']');
    if(gettext==""){
        $(opendoc).html("展开<br>全部")
        $(opendoc).attr("gt","").attr("sc", "")
        $(opendoc).removeClass("whitebfdl")
    }else{
        $(opendoc).html('已选<br>'+ctn+'项').attr("gt",getValue).attr("sc", score)
        $(opendoc).addClass("whitebfdl")
    }
    var cn=0

    $(".borderTop").each(function(index){
        if($(this).find(".pul").find("li").hasClass("on")||$(this).find(".pul").find("li").hasClass("whitebfdl")){
            cn+=1;
        }
    })

    $("body").css("overflow","auto")
    $(".cho").text("已选择"+cn+"场")
    if(cn>1){
        $("#count").text("我要购买")
    }else if(cn==1){
        $("#count").text("至少一场")
    }else{
        $("#count").text("至少2场")
    }

    if(glo_open==true){
        X.c. pushsche2()
        var te= 0,ta= 0,tbf= 0,tjq= 0,tbqc= 0,scheme=X.c.schemes,len=0

        $(".shopdiv .getshop").each(function () {
            if ($(".pul", this).find(".on").length == 0&&$(".pul", this).find(".whitebfdl").length == 0) {
            } else {
                len += 1
            }
        })

        if(len==1){
            popup('选择场数不能少于2场');
            return;
        }

        for (var i in scheme) {
            for(var a=0;a<scheme[i].v.length;a++){
                if(/['R']/.test(scheme[i].v[a])){
                    te+=1
                }else if(/[':']/.test(scheme[i].v[a])){
                    tbf+=1
                }else if(/['_']/.test(scheme[i].v[a])){
                    tbqc+=1
                }else if(/['B']/.test(scheme[i].v[a])){
                    tjq+=1
                }else{
                    ta+=1
                }
            }
        }
        if(tjq>0){
            if($(".getshop").length>6){
                len=6
            }
        }
        if(tbf>0||tbqc>0){
            if($(".getshop").length>4){
                len=4
            }
        }
        $(".cuan").text(len+'串1')
        X.c.hunhecompute()
    }

    $(".mask").hide()
    $(".openwin").hide()
    docu=false
})

$("#jmcp").on("click","#hhclose",function(){
    var gt = $('.opendoc[numindex='+$(this).parent().parent().attr('i')+']').attr('gt').trim()
    var gtSplit = gt.split(' ')
    if(gt!='') {
        $('.openwin[i=' + $(this).parent().parent().attr('i') + ']').find('li', this).each(function () {
            var livalue = $(this).attr('value')
            if (gtSplit.indexOf(livalue) > -1) {
                if (!$(this).hasClass('on')) {
                    $(this).addClass('on')
                }
            } else {
                $(this).removeClass('on')
            }

        })
    }else{
        $('.openwin[i=' + $(this).parent().parent().attr('i') + ']').find('li').removeClass('on')
    }
    $(this).parent().parent().hide()
    $(".mask").hide()
    $("body").css("overflow","auto")
    docu=false
})

$(".iconbg2").click(function(){
    $("#shai").show()
    //$("#shai").css("left",($(document).width()-$("#shai").width())/2)
    var a=[]
    $("#jmcp .matchname").each(function(){

        if(a.indexOf($(this).text())==-1){
            a.push($(this).text())
        }
    })
    var html='<h2 class="textc mt1">共'+$(".matchname:visible").length+'场赛事</h2>'
    html+='<div class="clearfix"></div><section class="clear"><div class="lfloat mlrx allselect">全选</div><div class="lfloat mlr2 fanselect">反选</div><div class="lfloat mlr2 fivesai">仅五大联赛</div></section> <ul>'
    for(var i=0;i< a.length;i++){
        html+="<li class='on'>"+a[i]+"</li>"
    }
    html+='</ul><div class="shaiok">确定</div>'
    if($("#shai").children().length==0){
        $("#shai").append(html)
    }else{
        $("#matchcount").text($(".matchname:visible").length)
    }

    $('#shai').css("top",$(".header").height())
    $(".mask").show().css("height",$(document).height())
})
$("#shai").on("click",".fivesai",function(){
    var sai=['英超','意甲','德甲','西甲','法甲']
    $("#shai li").removeClass("on")
    $("#shai ul li").each(function(){
        for(var i=0;i<sai.length;i++){
            if($(this).text().trim()==sai[i]){
                $(this).addClass("on")
            }
        }

    })
})
$("#shai").on("click",".allselect",function(){
    $("#shai li").addClass("on")
})
$("#shai").on("click",".fanselect",function(){
    $("#shai li").each(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on")
        }else{
            $(this).addClass("on")
        }
    })
})
$("#shai").on("click","li",function(){
    //if($(this).hasClass("on")){
    //    $(this).removeClass("on")
    // }else{
    //    $(this).addClass("on")
    // }
    $(this).toggleClass("on",1)
})
$("#shai").on("click",".shaiok",function(){

    $("#jmcp .borderTop").hide()


    $(".on","#shai").each(function(){
        var thtext=$(this).text()

        $("#jmcp .matchname").each(function(){

            if($(this).text()==thtext){
                $(this).parent().parent().parent().show()
            }
        })
    })
    $(".mask,#shai").hide()
})
var danguan=false//是否选中了单关
if(X.urlSearch('danguan')=='true'){
    danguan= X.urlSearch('danguan')
    $(".tabch li:eq(1)").addClass("select")
    $(".tabch li:eq(0)").removeClass("select")
    $(".nav ul li:eq(2)").hide()
    X.c.passWay=[]
    X.c.passWay.push('单关')
    typedan=1


}else{
    danguan=false
    $(".nav ul li:eq(2)").show()
    typedan=0

}
var dance=0//关于菜单滚动的一些细节调整
if(danguan=='true'){
    dance=0
    $('.menubg:eq(3)').css('border-left-width',1)
    $('.menubg:eq(4)').css('border-left-width',0)
}else{
    dance=$(document).width()
    $('.menubg:eq(3)').css('border-left-width',0)
}
if(pt!='a3'){
    $(".tabch li").click(function(){
        $(".tabch li").removeClass("select")
        if($(this).hasClass("select")){
            $(this).removeClass("select")
        }else{
            $(this).addClass("select")
        }

        if($(this).text().trim()=="单关"){
            X.c.passWay=[]
            X.c.passWay.push('单关')
            danguan=true
            $(".nav ul li:eq(2)").hide()
            typedan=1
            dance=0
            $('.menubg:eq(4)').css('border-left-width',0)
            window.location='competitive.html?pt='+ X.urlSearch('pt')+'&l='+ X.urlSearch('l')+'&danguan=true'
        }else{
            $(".nav ul li:eq(2)").show()
            X.c.passWay=[]
            danguan=false
            typedan=0
            dance=$(document).width()
            $('.menubg:eq(4)').css('border-left-width',1)
            window.location='competitive.html?pt='+ X.urlSearch('pt')+'&l='+ X.urlSearch('l')+'&danguan=false'
        }


    })
}


//菜单的滚动 显示详情
$(".tab").on("click",".leftpart",function(){
    var obj=$(this).parent().next();
    if(obj.is(":visible")){
        obj.animate({height:'0'},300).hide(50);
        $(this).find(".arrow").removeClass("arrow1")
    }else{
        obj.animate({height:'2.12rem'},300).show();
        $(this).find(".arrow").addClass("arrow1")
    }
})


//拖动菜单
    //$(".nav ul li").css("width",$(document).width()/3)
    //$(".nav ul").css("width",$(".nav ul li").width()*$(".nav ul li").length+10)

//var l=0
//
//$(".nav").swipe({
//    swipe:function(event, direction, distance, duration, fingerCount) {
//
//        if(direction=='left'&&$(".nav ul").offset().left+$(".nav ul").width()>$(".nav").offset().left+$(".nav").width()){
//            l=$(".nav ul").offset().left-$(".nav").width()
//
//            $(".ar-1").hide()
//            $(".ar-2").show()
//
//        }
//
//        if(direction=='right'&&$(".nav ul").offset().left<$(".nav").offset().left){
//            l=$(".nav ul").offset().left+$(".nav").width()
//            $(".ar-1").show()
//            $(".ar-2").hide()
//
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
//
//$(".nav ul").css({
//    "left":X.urlSearch('l')+"px"
//})
//if(X.urlSearch('l')==0){
//    $(".ar-1").show()
//    $(".ar-2").hide()
//}else{
//    $(".ar-1").hide()
//    $(".ar-2").show()
//}
//右上角的菜单
$("#menu").click(function(e){
    //if($("#rigmenu").is(":visible")){
    //    $("#rigmenu").fadeOut(300)
    //}else{
    //    $("#rigmenu").fadeIn()
    //}
    $(document).one('click',function(){
        $('#rigmenu').hide();
    });
    e.stopPropagation();
    $("#rigmenu").toggle()
})
$(".seltab").click(function(){
    $(".seltab").addClass("tabbg")
    $(this).removeClass("tabbg")
    $(".datasel").hide()
    $(".datasel:eq("+$(this).index()+")").show()
})
$(".cuan").bind('click',function(){
    var h=$(".opwin").height();
    if($(".opwin").is(":hidden")&& X.c.passWay[0]!='单关'){
        $(".mask").show()
        $(".opwin").show()
        $(".opwin").animate({
            "bottom":0
        },500)
    }
    //$('.mask').click(function(){
    //    $(this).hide();
    //    $('.opwin').hide();
    //    $(".opwin").animate({
    //        "bottom":-h
    //    },500)
    //})
})
$("#cancel").click(function(){
    var h=$(".opwin").height();
    if($(".opwin").is(":visible")){
        $(".mask").hide()
        $(".opwin").animate({
            "bottom":-h
        },function(){
            $(".opwin").hide()
        })
    }
})

$(".menubg1").bind('click',function(ev){
    ev.preventDefault();
    ev.stopPropagation()
    window.location='competitive.html?pt=a1&l=0&danguan='+danguan

})
$(".menubg2").bind('click',function(){
    window.location='competitive.html?pt=a4&l=0&danguan='+danguan

})
$(".menubg5").bind('click',function(){
    window.location='competitive.html?pt=a5&l=-'+$(document).width()+'&danguan='+danguan

})
$(".menubg4").bind('click',function(){
    window.location='competitive.html?pt=a2&l=-'+dance+'&danguan='+danguan
})
$(".menubg6").bind('click',function(){
    window.location='competitive.html?pt=a6&l=-'+$(document).width()+'&danguan='+danguan
})
$(".menubg3").bind('click',function(){
    window.location='competitive.html?pt=a3&l=0'
})
if(pt=='a1'){
    $(".menubg1").addClass("cur")
    $('#TName').html('胜平负')
}
if(pt=='a2'){
    $(".menubg4").addClass("cur")
    $('#TName').html('总进球')
}
if(pt=='a3'){
    $(".menubg3").addClass("cur")
    $('#TName').html('混合')
}
if(pt=='a4'){
    $(".menubg2").addClass("cur")
    $('#TName').html('让球胜平负')

}
if(pt=='a5'){
    $(".menubg5").addClass("cur")
    $('#TName').html('比分')
}
if(pt=='a6'){
    $(".menubg6").addClass("cur")
    $('#TName').html('半全场')
}
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





/**
 * Created by acer on 2015/9/24.
 */
(function($){
    var C={
        '2串1': {'2串1': 1},
        '3串1': {'3串1': 1},
        '3串3': {'2串1': 3},
        '3串4': {'3串1': 1,'2串1': 3},
        '4串1': {'4串1': 1},
        '4串4': {'3串1': 4},
        '4串5': {'4串1': 1,'3串1': 4},
        '4串6': {'2串1': 6},
        '4串11': {'4串1': 1,'3串1': 4,'2串1': 6},
        '5串1': {'5串1': 1},
        '5串5': {'4串1': 5},
        '5串6': {'5串1': 1,'4串1': 5},
        '5串10': {'2串1': 10},
        '5串16': {'5串1': 1,'4串1': 5,'3串1': 10},
        '5串20': {'2串1': 10,'3串1': 10},
        '5串26': {'5串1': 1,'4串1': 5,'3串1': 10,'2串1': 10},
        '6串1': {'6串1': 1},
        '6串6': {'5串1': 6},
        '6串7': {'6串1': 1,'5串1': 6},
        '6串15': {'2串1': 15},
        '6串20': {'3串1': 20},
        '6串22': {'6串1': 1,'5串1': 6,'4串1': 15},
        '6串35': {'2串1': 15,'3串1': 20},
        '6串42': {'6串1': 1,'5串1': 6,'4串1': 15,'3串1': 20},
        '6串50': {'2串1': 15,'3串1': 20,'4串1': 15},
        '6串57': {'6串1': 1,'5串1': 6,'4串1': 15,'3串1': 20,'2串1': 15},
        '7串1': {'7串1': 1},
        '7串7': {'6串1': 7},
        '7串8': {'6串1': 7,'7串1': 1},
        '7串21': {'5串1': 21},
        '7串35': {'4串1': 35},
        '7串120': {'2串1': 21,'3串1': 35,'4串1': 35,'5串1': 21,'6串1': 7,'7串1': 1},
        '8串1': {'8串1': 1},
        '8串8': {'7串1': 8},
        '8串9': {'7串1': 8,'8串1': 1},
        '8串28': {'6串1': 28},
        '8串56': {'5串1': 56},
        '8串70': {'4串1': 70},
        '8串247': {'2串1': 28,'3串1': 56,'4串1': 70,'5串1': 56,'6串1': 28,'7串1': 8,'8串1': 1}
    }
    var lotterId=''

    $.extend($.fn,{
        ajaxhtml:function(opt){//加载数据
            var def={
                bodynum:1,
                url:'lottery/basketBallData',
                lotteryId:'505',
                type:0
            }
            var getcan=$.extend(def,opt)
            var _thi=this
            // var htm={flag:1,matchData:[{deployTime:'2015-6-1',matchCount:5,matchInfo:[{leagueName:'英甲',teamId:'001',sellStopTime:'20150506210255',guestName:'A队',fu:'52',hostName:'B队',sheng:'55'}]},{deployTime:'2015-6-2',matchCount:5,matchInfo:[{leagueName:'英甲',teamId:'001',sellStopTime:'20150506210255',guestName:'A队',fu:'52',hostName:'B队',sheng:'55'}]}]}

            // _thi.append(bodynum1(htm))
            lotterId=getcan.lotteryId
            $.ajax({
                url:APP.url+getcan.url,
                data:{
                    version:APP.version,
                    requestType:APP.type,
                    lotteryId:getcan.lotteryId,
                    type:getcan.type
                },
                beforeSend: function(){X.load();},
                success:function(data){
                    X.unload();
                    if(getcan.bodynum==1){
                        _thi.append(bodynum1(data))
                    }else if(getcan.bodynum==2){
                        _thi.append(bodynum2(data))
                    }else if(getcan.bodynum==3){
                        _thi.append(bodynum3(data))
                    }else if(getcan.bodynum==4){
                        _thi.append(bodynum4(data))
                    }else{
                        _thi.append(bodynum5(data))
                    }
                },
                error:function(){
                    X.unload();
                    alert(APP.error.ajaxError);
                }
            })
        },
        select1:function(o){//高亮选择
            if(this.hasClass('ranf')||this.hasClass('ranf1')){

            }else{
                this.toggleClass('on')
            }


            if(count()==9){
                this.removeClass("on")
                popup('最多只能选择8场')
            }

            if($("#selectData").is(":visible")){
                var n=0
                $("#selectData .pul").each(function(){
                    if($(this).find(".on").length>0){
                        n+=1
                    }
                })
            }
            if(n==1&&o==0){
                this.addClass("on")
            }else if(n==0&&o==1){
                this.addClass("on")
            }
            $(".cho").text("已选择"+count()+"场")
            if(o==0&&count()>1){
                $(".midfo").text("我要购买")
            }else if(o==1&&count()>0){
                $(".midfo").text("我要购买")
            }else if((count()==1&&o==0)||(count()==0&&o==1)){
                $(".midfo").text("请选择比赛结果")
            }
            if($("#selectData").is(":visible")){
                if(o==0){

                    $("#cuan").text(reback()+'串1')
                    $("#money").text(zhushu('#selectData')*2*$(".intext").val())
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }
                }else{
                    $("#cuan").text("单关")
                    danguan()
                }


            }
        },
        clearall:function(){//清空选择
            $(".on").removeClass("on")
            $(".midfo").text("请选择比赛结果")
            $("#one").show()
            $("#selectData").hide()
            $(".cho").text('已选择0场')
        },
        zhedie:function(){//折叠
            if(this.next().is(":hidden")){
                this.next().show()
            }else{
                this.next().hide()
            }

        },
        buySelect:function(o){//所选择的场景 p表示哪一种玩法
            if(this.text()=='我要购买'){
                $("#one").hide();
                $("#selectData").show()
                $("#selecthtml").empty()
                var html='', titleH=$('#titleH');
                s_pt == 2 ? titleH.text('让分胜负') :
                    s_pt == 3 ? titleH.text('胜分差') :
                        s_pt == 4 ? titleH.text('大小分') :
                            s_pt == 5 ? titleH.text('混合投注') :
                                        titleH.text('胜负');
                if(s_pt==3){
                    for(var i=0;i<gethtml1().length;i++){
                        html+='<dl class="getshop"><dt class="dw1 pt4"><span class="dan">胆</span></dt>'
                        html+='<dd class="scroemain"><div class="pul">'+gethtml1()[i]+'</div></dd>'
                        html+='<dd class="dw1 pt10 fr pt4"><span class="delspan"></span></dd></dl> '
                    }
                }else if(s_pt == 5){
                    for(var i=0;i<gethtml().length;i++){
                        html+='<dl class="getshop"><dt class="dw1 pt5"><span class="dan">胆</span></dt>'
                        html+='<dd class="scroemain"><ul class="pul" style="margin-top:0;">'+gethtml()[i]+"</ul></dd>"
                        html+='<dd class="dw1 pt10 fr pt5"><span class="delspan"></span></dd></dl> '
                    }
                }else{
                    for(var i=0;i<gethtml().length;i++){
                        html+='<dl class="getshop"><dt class="dw1"><span class="dan">胆</span></dt>'
                        html+='<dd class="scroemain"><ul class="pul" style="margin-top:0;">'+gethtml()[i]+"</ul></dd>"
                        html+='<dd class="dw1 pt10 fr"><span class="delspan"></span></dd></dl> '
                    }
                }

                $("#selecthtml").empty().append(html)
                if(s_pt==5){
                    $(".selectdl dd").css({"background-size":"50%","margin-top":"5em"})
                }


                if(o==0){

                    $("#cuan").text(reback()+'串1')
                    $('#total').text((zhushu('#one')*2*$(".intext").val())/2);
                    $("#money").text(zhushu('#one')*2*$(".intext").val())
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }

                }else{
                    $("#cuan").text('单关')
                    danguan()
                }






            }else if(o==1&&this.text()!='我要购买'){
                popup('至少选择一场比赛')
            }else if(o==0&&this.text()!='我要购买'){
                popup("至少选择两场比赛")
            }
        },
        selectCuan:function(s) {//选择几串几串

            var html = ''
            html += '<div id="cuan1"><ul class="tabUl clear"><li class="selected">N串1</li><li >多串多</li></ul><ul class="mainbody clear">'
            for (var i = 0; i < getcuan(s).length; i++) {

                if (getcuan(s)[i].substr(getcuan(s)[i].lastIndexOf('串') + 1, 2) == 1) {
                    html += "<li>" + getcuan(s)[i] + "</li>"
                }
            }
            html += "</ul><ul class='mainbody clear'>"
            for (var j = 0; j < getcuan(s).length; j++) {
                if (getcuan(s)[j].substr(getcuan(s)[j].lastIndexOf('串') + 1, 2) > 1) {
                    html += "<li>" + getcuan(s)[j] + "</li>"
                }
            }
            html += '</ul><div class="btngroup"><span>取消</span><span class="green">确定</span></div></div>'
            if ($("#cuan1").length == 0) {
                $('body').append(html)
            } else if ($("#cuan1").length > 0) {
                $("#cuan1").remove()
                $('.mask').hide();
                $("body").append(html)
            }
            jizhu()
            $("#cuan1,.mask").show();
            $("#cuan1 .mainbody:eq(1)").hide()
            $("#cuan1").css("bottom", $("#cuan1").height() * -1)
            $("#cuan1").animate({
                "bottom": 0
            })
        },
        delsel:function(o){//o=0表标过关o=1表示单关

            if(o==0&&count1()==2&&this.parent().parent().find(".on").length!=0){
                popup("过关方式必须选择两场以上")
            }else if(o==1&&count1()==1&&this.parent().find(".on").length!=0){
                popup('单关方式必须选择一场以上')
            }else{
                this.parent().parent().remove()
                var n=0
                $("#selectData .pul").each(function(){
                    if($(this).find(".on").length>0){
                        n+=1
                    }
                })
                console.log($(".lview").hasClass("on"))
                if(n>8&&s_pt!=3){
                    n=8
                }else if((n>4&&s_pt==3)||(n>4&&s_pt==5&&$(".lview").hasClass("on"))){
                    n=4
                }
                $("#cuan").text(n+"串1")
                $('#total').text((zhushu('#selectData')*2*$(".intext").val())/2);
                $("#money").text(zhushu('#selectData')*2*$(".intext").val())
                if(s_pt==5){
                    hunheprice()
                }else{
                    computeprice()
                }

            }

        },
        add:function(){
            if(parseInt($(".intext").val())<1000){
                $(".intext").val(parseInt($(".intext").val())+1)
                ZQ.muliptile=$(".intext").val()
                $("#money").text(zhushu('#selectData')*2*ZQ.muliptile)
                if(s_type==0){
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }
                }else{
                    danguan()
                }


            }else{
                popup('输入的倍数不能超过1000')
            }

        },
        substra:function(){
            if(parseInt($(".intext").val())>1){
                $(".intext").val(parseInt($(".intext").val())-1)
                ZQ.muliptile=$(".intext").val()
                $("#money").text(zhushu('#selectData')*2*ZQ.muliptile)
                if(s_type==0){
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }
                }else{
                    danguan()
                }
            }else{
                popup('输入的倍数不能小于1')
            }

        },
        checkinput:function(){
            var t=/^[1-9][0-9]*$/
            if(t.test(this.val())==false||t.test(this.val())=='false'){
                this.val(1)
                ZQ.muliptile=this.val()
                $("#money").text(zhushu('#selectData')*2*ZQ.muliptile)
                gusuan()
            }else if(this.val()>=9999){
                this.val(9999)
                ZQ.muliptile=this.val()
                $("#money").text(zhushu('#selectData')*2*ZQ.muliptile)
                gusuan()
            }else{
                ZQ.muliptile=this.val()
                $("#money").text(zhushu('#selectData')*2*ZQ.muliptile)
                if(s_type==0){
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }
                }else{
                    danguan()
                }
            }
        },
        view:function(){
            var _thi=this
            $(".openwin").each(function(){
                if($(this).attr("matchcode")==_thi.attr('matchcode')){
                    $(this).show()
                    $(this).css({"left":($(document).width()-$(this).width())/2,"top":$(document).scrollTop()+($(window).height()-$(this).height())/2})
                    $("body").append("<div id='mask'></div>")
                    $("#mask").show()
                    $("#mask").css("height",$(document).height())
                }
            })
        },
        viewok:function(o){
            var s='', arr=[],score=[],datas=[],sval=[]
            $(".openwin:visible .sfeng").each(function(index){
                s=''
                $(".on",this).each(function(){
                    s=''
                    if(index==0){
                        s+='客胜'
                    }else{
                        s+='主胜'
                    }
                    s+=$("p:eq(0)",this).text()
                    arr.push(s)
                    score.push($("p:eq(1)",this).text())
                    datas.push($(this).attr("data-s"))
                    sval.push($(this).attr("value"))
                })
            })
            $(".view").each(function(){
                if($(this).attr("matchcode")==$(".openwin:visible").attr("matchcode")){
                    var s= 0,stm='';
                    for(var i=0;i<arr.length;i++){
                        if(s_pt == 5){
                            s++;
                        }else{
                            stm+=arr[i]+' ';
                        }
                    }
                    if(s == 0 && stm == ''){
                        s_pt == 5 ? $(this).html('展开</br>全部').addClass('on') : $(this).html('点击查看投注详情').addClass('on')
                        $(this).removeClass("on")
                        $(this).removeAttr("score")
                        $(this).removeAttr("data-s")
                        $(this).removeAttr("value")
                    }else{
                        s_pt==5 ? $(this).html('已选'+s+'项').addClass('on') : $(this).html(stm).addClass('on')
                        $(this).attr("score",score)
                        $(this).attr("data-s",datas)
                        $(this).attr("value",sval)
                    }

                }
            })
            $(".openwin:visible").hide()
            $(".mask").hide()
            var len=$("#one .on").length
            if($("#selectData").is(":visible")){
                if(s_type==0){

                    $("#cuan").text(reback()+'串1')
                    $("#money").text(zhushu('#selectData')*2*$(".intext").val())
                    if(s_pt==5){
                        hunheprice()
                    }else{
                        computeprice()
                    }
                }else{
                    danguan()
                }

            }
            $(".cho").text("已选择"+count()+"场")
            if(o==0&&len>1){
                $(".midfo").text('我要购买')
            }else if(o==1&&len>0){
                $(".midfo").text('我要购买')
            }else{
                $(".midfo").text('请选择比赛结果')
            }


        },
        submitform:function(strurl,title){//提交方案
            var m=[],chipinNums='',manner=[]
            if(s_pt==4||s_pt==2){
                chipinNums=largescore()
            }else if(s_pt==5){
                chipinNums=tjdata()
            }else{
                for(var o in getsch()){
                    chipinNums+=o+','+getsch()[o].sf.join('/')+',0//'
                }
            }
            manner=getPassWayCode($("#cuan").text().split(","))

            var data={
                muliptile:ZQ.muliptile,
                issue:'unknow',
                money:$("#money").text(),
                openusers:'all',
                isopen:'2',
                isUpload:'0',
                moneyFw:'0-0',
                info:'',
                copies:$("#money").text(),
                eachPrice:1,
                hmfaType:1,
                payofftc:0,
                betcopies:$("#money").text(),
                current:1,
                version:APP.version,
                requestType:APP.type,
                chipinNums:chipinNums.substr(0,chipinNums.length-2),
                manner:manner.join(","),
                spvalue:ZQ.spzValue,
                lotteryId:lotterId,
                ensures:0,
                description:'此单太绝，跟单必盈',
                title:title
            }
            $.ajax({
                url:APP.url+strurl,
                data:data,
                beforeSend: function(){X.load();},
                success:function(data){
                    X.unload();
                    if(data.flag==-1){
                        X.user.signIn();
                        submitPD=true
                    }else if(data.flag==1){

                        location.href="success.html?serialNo="+data.serialNo+"&url=basketball.html";

                    }else{
                        alert(data.errorMessage);
                        submitPD=true
                    }
                },
                error:function(){
                    X.unload();
                    alert(APP.error.ajaxError);
                    submitPD=true
                }
            })
        }

    })
    function reback(){
        var pdx=false
        $(".lview").each(function(){
            if($(this).hasClass("on")){
                pdx=true
            }
        })
        var lx=0
        if(($(".getshop .pul").length>4&&s_pt==3)||(s_pt==5&&pdx==true&&$(".getshop .pul").length>4)){
            lx=4
        }else if($(".getshop .pul").length>8&&s_pt!=3){
            lx=8
        }else{
            lx=$(".getshop .pul").length;
        }
        return lx
    }
    $(document).on("click","#cuan1 .mainbody li",function(){
        $(this).toggleClass("redsel")
    })
    $(document).on("click",".tabUl li",function(){
        $(".mainbody").hide()
        $(".tabUl li").removeClass("selected")
        $(".mainbody:eq("+$(this).index()+")").show()
        $(this).addClass("selected")
    })

    $(document).on("click",".btngroup span:eq(1)",function(event){
        event.stopPropagation()
        var s='',x=0
        $(".redsel").each(function(index){
            if(index==$('.redsel').length-1){
                s+=$(this).text()
            }else{
                s+=$(this).text()+","
            }
            x+=1

        })
        if(x>5){
            popup('最多只能选择5个串关')
            return false
        }else if(x==0){
            popup('至少选择一个串关')
            return false
        }
        $("#cuan").text(s)
        $("#total").text((zhushu('#selectData')*2*$(".intext").val())/2)
        $("#money").text(zhushu('#selectData')*2*$(".intext").val())

        if(s_pt==5){
            hunheprice()
        }else{
            computeprice()
        }
        //window.setTimeout(function(){$("#cuan1,#mask").hide(500)},300)
        cuanpopup()

    })
    $(document).on("click",".btngroup span:eq(0)",function(event){
        event.stopPropagation();
        cuanpopup();
    })

    //单关的注数与奖金计算
    function danguan(){
        var zhushu=$("#selectData .on").length
        $("#money").text(zhushu*2*ZQ.muliptile)
        var m=[],max= 0,l=0

        $("#selectData .on").each(function(){
            if(s_pt==3){
                l+= $(this).text().trim().split(" ").length
                $("#money").text(l*2*ZQ.muliptile)
                var a=$(this).attr("score").split(",")
                for(var j=0;j< a.length;j++){
                    m.push(a[j])
                    max+=a[j]*2
                }
            }else{
                m.push($(this).find("span").text())
                max+=($(this).find("span").text()*2)
            }
        })

        $("#minprize").text((min(m)*2*ZQ.muliptile).toFixed(2))
        $("#maxprize").text((max*ZQ.muliptile).toFixed(2))
    }
    function getPassWayCode(a){
        var r=[]
        var K={"单关":"1","2串1":"2","3串1":"3","3串3":"4","3串4":"5","4串1":"6","4串4":"7", "4串5":"8", "4串6":"9", "4串11":"10","5串1":"11","5串5":"12","5串6":"13","5串10":"14","5串16":"15","5串20":"16","5串26":"17","6串1":"18","6串6":"19","6串7":"20","6串15":"21","6串20":"22","6串22":"23","6串35":"24","6串42":"25","6串50":"26","6串57":"27","7串1":"28","7串7":"29","7串8":"30","7串21":"31","7串35":"32","7串120":"33","7串127":"34","8串1":"35","8串8":"36","8串9":"37","8串28":"38","8串56":"39","8串70":"40","8串247":"41","3串255":"42"},i=0,len=a.length,r=[];
        for(var o in K){
            for(var i=0;i< a.length;i++){
                if(o==a[i]){
                    r.push(K[o])
                }
            }

        }
        return r;
    }
    //获取一些信息存入到json里
    function getsch(){
        ZQ.spzValue=''
        var r=[],n=-1,sf=[],no=[],s
        var sch={}//存放数据，用以提交
        var label=""
        if(s_pt==3){
            label="div"
        }else{
            label="li"
        }

        $("#selectData .pul").each(function(){
            if($(this).find(".on").length>0){
                n+=1
                r[n]=new Array()
                sf[n]=new Array()
                if(label=='div'){
                    no.push($(this).find(label).attr("matchcode"))
                }else{
                    no.push($(this).find(label).attr("no"))
                }

                var _thi=$(this)

                $(label,this).each(function(){
                    if($(this).hasClass("on")) {
                        if (label == "li") {

                            r[n].push($(this).attr("score"))
                            s=$(this).attr("value")
                            sf[n].push(s)
                        } else {

                            for (var i = 0; i < $(this).attr("score").split(",").length; i++) {
                                r[n].push($(this).attr("score").split(",")[i])
                            }

                            for (var j = 0; j < $(this).text().trim().split(" ").length; j++) {

                                if ($(this).text().trim().split(" ")[j]=="客胜1-5") {
                                    s = '01'
                                } else if($(this).text().trim().split(" ")[j]=="客胜6-10") {
                                    s = '02'
                                }else if($(this).text().trim().split(" ")[j]=="客胜11-15"){
                                    s='03'
                                }else if($(this).text().trim().split(" ")[j]=="客胜16-20"){
                                    s='04'
                                }else if($(this).text().trim().split(" ")[j]=="客胜21-25"){
                                    s='05'
                                }else if($(this).text().trim().split(" ")[j]=="客胜26+"){
                                    s='06'
                                }else if($(this).text().trim().split(" ")[j]=="主胜1-5"){
                                    s='51'
                                }else if($(this).text().trim().split(" ")[j]=="主胜6-10"){
                                    s='52'
                                }else if($(this).text().trim().split(" ")[j]=="主胜11-15"){
                                    s='53'
                                }else if($(this).text().trim().split(" ")[j]=="主胜16-20"){
                                    s='54'
                                }else if($(this).text().trim().split(" ")[j]=="主胜21-25"){
                                    s='55'
                                }else if($(this).text().trim().split(" ")[j]=="主胜26+"){
                                    s='56'
                                }

                                sf[n].push(s)
                            }

                        }
                    }
                })
            }
        })

        for(var i=0;i<no.length;i++){
            sch[no[i]]=no[i]
            sch[no[i]]={
                scroe:r[i],
                sf:sf[i]
            }
        }
        var sx=''
        for(var i=0;i<no.length;i++){
            sx+=no[i]+','+r[i].join('/')+',0//'
        }
        ZQ.spzValue=sx.substr(0,sx.length-2)
        return sch
    }
    //根据大小分获取要提交的数据
    function largescore(){
        ZQ.spzValue=''
        var r=[],index=-1,no=[],z=[],choose=[]
        $("#selectData .pul").each(function(){
            var _thi=$(this)
            if($(this).find(".on").length>0){
                index+=1
                r[index]=new Array()
                choose[index]=new Array()
                no.push($("li:eq(0)",this).attr("no"))
                z.push($("li:eq(1) .fon",this).text())
                $("li",_thi).each(function(i){
                    if($(this).hasClass("on")){
                        r[index].push($("p:eq(1)",this).find(".fon").text())
                        if(i==0&&s_pt==4){
                            i=1
                        }
                        if(i==2&&s_pt==2){
                            i=1
                        }
                        choose[index].push(i)
                    }
                })
            }
        })
        var ch=''
        for(var i=0;i<no.length;i++){
            ZQ.spzValue+=no[i]+","
            for(var j=0;j< r[i].length;j++){
                ZQ.spzValue+=z[i]+";"
                if(j==r[i].length-1){
                    ZQ.spzValue+=r[i][j]+',0//'
                }else{
                    ZQ.spzValue+=r[i][j]+'/'
                }
            }
            ch+=no[i]+","+choose[i].join('/')+",0//"


        }
        ZQ.spzValue=ZQ.spzValue.substr(0,ZQ.spzValue.length-2)
        return ch
    }
    function computeprice(){//计算奖金
        spArr=[]
        ZQ.spzValue=''
        ggWay=[]
        var cuan=$("#cuan").text().trim().split(",")
        var label=''
        if(s_pt==3){
            label='div'
        }else{
            label='li'
        }
        for(var k=0;k<cuan.length;k++){
            ggWay.push(cuan[k].replace('串','-'))
        }
        var obj=[]
        var no=[]
        var so=-1
        $("#selectData .pul").each(function(index){
            var _thi=$(this)
            if(_thi.find(".on").length>0){
                so+=1
                obj[so]=new Array()
                if(label=="li"){
                    no.push(_thi.find(label).attr("no"))
                }else{
                    no.push(_thi.find(label).attr("matchcode"))
                }



                $(label,this).each(function(){
                    if($(this).hasClass("on")) {
                        if (label == "li") {
                            obj[so].push($(this).attr("score"))
                        } else {
                            for (var i = 0; i < $(this).attr("score").split(",").length; i++) {
                                obj[so].push($(this).attr("score").split(",")[i])
                            }
                        }
                    }
                })
            }
        })

        for(var i=0;i<obj.length;i++){
            var g=obj[i].sort(function(a,b){return a-b})
            spArr.push(g)
            ZQ.spzValue+=no[i]+","
            ZQ.spzValue+= g.join('/')+",0//"
        }

        gusuan()
    }
    //计算注数
    function zhushu(o){//o指的是哪个界面的ID p==1表示胜负差的界面
        var tuo=[],num=0

        if(s_pt==3){
            $(o+" .on").each(function(){
                var d=$(this).text().trim().split(" ")
                tuo.push(d.length)
            })
        }else if(s_pt==5){
            $(o+" .pul").each(function(){
                var _thi=$(this)
                if($(this).find(".on").length>0){
                    var l=$(".WFshengfu .on",_thi).length
                    var d=$(".view",_thi).text().trim().split(" ").length;
                    tuo.push(l+d)
                }
            })
        }else{
            $(o+' .pul').each(function(){
                if($(this).find(".on").length>0){
                    tuo.push($(this).find(".on").length)
                }
            })
        }

        var c=$("#cuan").text().trim().split(",")
        var zhushu=0
        for(var i=0;i< c.length;i++){
            var pt=c[i].replace('串','-')
            zhushu += parseInt(myCalc(pt,'1',tuo,[],0,0))
        }
        return zhushu
    }
    function jizhu(){
        var c=$("#cuan").text().split(",")
        for(var i=0;i< c.length;i++){
            $(".mainbody li").each(function(){
                if($(this).text().trim()==c[i].trim()){
                    $(this).addClass("redsel")
                }
            })
        }
    }
    //得到串
    function getcuan(s){
        var d=[]
        for(var k in C){
            if(k.substr(0, k.lastIndexOf('串'))<=s){
                d.push(k)
            }
        }
        return d;
    }
    function gethtml(){//style表示第几种页面样式
        var html=[]

        $(".pul").each(function(){
            if($(this).find(".on").length>0){
                html.push($(this).html())
            }
        })

        return html;
    }
    //胜分差
    function gethtml1(){
        var html=[]
        $("#one .on").each(function(){
            html.push($(this).parent().html())
        })
        return html;
    }
    //胜负
    function bodynum1(data){
        var html=''

        if(data.flag==1){
            for(var i=0;i<data.matchData.length;i++){

                html+='<div class="tit"><span class="fl">'+data.matchData[i].deployTime+'</span><span>'+data.matchData[i].matchCount+'场比赛可投注</span></div><div class="main">'
                for(var j=0;j<data.matchData[i].matchInfo.length;j++){
                    html+='<section class="auto pt1" ><dl class="clear"><dt class="matchname"><p class="mt15">'+data.matchData[i].matchInfo[j].leagueName+'</p>'
                    html+=' <p class="red fon">'+data.matchData[i].matchInfo[j].teamId+'</p><p class="gray"><span class="fon"> '
                    var t=data.matchData[i].matchInfo[j].sellStopTime
                    html+= t.substr(8,2)+":"+ t.substr(10,2)+'</span>截止</p></dt><dd class="scroemain"><ul class="pul" ><li score="'+data.matchData[i].matchInfo[j].fu+'" no="'+data.matchData[i].matchInfo[j].matchCode+'" value="0"><p>'
                    html+='(客)'+data.matchData[i].matchInfo[j].guestName+'</p><p class="gray"><em class="sf">主负</em><span class="fon">'+fmoney(data.matchData[i].matchInfo[j].fu,2)+'</span></p></li>'
                    html+= '<li class="border-left noborder" value="1" score="'+fmoney(data.matchData[i].matchInfo[j].sheng,2)+'" no="'+data.matchData[i].matchInfo[j].matchCode+'"><p>(主)'+data.matchData[i].matchInfo[j].hostName+'</p><p class="gray"><em class="sf">主胜</em><span class="fon">'+data.matchData[i].matchInfo[j].sheng+'</span></p></li></ul></dd></dl></section>'

                }
                html+="</div>"
            }

        }
        return html
    }
    //让分胜负
    function bodynum2(data){
        var html='',rangfen=''

        if(data.flag==1){
            for(var i=0;i<data.matchData.length;i++){

                html+='<div class="tit"><span class="fl">'+data.matchData[i].deployTime+'</span><span>'+data.matchData[i].matchCount+'场比赛可投注</span></div><div class="main">'
                for(var j=0;j<data.matchData[i].matchInfo.length;j++){
                    html+='<section class="auto pt1" ><dl class="clear"><dt class="matchname"><p class="mt15">'+data.matchData[i].matchInfo[j].leagueName+'</p>'
                    html+=' <p class="red fon">'+data.matchData[i].matchInfo[j].teamId+'</p><p class="gray"><span class="fon"> '
                    var t=data.matchData[i].matchInfo[j].sellStopTime
                    html+= t.substr(8,2)+":"+ t.substr(10,2)+'</span>截止</p></dt><dd class="scroemain"><ul class="pul" ><li class="adjli" score="'+data.matchData[i].matchInfo[j].rffu+'" no="'+data.matchData[i].matchInfo[j].matchCode+'"><p>'
                    html+='(客)'+data.matchData[i].matchInfo[j].guestName+'</p><p class="gray"><em class="sf">主负</em><span class="fon">'+fmoney(data.matchData[i].matchInfo[j].rffu,2)+'</span></p></li>'
                    if(data.matchData[i].matchInfo[j].rangFen>0){
                        rangfne='<em class="red fon">+'+fmoney(data.matchData[i].matchInfo[j].rangFen,2)+'</em>'
                    }else{
                        rangfne='<em class="green fon">'+fmoney(data.matchData[i].matchInfo[j].rangFen,2)+'</em>'
                    }
                    html+='<li class="noborder ranf adjbg"><em>'+rangfne+'</em></li>'
                    html+= '<li class="border-left noborder adjli" score="'+data.matchData[i].matchInfo[j].rfsheng+'" no="'+data.matchData[i].matchInfo[j].matchCode+'"><p>(主)'+data.matchData[i].matchInfo[j].hostName+'</p><p class="gray"><em class="sf">主胜</em><span class="fon">'+fmoney(data.matchData[i].matchInfo[j].rfsheng,2)+'</span></p></li></ul></dd></dl></section>'

                }
                html+="</div>"
            }

        }
        return html
    }
    //胜分差
    function bodynum3(data){
        var html='',opwin=''
        if(data.flag==1){
            for(var i=0;i<data.matchData.length;i++){
                html+='<div class="tit"><span class="fl">'+data.matchData[i].deployTime+'</span><span>'+data.matchData[i].matchCount+'场比赛可投注</span></div><div class="main">'
                for(var j=0;j<data.matchData[i].matchInfo.length;j++){
                    html+='<section class="auto pt1" ><dl class="clear"><dt class="matchname"><p class="mt15">'+data.matchData[i].matchInfo[j].leagueName+'</p>'
                    html+=' <p class="red fon">'+data.matchData[i].matchInfo[j].teamId+'</p><p class="gray"><span class="fon"> '
                    var t=data.matchData[i].matchInfo[j].sellStopTime
                    html+= t.substr(8,2)+":"+ t.substr(10,2)+'</span>截止</p></dt><dd class="scroemain"><ul class="dui"><li>(客)'+data.matchData[i].matchInfo[j].guestName+'</li><li class="sm">VS</li><li>(主)'+data.matchData[i].matchInfo[j].hostName+'</li></ul>'
                    html+='<div class="view viewSfc" matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">点击查看投注详情</div></dd></dl></section>'

                    opwin+='<div class="openwin" matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">' +
                        '<div class="titwin"><span>(客)'+data.matchData[i].matchInfo[j].guestName+'</span><span class="mlr">VS</span>(主)'+data.matchData[i].matchInfo[j].hostName+'</div>'+

                        '<div class="clear top2"><ul class="sfeng clear">' +
                        '<li class="tit_n cor4">客胜</li>'
                    var feng=data.matchData[i].matchInfo[j].singleSfcSp.split("|")
                    opwin+='<li class="noborder"><p class="fon">1-5</p><p class="gray fon">'+fmoney(feng[6],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">6-10</p><p class="gray fon">'+fmoney(feng[7],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">11-15</p><p class="gray fon">'+fmoney(feng[8],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">16-20</p><p class="gray fon">'+fmoney(feng[9],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">21-25</p><p class="gray fon">'+fmoney(feng[10],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">26+</p><p class="gray fon">'+fmoney(feng[11],2)+'</p></li></ul>'
                    opwin+= '<ul class="sfeng">' +
                        '<li class="tit_n cor5">主胜</li>' +
                        '<li class="noborder" ><p class="fon">1-5</p><p class="gray fon">'+fmoney(feng[0],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">6-10</p><p class="gray fon">'+fmoney(feng[1],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">11-15</p><p class="gray fon">'+fmoney(feng[2],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">16-20</p><p class="gray fon">'+fmoney(feng[3],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">21-25</p><p class="gray fon">'+fmoney(feng[4],2)+'</p></li>' +
                        '<li class="noborder"><p class="fon">26+</p><p class="gray fon">'+fmoney(feng[5],2)+'</p></li></ul></div>'

                    opwin+= '<section class="sediv textc"><a href="javascript:;" class="mr20 btn1x">取消</a>' + '<a href="javascript:;" class="commBac btn2x">确定</a>' + '</section></div>'
                }
                html+="</div>"
            }
            $('body').append(opwin)
        }
        return html
    }
    //大小分
    function bodynum4(data){
        var html='',rangfen=''

        if(data.flag==1){
            for(var i=0;i<data.matchData.length;i++){

                html+='<div class="tit"><span class="fl">'+data.matchData[i].deployTime+'</span><span>'+data.matchData[i].matchCount+'场比赛可投注</span></div><div class="main">'
                for(var j=0;j<data.matchData[i].matchInfo.length;j++){
                    html+='<section class="auto sbor" ><dl class="mt2"><dt class="matchname"><p>'+data.matchData[i].matchInfo[j].leagueName+'</p>'
                    html+=' <p class="gray fon">'+data.matchData[i].matchInfo[j].teamId+'</p><p class="gray"><span class="fon"> '
                    var t=data.matchData[i].matchInfo[j].sellStopTime
                    html+= t.substr(8,2)+":"+ t.substr(10,2)+'</span>截止</p></dt><dd class="scroemain"><ul class="pul" ><li class="adjli" score="'+fmoney(data.matchData[i].matchInfo[j].d,2)+'" no="'+data.matchData[i].matchInfo[j].matchCode+'"><p>'
                    html+='(客)'+data.matchData[i].matchInfo[j].guestName+'</p><p class="gray"><em class="sf">大分</em><span class="fon">'+fmoney(data.matchData[i].matchInfo[j].d,2)+'</span></p></li>'

                    html+='<li class="noborder ranf adjbg" score="'+fmoney(data.matchData[i].matchInfo[j].basePoint,2)+'"><em  class="blue fon">'+fmoney(data.matchData[i].matchInfo[j].basePoint,2)+'</em></li>'
                    html+= '<li class="border-left noborder adjli" score="'+data.matchData[i].matchInfo[j].x+'" no="'+data.matchData[i].matchInfo[j].matchCode+'"><p>(主)'+data.matchData[i].matchInfo[j].hostName+'</p><p class="gray"><em class="sf">小分</em><span class="fon">'+fmoney(data.matchData[i].matchInfo[j].x,2)+'</span></p></li></ul></dd></dl></section>'
                    html+='<section class="clearfix"></section>'

                }
                html+="</div>"
            }

        }
        return html
    }
    //混合
    function bodynum5(data){
        var html='',opwin=''
        if(data.flag==1){
            for(var i=0;i<data.matchData.length;i++){
                html+='<div class="tit"><span class="fl">'+data.matchData[i].deployTime+'</span><span>'+data.matchData[i].matchCount+'场比赛可投注</span></div><div class="main">'
                for(var j=0;j<data.matchData[i].matchInfo.length;j++){
                    var t=data.matchData[i].matchInfo[j].sellStopTime
                    html+='<section class="auto pt1" >' +
                        '<dl class="clear">' +
                        '<dt class="matchname">' +
                        '<p>'+data.matchData[i].matchInfo[j].leagueName+'</p>' +
                        '<p class="red fon">'+data.matchData[i].matchInfo[j].teamId+'</p>' +
                        '<p class="gray"><span class="fon">'+t.substr(8,2)+":"+ t.substr(10,2)+'</span>截止</p></dt>'
                    html+='<dd class="scroemain pul">' +
                        '<ul class="dui">' +
                        '<li class="ranf1">(客)'+data.matchData[i].matchInfo[j].guestName+'</li>' +
                        '<li class="sm ranf1">VS</li>' +
                        '<li class="ranf1">(主)'+data.matchData[i].matchInfo[j].hostName+'</li></ul>'
                    html+='<ul class="WFshengfu WF"  matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">' +
                        '<li class="sgz adjsgz noborderbottom orgbg ranf1">非让分</li>' +
                        '<li class="noborder noborderbottom gray" data-s="t1" data-gamenum="505" value="0">主负<span class="fon">'+fmoney(data.matchData[i].matchInfo[j].fu,2)+'</span></li>' +
                        '<li class="noborder noborderbottom gray" data-s="t2" data-gamenum="505" value="1">主胜<span class="fon">'+data.matchData[i].matchInfo[j].sheng+'</span></li></ul>'
                    var rangfne='';
                    if(fmoney(data.matchData[i].matchInfo[j].rangFen,2)>0){
                        rangfen='<em class="red">+'+fmoney(data.matchData[i].matchInfo[j].rangFen,2)+'</em>'
                    }else{
                        rangfen='<em class="green">'+fmoney(data.matchData[i].matchInfo[j].rangFen,2)+'</em>'
                    }
                    html+='<ul class="WFshengfu WF"  matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">' +
                        '<li class="sgz yellowbg ranf1">让分</li>' +
                        '<li class="noborder  gray" data-s="t3" data-gamenum="506" value="0D">主负<span class="fon">'+fmoney(data.matchData[i].matchInfo[j].rffu,2)+'</span></li>' +
                        '<li class="noborder  ranf1 adjw fon red">'+rangfen+'</li>' +
                        '<li class="noborder  gray" data-s="t4" data-gamenum="506" value="1D">主胜<span class="fon">'+fmoney(data.matchData[i].matchInfo[j].rfsheng,2)+'</span></li></ul>'

                    //大小分移除外部
                    //html+='<ul class="WFshengfu WF"  matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">' +
                    //    '<li class="sgz noborderbottom bluebg1 ranf1">大<br>小<br>分</li>' +
                    //    '<li class="noborder noborderbottom gray" data-s="t5" data-gamenum="508" value="1B">大分<span class="fon">'+fmoney(data.matchData[i].matchInfo[j].d,2)+'</span></li>' +
                    //    '<li class="noborder noborderbottom ranf1 adjw fon blue">'+fmoney(data.matchData[i].matchInfo[j].basePoint,2)+'</li>' +
                    //    '<li class="noborder noborderbottom gray" data-s="t6" data-gamenum="508" value="2B">小分<span class="fon">'+fmoney(data.matchData[i].matchInfo[j].x,2)+'</span></li></ul><div class="cha bluebg2">胜分差</div>'
                    html+='<div class="view lview WF" data-gamenum="507" matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">展开</br>全部</div></dd></dl></section>'

                    opwin+='<div class="openwin" matchcode="'+data.matchData[i].matchInfo[j].matchCode+'">' +
                        '<div class="titwin"><span>(客)'+data.matchData[i].matchInfo[j].guestName+'</span><span class="mlr">VS</span>(主)'+data.matchData[i].matchInfo[j].hostName+'</div>'
                    opwin+='<div class="clear top2"<div class="clear fl wid95"><ul class="ulDxf sfeng clear">' +
                        '<li class="tit_n cor1">大小分</li>'+
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;height:1rem;line-height: 1rem;" data-s="t5" data-gamenum="508" value="1B"><em class="emli">大分</em><span class="grey emli fon fon1">'+fmoney(data.matchData[i].matchInfo[j].d,2)+'</span></li>' +
                        '<li class="ranf1 blue">'+fmoney(data.matchData[i].matchInfo[j].basePoint,2)+'</li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;height:1rem;line-height: 1rem;" data-s="t6" data-gamenum="508" value="2B"><em class="emli">小分</em><span class="grey emli fon fon1">'+fmoney(data.matchData[i].matchInfo[j].x,2)+'</span></li>' +
                        '</ul>' +
                        '</div>'
                    var feng=data.matchData[i].matchInfo[j].singleSfcSp.split("|")
                    opwin+='<div class="clear top2"><ul class="sfeng clear">' +
                        '<li class="tit_n cor2">客胜</li>'+
                        '<li class="hhzjqli" data-s="t7" value="01"><em class="emli">1-5</em><span class="grey emli fon fon1">'+fmoney(feng[6],2)+'</span></li>' +
                        '<li class="hhzjqli" data-s="t8" value="02"><em class="emli">6-10</em><span class="grey emli fon fon1">'+fmoney(feng[7],2)+'</span></li>' +
                        '<li class="hhzjqli" data-s="t9" value="03"><em class="emli">11-15</em><span class="grey emli fon fon1">'+fmoney(feng[8],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t10" value="04"><em class="emli">16-20</em><span class="grey emli fon fon1">'+fmoney(feng[9],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t11" value="05"><em class="emli">21-25</em><span class="grey emli fon fon1">'+fmoney(feng[10],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t12" value="06"><em class="emli">26+</em><span class="grey emli fon fon1">'+fmoney(feng[11],2)+'</span></li>' +
                        '</ul>' +
                        '</div>'
                    //
                    //opwin+='<li class="noborder" data-s="t7" value="01"><p class="fon">1-5</p><p class="gray fon">'+fmoney(feng[6],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t8" value="02"><p class="fon">6-10</p><p class="gray fon">'+fmoney(feng[7],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t9" value="03"><p class="fon">11-15</p><p class="gray fon">'+fmoney(feng[8],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t10" value="04"><p class="fon">16-20</p><p class="gray fon">'+fmoney(feng[9],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t11" value="05"><p class="fon">21-25</p><p class="gray fon">'+fmoney(feng[10],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t12" value="06"><p class="fon">26+</p><p class="gray fon">'+fmoney(feng[11],2)+'</p></li>'
                    opwin+='<div class="clear top2"><ul class="sfeng clear">' +
                        '<li class="tit_n cor3">主胜</li>'+
                        '<li class="hhzjqli" data-s="t13" value="51"><em class="emli">1-5</em><span class="grey emli fon fon1">'+fmoney(feng[0],2)+'</span></li>' +
                        '<li class="hhzjqli" data-s="t14" value="52"><em class="emli">6-10</em><span class="grey emli fon fon1">'+fmoney(feng[1],2)+'</span></li>' +
                        '<li class="hhzjqli" data-s="t15" value="53"><em class="emli">11-15</em><span class="grey emli fon fon1">'+fmoney(feng[2],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t16" value="54"><em class="emli">16-20</em><span class="grey emli fon fon1">'+fmoney(feng[3],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t17" value="55"><em class="emli">21-25</em><span class="grey emli fon fon1">'+fmoney(feng[4],2)+'</span></li>' +
                        '<li class="hhzjqli" style="border-bottom:1px solid #c9c9c9;" data-s="t18" value="56"><em class="emli">26+</em><span class="grey emli fon fon1">'+fmoney(feng[5],2)+'</span></li>' +
                        '</ul>' +
                        '</div>'

                    //opwin+='<ul class="sfeng">' +
                    //    '<li class="redbg">主<br>胜</li>' +
                    //    '<li class="noborder" data-s="t13" value="51"><p class="fon">1-5</p><p class="gray fon">'+fmoney(feng[0],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t14" value="52"><p class="fon">6-10</p><p class="gray fon">'+fmoney(feng[1],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t15" value="53"><p class="fon">11-15</p><p class="gray fon">'+fmoney(feng[2],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t16" value="54"><p class="fon">16-20</p><p class="gray fon">'+fmoney(feng[3],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t17" value="55"><p class="fon">21-25</p><p class="gray fon">'+fmoney(feng[4],2)+'</p></li>' +
                    //    '<li class="noborder" data-s="t18" value="56"><p class="fon">26+</p><p class="gray fon">'+fmoney(feng[5],2)+'</p></li>'</ul>'
                    opwin+= '<section class="sediv textc"><a href="javascript:;" class="mr20 btn1x">取消</a>' + '<a href="javascript:;" class="commBac btn2x">确定</a>' + '</section></div>'
                }
                html+="</div>"
            }
            $('body').append(opwin)
        }
        return html
    }
    function count(){
        var i=0
        $("#one .pul").each(function(){
            if($(this).find(".on").length>0){
                i+=1
            }
        })
        return i;
    }
    function count1(){
        var i=0
        $("#selecthtml .pul").each(function(){
            if($(this).find(".on").length>0){
                i+=1
            }
        })
        return i;
    }
    function tjdata(){//针对混合提交数据，组装
        ZQ.spzValue=''
        var score=[],n=-1,matchcode=[],va=[]
        $("#selectData .pul").each(function(){

            if($(this).find(".on").length>0){
                n+=1
                score[n]=new Array()
                va[n]=new Array()
                matchcode[n]=new Array()
                matchcode[n].push($(this).find(".WF").attr("matchcode"))
            }
            $(".WF",this).each(function(){


                $("li",this).each(function(){
                    if($(this).hasClass("on")){
                        score[n].push($(this).find("span").text())
                        va[n].push($(this).attr("value"))
                    }
                })
            })

            if($(this).find(".view").hasClass("on")){
                var arr=$(".view",this).attr("score").split(",")
                for(var k=0;k<arr.length;k++){
                    score[n].push(arr[k])
                    va[n].push($(this).find(".view").attr("value").split(",")[k])
                }
            }

        })
        var ss='',chipinNums='',s=''

        for(var j=0;j<matchcode.length;j++){

            ss+=matchcode[j][0]+","+score[j].join("/")+",0//"
            s+=matchcode[j][0]+","+va[j].join("/")+",0//"

        }


        ZQ.spzValue=ss.substr(0,ss.length-2)
        chipinNums= s

        return chipinNums
    }

    function hunheprice(){//计算混合的奖金
        var arr1=[],ina=-1,bet=[],HybridStrings=[],arrnumber=[],hy=[],aa=[],inss=-1,vv=[],hy1=[]
        ZQ.betJson={}
        ZQ.betArr=[]
        $("#selectData  .pul").each(function(){
            var _thi=$(this)
            if($(this).find(".on").length>0){
                ina+=1;
                ZQ.betJson[$(this).find(".WF").attr("matchcode")]=$(this).find(".WF").attr("matchcode")
                arr1[ina]=new Array()
                bet[ina]=new Array()
                arrnumber[ina]=new Array()
                HybridStrings[ina]=new Array()
                hy1[ina]=new Array()
                $("ul.WF",this).each(function(){
                    if($(this).find(".on").length>0){
                        inss+=1
                        aa[inss]=new Array()
                        $("li",this).each(function(){
                            if($(this).hasClass("on")){
                                arr1[ina].push($(this).find("span").text())
                                arrnumber[ina].push($(this).attr("value"))
                                bet[ina].push({'gn':$(this).attr("data-gamenum"),'sp':$(this).find("span").text(),'s':$(this).attr("data-s"),'val':$(this).attr('value')})
                                HybridStrings[ina].push($(this).attr("data-gamenum")+":"+$(this).attr('value')+":"+$(this).find("span").text()+":"+_thi.find(".WF").attr('matchcode')+":")
                                aa[inss].push($(this).attr("data-gamenum")+":"+$(this).attr('value')+":"+$(this).find("span").text()+":"+_thi.find(".WF").attr('matchcode')+":0-")
                            }
                        })
                        hy1[ina].push(aa[inss].join("/"))
                    }
                })

                vv=[]
                if($(this).find(".view").hasClass("on")){
                    var a=$(this).find(".view").attr("score").split(",")
                    for(var i=0;i< a.length;i++){
                        var datas=$(this).find(".view").attr("data-s").split(",")[i]
                        var v=$(this).find(".view").attr("value").split(",")[i]
                        arr1[ina].push(a[i])
                        arrnumber[ina].push(v)
                        bet[ina].push({'gn':$(this).find(".view").attr("data-gamenum"),'sp':a[i],'s':datas,'val':v})
                        HybridStrings[ina].push($(this).find(".view").attr("data-gamenum")+":"+v+":"+a[i]+":"+_thi.find(".view").attr('matchcode')+":")
                        vv.push($(this).find(".view").attr("data-gamenum")+":"+v+":"+a[i]+":"+_thi.find(".view").attr('matchcode')+":0-")
                    }
                    hy1[ina].push(vv.join("/"))
                }

            }
        })
        for(var xx=0;xx<hy1.length;xx++){
            hy[xx]=new Array()
            for(var yy=0;yy<hy1[xx].length;yy++){
                hy[xx].push(hy1[xx][yy]+'~')
            }
        }

        var xj=-1
        for(var id in ZQ.betJson){
            xj+=1
            ZQ.betJson[id]={'id':id,'arrs':arr1[xj],'gall':'0','hbsg':HybridStrings[xj].join("|"),'arrnumber':arrnumber[xj],'bet':bet[xj],'matchCode':id}
            ZQ.betArr.push(ZQ.betJson[id])
        }

        var OverPortfolio = ZQ.betArr,sjarr = [],newHY=[],newHY1=[]
        for(var k =0; k < OverPortfolio.length;k++) {
            var sr = OverPortfolio[k].hbsg.split("|");
            var newHbsg = [];
            var arr = {'505': {}, '506': {}, '507': {}, '508': {}};
            sjarr[k] = {'505': [], '506': [], '507': [], '508': []};
            for (var s = 0; s < sr.length; s++) {
                sr[s] = sr[s] + OverPortfolio[k].gall + "-";
                newHbsg.push(sr[s]);
                var S_a = sr[s].replace(/[~]/g, "").replace(/[ ]/, "");
                var so = S_a.split(":");
                arr[so[0]][so[1]] = so[2]; //so[2]=501,so[0]=3,so[1]=3.20
                sjarr[k][so[0]].push(sr[s]);
            }
            var budGet = lq_ys_main(arr);
            var bdt = budGet['max'];
            var bdt1=budGet['min']
            var tsr = [];
            var tsr1=[]
            for(var y=0;y<bdt.length;y++){
                tsr.push(bdt[y].gn+":"+bdt[y].val+":"+bdt[y].brouns+":"+OverPortfolio[k].matchCode+":"+OverPortfolio[k].gall+"-~");
            }
            for(var x=0;x<bdt1.length;x++){
                tsr1.push(bdt1[x].gn+":"+bdt1[x].val+":"+bdt1[x].brouns+":"+OverPortfolio[k].matchCode+":"+OverPortfolio[k].gall+"-~");
            }
            newHY.push(tsr);
            newHY1.push(tsr1)
        }

        var maxprice=0
        var minprice=0

        var c=$("#cuan").text().trim().split(",")
        var zhushu=0
        for(var i=0;i< c.length;i++){
            OverArry=[]
            var xzcg =c[i].split('串');

            var passway = typeMap['r'+xzcg[0]+'c'+xzcg[1]];
            var pwy = [];
            for(var b = 0; b < passway.length;b++)
            {
                pwy.push(passway[b].charAt(0));
            }
            var psy = pwy.join(',');
            var methods =0;
            if(xzcg[1]>1){
                methods=1;
            }else{
                methods=0;
            }
            startRecon(hy,psy,methods,[],xzcg[0])
            zhushu+=OverArry.length
            maxprice+= parseFloat(reconBonus(newHY,psy,methods,[],xzcg[0]))*parseInt(ZQ.muliptile);
            minprice+= parseFloat(reconBonus(newHY1,psy,methods,[],xzcg[0]))*parseInt(ZQ.muliptile);

        }

        $("#maxprize").text(maxprice.toFixed(2))
        //$("#minprize").text(minprice.toFixed(2))
        $("#total").text(zhushu)
        $("#money").text(zhushu*2*ZQ.muliptile)
    }

})(jQuery)
var spArr=[]
var ZQ={}
ZQ.spzValue=''
ZQ.betJson={}
ZQ.betArr=[]
ZQ.muliptile=1
var ggWay=[]

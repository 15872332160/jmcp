/**
 * Created by acer on 2018/9/24.
 */
(function($){
    var C={
        '2串1': 1,
        '2串3':1,
        '3串1': 2,
        '3串4':  1,
        '3串7':1,
        '4串1': 3,
        '4串5': 3,
        '4串11':2,
        '4串15':1,
        '5串1':4,
        '5串6':4,
        '5串16':2,
        '5串26':1,
        '5串31':1,
        '6串1':5,
        '6串7':5,
        '6串22':3,
        '6串42':3,
        '6串57': 1,
        '6串63':1,
        '9串1':8,
        '10串1':9,
        '11串1':10,
        '12串1':11,
        '13串1':12,
        '14串1':13,
        '15串1':14
    }
    var lotterId='',selbuy=false,issue//奖期


    $.extend($.fn,{
        ajaxhtml:function(opt){//加载数据
            var def={
                bodynum:1,
                url:'lottery/lotZcData',
                lotteryId:'103'
            }
            var getcan=$.extend(def,opt)
            var _thi=this
             //var data={'flag':1,'matchData':[{'matchInfo':[{'mathNum':311,'matchTime':20154051555,'rangqiuSp':'3.2|3.1|3.3','hostTeam':'哈拉','rangQiuShu':0,'guestTeam':'德拉','rangQiuShu':'2'},{'mathNum':312,'matchTime':20154051555,'rangqiuSp':'3.2|3.1|3.3','hostTeam':'哈拉','guestTeam':'德拉','rangQiuShu':'2'}]}]}
            //_thi.append(bodynum2(data))


            $.ajax({
                url:APP.url+getcan.url,
                data:{
                    version:APP.version,
                    requestType:APP.type,
                    lotteryId:def.lotteryId
                },
                beforeSend: function(){X.load();},
                success:function(data){
                    X.unload();
                    if(getcan.bodynum==1){
                        _thi.append(bodynum1(data))
                    }else if(getcan.bodynum==2){
                        _thi.append(bodynum2(data))
                    }
                },
                error:function(){
                    X.unload();
                    alert(APP.error.ajaxError);
                }
            })
        },
        select1:function(){//高亮选择
            this.toggleClass('on')
            if($("#selectData").is(":visible")){
                var n=0
                $("#selectData .pul").each(function(){
                    if($(this).find(".on").length>0){
                        n+=1
                    }
                })
            }
            if(n==0){
                this.addClass("on")
            }
            //$(".alert").text("您已经选择了"+count()+"场比赛")
            if(count()<9&&s_pt==2){
                //$(".opt span:eq(1)").text("我要购买")
                selbuy=false
            }else if(count()==0&&(s_pt==2||s_pt==1)){
                //$(".opt span:eq(1)").text("请选择比赛结果")
                selbuy=false
            }else if(count()<14&&s_pt==1){
                selbuy=false
            }else{
                selbuy=true
            }
            var cou=0
            $(".pul:visible").each(function(){
                if($(this).find(".on").length>0){
                    cou+=1
                }
            })
            $("#matchcount").text(cou)
            if(s_pt==1){
                tanprice()
            }else{
                hunheprice()
            }

        },
        clearall:function(){//清空选择
            $(".on").removeClass("on")
            $("#matchcount").text("0")
            $("#one").show()
            $("#selectData").hide()
            //$(".alert").text('页面赔率仅供参考，请以出票赔率为准')
        },

        buySelect:function(){//所选择的场景 p表示哪一种玩法
            if(selbuy==true||selbuy=="true"){
                $("#one").hide();
                $("#selectData").show()
                $(".shopdiv").empty()
                var html=''


                for(var i=0;i<gethtml().length;i++){
                    html+='<dl class="getshop"><dd class="dw2" style="margin-left:8%;">'
                    html+='<ul class="pul" style="margin-top:0;">'+gethtml()[i]+"</ul>"
                    html+='</dd><dd class="dw1 pt10 r right"><span class="delspan"></span></dd></dl>'
                }
                $(".shopdiv").empty().append(html)

                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }

            }else if(selbuy==false||selbuy=="false"){
                if(s_pt==1){
                    popup('至少选择14场比赛')
                }else{
                    popup('至少选择9场比赛')
                }

            }
        },

        delsel:function(){//o=0表标过关o=1表示单关
            if(s_pt == 2){
                if(count1()<10&&this.parent().parent().find(".on").length!=0){
                    popup('必须选择9场以上')
                }else{
                    this.parent().parent().remove()
                    if(s_pt==1){
                        tanprice()
                    }else{
                        hunheprice()
                    }

                }
            }else{
                if(count1()<15&&this.parent().parent().find(".on").length!=0){
                    popup('必须选择14场以上')
                }else{
                    this.parent().parent().remove()
                    if(s_pt==1){
                        tanprice()
                    }else{
                        hunheprice()
                    }

                }
            }


        },
        add:function(){
            if(parseInt($(".inputex").val())<1000){
                $(".inputex").val(parseInt($(".inputex").val())+1)
                ZQ.muliptile=$(".inputex").val()
                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }
            }else{
                popup('输入的倍数不能超过1000')
            }

        },
        substra:function(){
            if(parseInt($(".inputex").val())>1){
                $(".inputex").val(parseInt($(".inputex").val())-1)
                ZQ.muliptile=$(".inputex").val()
                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }
            }else{
                alert('输入的倍数不能小于1')
            }

        },
        checkinput:function(){
            var t=/^[1-9][0-9]*$/
            if(t.test(this.val())==false||t.test(this.val())=='false'){
                //popup("请输入1-9的数字")
                this.val(1)
                this.focus()
                ZQ.muliptile=this.val()
                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }
            }else if(this.val()>9999){
                //popup("输入的倍数过大")
                this.val(9999)
                this.focus()
                ZQ.muliptile=this.val()
                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }
            }else{
                ZQ.muliptile=this.val()
                if(s_pt==1){
                    tanprice()
                }else{
                    hunheprice()
                }
            }
        },

        submitform:function(strurl,title){//提交方案
            var m=[],chipinNums='',manner=[]
            if(s_pt==1){
                chipinNums=largescore()
            }else{
                chipinNums=largescore1()
            }

            var m=[],manner= 0,l=0
            $("#selectData .pul").each(function(){
                if($(this).find(".on").length>0){
                    m.push($(this).find(".on").length)
                    l+=1
                }
            })

            if(max(m)==1&&s_pt==2&&l<=9){
                manner=1
            }else if(max(m)>=2&&s_pt==2&&l<=9){
                manner=2
            }else if(s_pt==2&&l>9){
                manner=2
            }else if(s_pt==1&&l==14&&max(m)>=2){
                manner=2
            }else if(s_pt==1&&l==14&&max(m)==1){
                manner=1
            }
            var data={
                muliptile:ZQ.muliptile,
                issue:issue,
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
                chipinNums:chipinNums.substr(0,chipinNums.length-1),
                manner:manner,
                spvalue:ZQ.spzValue,
                lotteryId: s_ld,
                ensures:0,
                description:'此单太绝，跟单必盈',
                title: title
            }
            $.ajax({
                url:APP.url+strurl,
                data:data,
                beforeSend: function(){X.load();},
                success:function(data){
                    X.unload();
                    if(data.flag==-1){
                        X.user.signIn();
                        disabledbtn=true
                    }else if(data.flag==1){

                        location.href="success.html?serialNo="+data.serialNo+"&url=chuantong.html";
                        disabledbtn=false

                    }else{
                        alert(data.errorMessage);
                        disabledbtn=true
                    }
                },
                error:function(){
                    X.unload();
                    alert(APP.error.ajaxError);
                    disabledbtn=true
                }
            })
        }

    })


    $(document).on("touchstart","#cuan1 .mainbody li",function(){
        $(this).toggleClass("redsel")
    })
    $(document).on("touchstart",".tab li",function(){
        $(".mainbody").hide()
        $(".tab li").removeClass("selected")
        $(".mainbody:eq("+$(this).index()+")").show()
        $(this).addClass("selected")
    })



    //根据大小分获取要提交的数据
    function largescore(){
        ZQ.spzValue=''
        var r=[],index=-1,z=[],choose=[],isdan=[],mathnum=[],cdan=[],kkk
        $("#selectData .pul").each(function(){
            var _thi=$(this)
            if($(this).find(".on").length>0){
                index+=1
                r[index]=new Array()
                choose[index]=new Array()

                mathnum.push($('li:eq(0)',this).attr("id"))
                kkk=0
                $("li",_thi).each(function(i){

                    if($(this).hasClass("on")){
                        kkk+=1
                        cdan.push(kkk)
                        choose[index].push($(this).attr("value"))

                        r[index].push($(this).attr("data-sp"))
                    }
                })
            }
        })
        var ch=''
        for(var i=0;i<mathnum.length;i++){
            ZQ.spzValue+=mathnum[i]+","
            ZQ.spzValue+=r[i].join('/')
            ZQ.spzValue+=',0//'
        }
        ZQ.spzValue=ZQ.spzValue.substr(0,ZQ.spzValue.length-2)

        for(var i=0;i<mathnum.length;i++){

            ch+=choose[i].join('/')
            if(max(cdan)==1){
                ch+='/'
            }else if(max(cdan)>1){
                ch+='//'
            }

        }
        //ch=ch.substr(0,ch.length-2)

        return ch
    }
    //根据大小分获取要提交的数据
    function largescore1(){

        ZQ.spzValue=''
        var r=[],index=-1,z=[],choose=[],isdan=[],mathnum=[],pddan=[]
        $("#main .pul").each(function(i){
            var _thi=$(this)
            choose[i]=new Array()
            if($(this).find(".on").length>0){
                index+=1
                r[index]=new Array()

                mathnum.push($('li:eq(0)',this).attr("id"))
                var kkk=0
                $("li",_thi).each(function(){
                    if($(this).hasClass("on")){
                        kkk+=1
                        choose[i].push($(this).attr("value"))
                        pddan.push(kkk)
                        r[index].push($(this).attr("data-sp"))
                    }
                })
            }else{

                choose[i].push(9)
            }
        })
        var ch=''
        for(var i=0;i<mathnum.length;i++){
            ZQ.spzValue+=mathnum[i]+","
            ZQ.spzValue+=r[i].join('/')
            ZQ.spzValue+=',0//'
        }
        ZQ.spzValue=ZQ.spzValue.substr(0,ZQ.spzValue.length-2)

        for(var i=0;i<choose.length;i++){

            ch+=choose[i].join('/')
            if(index>9){
                ch+='//'
            }else if(max(pddan)==1){
                ch+='/'
            }else if(max(pddan)>1){
                ch+='//'
            }

        }
        //ch=ch.substr(0,ch.length-2)

        return ch
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
    function gethtml2(){
        var html=[]
        $(".pul").each(function(){
            if($(this).find(".on").length>0){
                html.push($(this).parent().html())
            }

        })
        return html;
    }
    //胜平负
    function bodynum1(data){
        var html='',rangfen=''

        if(data.flag==1){
            issue=data.matchData[0].issue
            html+='<div class="tit"><span class="fl">第'+data.matchData[0].issue+'期</span><span>截止'+data.matchData[0].sellStopTime+'</span></div>'
            html+='<div class="main">'
            for(var j=0;j<data.matchData[0].matchInfo.length;j++){
                html+='<section class="borderTop pt1" ><div class="clear mar15"><div class="leftpart textover mt11"><span class="matchname" style="color:#00A78D;">'+data.matchData[0].matchInfo[j].leagueName+'</span></br>'
                html+=' <font class="fon" color="#Fd5B5B">'+data.matchData[0].matchInfo[j].changCi+'</font></br><font color="#808080"><i class="fon"> '
                var t=String(data.matchData[0].sellStopTime).split(" ")
                var tem=String(data.matchData[0].matchInfo[j].meanSp).split("|")
                html+=t[1]+'</i>截止</font></div><ul class="pul pulPad"><li class="noborder" data-sp="'+fmoney(tem[0],2)+'"  value="3" data-s="t1" data-gamenum="102" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" >'

                html+='<p class="textover">'+data.matchData[0].matchInfo[j].hostTeam+'</p><font color="#808080"><em>主胜</em><i class="fon fon1">'+fmoney(tem[0],2)+'</i></font></li>'
                rangfne=fmoney(tem[1],2)

                html+='<li class="w noborder"   data-sp="'+fmoney(tem[1],2)+'"  value="1" data-s="t2" data-gamenum="102" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" ><p class="fon">VS</p><font color="#808080"><em>平</em><i class="fon">'+rangfne+'</i></font></li>'
                html+= '<li data-sp="'+fmoney(tem[2],2)+'" value="0" data-s="t2" data-gamenum="102" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" ><p class="textover">'+data.matchData[0].matchInfo[j].guestTeam+'</p><font color="#808080"><em>主负</em><i class="fon">'+fmoney(tem[2],2)+'</i></font></li></ul>' +
                    '</div></section>'

            }
            html+="</div>"


        }
        return html
    }

    //任选九
    function bodynum2(data){
        var html='',rangfen=''

        if(data.flag==1){
            issue=data.matchData[0].issue
            html+='<div class="tit"><span class="fl">第'+data.matchData[0].issue+'期</span><span>截止'+data.matchData[0].sellStopTime+'</span></div>'
            html+='<div class="main">'
            for(var j=0;j<data.matchData[0].matchInfo.length;j++){
                html+='<section class="borderTop pt1" ><div class="clear mar15"><div class="leftpart textover mt11"><span class="matchname" style="color:#00A78D;">'+data.matchData[0].matchInfo[j].leagueName+'</span></br>'
                html+=' <font class="fon" color="#FD5B5B">'+data.matchData[0].matchInfo[j].changCi+'</font></br><font color="#808080" class="fon"><i class="fon"> '
                var t=String(data.matchData[0].sellStopTime).split(" ")
                var tem=String(data.matchData[0].matchInfo[j].meanSp).split("|")
                html+=t[1]+'</i>截止</font></div><ul class="pul pulPad"><li class="noborder" data-sp="'+fmoney(tem[0],2)+'"  value="3" data-s="t1" data-gamenum="103" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" >'

                html+='<p class="textover">'+data.matchData[0].matchInfo[j].hostTeam+'</p><font color="#808080"><em>主胜</em><i class="fon fon1">'+fmoney(tem[0],2)+'</i></font></li>'
                rangfne=fmoney(tem[1],2)

                html+='<li class="w noborder"   data-sp="'+fmoney(tem[1],2)+'"  value="1" data-s="t2" data-gamenum="103" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" ><p class="fon">VS</p><font color="#808080"><em>平</em><i class="fon">'+rangfne+'</i></font></li>'
                html+= '<li data-sp="'+fmoney(tem[2],2)+'" value="0" data-s="t2" data-gamenum="103" rq="0" id="'+data.matchData[0].matchInfo[j].againstId+'" ><p class="textover">'+data.matchData[0].matchInfo[j].guestTeam+'</p><font color="#808080"><em>主负</em><i class="fon">'+fmoney(tem[2],2)+'</i></font></li></ul>' +
                    '</div></section>'

            }
            html+="</div>"


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
        $(".shopdiv .pul").each(function(){
            if($(this).find(".on").length>0){
                i+=1
            }
        })
        return i;
    }

    function tanprice(){//计算比分的奖金
        var arr1=[],ina=-1,bet=[],HybridStrings=[],arrnumber=[],hy=[],opn=[],inss=-1,vv=[],hy1=[],rq=[],danarr=[]
        ZQ.betJson={}
        ZQ.betArr=[]
        $("#one  .pul").each(function(){
            var _thi=$(this)
            if($(this).find(".on").length>0){
                ina+=1;
                ZQ.betJson[$(this).find("li").eq(0).attr("id")]=$(this).find("li").eq(0).attr("id")
                arr1[ina]=new Array()
                bet[ina]=new Array()
                arrnumber[ina]=new Array()
                HybridStrings[ina]=new Array()
                hy1[ina]=new Array()
                rq.push($(this).find("li").eq(0).attr("rq"))
                opn[ina]=new Array()

                if($(this).parent().prev().find(".selectdan").length>0){
                    danarr.push($(this).find("li").eq(0).attr('id'))
                }
                $("li",this).each(function(){
                    if($(this).hasClass("on")){
                        arr1[ina].push($(this).attr('data-sp'))
                        arrnumber[ina].push($(this).attr("value"))
                        bet[ina].push({'gn':$(this).attr("data-gamenum"),'sp':$(this).attr('data-sp'),'s':$(this).attr("data-s"),'val':$(this).attr('value')})
                        HybridStrings[ina].push($(this).attr("data-gamenum")+":"+$(this).attr('value')+":"+$(this).attr('data-sp')+":"+$(this).attr('id')+":0-")
                        opn[ina].push($(this).attr('value')+":"+$(this).attr('data-sp')+":"+$(this).attr("id")+"~")
                        hy1[ina].push($(this).attr("data-gamenum")+':'+$(this).attr('value')+":"+$(this).attr('data-sp')+':'+$(this).attr("id")+':0-')
                    }
                })



            }
        })
        for(var xx=0;xx<hy1.length;xx++){
            hy.push(hy1[xx].join('/')+'~')
        }

        var xj=-1
        for(var id in ZQ.betJson){
            xj+=1
            ZQ.betJson[id]={'id':id,'arrs':arr1[xj],'gall':'0','hbsg':HybridStrings[xj].join("/"),'arrnumber':arrnumber[xj],'bet':bet[xj],'opn':opn[xj].join('|'),'rq':rq[xj]}
            ZQ.betArr.push(ZQ.betJson[id])
        }

        var OverPortfolio = ZQ.betArr,sjarr = [],newHY=[],newHY1=[],sa=new Array(),spValArr = [],sb=new Array()
        for(var k =0; k < OverPortfolio.length;k++) {
            var sr = OverPortfolio[k].hbsg.split("|");
            var newHbsg = [];

            var arr = {'102': {}};
            sjarr[k] = {'102': []};


            for (var s = 0; s < sr.length; s++) {
                sr[s] = sr[s] + OverPortfolio[k].gall + "-";
                newHbsg.push(sr[s]);
                var S_a = sr[s].replace(/[~]/g, "").replace(/[ ]/, "");
                var so = S_a.split(":");
                arr[so[0]][so[1]] = so[2]; //so[2]=501,so[0]=3,so[1]=3.20
                sjarr[k][so[0]].push(sr[s]);
            }
            sa.push(OverPortfolio[k].bet.length)
            var vp = OverPortfolio[k].arrs.join(',');
            spValArr.push(vp.split(',').sort(asc));
        }


        var zhushu=0

        OverArry=[]

        var psy ='9';
        var methods = 0;
        var gte = ['14-1'];
        zhushu += parseInt(myCalc('14-1','1',sa,sb,0,0));
        ggWay = gte;
        gusuan();

        $('#total').text(zhushu);
        $("#money").text(zhushu*2*ZQ.muliptile)
        //$("#maxprize").text(zhushu*2*ZQ.muliptile)
    }
    function hunheprice(){//计算胜平负奖金
        var arr1=[],ina=-1,bet=[],HybridStrings=[],arrnumber=[],hy=[],opn=[],inss=-1,vv=[],hy1=[],rq=[],danarr=[]
        ZQ.betJson={}
        ZQ.betArr=[]
        $("#one  .pul").each(function(){
            var _thi=$(this)
            if($(this).find(".on").length>0){
                ina+=1;
                ZQ.betJson[$(this).find("li").eq(0).attr("id")]=$(this).find("li").eq(0).attr("id")
                arr1[ina]=new Array()
                bet[ina]=new Array()
                arrnumber[ina]=new Array()
                HybridStrings[ina]=new Array()
                hy1[ina]=new Array()
                rq.push($(this).find("li").eq(0).attr("rq"))
                opn[ina]=new Array()

                if($(this).parent().prev().find(".selectdan").length>0){
                    danarr.push($(this).find("li").eq(0).attr('id'))
                }
                $("li",this).each(function(){
                    if($(this).hasClass("on")){
                        arr1[ina].push($(this).attr('data-sp'))
                        arrnumber[ina].push($(this).attr("value"))
                        bet[ina].push({'gn':$(this).attr("data-gamenum"),'sp':$(this).attr('data-sp'),'s':$(this).attr("data-s"),'val':$(this).attr('value')})
                        HybridStrings[ina].push($(this).attr("data-gamenum")+":"+$(this).attr('value')+":"+$(this).attr('data-sp')+":"+$(this).attr('id')+":0-")
                        opn[ina].push($(this).attr('value')+":"+$(this).attr('data-sp')+":"+$(this).attr("id")+"~")
                        hy1[ina].push($(this).attr("data-gamenum")+':'+$(this).attr('value')+":"+$(this).attr('data-sp')+':'+$(this).attr("id")+':0-')
                    }
                })



            }
        })
        for(var xx=0;xx<hy1.length;xx++){
            hy.push(hy1[xx].join('/')+'~')
        }

        var xj=-1
        for(var id in ZQ.betJson){
            xj+=1
            ZQ.betJson[id]={'id':id,'arrs':arr1[xj],'gall':'0','hbsg':HybridStrings[xj].join("/"),'arrnumber':arrnumber[xj],'bet':bet[xj],'opn':opn[xj].join('|'),'rq':rq[xj]}
            ZQ.betArr.push(ZQ.betJson[id])
        }

        var OverPortfolio = ZQ.betArr,sjarr = [],newHY=[],newHY1=[],sa=new Array(),spValArr = [],sb=new Array()
        for(var k =0; k < OverPortfolio.length;k++) {
            var sr = OverPortfolio[k].hbsg.split("|");
            var newHbsg = [];

            var arr = {'103': {}};
            sjarr[k] = {'103': []};


            for (var s = 0; s < sr.length; s++) {
                sr[s] = sr[s] + OverPortfolio[k].gall + "-";
                newHbsg.push(sr[s]);
                var S_a = sr[s].replace(/[~]/g, "").replace(/[ ]/, "");
                var so = S_a.split(":");
                arr[so[0]][so[1]] = so[2]; //so[2]=501,so[0]=3,so[1]=3.20
                sjarr[k][so[0]].push(sr[s]);
            }
            sa.push(OverPortfolio[k].bet.length)
            var vp = OverPortfolio[k].arrs.join(',');
            spValArr.push(vp.split(',').sort(asc));
        }


        var zhushu=0

        OverArry=[]

        var psy ='9';
        var methods = 0;
        var gte = ['9-1'];
        zhushu += parseInt(myCalc('9-1','1',sa,sb,0,0));
        ggWay = gte;
        gusuan();

        $('#total').text(zhushu);
        $("#money").text(zhushu*2*ZQ.muliptile)
        //$("#maxprize").text(zhushu*2*ZQ.muliptile)
    }

})(jQuery)
var spArr=[]
var ZQ={}
ZQ.spzValue=''
ZQ.betJson={}
ZQ.betArr=[]
ZQ.muliptile=1
var ggWay=[]

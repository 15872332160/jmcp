/**
 * Created by acer on 2015/8/7.
 */
ZQ={}
ZQ.muliptile=1
ZQ.spzValue=''
ZQ.betJson={}
ZQ.betArr = []
ZQ.min=''
X.c={
    doInit:function(){
        this.gg=this.bt==30000?{
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
        }: {
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
        };
    },
    init:function(){
        this.doInit();
        this.bet()
    },
    select:function(o) {//选中的比赛

        //if ($(o).hasClass("on")) {
        // $(o).removeClass("on")

        //} else {
        //$(o).addClass("on")
        //}
        $(o).toggleClass('on',1)
        $(".cho").text("已选择"+this.count()+"场")
        if (this.count()>8){
            popup('最多选择8场')
            $(".cho").text("最多选择8场")
            $(o).removeClass("on")

            if($(o).parent().find(".on").length>0){
                $(o).addClass("on")
            }
        }else{
            $(".selhidden").val(this.count())
        }


        if(X.urlSearch('danguan')=='false'||X.urlSearch('danguan')==false){
            if(this.count()<2){
                $("#count").text("至少选择2场")
            }else{
                $("#count").text("我要购买")
            }
        }else{
            if(this.count()>0&&pt!='a3'){
                $("#count").text("我要购买")
            }else if(pt=='a3'&&this.count()>1){
                $("#count").text("我要购买")
            }else{
                $("#count").text("至少还要选择一场")
            }
        }

    },
    select1:function(o){
        if ($(o).hasClass("on")) {
            $(o).removeClass("on")
            //$(o).attr("flag",0)
        } else {
            $(o).addClass("on")
            //$(o).attr("flag",1)
        }
    },
    count:function(){//计算选中了多少场比赛
        var count=0;
        $(".borderTop").each(function(index){
            if($(this).find(".pul").find("li").hasClass("on")||$(this).find(".pul").find("li").hasClass("whitebfdl")){
                count+=1;
            }
        })
        return count;
    },
    delC:function(){//清空选项
        $(".on").each(function(){
            $(this).removeClass("on")
        })
        $(".cho").text("已选择0场")
        if(pt=='a5'||pt=='a6'){
            $(".bfdl").text('点此展开投注区')
            $(".whitebfdl").removeClass("whitebfdl")
        }
        if(pt=='a3'){
            $(".opendoc").html('<span>展开</span><span>全部</span>').attr('sc','').attr('gt','')
            $(".whitebfdl").removeClass("whitebfdl")
        }
        $("#count").text('已选0场')
    },
    chooseStr:[],//保存所选择的球赛
    getDat:function(){//获取所选比赛的参数 胜平负
        var a="",c="",x=[],score=[]

        $(".borderTop .pul").each(function(h){
            var index=0
            $("li",this).each(function(){
                if($(this).hasClass("on")&&index==0){
                    x.push($(this).parent().html())
                    index=index+1
                }
            })

        })
        this.chooseStr.push(x)
        $(".header").hide()
        $(".qi-list-box").hide()
        $(".tab").hide();
        $("footer").hide()
        $(".choose").show()

        this.chosehtml()



    },
    getDat1:function(){
        var a="",c="",x=[],score=[]


        $(".borderTop .pul").each(function(h){
            var index=0
            $("li",this).each(function(){
                if(($(this).hasClass("on")||$(this).hasClass("whitebfdl"))&&index==0){
                    x.push($(this).parent().parent().parent().html())
                    index=index+1
                }
            })

        })
        this.chooseStr.push(x)
        $(".header").hide()
        $(".qi-list-box").hide()
        $(".tab").hide();
        $("footer").hide()
        $(".choose").show()

        this.chosehtml1()


    },
    getDat2:function(){
        var x=[]

        $(".rfdd").each(function(h){
            if($(this).text().trim()!='点此展开投注区') {
                x.push($(this).parent().html())
            }
        })
        if(x.length>0){
            this.chooseStr.push(x)
            $(".header").hide()
            $(".qi-list-box").hide()
            $(".tab").hide();
            $("footer").hide()
            $(".choose").show()
            this.chosehtml1()
        }
    },
    chosehtml1:function(){
        var html=[]
        var h=this.chooseStr
        for(var i=0;i< h[0].length;i++){
            html.push('<dl class="getshop hun zongdl"><dt class="dw1"><span class="dan">胆</span></dt><dd class="dw2"><dl class="fleft">')
            html.push(h[0][i]+'</dl></dd><dd class="dw1 pt10 r right"><span class="delspan"></span></dd></dl>')
        }

        $(".shopdiv").empty()
        $(".shopdiv").append(html.join(""))
        if(pt=='a6'||pt=='a5'){
            this.pushsche1()
        }else if(pt=='a3'){
            this.pushsche2()
        }else{
            this.pushsche()
        }

    },
    chosehtml:function(){//所选择的球赛胜平负
        var html=[]
        var h=this.chooseStr
        for(var i=0;i< h[0].length;i++){
            html.push('<dl class="getshop"><dt class="dw1"><span class="dan">胆</span></dt><dd class="dw2"><ul class="pul" style="margin-top:0">')
            html.push(h[0][i]+'</ul></dd><dd class="dw1 pt10 r right"><span class="delspan"></span></dd></dl>')
        }

        $(".shopdiv").empty()
        $(".shopdiv").append(html.join(""))
        this.pushsche()

    },
    pushsche1:function(){
        var score=[],d=[],skk='',scarr=[],sfno=[],sfarr=[],dan=[]
        $(".getshop .bfdl").each(function(index){
            dan[index]=new Array()
            if($(this).text().trim()!='点此展开投注区'){
                skk=$(this).attr("sc")
                scarr=skk.trim().split(" ")
                sfarr=$(this).text().trim().split(" ")
                d.push($(this).attr("data"))
                score[index]=new Array()
                sfno[index]=new Array()
                for(var j=0;j<scarr.length;j++){
                    score[index].push(scarr[j])
                }
                if(pt=="a6"){
                    for(var k=0;k<sfarr.length;k++){
                        var a='',b=''
                        if(sfarr[k][0]=="胜"){
                            a=3
                        }else if(sfarr[k][0]=='平'){
                            a=1
                        }else{
                            a=0
                        }
                        if(sfarr[k][1]=="胜"){
                            b=3
                        }else if(sfarr[k][1]=='平'){
                            b=1
                        }else{
                            b=0
                        }
                        sfno[index].push(a+'_'+b)
                    }

                }else{
                    for(var x=0;x<sfarr.length;x++){
                        if(sfarr[x]=='胜其他'){
                            sfarr[x]='4:3'
                        }else if(sfarr[x]=='平其他'){
                            sfarr[x]='4:4'
                        }else if(sfarr[x]=='负其他'){
                            sfarr[x]='3:4'
                        }
                        sfno[index].push(sfarr[x])
                    }
                }

            }
            if($(this).parent().parent().parent().parent().find(".dan").hasClass("danselect")){
                dan[index].push(true)
            }else{
                dan[index].push(false)
            }
        })
        X.c.schemes={}
        for(var i=0;i< d.length;i++){

            var json=eval('(' + d[i] + ')')
            X.c.schemes[json.no]=json.no;
            X.c.schemes[json.no]={
                danx:dan[i],
                g:json.g,
                h:json.h,
                name:json.name,
                rq:json.rq,
                no:json.no,
                r:score[i],
                v:sfno[i],
                w:''
            }
        }

        return X.c.schemes

    },
    pushsche2:function(){
        var score=[],d=[],sf=[],sfno=[],dan=[]
        var index=-1
        $(".getshop .pul").each(function(){

            var _thi=$(this)
            if(_thi.find(".on").length>0||_thi.find(".whitebfdl").length>0) {
                index+=1
                score[index]=new Array()
                sf[index]=new Array()
                sfno[index]=new Array()
                dan[index]=new Array()
                $("li", this).each(function () {
                    if ($(this).index() == 0) {
                        d.push($(this).attr("data"))
                    }
                    if ($(this).hasClass("on")) {
                        score[index].push($("span", this).text())
                        sfno[index].push($(this).attr("value"))
                    }
                    if ($(this).hasClass("whitebfdl")) {
                        var wsc = $(this).attr("sc").trim().split(' ');
                        var wgt = $(this).attr("gt").trim().split(' ');
                        for(var i=0;i< wsc.length;i++){
                            if(wgt[i].indexOf('#')>-1){
                                sfno[index].push(wgt[i].split('#').join(':'))
                            }else{
                                sfno[index].push(wgt[i])
                            }
                            score[index].push(wsc[i])
                        }

                    }

                })


                if (pt == "a1") {
                    if ($(this).parent().parent().find(".dan").hasClass("danselect")) {
                        dan[index].push("true")
                    } else {
                        dan[index].push("false")
                    }
                } else {
                    if ($(this).parent().parent().parent().parent().find(".dan").hasClass("danselect")) {
                        dan[index].push("true")
                    } else {
                        dan[index].push("false")
                    }
                }
            }

        })

        X.c.schemes={}
        for(var i=0;i< d.length;i++){

            var json=eval('(' + d[i] + ')')
            X.c.schemes[json.no]=json.no
            X.c.schemes[json.no]={
                danx:dan[i],
                g:json.g,
                h:json.h,
                name:json.name,
                rq:json.rq,
                no:json.no,
                r:score[i],
                v:sfno[i],
                w:sf[i]
            }
        }

        return X.c.schemes

    },
    pushsche:function(){//存进schemes数组里
        var score=[],d=[],sf=[],sfno=[],dan=[]
        var index=-1
        $(".getshop .pul").each(function(){

            var _thi=$(this)
            if(_thi.find(".on").length>0) {
                index+=1
                score[index]=new Array()
                sf[index]=new Array()
                sfno[index]=new Array()
                dan[index]=new Array()
                $("li", this).each(function () {
                    if ($(this).index() == 0) {
                        d.push($(this).attr("data"))
                    }
                    if ($(this).hasClass("on")) {
                        if (pt == "a1") {
                            score[index].push($(this).find("i").text())
                        } else {
                            score[index].push($("span", this).text())
                        }


                        if(pt=='a2'){
                            sfno[index].push($(this).find("em").text())
                        }else{
                            //if($(this).find("em").text()=='主胜'){
                            //sfno[index].push(3)
                            // }else if($(this).find("em").text()=='平'){
                            //sfno[index].push(1)
                            //}else{
                            // sfno[index].push(0)
                            //}
                            sfno[index].push($(this).attr("value"))
                        }

                    }
                })


                if (pt == "a1") {
                    if ($(this).parent().parent().find(".dan").hasClass("danselect")) {
                        dan[index].push("true")
                    } else {
                        dan[index].push("false")
                    }
                } else {
                    if ($(this).parent().parent().parent().parent().find(".dan").hasClass("danselect")) {
                        dan[index].push("true")
                    } else {
                        dan[index].push("false")
                    }
                }
            }

        })

        X.c.schemes={}
        for(var i=0;i< d.length;i++){

            var json=eval('(' + d[i] + ')')
            X.c.schemes[json.no]=json.no
            X.c.schemes[json.no]={
                danx:dan[i],
                g:json.g,
                h:json.h,
                name:json.name,
                rq:json.rq,
                no:json.no,
                r:score[i],
                v:sfno[i],
                w:sf[i]
            }
        }

        return X.c.schemes
    },
    computeZHu:function(){//胜平负和让球胜平负计算注数
        var obj= X.c.schemes;
        var dannum=0;//胆的个数
        var tuo=[],dan=[]
        for(var o in obj){
            if(obj[o].danx=='false'||obj[o].danx==false){
                tuo.push(obj[o].v.length)
            }else{
                dannum+=1
                dan.push(obj[o].v.length)
            }
        }

        var c=$(".cuan").text().trim().split(" ")
        var zhushu=0;
        for(var i=0;i< c.length;i++){
            var pt=c[i].replace('串','-')
            zhushu += parseInt(myCalc(pt,'1',tuo,dan,dannum,dannum))
        }
        return zhushu
    },
    computePrice:function(){//胜平负和让球胜平负计算奖金
        var obj= X.c.schemes;
        spArr=[]
        ZQ.spzValue=''
        ggWay=[]
        var cuan=$(".cuan").text().trim().split(" ")

        for(var k=0;k<cuan.length;k++){
            ggWay.push(cuan[k].replace('串','-'))
        }
        var n=0;
        for(var o in obj){
            spArr[n]=new Array()
            var getR=[]
            getR=obj[o].r

            ZQ.spzValue+=obj[o].no+","
            for(var j=0;j<getR.length;j++){
                spArr[n].push(getR[j])
            }
            ZQ.spzValue+=getR.join('/')
            if(obj[o].danx[0]=='false'||obj[o].danx[0]==false){
                ZQ.spzValue+=',0//'
            }else{
                ZQ.spzValue+=',1//'
            }
            n+=1

        }

        ZQ.spzValue=ZQ.spzValue.substr(0,ZQ.spzValue.length-2)

        gusuan()

    },
    hunhecompute:function(){
        var schem=[],danmaArr=[]
        var index=-1
        $(".shopdiv .hunhe").each(function(){
            if($(this).find(".on").length>0||$(this).find(".whitebfdl").length>0){
                index+=1
                schem[index]=new Array()
                var score='',score1='',score2='',score3='',score4='',json={},strmax='',strmax1=''

                $("li",this).each(function(){

                    if($(this).index()==0){
                        var d=$(this).attr("data")
                        json=eval('(' + d + ')')
                    }

                    if($(this).index()<=2){
                        var lotteryid=501
                        if($(this).hasClass("on")){
                            if($(this).parent().parent().parent().parent().parent().find(".danselect").length>0){
                                var dan=1
                                danmaArr.push(json.no)
                            }else{
                                var dan=0
                            }
                            if($(this).find("em").text()=='主胜'){
                                var v=3

                            }else if($(this).find("em").text()=='平'){
                                var v=1
                            }else{
                                var v=0
                            }
                            score+=lotteryid+":"+v+":"+$(this).find("span").text()+":"+json.no+":"+dan+"-/"
                        }
                    }else if($(this).index()==3){
                        if($(this).hasClass("whitebfdl")){ //混合串
                            var wwsc = $(this).attr("sc").trim().split(' ');
                            var wwgt = $(this).attr("gt").trim().split(' ');
                            var wgt ='',lotteryid=0;
                            if($(this).parent().parent().parent().parent().parent().find(".danselect").length>0){
                                var dan=1
                                danmaArr.push(json.no)
                            }else{
                                var dan=0
                            }
                            for(var i=0;i< wwsc.length;i++){
                                wgt = wwgt[i];
                                if(wgt.indexOf('#')>-1){
                                    lotteryid = 502;
                                    score2+=lotteryid+":"+wgt+":"+wwsc[i]+":"+json.no+":"+dan+"-/"
                                }else if(wgt.indexOf('_')>-1){
                                    lotteryid = 504;
                                    score4+=lotteryid+":"+wgt+":"+wwsc[i]+":"+json.no+":"+dan+"-/"
                                }else{
                                    lotteryid = 503;
                                    score3+=lotteryid+":"+wgt+":"+wwsc[i]+":"+json.no+":"+dan+"-/"
                                }
                            }
                        }
                    }else{
                        var lotteryid=511
                        if($(this).hasClass("on")){
                            if($(this).parent().parent().parent().parent().parent().find("danselect").length>0){
                                var dan=1
                            }else{
                                var dan=0
                            }
                            if($(this).find("em").text()=='主胜'){
                                var v=3+'R'

                            }else if($(this).find("em").text()=='平'){
                                var v=1+'R'
                            }else{
                                var v=0+'R'
                            }
                            score1+=lotteryid+":"+v+":"+$(this).find("span").text()+":"+json.no+":"+dan+"-/"
                        }

                    }
                })
                var ss=score.substr(0,score.lastIndexOf('/'))
                var ss1=score1.substr(0,score1.lastIndexOf('/'))
                var ss2=score2.substr(0,score2.lastIndexOf('/'))
                var ss3=score3.substr(0,score3.lastIndexOf('/'))
                var ss4=score4.substr(0,score4.lastIndexOf('/'))
                var mm=strmax.substr(0,strmax.lastIndexOf('/'))
                var mm1=strmax1.substr(0,strmax1.lastIndexOf('/'))
                if(ss!=""){
                    ss+="~"
                    schem[index].push(ss)
                }
                if(ss1!=""){
                    ss1+="~"
                    schem[index].push(ss1)
                }
                if(ss2!=""){
                    ss2+="~"
                    schem[index].push(ss2)
                }
                if(ss3!=""){
                    ss3+="~"
                    schem[index].push(ss3)
                }
                if(ss4!=""){
                    ss4+="~"
                    schem[index].push(ss4)
                }
            }


        })
        var zhushu=0
        var maxprice=0
        var minprice=0
        var c=$(".cuan").text().trim().split(" ")

        for(var i=0;i< c.length;i++){
            OverArry=[];
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
            startRecon(schem,psy,methods,danmaArr,xzcg[0]);
            zhushu+=OverArry.length

            maxprice+= parseFloat(reconBonus(this.newschem(),psy,methods,danmaArr,xzcg[0]))*parseInt($(".intext").val());
            // minprice+= parseFloat(reconBonus(ZQ.min,psy,methods,danmaArr,xzcg[0]))*parseInt($(".intext").val());
            // maxprice+= reconBonus(this.newschem(),psy,methods,danmaArr,xzcg[0]);
            //minprice+= reconBonus(ZQ.min,psy,methods,danmaArr,xzcg[0]);
        }


        $("#total").text(zhushu*$(".intext").val())
        $("#money").text($("#total").text()*2)
        $("#maxprize").text(maxprice.toFixed(2)+'元')
        //$("#minprize").text(fmoney(minprice,2))
        $("#minprize").next().remove()
        $("#minprize").remove()
        $("#yuji").text("预计最大奖金")


    },
    newschem:function(){
        var bet = [] , arrs = [] , arrnumber = [] , HybridStrings=[],suanJ = [],option=[],newHY=[]
        ZQ.betJson={}
        ZQ.betArr=[]
        ZQ.min=[]
        $(".shopdiv .hunhe").each(function(){
            if($(this).find(".on").length>0||$(this).find(".whitebfdl").length>0){
                var id = $(this).attr('matchCode');
                var _thi=$(this)
                bet=[]
                option=[]
                arrs=[]
                arrnumber=[]
                HybridStrings=[]
                $("li",this).each(function(){
                    if($(this).hasClass("on")){
                        var gn = $(this).attr('data-gamenum'),
                            sp = $(this).attr('data-sp'),
                            s = $(this).attr('data-s'),
                            val = $(this).attr('value');
                        bet.push({'gn':gn,'sp':sp,'s':s,'val':val});
                        arrs.push(sp);
                        arrnumber.push(val);
                        HybridStrings.push(gn+":"+val+":"+sp+":"+id+":");
                        option.push(val+':'+sp+':'+_thi.attr('gamenum')+'~');
                    }
                    if($(this).hasClass("whitebfdl")){
                        var wwsc = $(this).attr("sc").trim().split(' ');
                        var wwgt = $(this).attr("gt").trim().split(' ');

                        for(var i=0;i< wwsc.length;i++){
                            var gn = 0,
                                sp = wwsc[i],
                                s = '',
                                val = wwgt[i];
                            if(val.indexOf('#')>-1){
                                gn = '502';
                            }else if(val.indexOf('_')>-1){
                                gn = '504';
                            }else{
                                gn = '503';
                            }

                            bet.push({'gn':gn,'sp':sp,'s':s,'val':val});
                            arrs.push(sp);
                            arrnumber.push(val);
                            HybridStrings.push(gn+":"+val+":"+sp+":"+id+":");
                            option.push(val+':'+sp+':'+_thi.attr('gamenum')+'~');
                        }
                    }

                })
                var hbsg = HybridStrings.join('|');
                var opn = option.join('|');

                ZQ.betJson[id]={'id':id,'matchCode':_thi.attr("matchCode"),'ht':_thi.attr('hostteam'),'vt':_thi.attr('vt'),'lg':_thi.attr('lg'),'gamenum':_thi.attr('gamenum'),'stopselldate':_thi.attr('stopselldate'),'rq':_thi.attr('rq'),'gall':'0','arrs':arrs,'arrnumber':arrnumber,'hbsg':hbsg,'bet':bet,'opn':opn};
                ZQ.betArr.push(ZQ.betJson[id])

            }


        })
        var OverPortfolio = ZQ.betArr;

        var  sjarr = []
        for(var k=0;k<OverPortfolio.length;k++){
            var sr = OverPortfolio[k].hbsg.split("|");
            var arr = {'501':{},'502':{},'503':{},'504':{},'511':{}};
            var yhstr = '';
            var newHbsg = [];
            sjarr[k]={'501':[],'502':[],'503':[],'504':[],'511':[]};
            for(var s = 0;s < sr.length;s++){
                sr[s] = sr[s]+OverPortfolio[k].gall+"-";
                yhstr+=sr[s]+OverPortfolio[k].gall+"~|";
                newHbsg.push(sr[s]);
                var S_a = sr[s].replace(/[~]/g,"").replace(/[ ]/,"");
                var so = S_a.split(":");
                arr[so[0]][so[1]]=so[2]; //so[2]=501,so[0]=3,so[1]=3.20
                sjarr[k][so[0]].push(sr[s]);
            }
            var budGet = yusuanMain(arr,OverPortfolio[k].rq);
            var bdt = budGet['max'];
            var tsr = [];
            var tsr1=[]
            var bdt1=budGet['min'];
            for(var y=0;y<bdt.length;y++){
                tsr.push(bdt[y].gn+":"+bdt[y].val+":"+bdt[y].brouns+":"+OverPortfolio[k].matchCode+":"+OverPortfolio[k].gall+"-~");
            }
            for(var x=0;x<bdt1.length;x++){
                tsr1.push(bdt1[x].gn+":"+bdt1[x].val+":"+bdt1[x].brouns+":"+OverPortfolio[k].matchCode+":"+OverPortfolio[k].gall+"-~");
            }
            ZQ.min.push(tsr1)
            newHY.push(tsr);
        }

        return newHY
    },
    add:function(){//倍数增加器
        var t=$(".intext").val()
        $(".intext").val(parseInt(t)+1)
        ZQ.muliptile=$(".intext").val()

    },
    subtra:function(){//倍数减少器
        var t=$(".intext").val()
        if(parseInt(t)<=1){
            $(".intext").val(1)
        }else{
            $(".intext").val(parseInt(t)-1)
        }
        ZQ.muliptile=$(".intext").val()
    },
    checkdata:function(str){
        if(/^(0|[1-9][0-9]*)$/.test(str)){

        }else{
            //alert("倍数输入格式不合法")
            $(".intext").val(1)
        }
        if(parseInt(str)>9999){
            $(".intext").val(9999)
        }
    },
    edit:function(){//编辑所选择的场数
        var t=[]
        $(".getshop").each(function(){
            t.push($(".pul li:eq(0)",this).attr("no"))
        })
        this.chooseStr=[]
        $(".header").show()
        $(".qi-list-box").show()
        $(".tab").show();
        $("footer").show()
        $(".choose").hide()
        $(".borderTop .pul").each(function(){
            if(t.indexOf($("li:eq(0)",this).attr("no"))>-1){

            }else{
                $("li",this).each(function(){
                    $(this).removeClass("on")
                })
            }
        })
    },
    delSelect:function(){//清空选项
        $(".shopdiv").empty()
        $(".header").show()
        $(".qi-list-box").show()
        $(".tab").show();
        $("footer").show()
        $(".choose").hide()

        this.chooseStr=[]
        this.delC()
    },
    jcType:1,
    bets:[],
    passWay:[],
    schemes:{},
    getcuan:function(count,str){//取出串数
        var t=this.gg;
        $(".listcuan").empty()

        for(var o in t){
            if(o.substr(0,o.lastIndexOf("串"))<=count){
                if(o.substring(o.lastIndexOf("串")+1)==1){
                    $(".listcuan:eq(0)").append('<li>'+o+'</li>')
                }else{
                    $(".listcuan:eq(1)").append('<li>'+o+'</li>')
                }
            }
        }
        var s=[]
        s=str.split(" ")
        $(".listcuan li").each(function(){
            for(var i=0;i< s.length;i++){
                if($(this).text()==s[i]){
                    $(this).addClass("selectdata")
                }
            }
        })

    },
    setDan:function(scuan1){//设胆
        var scuan=scuan1.trim().split(" ");
        var c=[]
        if(scuan1.trim()=='单关'){

            return true
        }
        for(var i=0;i<scuan.length;i++){
            c.push(scuan[i].substr(0,scuan[i].lastIndexOf('串')))
        }

        if(min(c)>=$(".getshop").length){
            return true
        }

        if(min(c)-1==$(".getshop .danselect").length) {
            return true
        }
        return false

    },
    getPassWayCode:function(a){
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
    },
    buysubmit:function(){//购买提交
        var cuan=$(".cuan").text().trim().split(" ")
        var chipinNums=[],spvalue=[],scheme=this.schemes,i= 0,isDan,manner=this.getPassWayCode(cuan),submitLotteryId=this.lotteryId;
        var myreg=/['R']/

        var te= 0,ta= 0,tbf= 0,tjq= 0,tbqc=0
        for (i in scheme) {
            if (scheme[i].danx==true||scheme[i].danx=="true") {
                isDan = 1;
            } else {
                isDan = 0;
            }
            for(var a=0;a<scheme[i].v.length;a++){
                if(myreg.test(scheme[i].v[a])){
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

            chipinNums.push(i + "," + scheme[i].v.join("/") + "," + isDan);
            if (this.lotteryId == 508) {
                spvalue.push(i + "," + scheme[i].base + ";" + scheme[i].r.join("/") + "," + isDan);
            } else if (this.lotteryId == 506) {
                spvalue.push(i + "," + scheme[i].rq + ";" + scheme[i].r.join("/") + "," + isDan);
            } else {
                spvalue.push(i + "," + scheme[i].r.join("/") + "," + isDan);
            }
        }
        if(te>0&&ta==0&&tbf==0&&tbqc==0&&tjq==0&&pt=='a3'){
            submitLotteryId=511
        }
        if(te==0&&ta>0&&tbf==0&&tbqc==0&&tjq==0&&pt=='a3'){
            submitLotteryId=501
        }
        if(te==0&&ta==0&&tbf>0&&tbqc==0&&tjq==0&&pt=='a3'){
            submitLotteryId=502
        }
        if(te==0&&ta==0&&tbf==0&&tbqc==0&&tjq>0&&pt=='a3'){
            submitLotteryId=503
        }
        if(te==0&&ta==0&&tbf==0&&tbqc>0&&tjq==0&&pt=='a3'){
            submitLotteryId=504
        }
        var d={
            version:APP.version,
            requestType:APP.type,
            muliptile:$(".intext").val(),
            chipinNums:chipinNums.join('//'),
            current:1,
            description:"过关投注",
            eachPrice:1,
            ensures:0,
            lotteryId:submitLotteryId,
            hmfaType:1,
            isopen:2,
            issue:'unknow',
            manner:manner.join(','),
            moneyFw:"0-0",
            payofftc:0,
            description:"此单太绝,跟单必盈",
            spvalue:spvalue.join("//"),
            title:"过关投注",
            userCouponId:0,
            money:$("#money").text(),
            openusers:'all',
            isUpload:0

        }
        d.copies= d.money/ d.eachPrice;
        d.betcopies= d.copies;
        $.ajax({
            url:APP.url+'core/lottery/buySubmit',
            data:d,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==-1){
                    X.user.signIn();
                    submitPD=true
                    //window.location='login.html'
                }else if(data.flag==1){
                    var u=(_.bt==30000)?'competitive':'basketball';
                    location.href="success.html?serialNo="+data.serialNo+"&url="+u+".html&l="+ X.urlSearch('l')+"&pt="+pt+"&danguan="+ X.urlSearch('danguan');

                }else{
                    alert(data.errorMessage);
                    submitPD=true
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);submitPD=true}
        })
    },
    danguanprice:function(){
        var minx=[],maxx=[]
        $(".getshop").each(function(){
            if($(this).find(".on").length>0){
                var temp=[]
                $("li",this).each(function(){
                    if($(this).hasClass("on")){
                        if(pt=='a1'){
                            temp.push($(this).find("i").text())
                        }else{
                            temp.push($(this).find("span").text())
                        }

                    }
                })

                minx.push(min(temp))
                maxx.push(max(temp))
            }

        })
        var minprice= 0,maxprice=0
        for(var i=0;i<minx.length;i++){
            minprice+=minx[i]
        }
        for(var k=0;k<maxx.length;k++){
            maxprice+=maxx[k]
        }
        $("#minprize").text(fmoney(minprice*2*$(".intext").val()))
        $("#maxprize").text(fmoney(maxprice*2*$(".intext").val()))
    },
    danguanprice1:function(){
        var minx=[],maxx=[],len=0
        $(".getshop .bfdl").each(function(){
            if($(this).hasClass("whitebfdl")){
                var temp=[]
                temp=$(this).attr('sc').trim().split(' ')
                minx.push(min(temp))
                maxx.push(max(temp))
                len+=temp.length
            }

        })
        var minprice= 0,maxprice=0
        for(var i=0;i<minx.length;i++){
            minprice+=minx[i]
        }
        for(var k=0;k<maxx.length;k++){
            maxprice+=maxx[k]
        }
        $("#minprize").text(fmoney(minprice*2*$(".intext").val()))
        $("#maxprize").text(fmoney(maxprice*2*$(".intext").val()))
        $("#total").text(len*$(".intext").val())
        $("#money").text($("#total").text()*2)
    }
}








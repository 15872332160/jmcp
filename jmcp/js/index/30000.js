"user strict";
/**
 * Created by Administrator on 2018/3/26/026.
 */
var typedan=0
if(X.urlSearch('danguan')=='true'){
    typedan=1
}else{
    typedan=0
}
var _={
    bt:30000,
    lotteryName:"竞彩足球",
    url: "lottery/footballggData",
    data:"",
    getDate:function(fn){
        $.ajax({
            url: APP.url+this.url,
            data:this.data,
            beforeSend: function(){X.load();},
            success: function(data){

                fn(data);
                X.unload();
                var t=new Date().getTime(),D={time:t,data:data};
                localStorage.setItem('jcData',JSON.stringify(D));
            },
            error: function () {X.unload();alert(APP.error.ajaxError);}
        });
    }
};
_.a1={//胜平负
    bt: _.bt,
    lotteryId: 501,
    bet:function(){
        var jcData=localStorage.getItem('jcData');
        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type: typedan
        }

        var fn=function(data){

            var M=data.matchData,h=[],len=data.matchData.length, mo,d, t,sco,temp,zc=[],kc=[],pv=[],sca=[],hc=[];
            for(var i=0;i<len;i++){
                mo=M[i].deployTime
                h.push('<div class="tit"><span class="fl"> '+mo+'</span><span>'+ M[i].matchCount +'场比赛可投注</span></div><div>')
                for(var j=0;j< M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);
                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font color="#FD5B5B" class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font color="#808080"><i class="fon">'+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    if(M[i].matchInfo[j].hostTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc=""
                    }else{
                        mc=M[i].matchInfo[j].hostTeamRankings
                    }
                    h.push('<ul class="pul pulPad"><li class="noborder" value="3" no="'+M[i].matchInfo[j].againsthNum+'" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' + M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}"><p class="textover">'+mc+M[i].matchInfo[j].hostTeam+'</p><font color="#808080">')
                    temp=M[i].matchInfo[j].spfSp
                    sco=temp.split("|")
                    h.push('<em>主胜</em><i class="fon fon1">'+fmoney(sco[0],2)+'</i></font></li><li class="w noborder" value="1"><p class="fon">VS</p>'+' <font color="#808080"><em>平</em><i class="fon">'+fmoney(sco[1],2)+'</i></font></li>')
                    if(M[i].matchInfo[j].guestTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc1=""
                    }else{
                        mc1=M[i].matchInfo[j].guestTeamRankings
                    }
                    h.push('<li value="0"><p class="textover">'+mc1+M[i].matchInfo[j].guestTeam+'</p><font color="#808080"><em>主负</em><i class="fon fon1">'+fmoney(sco[2],2)+'</i></font></li></ul></div>')
                    h.push('<ul class="detail">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }



                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }
                }
                h.push("</div>")
            }
            $(".tab").append(h.join(" "))
        }
        _.getDate(fn);
    }
}
_.a2={//总进球
    bt: _.bt,
    lotteryId: 503,
    bet:function(){
        var jcData=localStorage.getItem('jcData');
        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type:typedan
        }

        var fn=function(data){

            var h=[],M=data.matchData, t, d,r=[],qiu= 0,mc,mc1
            for(var i=0;i< M.length;i++){
                h.push('<div class="tit"><span class="fl"> '+M[i].deployTime+'</span><span>'+M[i].matchCount+'场比赛可投注</span></div><div>')

                for(var j=0;j<M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);

                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font style="color:#FD5B5B"  class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font ><i class="fon"> '+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    if(M[i].matchInfo[j].hostTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc=""
                    }else{
                        mc=M[i].matchInfo[j].hostTeamRankings
                    }
                    if(M[i].matchInfo[j].guestTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc1=""
                    }else{
                        mc1=M[i].matchInfo[j].guestTeamRankings
                    }
                    h.push('<dl class="fleft zjq"><dt class="zjqdt hundt"><span class="spandiv lfloat">'+mc+M[i].matchInfo[j].hostTeam+'</span><span class="lfloat spandiv fon" style="width:27%">VS</span><span class="spandiv  lfloat">'+mc1+M[i].matchInfo[j].guestTeam+'</span></dt><dd><ul class="pul hunpul">')
                    r=M[i].matchInfo[j].zjqSp.split('|');
                    for(var k=0;k<=7;k++){
                        h.push('<li data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}">')
                        if(k==7){
                            qiu='+'
                        }else{
                            qiu=""
                        }
                        h.push('<em class="fon emli2 fl">'+k+'</em>'+qiu+'  <span class="fon fon1 fr">'+fmoney(r[k],0)+'</span></li>')
                    }

                    h.push('</ul></dd></dl></div>')
                    h.push('<ul class="detail clear">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r mr10">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }

                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }

                }
                h.push("</div>")

            }
            $(".tab").append(h.join(" "))
        }

        _.getDate(fn);

    }
}
_.a3={//混合
    bt: _.bt,
    lotteryId: 509,
    bet:function(){
        var jcData=localStorage.getItem('jcData');

        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type:typedan
        }

        var fn=function(data){

            var h=[],M=data.matchData, t, d,r=[],w=[],strhtml='',cll,s=[]
            var teparr=['1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','5:0','5:1','5:2','胜其他','0:0','1:1','2:2','3:3','平其他','0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','0:5','1:5','2:5','负其他']
            var teparrValue=['1#0','2#0','2#1','3#0','3#1','3#2','4#0','4#1','4#2','5#0','5#1','5#2','4#3','0#0','1#1','2#2','3#3','4#4','0#1','0#2','1#2','0#3','1#3','2#3','0#4','1#4','2#4','0#5','1#5','2#5','3#4']
            var teparr2=['胜胜','胜平','胜负','平胜','平平','平负','负胜','负平','负负']
            var teparrValue2=['3_3','3_1','3_0','1_3','1_1','1_0','0_3','0_1','0_0']
            for(var i=0;i< M.length;i++){
                h.push('<div class="tit"><span class="fl"> '+M[i].deployTime+'</span><span>'+ M[i].matchCount +'场比赛可投注</span></div><div>')

                for(var j=0;j<M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);
                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font color="#FD5B5B" class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font color="#808080"><i class="fon"> '+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    var p1="",p2=""

                    if(M[i].matchInfo[j].hostTeamRankings=="null"||M[i].matchInfo[j].hostTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""){
                        p1=""
                    }else{
                        p1=M[i].matchInfo[j].hostTeamRankings
                    }
                    if(M[i].matchInfo[j].guestTeamRankings=="null"||M[i].matchInfo[j].guestTeamRankings==null||M[i].matchInfo[j].guestTeamRankings==""){
                        p2=""
                    }else{
                        p2=M[i].matchInfo[j].guestTeamRankings
                    }
                    h.push('<dl class="fleft"><dt class="hundt clear"><span class="lfloat rang"></span><span class="spandiv lfloat">'+p1+M[i].matchInfo[j].hostTeam+'</span><span class="lfloat spandiv w12 fon" >VS</span><span class="spandiv  lfloat">'+p2+M[i].matchInfo[j].guestTeam+'</span></dt><dd class="clear" style="width:100%">')
                    r=M[i].matchInfo[j].spfSp.split('|');
                    w=M[i].matchInfo[j].rqspfSp.split('|')
                    if(M[i].matchInfo[j].concedeNum<0){
                        cll='greenbg'
                        var fuhao=""
                    }else{
                        cll='redbg'
                        var fuhao='+'
                    }

                    h.push('<section class="score"><div class="rangqiu fon" >0</div><div class="'+cll+' rangqiu1 fon">'+fuhao+M[i].matchInfo[j].concedeNum+'</div></section>')
                    h.push('<ul class="pul zong zjqhun hunhe" lg="'+M[i].matchInfo[j].leagueName+'" vt="'+M[i].matchInfo[j].guestTeam+'" rq="'+M[i].matchInfo[j].concedeNum+'" id="'+M[i].matchInfo[j].matchCode+'" matchcode="'+M[i].matchInfo[j].matchCode+'" stopdate="'+M[i].deployTime+'" gamenum="'+M[i].deployTime.split(" ")[1]+M[i].matchInfo[j].againsthNum+'" hostteam="'+M[i].matchInfo[j].hostTeam+'" arryserial="'+j+'">')

                    if(M[i].matchInfo[j].passStatus!="null"||M[i].matchInfo[j].passStatus!=null||M[i].matchInfo[j].passStatus!=""){
                        s=M[i].matchInfo[j].passStatus.split("|")

                        if( s[0]==0){
                            h.push('<li class="noborder nobottom" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}" data-sp="'+fmoney(r[0],2)+'" data-gamenum="501" value="3" data-s="t1"><em>主胜</em>  <span class="fon fon1" >'+fmoney(r[0],2)+'</span></li>')
                            h.push('<li class="noborder nobottom" data-sp="'+fmoney(r[1],2)+'" data-gamenum="501" value="1" data-s="t2"><em>平</em>  <span class="fon fon1" >'+fmoney(r[1],2)+'</span></li>')
                            h.push('<li class="nobottom" data-gamenum="501" value="0" data-s="t3" data-sp="'+fmoney(r[2],2)+'"><em>主负</em>  <span class="fon fon1" >'+fmoney(r[2],2)+'</span></li>')
                        }else{
                            h.push('<li  class="weikai noborder nobottom" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}"></li><li  class="weikai noborder nobottom">未开售</li><li  class="weikai  nobottom"></li>')
                        }
                    }

                    h.push('<li class="opendoc" gt="" sc="" numIndex="'+i+'_'+j+'" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}"><span>展开</span><span>全部</span></li>');
                    h.push('<li class="noborder" data-gamenum="511" value="3R" data-s="t4" data-sp="'+fmoney(w[0],2)+'"><em>主胜</em> <span class="fon fon1" >'+fmoney(w[0],2)+'</span></li>')
                    h.push('<li class="noborder" data-gamenum="511" value="1R" data-s="t5" data-sp="'+fmoney(w[1],2)+'"><em>平</em> <span class="fon fon1">'+fmoney(w[1],2)+'</span></li>')
                    h.push('<li data-gamenum="511" value="0R" data-s="t6" data-sp="'+fmoney(w[2],2)+'"><em>主负</em> <span class="fon fon1" >'+fmoney(w[2],2)+'</span></li>')

                    h.push('</ul>')
                    h.push('</dd>')
                    h.push('</dl></div>')
                    h.push('<ul class="detail clear">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r mr10">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }

                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }

                    strhtml+='<div class="openwin" i="'+i+'_'+j+'"><div class="titwin"><span>'+p1+M[i].matchInfo[j].hostTeam+'</span><span class="mlr">VS</span>'+p2+M[i].matchInfo[j].guestTeam+'</div>'




                    strhtml+='<div class="clear top2"><span class="tit_n cor3">总进球</span><div class="clear fl wid95"><ul class="clear">'
                    var tepzjq=M[i].matchInfo[j].zjqSp.split('|');
                    for(var q=0;q<=7;q++){
                        if(q==7){ var qiu='+'}
                        else{ var qiu=""}
                        if(q>=4){
                            strhtml+='<li class="hhzjqli" value="'+q+'B" sc="'+tepzjq[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="emli">'+q+qiu+'</em><span class="grey emli fon fon1">'+fmoney(tepzjq[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="hhzjqli" value="'+q+'B" sc="'+tepzjq[q]+'"><em class="emli">'+q+qiu+'</em><span class="grey emli fon fon1">'+fmoney(tepzjq[q],2)+'</span></li>'
                        }
                    }

                    strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor2">半全场</span><div class="clear fl wid95"><ul>'
                    var tepbqc=M[i].matchInfo[j].bqcSp.split("|")
                    for(var q=0;q<=8;q++){
                        if(q>=6){
                            strhtml+='<li class="hhbqcli" value="'+teparrValue2[q]+'" sc="'+tepbqc[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="emli">'+teparr2[q]+'</em><span class="grey emli fon fon1">'+fmoney(tepbqc[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="hhbqcli" value="'+teparrValue2[q]+'" sc="'+tepbqc[q]+'"><em class="emli">'+teparr2[q]+'</em><span class="grey emli fon fon1">'+fmoney(tepbqc[q],2)+'</span></li>'
                        }
                    }























                    strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor1">比<br>分</span><div class="clear fl wid95"><ul class="clear">'
                    var tep=M[i].matchInfo[j].bfSp.split("|")

                    for(var q=0;q<=12;q++){
                        if(q==12){
                            strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'" style="width:28%;"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                            continue;
                        }
                        strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                    }
                    strhtml+='</ul><ul class="clear">'
                    for(var q=13;q<=17;q++){
                        if(q==17){
                            strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'" style="width:42.2%;"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                            continue;
                        }
                        strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                    }
                    strhtml+='</ul><ul class="clear">'
                    for(var q=18;q<=30;q++){
                        if(q>=25 && q!=30){
                            strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'" style="border-bottom:1px solid #c9cbc9"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                            continue;
                        }else if(q==30){
                            strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'" style="width:28%;border-bottom:1px solid #c9cbc9"  sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="hhbfli" value="'+teparrValue[q]+'" sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }
                    }
                    //var tepbqc=M[i].matchInfo[j].bqcSp.split("|")
                    //strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor2">半全场</span><div class="clear fl wid95"><ul>'
                    //
                    //for(var q=0;q<=8;q++){
                    //    if(q>=6){
                    //        strhtml+='<li class="hhbqcli" value="'+teparrValue2[q]+'" sc="'+tepbqc[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="emli">'+teparr2[q]+'</em><span class="grey emli fon fon1">'+fmoney(tepbqc[q],2)+'</span></li>'
                    //    }else{
                    //        strhtml+='<li class="hhbqcli" value="'+teparrValue2[q]+'" sc="'+tepbqc[q]+'"><em class="emli">'+teparr2[q]+'</em><span class="grey emli fon fon1">'+fmoney(tepbqc[q],2)+'</span></li>'
                    //    }
                    //}
                    //var tepzjq=M[i].matchInfo[j].zjqSp.split('|');
                    //strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor3">总进球</span><div class="clear fl wid95"><ul>'
                    //for(var q=0;q<=7;q++){
                    //    if(q==7){ var qiu='+'}
                    //    else{ var qiu=""}
                    //    if(q>=4){
                    //        strhtml+='<li class="hhzjqli" value="'+q+'B" sc="'+tepzjq[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="emli">'+q+qiu+'</em><span class="grey emli fon fon1">'+fmoney(tepzjq[q],2)+'</span></li>'
                    //    }else{
                    //        strhtml+='<li class="hhzjqli" value="'+q+'B" sc="'+tepzjq[q]+'"><em class="emli">'+q+qiu+'</em><span class="grey emli fon fon1">'+fmoney(tepzjq[q],2)+'</span></li>'
                    //    }
                    //}
                    strhtml+='</ul></div></div>'
                    strhtml+='<section class="textc  mt1 sediv" ><a href="javascript:;" class="mr20" id="hhclose">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</a><a id="hhok" href="javascript:;" class="commBac" >确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</a></section></div>'
                }
                h.push("</div>")

            }
            $(".tab").append(h.join(" "))
            $("#jmcp").append(strhtml)
        }

        _.getDate(fn);

    }
}
_.a4={//让球胜平负
    bt: _.bt,
    lotteryId:511,
    bet:function(){
        var jcData=localStorage.getItem('jcData');
        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type:typedan
        }

        var fn=function(data){

            var h=[],M=data.matchData, t, d,r=[],w=[],cll
            for(var i=0;i< M.length;i++){
                h.push('<div class="tit"><span class="fl">'+M[i].deployTime+'</span><span>'+M[i].matchCount+'场比赛可投注</span></div><div>')

                for(var j=0;j<M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);
                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font color="#FD5B5B" class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font color="#808080"><i class="fon"> '+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    h.push('<dl class="fleft mrc1"><dt class="w100 hundt" style="padding-left: 5%"><span class="spandiv lfloat">'+M[i].matchInfo[j].hostTeamRankings+M[i].matchInfo[j].hostTeam+'</span><span class="lfloat spandiv w12 fon">VS</span><span class="spandiv  lfloat">'+M[i].matchInfo[j].guestTeamRankings+M[i].matchInfo[j].guestTeam+'</span></dt><dd class="clearfix rfdd">')

                    w=M[i].matchInfo[j].rqspfSp.split('|')
                    var fuhao=""
                    if(M[i].matchInfo[j].concedeNum<0){
                        cll='green'
                        fuhao=""
                    }else{
                        cll='red'
                        fuhao="+"
                    }

                    h.push('<div class="score"><span class="'+cll+' fon">'+fuhao+M[i].matchInfo[j].concedeNum+'</span></div>')
                    h.push('<ul class="pul zong rfdl fl"><li class="noborder" value="3R" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}">')
                    h.push('<em>主胜</em><span class="fon1 fon" >'+fmoney(w[0],2)+'</span></li>')
                    h.push('<li class="noborder " value="1R"><em>平</em>  <span class="fon fon1" >'+fmoney(w[1],2)+'</span></li>')
                    h.push('<li value="0R"><em>主负</em>  <span class="fon fon1">'+fmoney(w[2],2)+'</span></li>')

                    h.push('</ul></dd></dl></div>')
                    h.push('<ul class="detail">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r mr10">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }

                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }

                }
                h.push("</div>")

            }
            $(".tab").append(h.join(" "))
        }

        _.getDate(fn);

    }
}
_.a5={//比分
    bt: _.bt,
    lotteryId:502,
    bet:function(){
        var jcData=localStorage.getItem('jcData');
        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type:typedan
        }

        var fn=function(data){

            var h=[],M=data.matchData, t, d,r=[],w=[],cll,strhtml='',mc,mc1
            var teparr=['1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','5:0','5:1','5:2','胜其他','0:0','1:1','2:2','3:3','平其他','0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','0:5','1:5','2:5','负其他']
            for(var i=0;i< M.length;i++){
                h.push('<div class="tit"><span class="fl">'+M[i].deployTime+'</span><span>'+M[i].matchCount+'场比赛可投注</span></div><div>')

                for(var j=0;j<M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);
                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font color="#FD5B5B" class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font color="#808080"><i class="fon"> '+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    if(M[i].matchInfo[j].hostTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc=""
                    }else{
                        mc=M[i].matchInfo[j].hostTeamRankings
                    }
                    if(M[i].matchInfo[j].guestTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc1=""
                    }else{
                        mc1=M[i].matchInfo[j].guestTeamRankings
                    }
                    h.push('<dl class="fleft"><dt class="bfcl hundt clear"><span class="spandiv lfloat">'+mc+M[i].matchInfo[j].hostTeam+'</span><span class="lfloat spandiv w10 fon">VS</span><span class="spandiv  lfloat">'+mc1+M[i].matchInfo[j].guestTeam+'</span></dt><dd class="rfdd">')

                    h.push('<div class="bfdl opendoc" numIndex="'+i+'_'+j+'" data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}">')
                    h.push('点此展开投注区')
                    h.push('</div></dd></dl></div>')
                    h.push('<ul class="detail">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r mr10">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }

                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }
                    strhtml+='<div class="openwin" i="'+i+'_'+j+'"><div class="titwin"><span>'+M[i].matchInfo[j].hostTeam+'</span><span class="mlr">VS</span>'+M[i].matchInfo[j].guestTeam+'</div>'
                    strhtml+='<div class="clear top2"><span class="tit_n cor4">主胜</span><div class="clear fl wid95"><ul>'
                    var tep=M[i].matchInfo[j].bfSp.split("|")

                    for(var q=0;q<=12;q++){
                        if(q==12){
                            strhtml+='<li class="bfli zscor" sc="'+tep[q]+'" style="width:28%;border-bottom:1px solid #c9cbc9"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }else if(q>=7) {
                            strhtml+='<li class="bfli zscor" sc="'+tep[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="bfli zscor" sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }
                    }
                    strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor5">平</span><div class="clear fl wid95"><ul >'
                    for(var q=13;q<=17;q++){
                        strhtml+='<li class="bfli pcor" sc="'+tep[q]+'" style="border-bottom:1px solid #c9cbc9;width:19.6%"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                    }
                    strhtml+='</ul></div></div><div class="clear top2"><span class="tit_n cor6">主负</span><div class="clear fl wid95"><ul>'
                    for(var q=18;q<=30;q++){
                        if(q==30){
                            strhtml+='<li class="bfli zfcor" sc="'+tep[q]+'" style="width:28%;border-bottom:1px solid #c9cbc9"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }else if(q>=25){
                            strhtml+='<li class="bfli zfcor" sc="'+tep[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="bfli zfcor" sc="'+tep[q]+'"><em class="fon">'+teparr[q]+'</em><br><span class="fon1 fon">'+fmoney(tep[q],2)+'</span></li>'
                        }
                    }
                    strhtml+='</ul></div></div><section class="textc mt1 sediv"><a href="javascript:;" class="mr20" id="close">取消</a><a href="javascript:;" class="commBac" id="ok">确定</a></section></div>'

                }
                h.push("</div>")

            }
            $(".tab").append(h.join(" "))
            $("#jmcp").append(strhtml)
        }
        _.getDate(fn);
    }
}
_.a6={//半全场
    bt: _.bt,
    lotteryId:504,
    bet:function(){
        var jcData=localStorage.getItem('jcData');
        _.data={
            version:APP.version,
            requestType:APP.type,
            lotteryId:this.lotteryId,
            type:typedan
        }

        var fn=function(data){

            var h=[],M=data.matchData, t, d,r=[],w=[],cll,strhtml='',mc,mc1;
            var teparr=['胜胜','胜平','胜负','平胜','平平','平负','负胜','负平','负负']

            for(var i=0;i< M.length;i++){
                h.push('<div class="tit"><span class="fl"> '+M[i].deployTime+'</span><span>'+M[i].matchCount+'场比赛可投注</span></div><div>')

                for(var j=0;j<M[i].matchInfo.length;j++){
                    t=String(M[i].matchInfo[j].sellStopTime);
                    d= t.substring(8,10)+":"+ t.substring(10,12);
                    h.push('<section class="borderTop pt1" ><div class="clear"><div class="leftpart textover mt11" ><span class="matchname" style="color:'+M[i].matchInfo[j].leagueColor+'">')
                    h.push(M[i].matchInfo[j].leagueName+'</span><br><font color="#FD5B5B" class="fon">'+M[i].matchInfo[j].againsthNum+'</font><br><font color="#808080"><i class="fon"> '+d+'</i>截至</font><br>')
                    h.push('<span class="arrow"></span></div>')
                    if(M[i].matchInfo[j].hostTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc=""
                    }else{
                        mc=M[i].matchInfo[j].hostTeamRankings
                    }
                    if(M[i].matchInfo[j].guestTeamRankings==null||M[i].matchInfo[j].hostTeamRankings==""||M[i].matchInfo[j].hostTeamRankings=="null"){
                        mc1=""
                    }else{
                        mc1=M[i].matchInfo[j].guestTeamRankings
                    }
                    h.push('<dl class="fleft"><dt class="bfcl hundt clear"><span class="spandiv lfloat">'+mc+M[i].matchInfo[j].hostTeam+'</span><span class="lfloat spandiv fon w10" >VS</span><span class="spandiv  lfloat">'+mc1+M[i].matchInfo[j].guestTeam+'</span></dt><dd class="rfdd">')

                    h.push('<div class="bfdl opendoc" numIndex='+i+'_'+j+' data="{no:' + M[i].matchInfo[j].matchCode + ',end:false,name:\'' +M[i].matchInfo[j].againsthNum+ '\',h:\'' + M[i].matchInfo[j].hostTeam + '\',g:\'' + M[i].matchInfo[j].guestTeam + '\',rq:\'' + M[i].matchInfo[j].concedeNum + '\',dw:\'' + M[i].deployTime + '\'}">')
                    h.push('点此展开投注区')
                    h.push('</div></dd></dl></div>')
                    h.push('<ul class="detail">')
                    if(M[i].matchInfo[j].historyScore=='null'||M[i].matchInfo[j].historyScore==""||M[i].matchInfo[j].historyScore==null){

                        h.push('<li class="w">历史交锋</li><li></li><li class="w">近期战绩</li>')
                    }else{

                        var str=M[i].matchInfo[j].historyScore

                        hc=str.split(",")
                        h.push('<li class="w">历史交锋</li><li>主队：'+hc[0]+'胜'+hc[1]+'平'+hc[2]+'负</li><li class="w">近期战绩</li>')
                    }

                    if(M[i].matchInfo[j].hostRecent=='null'||M[i].matchInfo[j].hostRecent==""||M[i].matchInfo[j].hostRecent==null){
                        h.push('<li><span class="l"></span>')
                    }else{
                        zc=M[i].matchInfo[j].hostRecent.split(",")
                        h.push('<li><span class="l">'+zc[0]+'胜'+zc[1]+'平'+zc[2]+'负</span>')
                    }

                    if(M[i].matchInfo[j].visitRecent=='null'||M[i].matchInfo[j].visitRecent==""||M[i].matchInfo[j].visitRecent==null){
                        h.push('<span class="r"></span></li><li class="w">平均赔率</li>')

                    }else{
                        kc=M[i].matchInfo[j].visitRecent.split(",")
                        h.push('<span class="r mr10">'+kc[0]+'胜'+kc[1]+'平'+kc[2]+'负</span></li><li class="w">平均赔率</li>')
                    }

                    if(M[i].matchInfo[j].betCounter=='null'||M[i].matchInfo[j].betCounter==""||M[i].matchInfo[j].betCounter==null){
                        h.push('<li><span class="l"></span><span></span><span class="r"></span><span></span><span></span><span></span></li></ul></section>')
                    }else{
                        sca=M[i].matchInfo[j].betCounter.split(',')
                        h.push('<li><span class="l">'+sca[0]+'</span><span>'+sca[1]+'</span><span class="r">'+sca[2]+'</span><span>'+sca[3]+'</span><span>'+sca[4]+'</span><span>'+sca[5]+'</span></li></ul></section>')
                    }
                    strhtml+='<div class="openwin bqc" i="'+i+'_'+j+'"><div class="titwin"><span>'+M[i].matchInfo[j].hostTeam+'</span><span class="mlr">VS</span>'+M[i].matchInfo[j].guestTeam+'</div>'
                    strhtml+='<ul class="clear">'
                    var tep=M[i].matchInfo[j].bqcSp.split("|")

                    for(var q=0;q<=8;q++){
                        if(q>=6){
                            strhtml+='<li class="bfli" sc="'+tep[q]+'" style="border-bottom:1px solid #c9cbc9"><em class="emli">'+teparr[q]+'</em><span class="grey emli fon fon1">'+fmoney(tep[q],2)+'</span></li>'
                        }else{
                            strhtml+='<li class="bfli" sc="'+tep[q]+'"><em class="emli">'+teparr[q]+'</em><span class="grey emli fon fon1">'+fmoney(tep[q],2)+'</span></li>'
                        }
                    }
                    strhtml+='</ul><div class="clearfix"></div>'

                    strhtml+='<section class="textc mt1 sediv"><a href="javascript:;" class="mr20" id="close">取消</a><a href="javascript:;" class="commBac   " id="ok">确定</a></section></div>'

                }
                h.push("</div>")

            }
            $(".tab").append(h.join(" "))
            $("#jmcp").append(strhtml)
        }
        _.getDate(fn);
    }
}
var lid=30000,pt= X.urlSearch('pt'),l= X.urlSearch('l')
if(!pt){pt='a3';l=0;}
$.extend(X.c,_[pt], X.JS)
X.c.init();



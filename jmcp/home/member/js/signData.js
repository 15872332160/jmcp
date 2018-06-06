/**
 * Created by Administrator on 2018-01-23.
 */
$(function(){

    $('.sign_btn button').on('click',function(){
        $(this).toggleClass('active');
    })


    var signFun = function(){
        var dateArray=[1,6,9,11];  //已经签到的
        var JcArray=[5,15,25];    //金猫竞彩日
        var $dateBox = $('#qiandao-list'),  //日历容器
            $currentDate = $('.current-date i'), //签到月份title
            $qiandaoBnt = $('#just-qiandao'), //签到按钮
            _html = '',  //生成日历内容
            _handle = true,
            myDate = new Date(); //服务器时间
            _thisDate= myDate.getDate(); //当前日期

        $currentDate.text(parseInt(myDate.getMonth() + 1));
        var monthFirst = new Date(myDate.getFullYear(),parseInt(myDate.getMonth()),1).getDay();
        var D = new Date(myDate.getFullYear(),parseInt(myDate.getMonth()+1),0);
        var totalDay = D.getDate(); //当前月份总天数

        for(var i=0;i<42;i++){
            if(i < _thisDate){
                _html+=' <li><div class="qiandao-icon2"></div></li>';
            }else{
                _html+=' <li><div class="qiandao-icon"></div></li>';
            }
        }
        $dateBox.html(_html);  //生成日历网格

        var $dateLi= $dateBox.find('li');
        for(var i=0;i<totalDay;i++){
            $dateLi.eq(i+monthFirst).addClass("date"+parseInt(i+1)).find('div').html(parseInt(i+1));

            //已签到
            for(var j=0;j<dateArray.length;j++){
                if(i == dateArray[j]){
                    $dateLi.eq(i+monthFirst).addClass('qiandao');
                }
            }

        }
        $('.date'+_thisDate).addClass('able-qiandao');
        $('.date'+totalDay).nextAll().remove();

    }();
})
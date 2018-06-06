/**
 * Created by Administrator on 2018-01-30.
 */
X.user.close=function(){location.href='home.html';};
X.UCB=function(d){//身份验证 回调
    if(d.flag==1){
        $("#jmcp").show();
        $("#uName").html("您好,"+d.username);
    }else{
        X.user.signIn();
    }
};
X.home={
    signOut:function(){
        var d={
            version:APP.version,
            requestType:APP.type
        };
        $.ajax({
            url:APP.url+'user/exit',
            data:d,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    location.href ='/';
                }else{
                    alert(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    userInfo:function(){
        var d={
            version:APP.version,
            requestType:APP.type
        };
        $.get(APP.url+'core/user/queryBalance',d,function(data){
            if(data.flag==1){
                $("#uName").after("<p>余额:"+data.balance+"元</p><p>彩金:"+data.hongbao+"元</p>");
            }
        });
    },
    mobile:{
        set:function(){
            var h=[];
            h.push('<div id="signUp2">');
            h.push('<div class="signLine"><input class="input2" type="tel" id="resetMobile" placeholder="输入手机号"/><p id="mobileCount"><a onclick="X.home.mobile._getCode()">获取验证码</a></p></div>');
            h.push('<div class="signLine"><input type="tel" id="resetCode" placeholder="输入验证码"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.mobile.bind()" class="btn1">绑定</a></div>');
            h.push('</div>');
            $('#withdraw').html(h.join(''));
        },
        bind:function(){
            var d={
                mobile:$("#resetMobile").val().trim(),
                verifyCode:$("#resetCode").val().trim(),
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+'user/checkMobileVerifyCode',
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    if(data.flag==1){
                        location.href ='home.info.html';
                    }else{
                        alert(data.errorMessage);
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        count:function(){
            clearTimeout(X.home.mobile.k);
            if(this.m>0){
                this.m--;
                $("#mobileCount").html(this.m+"秒后重发");
                this.k=setTimeout('X.home.mobile.count()',1000);
            }else{
                $("#mobileCount").html('<a onclick="X.home.mobile._getCode()">重新发</a>');
            }
        },
        lock:false,
        _getCode:function(){
            if(this.lock){
                return false;
            }
            this.lock=true;
            var d={
                mobile:$("#resetMobile").val().trim(),
                //timePara:new Date().getTime(),
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+'user/sendMobile',
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    X.home.mobile.lock=true;
                    if(data.flag==1){
                        X.home.mobile.m=60;
                        X.home.mobile.count();
                    }else{
                        alert(data.errorMessage);
                        $("#mobileCount").html('<a onclick="X.home.mobile._getCode()">重新发</a>');
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        }
    },
    recharge:{
        open:function(x){
            $("#User").html(x).show();
            $("#jmcp").hide();
        },
        close:function(){
            $("#User").html('').hide();
            $("#jmcp").show();
        },
        alipay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>支付宝通道①</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._alipay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _alipay:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/bk_aliPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.alipayForm);
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        wxpay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>微信充值</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._wxpay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _wxpay:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/bk_wxPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.alipayForm);
                            X.home.recharge.close();
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        wxjspay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>微信充值①</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._wxjspay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _wxjspay:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/h5_wxPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.alipayForm)
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        QQpay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>QQ钱包支付</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._QQpay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _QQpay:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/bk_qqPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.alipayForm);
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        alipay2:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>支付宝通道②</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._alipay2()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _alipay2:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'/core/deposit/zjAliPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.payUrl);
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        alipay3:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>支付宝通道③</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._alipay3()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _alipay3:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'/core/deposit/h5_aliPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            alijswap(data.alipayForm,"");
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        huichaopay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>借记卡快捷</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._huichaopay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _huichaopay:function(){
            var d={
                version:APP.version,
                requestType:APP.type,
                channel:"jdPayDebit"
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'/core/deposit/jdPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.payForm);
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        huichaopay2:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>信用卡快捷</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._huichaopay2()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _huichaopay2:function(){
            var d={
                version:APP.version,
                requestType:APP.type,
                channel:"jdPayDebitCredit"
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'/core/deposit/jdPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            $("#jmcp").html(data.payForm);
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        yiBaoPay:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>易宝支付</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="text" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._yiBaoPay()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _yiBaoPay:function(){
            var d={
                version:APP.version,
                requestType:APP.type,
                type:0
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/yiBaoPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            window.location.href=data.alipayForm;
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        },
        yiBaoPay_weiXin:function(){
            var h=[];
            h.push('<header><a onclick="X.home.recharge.close();" class="back"></a><h1>微信支付</h1></header>');
            h.push('<div class="signBox">');
            h.push('<div class="signLine"></div>');
            h.push('<div class="signLine"><input type="tel" id="money" placeholder="输入金额"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.recharge._yiBaoPay_weiXin()" class="btn1">充值</a></div>');
            h.push('</div>');
            this.open(h.join(''));
        },
        _yiBaoPay_weiXin:function(){
            var d={
                version:APP.version,
                requestType:APP.type,
                type:1
            };
            d.money=$("#money").val().trim();
            if(d.money){
                $.ajax({
                    url:APP.url+'core/deposit/yiBaoPay',
                    data:d,
                    beforeSend:function(){X.load();},
                    success:function(data){
                        X.unload();
                        if(data.flag==1){
                            var h=[];
                            h.push('<div style=" width:80%; height:80%;margin:0 auto; margin-top:40px; text-align:center">');
                            h.push('<img src="http://data.jinmaocp.com/images/weiXinImg/'+data.payId+'.jpg" style="width:200px; height:200px; border:#fd553a 1px dashed;" />');
                            h.push('<p style="color:#ffffff;font-size:80%; letter-spacing:2px; margin-top:40px; background:#fd553a; width:80px; height:25px; line-height:25px; text-align:center; border-radius:3px">*温馨提醒</p>');
                            h.push('<P style="line-height:30px; font-size:80%; text-align:left">');
                            h.push('请按如下方法操作<br/>');
                            h.push('方法一：请长按二维码，点击弹框中“识别图中的二维码”进入微信支付界面；<br/>方法二：若方法一中未出现“识别图中的二维码”，请将二维码保存到手机，打开微信扫一扫功能，选择“从相册中选取二维码”进入微信支付界面。');;
                            h.push('</P>');
                            h.push('</div>');
                            $("#jmcp").html(h.join(''));
                            $("#User").hide();
                            $("#jmcp").show();
                        }else{
                            alert(data.errorMessage);
                        }
                    },
                    error:function(){X.unload();alert(APP.error.ajaxError);}
                });
            }else{
                alert('请输入合法金额');
            }
        }
    },
    withdraw:{
        init:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+"core/user/queryBankCard",
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    if(data.isBankBind){
                        X.home.withdraw.withdraw(data);
                    }else{
                        X.home.withdraw.unbind();
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        unbind:function(){
            var h=[];
            h.push('<div class="signLine"><input type="text" id="name" placeholder="用户姓名"/></div>');
            h.push('<div class="signLine"><input type="text" id="identityNumber" placeholder="身份证"/></div>');
            h.push('<div class="signLine"><select id="bankName">');
            h.push('<option value="中国工商银行" >工商银行(推荐)</option>');
            h.push('<option value="中国农业银行" >农业银行(推荐)</option>');
            h.push('<option value="中国建设银行" >建设银行(推荐)</option>');
            h.push('<option value="招商银行" >招商银行(推荐)</option>');
            h.push('<option value="交通银行" >交通银行</option>');
            h.push('<option value="中国银行" >中国银行</option>');
            h.push('<option value="中国邮政储蓄银行" >邮政储蓄银行</option>');
            h.push('<option value="中国民生银行" >民生银行</option>');
            h.push('<option value="兴业银行" >兴业银行</option>');
            h.push('<option value="华夏银行" >华夏银行</option>');
            h.push('<option value="中国光大银行" >光大银行</option>');
            h.push('<option value="中信银行" >中信银行</option>');
            h.push('<option value="浦发银行" >浦发银行</option>');
            h.push('<option value="广发银行" >广发银行</option>');
            h.push('</select></div>');
            h.push('<div class="signLine"><input type="text" id="bankAccount" placeholder="银行账号"/></div>');
            h.push('<div class="signLine"><input type="text" id="accountName" placeholder="开户名称"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.withdraw.bind()" class="btn1">绑定</a></div>');
            $("h1").html('绑定银行信息');
            $("#withdraw").html(h.join(''));
        },
        bind:function(){
            var data={
                name:$("#name").val().trim(),
                identityNumber:$("#identityNumber").val().trim(),
                bankAccount:$("#bankAccount").val().trim(),
                bankName:$("#bankName").val(),
                accountName:$("#accountName").val(),
                version:APP.version,
                requestType:APP.type
            };
            if(!data.bankAccount.isInt()){
                return alert('卡号不对');
            }
            if(data.identityNumber.isID()){
                return alert(data.identityNumber.isID());
            }
            if( !data.name||!data.identityNumber||!data.bankAccount||!data.bankName||!data.accountName ){
                return alert('信息不能为空');
            }
            $.ajax({
                url:APP.url+"core/user/bind_bank_card",
                data:data,
                beforeSend:function(){X.load();},
                success:function(d){
                    X.unload();
                    if(d.flag==1){
                        X.home.withdraw.init();
                    }else{
                        alert(d.message);
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        withdraw:function(DD){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+"core/user/withdraw_view",
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    var html=[];
                    html.push('<div class="signLine l">银行：'+DD.cardAccount+'</div>');
                    html.push('<div class="signLine l">卡号：'+DD.bankAccount+'</div>');
                    html.push('<div class="signLine l">开户人姓名：'+DD.name+'</div>');
                    html.push('<div class="signLine l">开户人证件号：'+DD.identify+'</div>');
                    html.push('<div class="signLine l">可提金额：'+data.canWithDrawMoney+'</div>');
                    if(data.flag==1){
                        html.push('<div class="signLine"><input type="tel" id="money" class="input7" placeholder="每次至少10元，每天可提现3次"/></div>');
                        html.push('<div class="signLine mt10"><a class="btn1" onclick="X.home.withdraw._withdraw()">提款</a></div>');
                    }else{
                        html.push('<div class="signLine red">'+data.errorMessage+'</div>');
                        html.push('<div class="signLine mt10"><a class="btn1 end" >提款</a></div>');
                    }
                    html.push('<div class="signLine widthDrawText"><p>绑定修改，需联系客服</p><p>1、您的提款账户开户姓名必须和真实姓名一致，否则将会取消提款！</p><p>');
                    html.push('2、周一到周日9：00—17:00前的提款申请当天处理，最快30分钟内到账，最晚当天内到账，假如第2天还未到账，请联系本站客服3、为了防止少数用户利用信用卡套现、洗钱和网络钓鱼等违法行为，保护正常用户的资金安全，本站针对异常提款进行严格审核（充值资金需消费满30%才能提款）4、周末大额（5万以上）提款提前1个工作日联系本站客服5、17:00后的提款申请次日处理。</p></div>');
                    $("h1").html('提款');
                    $("#withdraw").html(html.join(''));
                    X.unload();
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        _withdraw:function(){
            var d={
                money:$("#money").val().trim(),
                version:APP.version,
                requestType:APP.type
            };
            if( !d.money){
                return alert('请输入金额');
            }
            $.ajax({
                url:APP.url+"core/user/withdraw",
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    console.log(data);
                    if(data.flag==1){
                        location.href='home.withdraw.callback.html';
                        //X.home.withdraw.init();
                    }else{
                        alert(data.errorMessage);
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        }
    },
    password:function(){
        var d={
            password:$("#password0").val().trim(),
            newPassword:$("#password1").val().trim(),
            password2:$("#password2").val().trim(),
            version:APP.version,
            requestType:APP.type
        };
        if(!d.password||!d.newPassword){
            return alert('请输入密码');
        }
        if(d.newPassword!=d.password2){
            return alert('两次密码不一致');
        }
        $.ajax({
            url:APP.url+"core/user/updatePassword",
            data:d,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    alert('修改成功');
                    $("#password0").val("");
                    $("#password1").val("");
                    $("#password2").val("");
                }else{
                    alert(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    capital:{
        tradeType:0,
        firstRow:0,
        end:false,
        lock:false,
        get:function(){
            if(this.lock ){
                return false;
            }
            if(this.end){
                $('$uT').show().html('没有了...');
                return false;
            }
            this.lock=true;
            var d={
                tradeType:this.tradeType,
                firstRow:this.firstRow,
                fetchSize:10,
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+'core/user/capital_detail',
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    var h=[],i= 0,D=data.list,len= D.length, C,I;
                    for(i;i<len;i++){
                        C=D[i].isIn==1?'red':'green';
                        I=D[i].isIn==1?'+':'-';
                        h.push('<li>');
                        if(D[i].isScheme){
                            h.push('<a href="scheme.html?serialNo='+D[i].serialNo+'">');
                        }else{
                            h.push('<a>')
                        }
                        h.push('<p><em>'+D[i].tradeTypeDesc+'</em><var class="'+C+'">'+I+D[i].tradeMoney+'元</var></p><p><em>'+D[i].tradeDate+'</em><var>余额'+D[i].balance+'元</var></p></a></li>');
                    }
                    if(len>9){
                        X.home.capital.firstRow+=10;
                        $("#uTip").html('点击加载更多');
                    }else{
                        X.home.capital.stop=true;
                        $("#uTip").html('没有了');
                    }
                    X.home.capital.lock=false;
                    $("#capital").append(h.join(''));
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        set:function(t,p,e){
            if(t){this.tradeType=t;}
            this.firstRow=p;
            this.get();
            this.lock=false;
            this.end=false;
            $("#capital").html('')
            $(e).siblings().removeClass('on').end().addClass('on');
        }
    },
    history:{
        type:0,
        firstRow:0,
        end:false,
        lock:false,
        get:function(){
            if(this.lock ){
                return false;
            }
            if(this.end){
                $('$uT').show().html('没有了...');
                return false;
            }
            this.lock=true;
            var d={
                type:this.type,
                firstRow:this.firstRow,
                fetchSize:10,
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+'core/lottery/mySchemeHistory',
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    var h=[],i= 0,len=data.length;
                    for(i;i<len;i++){
                        h.push('<li><a href="scheme.html?serialNo='+data[i].serialNo+'"><p><img src="'+APP.res+'image/cz/'+data[i].clientLotteryId+'.png" alt=""/></p><div class="uIcon1"><div style="height:25px"><span>');
                        if(data[i].issue!='unknow'){
                            h.push('第'+data[i].issue+'期');
                        }
                        if(data[i].status==4){
                            var kkk='<span class="red" style="float:right">'+data[i].hmfaStatusDesc+'</span>';
                        }else{
                            var kkk='<span style="float:right;margin-right:15px">'+data[i].hmfaStatusDesc+'</span>';
                        }

                        h.push(data[i].buyDetailTime+'</span>'+kkk+'</div><div style="height:25px;top:30px"><span>' +data[i].hmfaTypeDesc+'  '+data[i].money+'元</span><span style="float:right;margin-right:15px">'+data[i].lotteryName+'</span></div>');

                        h.push('</div></a></li>');
                    }
                    if(data.length>9){
                        X.home.history.firstRow+=10;
                        $("#uTip").html('点击加载更多');
                    }else{
                        X.home.history.stop=true;
                        $("#uTip").html('没有了');
                    }
                    X.home.history.lock=false;
                    $("#history").append(h.join(''));
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        set:function(t,p,e){
            this.type=t;
            this.firstRow=0;
            this.lock=false;
            this.end=false;
            $('#history').html('')
            this.get();
            $(e).siblings().removeClass('on').end().addClass('on');
        }
    },
    info:{
        init:function(){
            var d={
                version:APP.version,
                requestType:APP.type
            };
            $.ajax({
                url:APP.url+'core/user/queryUserInfo',
                data:d,
                beforeSend:function(){X.load();},
                success:function(data){
                    X.unload();
                    if(data.bindingIdentify){
                        X.home.info.bind(data);
                    }else{
                        X.home.info.unbind();
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        },
        unbind:function(){
            var h=[];
            h.push('<div class="signLine"><input type="text" id="realName" placeholder="用户姓名"/></div>');
            h.push('<div class="signLine"><input type="text" id="identityNumber" placeholder="身份证"/></div>');
            h.push('<div class="signLine mt10"><a onclick="X.home.info._bind()" class="btn1">绑定</a></div>');
            $("h1").html('绑定个人信息');
            $("#withdraw").html(h.join(''));
        },
        bind:function(data){
            var html=[], N='<a>(不可修改)</a>',B='<a href="home.withdraw.html">未绑定</a>',M='<a href="home.mobile.html">未绑定</a>';
            if(data.isupdateuname==1){
                N='(<a href="home.setName.html">未设置</a>)';
            }
            html.push('<div class="signLine l tip"><label>用户昵称：</label><span>'+data.username+N+'</span></div>');
            if(data.bindingIdentify){
                html.push('<div class="signLine l tip"><label>姓名：</label><span>'+data.name+'<a>(已绑定)</a></span></div>');
                html.push('<div class="signLine l tip"><label>证件号：</label><span>'+data.identify+'<a>(已绑定)</a></span></div>');
            }
            if(data.isBankBind){
                B=data.bankAccount+'<a>(已绑定)</a>';
            }
            html.push('<div class="signLine l tip"><label>账号：</label><span>'+B+'</span></div>');
            if(data.isMobileBind){
                M=data.mobile+'<a href="home.mobile.html">(重新绑定)</a>';
            }
            html.push('<div class="signLine l tip"><label>手机号码：</label><span>'+M+'</span></div>');
            html.push('<div class="iFdiv"><span>客服热线：</span></div>');
            $("h1").html('个人中心');
            $("#withdraw").html(html.join(''));
        },
        _bind:function(){
            var data={
                realName:$("#realName").val().trim(),
                identityNumber:$("#identityNumber").val().trim(),
                version:APP.version,
                requestType:APP.type
            };
            if(data.identityNumber.isID()){
                return alert(data.identityNumber.isID());
            }
            if( !data.realName || !data.identityNumber ){
                return alert('信息不能为空');
            }
            $.ajax({
                url:APP.url+"core/user/bind_identify_name",
                data:data,
                beforeSend:function(){X.load();},
                success:function(d){
                    X.unload();
                    if(d.flag==1){
                        X.home.info.init();
                    }else{
                        alert(d.errorMessage);
                    }
                },
                error:function(){X.unload();alert(APP.error.ajaxError);}
            });
        }
    }
};
X.status();

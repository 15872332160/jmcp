/**
 * Created by Administrator on 2018-01-30.
 */
X.user={
    m:60,
    k:'',
    open:function(x){
        $("#User").html(x).show();
        $("#jmcp").hide();
    },
    close:function(){
        $("#User").html('').hide();
        $("#jmcp ").show();
    },
    signIn:function(){
        var h=[];
        h.push(' <div class="signLogo"><div class="signLogo_img"></div></div><div class="signBox">');
        h.push('<div class="signLine"><input type="text" id="username" placeholder="请输入手机号/用户名"></div>');
        h.push('<div class="signLine"><input type="password" id="password" placeholder="请输入密码"></div>');
        h.push('<div class="signLine"><a onclick="X.user._signIn()" class="btn1">登录</a></div>');
        h.push('<div class="signLine3"><a onclick="X.user.signUp()" class="parigL">我要注册</a></div>');
        h.push('<div class="signLine3"><a onclick="X.user.findPassword()" class="parig">忘记密码？</a></div>');
        h.push('</div>');
        this.open(h.join(''));
    },
    signUp:function(){
        var h=[];
        h.push(' <div class="signBox"><div id="signUp1">');
        h.push('<div class="signLine2"><div class="iconfont icon1"></div><input type="tel" id="mobile" placeholder="输入手机号"></div>');
        h.push('<div class="signLine2"><div class="iconfont icon2"></div><input type="text" id="yzm" placeholder="请输入验证码"><span class="getyzm" onclick="X.user._signUp2()" id="getY">获取验证码</span></div>');
        h.push('<div class="signLine2"><div class="iconfont icon3"></div><input type="text" id="setuser" placeholder="请设置用户昵称(4-16个字符)"></div>');
        h.push('<div class="signLine2"><div class="iconfont icon4"></div><input type="password" id="setpass" placeholder="请设置密码"></div>');
        h.push('<div class="signLine2"><div class="iconfont icon5"></div><input type="password" id="setpassTo" placeholder="请再次输入密码"></div>');
        h.push('</div><div id="signUp2" class="">');
        h.push('<div class="signLine"><a onclick="X.user._signUp()" class="btn1" id="finish">立即注册</a></div>');
        h.push('<div class="sign_text"><input type="checkbox" id="agree" checked="true"><label class="checkbox-label" for="agree"></label><label  for="agree">已满18周岁并同意</label><a href="#" style="color:#f43a16;">《用户协议》</a>')
        h.push('</div><div class="sign_text"><div class="textc">已有账号？<a href="#" onclick="X.user.signIn()">立即登陆</a></div></div></div>');
        h.push('<div id="signUp3"><div class=""><img src="../home/image/signIn_bg.png" alt=""></div></div></div>');
        this.open(h.join(''));
    },
    findPassword:function(){
        var h=[];
        h.push('<div class="signLogo"><div class="signLogo_img"></div></div>');
        h.push('<div class="signBox"><div id="repeatSet1">');
        h.push('<div class="signLine"><input type="text" id="mobile" placeholder="请输入你的用户名"></div>');
        h.push('<div class="signLine"><input type="tel" id="getY" placeholder="请输入你的手机号"><span onclick="X.user._nextStep()" class="btn3">发送验证码</span></div>');
        h.push('</div><div id="repeatSet">');
        h.push(' <div class="signLine"><input type="password" id="repeatPhone" placeholder="请输入你收到的验证码"></div>');
        h.push('<div class="signLine"><a onclick="X.user._nextStep1()" class="btn1">确认</a></div></div>')
        h.push('<div class="signLine3"><a onclick="X.user.signUp()" class="">我要注册</a><a onclick="X.user.signIn()" class="fr" style="padding-right: 15px">马上登录</a></div>');
        h.push('</div>');
        this.open(h.join(''));
    },
    _nextStep:function(){
        var data={
            username:$("#searchUser").val().trim(),
            mobile:$("#searchPhone").val().trim()
        }
        $.ajax({
            url:APP.url+'/user/get_forget_check_mobile',
            data:data,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    $("#repeatSet").show();
                    $("#repeatSet1").hide();
                    $("#repeatsend").text($("#searchPhone").val().trim())
                }else{
                    X.user.tip(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    _nextStep1:function(){
        var data={
            username:$("#searchUser").val().trim(),
            mobile:$("#searchPhone").val().trim(),
            verifyCode:$("#repeatPhone").val().trim()
        }
        $.ajax({
            url:APP.url+'/user/get_forget_password',
            data:data,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    alert("新密码已发送到你的手机")
                    X.user.signIn()
                }else{
                    X.user.tip(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    count:function(){
        clearTimeout(X.user.k);
        if(this.m>0){
            this.m--;
            $("#getY").html(this.m+"秒后重发");
            $("#getY").removeAttr("onclick")
            this.k=setTimeout('X.user.count()',1000);
        }else{
            $("#getY").html('<a onclick="X.user._signUp2()" style="color:#fff">重新发送</a>');

            clearTimeout(X.user.k);
        }
    },
    _signUp2:function(){
        var d={
            mobile:$("#mobile").val().trim()
            //businessType:1,
            //timePara:new Date().getTime()
        };

        $.ajax({
            url:APP.url+'/user/sendmsg',
            data:d,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    // $("#signUp1").hide();
                    // $("#signUp2").show();
                    X.user.m=60;
                    X.user.count();
                }else{
                    X.user.tip(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    _signUp3:function(){
        var data={
            mobile:$("#mobile").val().trim(),
            verifyCode:$("#yzm").val().trim()
        }
        $.ajax({
            url:APP.url+'/user/checkRegVerifyCode',
            data:data,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==0){
                    X.user.tip(data.errorMessage);
                }else{
                    $("#signUp2").show();
                    $("#signUp1").hide();
                    $("#getphone").text($("#mobile").val().trim())
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });

    },

    tip:function(x){
        $("#signTip").html(x);
        setTimeout(function(){
            $("#signTip").html('');
        },2000);
    },

    _indextip: function (x) {
        $(".toast").html(x);
        $(".toast").addClass('itoast');
        setTimeout(function () {
            $(".toast").html('');
            $(".toast").removeClass('itoast');
        }, 2000);
    },
    _signUp:function(){

        $("#finish").removeAttr("onClick")

        $.ajax({
            url:APP.url+'/token/create',
            beforeSend:function(){X.load();},
            success:function(data){
                if(data.flag==1){
                    var data1={
                        mobile:$("#mobile").val().trim(),
                        verifyCode:$("#yzm").val().trim(),
                        userName:$("#setuser").val().trim(),
                        password:$("#setpass").val().trim(),
                        version:APP.version,
                        requestType:APP.type,
                        tokenName:data.tokenName,
                        tokens:data.tokens
                    }
                    $.ajax({
                        url:APP.url+'/user/regByMobile',
                        data:data1,
                        beforeSend:function(){X.load();},
                        success:function(data){
                            X.unload();
                            if(data.flag==1){
                                popup('注册成功');
                                var d={
                                    username:$("#setuser").val().trim(),
                                    password:$("#setpass").val().trim(),
                                    requestType:APP.type
                                };
                                if( !d.username || !d.password ){
                                    return false;
                                }
                                $.ajax({
                                    url:APP.url+'/user/login',
                                    data:d,
                                    beforeSend:function(){X.load();},
                                    success:function(data){
                                        X.unload();
                                        if(data.flag==1){
                                            X.user.close();
                                            X.status();
                                        }else{
                                            X.user.tip(data.errorMessage);
                                        }
                                    },
                                    error:function(){X.unload();alert(APP.error.ajaxError);$("#finish").attr("onClick","X.user._signUp()")}
                                });
                            }else{
                                popup(data.errorMessage);
                                $("#finish").attr("onClick","X.user._signUp()")
                            }
                        },
                        error:function(){X.unload();alert(APP.error.ajaxError);$("#finish").attr("onClick","X.user._signUp()")}
                    });
                }else{
                    popup('注册繁忙，请稍后再试')
                    $("#finish").attr("onClick","X.user._signUp()")
                }
            }
        })

    },
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
                    X.status();
                }else{
                    alert(data.errorMessage);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    },
    _signIn:function(){
        var d={
            username:$("#username").val().trim(),
            password:$("#password").val().trim(),
            requestType:APP.type
        };
        if( !d.username || !d.password ){
            return false;
        }
        $.ajax({
            url:APP.url+'/user/login',
            data:d,
            beforeSend:function(){X.load();},
            success:function(data){
                X.unload();
                if(data.flag==1){
                    X.user.close();
                    X.status();
                }else{
                    X.user._indextip(data.errorMessage);
                    popup('用户名或密码错误!');
                }
                if(!window.localStorage){
                    alert('浏览器不支持localStorage');
                }else{
                    var storage=window.localStorage;
                    var userKey={
                        userName:username,
                        password:balance
                    }
                    var m=JSON.stringify(userKey);
                    storage.setItem('userKey',m);
                    console.log(storage.data);
                }
            },
            error:function(){X.unload();alert(APP.error.ajaxError);}
        });
    }

}
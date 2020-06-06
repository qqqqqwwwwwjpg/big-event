// ---------------------------------------需求1 点击跳转到注册/登录页面--------------------------
$(function() {
    $('.goto-register').on('click', function() {
        $('#login').hide().next().show()
    })
    $('.goto-login').on('click', function() {
        // $('#register').hide().next().show()
        $('#login').show().next().hide()
    })


    // ----------------------------------需求2 点击 注册/登录 获取文本 发送ajax 验证操作--------------------
    {
        // 2.1 监听注册表单的提交事件 submit ：提交
        // 2.2 阻止跳转 别忘了 事件对象 e
        // 2.3 根据表单项的 name 属性值获取值，检查表单项的 name 属性  serialize()
        // 2.4 把账号和密码提交给接口，从而完成注册
        // 2.5 无论成功失败都要提示
        // 2.6 如果成功了 跳转到登录页面 当前页面隐藏 
    }

    // ----------------------------------点击 注册/登录 获取文本 发送ajax 验证操作------------------------

    // 监听注册表单的提交事件
    $('#register form').on('submit', function(e) {
        e.preventDefault();
        // 使用 JS 收集表单中的数据 (获取输入框中的账号和密码)
        // this 是form 表单
        // console.log(this);
        // serialize() 是根据表单项的 name 属性值获取值的，所以这里一定要检查表单项的 name 属性
        var data = $(this).serialize();
        // console.log(data); //username=11&password=22 不可以重复哦

        // 把账号和密码提交给接口，从而完成注册
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/reguser',
            type: 'POST',
            // dataType: 'json',
            data: data,
            success: function(backData) {
                // 无论成功失败都要提示
                // alert(backData.message);
                // 如果成功跳转到登录页面
                if (backData.status === 0) {
                    //提示层
                    layer.msg(backData.message);
                    $('#login').show().next().hide()
                }

            }
        });

    })

    // -----------------------------------------注册表单验证----------------------------------------------------------

    // 使用layui 的内置模块 必须要加载
    // 1. 加载form模块
    var form = layui.form;
    console.log(form); // 得到一个对象

    // 2.调用 form.verify 提供的方法 自定义验证规则
    form.verify({
        // 键（规则）：值（方法）
        // 可以  数组 函数
        // len: [
        //     /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        // ],

        len: function(val) {
            if (val.trim().length < 6 || val.trim().length > 12) {
                return "长度必须在6-12之间"
            }
        },

        same: function(val) {
            var password = $('.pass').val();
            if (val !== password) {
                return "两次密码不一致"
            }
        }

    })

    // ------------------------------------------------完成登录功能-------------------------------------------------
    // 监听登录表单的提交事件
    $('#login form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            type: 'POST',
            // dataType:'json',
            data: $(this).serialize(), // 注意：查看name
            success: function(backData) {
                console.log(backData);
                //提示层
                if (backData.status === 0) {
                    layer.msg(backData.message);
                    // alert("111")
                    localStorage.setItem('token', backData.token);
                    location.href = "./index.html"
                }
            }
        });
    })
})
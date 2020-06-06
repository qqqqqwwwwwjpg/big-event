// 需求1 点击跳转到注册/登录页面
$(function() {
    $('.goto-register').on('click', function() {
        $('#login').hide().next().show()
    })
    $('.goto-login').on('click', function() {
        // $('#register').hide().next().show()
        $('#login').show().next().hide()
    })
})

// 需求2 点击 注册/登录 获取文本 发送ajax 验证操作

// 2.1 监听注册表单的提交事件 submit ：提交
// 2.2 阻止跳转 别忘了 事件对象 e
// 2.3 根据表单项的 name 属性值获取值，检查表单项的 name 属性  serialize()
// 2.4 把账号和密码提交给接口，从而完成注册
// 2.5 无论成功失败都要提示
// 2.6 如果成功了 跳转到登录页面 当前页面隐藏 

// 点击 注册/登录 获取文本 发送ajax 验证操作
$(function() {
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
                alert(backData.message);
                // 如果成功跳转到登录页面
                if (backData.status === 0) {
                    $('#login').show().next().hide()
                }

            }
        });

    })
})
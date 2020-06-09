$(function() {
    // 需求1 ： 设置规则
    // 1. 密码必须6到12位，且不能出现空格
    // 2. 新密码 与 原密码不同
    // 3. 确认密码 与 新密码相同

    //---------------------------- 需求1 ： 设置规则
    // 调用模板
    var form = layui.form;
    form.verify({
        // 1. '密码必须6到12位，且不能出现空格'
        len: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 2. 新密码 与 原密码不同
        diff: function(value) { // 新密码 
            var oldPwd = $('.oldpwd').val();
            if (value == oldPwd) {
                return "新密码不能和原密码相同"
            }
        },

        // 3. 确认密码 与 新密码相同
        same: function(val) { // 确认密码
            var newPwd = $('.newPwd').val();
            if (newPwd !== val) {
                return '两次密码不一致';
            }
        }

    });

    //---------------------------- 需求2 ： 原密码 与 ajax返回的原密码 相同

    // 1. 捕捉提交事件 2.发送ajax 向服务器发送请求    成功后——
    // 3. 弹出提示框  4. 判断正确时重置输入框 注意（reset是dom方法，所以要加 [0] 把jQuery对象转成dom对象）
    // 注意 ： 请求头的token （headers） 和 判断身份认证是否成功 不要忘记 （complete）

    $('form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            type: 'POST',
            // dataType:'json',
            data: $(this).serialize(),
            success: function(backData) {
                console.log(backData);
                // 弹出框
                layer.msg(backData.message);
                // 判断正确时 重置表单
                if (backData.status == 0) {
                    // 重置输入框
                    // reset是dom方法，所以要加 [0] 把jQuery对象转成dom对象
                    $('form')[0].reset();

                }
            },
            complete: function(xhr) {
                // 这里判断身份认证是否成功
                // console.log(xhr);
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    // 删除假token
                    localStorage.removeItem('token');
                    // 跳转到登录页面
                    window.parent.location.href = '/login.html';
                }
            },
            // // jQuery中ajax选项，有一个headers，通过他，可以设置请求头 (千万不要忘记！！！！！！！)
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        });
    })


})
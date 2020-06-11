function getUserInfo() {
    { // 需求1 ： 获取用户信息 追加到表单

        // - 发送ajax请求，获取用户信息
        // - 设置表单各项（每个输入框）的value值。

        // 具体步骤：

        // - 先设置表单各项的name属性
        // - 发送ajax请求
        // - 根据表单各项的name属性，找到每个input，分别设置value值
    }
    // 获取用户信息 封装在函数中
    // 在全局加载 form 模块
    var form = layui.form;

    // 1. 发送ajax请求，获取用户信息
    $.ajax({
        url: '/my/userinfo',
        // 2. 设置表单各项（每个输入框）的value值。
        success: function(backData) {
            // 第一种写法 根据name 属性 找到对应input 修改服务器返回的数据
            // $('input[name = "id"]').val(backData.data.id);
            // $('input[name = "nickname"]').val(backData.data.nickname)
            // $('input[name = "username"]').val(backData.data.username)
            // $('input[name = "email"]').val(backData.data.email)

            // 第二种写法 使用layui提供的快速为表单赋值 内置模块 （一定要在全局加载）
            //     注意 abc 即是 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            form.val('abc', backData.data)


        },
    });
}


$(function() {
    // ------------------------------- 需求1 ： 设置inupt的value值 （数据回填，为表单赋值）
    getUserInfo()

    // ------------------------------- 需求2 ： 完成更新用户信息的功能

    { //需求2 ：完成更新用户信息的功能
        // - 需要在 form 中，添加一个隐藏域，用于保存id值 ：隐藏域，只要放到 form 里面即可 
        // - 设置 登录账号为 `disabled` ： 不允许修改 通过 $('form').serialize() 不能获取到 username 值，刚刚好是我们的需要。
        // - 注册表单的提交事件
        // - 阻止默认行为
        // - 收集表单数据，使用 serialize() 
        // - 发送ajax请求，完成更新
        // - 更新成功之后，提示，并且调用父页面的 `getUserInfo()` 从新渲染用户的头像
    }
    // 1, 注册表单的提交事件
    $('form').on('submit', function(e) {
        // 2. 阻止默认行为
        e.preventDefault();
        // 3. 收集表单数据，使用 .serialize() 
        var forms = $('form').serialize();
        // 4. 发送ajax请求，完成更新
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: forms,
            success: function(backData) {
                console.log(backData);
                window.parent.getUserInfo();
            },

        });


    })

    { // ----------------------------   需求3 : 重置表单 --------------------
        // 重置的时候，并不是清空输入框的值，而是恢复默认的样子
    }

    $('button[type="reset"]').click(function(e) {
        e.preventDefault();
        getUserInfo()
    })




})
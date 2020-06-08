//  控制用户必须登录才能访问
if (localStorage.getItem === null) {
    location.href = '/login.html'
}


function getUserInfo() {
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // dataType: 'json',
        data: '',
        success: function(backData) {
            //    1. 设置欢迎语 （有昵称用昵称 没有昵称 使用用户名）
            var myname = (backData.data.nickname || backData.data.username)
            $('.myname').text(myname)
                //    2. 设置头像 （有头像 用头像 没有头像使用名的首字母大写）
            if (backData.data.user_pic) {
                $('.layui-nav-img').attr('src', backData.data.user_pic).show()
                $('.text-avatar').hide();
            } else {
                var f = myname.substr(0, 1).toUpperCase();
                $('.text-avatar').text(f).css('display', 'inline-block')
                $('.layui-nav-img').hide();
            }
        },

        // jQuery中ajax选项，有一个headers，通过他，可以设置请求头
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
}
// 入口函数
$(function() {
    // ----------------------------------登录后 获取用户信息并渲染--------------------------
    getUserInfo()
        // ----------------------------------退出功能--------------------------
    $('#logout').on('click', function() {
        // 询问是否要删除
        layer.confirm('确定要退出吗', function(index) {
            //do something
            // 1. 删除tokey
            localStorage.removeItem('token');
            // 2. 跳转到/login.html
            location.href = '/login.html';
            // 3. 关闭的
            layer.close(index);
        });
    })


})
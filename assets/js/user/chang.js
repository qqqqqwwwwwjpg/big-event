$(function() {
    { //  需求1 ： 创建剪裁区
        //     1. 使用插件 cropper， 提供的方法， 实现剪裁区的创建 -
        //     1.1 具体做法  ： 找到剪裁区的图片（ #image） -
        //     1.2 设置配置项 : const options
        //     1.3 调用cropper()方法， 创建剪裁区  为 image 创建 "参数"是刚才设置好的 options 项
    }

    // ---------------------------- 需求1 ： 创建剪裁区
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比 ： 比例
        aspectRatio: 1,
        // 指定预览区域 ：右边的小头像
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // ---------------------------- 需求2 ： 点击按钮，可选择图片
    // 2.1  html中加入一个隐藏的文件域
    // 2.2  点击上传按钮的时候，触发文件域的单击事件
    $('button[id="upload"]').on('click', function(e) {
        e.preventDefault();
        $('input[id="file"]').trigger('click')


        { // ---------------------------- 需求3 ：更换图片， 重置剪裁区
            //     当文件域改变时
            //     找到选择的文件（ 文件对象） files
            //     为文件对象创建一个临时的url - url.URLxxxxxxx()
            //     更换剪裁区的图片 - 先销毁原来的剪裁区 - 更改图片的src属性 -重新生成剪裁区
        }
        $('#file').change(function(e) {
            e.preventDefault();

            //  找到选择的文件（ 文件对象） files
            var filesObj = this.files[0]
                // console.log(filesObj);

            // 为文件对象创建一个临时的url - url.URLxxxxxxx()
            var url = URL.createObjectURL(filesObj)
            console.log(url);

            //更换剪裁区的图片 先销毁原来的剪裁区 - 更改图片的src属性 -重新生成剪裁区
            $image.cropper('destroy').attr('src', url).cropper(options);
        })

        // ---------------------------- 需求4： 点击确定，实现剪裁并修改头像
        // - 调用 cropper 方法，传递 `getCroppedCanvas` 参数，得到一个canvas图片（对象）
        // - 调用canvas的toDataURL()方法，得到base64格式的图片
        // - ajax提交即可
        $('button[id="btnCreateAvatar"]').on('click', function(e) {
            // ---------------  点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------

            // 剪裁得到一张图片（canvas图片）
            var i = $image.cropper(
                'getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                });
            // 把图片转成base64格式
            var str = i.toDataURL(); // 把canvas图片转成base64格式
            // console.log(str); // base64格式的字符串
            // ajax提交字符串给接口
            $.ajax({
                type: 'POST',
                url: 'http://www.liulongbin.top:3007/my/update/avatar',
                data: { avatar: str },
                success: function(res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        // 更换成功，调用父页面的 getUserInfo() ，重新渲染头像
                        window.parent.getUserInfo();
                    }
                },
                headers: {
                    'Authorization': localStorage.getItem('token')
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

            });


        })
    })





})
$(function() {

    // 1. 获取地址栏的 id 这个id 就是文章id
    var id = location.search.replace(/\D/g, "") // 把所有非数组 替换为空





    // 需要加载 才能出现下拉框 
    var form = layui.form;
    // 在模板殷勤处理完之后渲染


    // -------------------------------  获取分类 渲染到下拉框中
    // （嵌套了 内容，图片，富文本）原因是ajax是异步操作 可能不按套路出牌 所以要一个一个的加载
    $.ajax({
        url: '/my/article/cates',
        success: function(backData) {
            $('select').html(template('tpl-category', backData))
            form.render('select') // 渲染出现下拉框 （模板殷勤处理完之后渲染）
                /////////////////////////////////////////////**
                // 嵌套，保证分类获取完在获取文章 在给表单赋值
                // 2. 根据id 获取当前这篇文章详情
            $.ajax({
                url: '/my/article/' + id,
                success: function(backData) {
                    // 3. 为表单赋值（数据回填 设置输入框 下拉框等等的默认值）
                    form.val('edif-form', backData.data)


                    // 还差一个图片 需要我们自己处理，就是更换一下剪裁区图片
                    $image.cropper('destroy').attr('src', 'http://www.liulongbin.top:3007' + backData.data.cover_img).cropper(options)


                    //  等为表单赋值之后再添加富文本编辑器
                    // ---------------------------------- 添加富文本编辑器
                    // 1. 修改内容的 name 为 content
                    // 2. 调用老师写好的函数 
                    initEditor();

                }
            });
        }
    });




    // --------------------------------- 图片的处理
    // 1. 实现基本的剪裁效果

    // 1.1 初始化图片编辑器
    var $image = $('#image')

    // 1.2 剪裁options选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview', // 预览的区域
        autoCropArea: 1,
        // 1 就是九宫格剪裁框铺满 定义自动剪裁区域的大小
    }

    // 1.3 初始化剪裁区域
    $image.cropper(options);

    // // 2. 点击按钮，可以选择图片
    $('.image-btn').on('click', function() {
        $('#file').trigger('click');

    })

    // 3. 文件域切换(发生改变时)的时候 可以更换图片
    $('#file').on('change', function() {
        //     1. 找到文件
        var file = this.files[0]
            // 2. 指向url
        var url = URL.createObjectURL(file)
            // 3. 更换剪裁区图片 删除上次的 添加 下次的
        $image.cropper('destroy').attr('src', url).cropper(options)

    })


    // ---------------------------- 处理按钮
    // 1. 两个按钮（发布，存为草稿），都是可以造成表单的提交，都会触发表单的提交事件。所以两个按钮都是submit类型
    var s = ''; // 用来记录 是草稿 还是 发布

    $('button:contains("发布")').on('click', function() {
        s = '已发布'
    });

    $('button:contains("存为草稿")').on('click', function() {
        s = '草稿'
    })

    // -------------------------  实现文章发布
    // -------------------------  实现文章发布
    // -------------------------  实现文章发布

    // 0. 给表单注册 提交事件
    $('form').on('submit', function(e) {
        // 1. 阻止
        e.preventDefault();
        // 2. 收集表单中的各项数据（分为几个小步骤）
        // var data = $(this).serialize(); // 由于是 FormData格式 所以不能用serialize()
        // 2.1 var Data = new FormData(表单的DOM对象); // 所以使用FormData格式
        var data = new FormData(this) // 根据表单各项的 name 属性 来获取 （检查name属性）
            // 到此为止，data中 包括了三项 title cate_id content

        // 2.2 追加state 点击已发布 就添加已发布 点击草稿 添加草稿
        data.append("state", s) // 到此为止，data中 包括了三项 title cate_id content state

        // 2."" 因为服务器还要Id  所以追加 Id 注意：append 追加
        data.append("Id", id)

        // 2."" 因为嵌套的关系 FormData（）获取不到内容的值了
        //  网上有 获取 tinymce 的值  可以找一下 注意：set 设置
        data.set('content', tinyMCE.activeEditor.getContent())

        // 2.3 剪裁图片，得到canvas 画布 
        var canvas = $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280,
        })

        // 调用canvas中的toBlob ，把图片转成Blob 二进制形式
        canvas.toBlob(function(blob) {

            // 把二进制形式的图片 追加到data中 所谓二进制 就是添加了个文件对象
            data.append('cover_img', blob)

            // 遍历对象  遍历带有遍历器结构的对象
            for (var ele of data) {
                console.log(ele);

            }
            // 3. ajax 提交给接口
            $.ajax({
                url: '/my/article/edit',
                type: 'POST',
                data: data,
                // 提交formdata对象 必须指定什么选项 ？(两个false)
                contentType: false,
                processData: false,
                success: function(backData) {
                    // 
                    layer.msg(backData.message)
                    if (backData.status === 0) {
                        // 4. 添加成功后。跳转到 文章列表页
                        location.href = '/article/article.html';
                    }
                }
            });
        })
    })




})
//  1.    查 ： 封装一个函数 用来查询并且上传到页面
//  1.2   一进页面就 发送ajax 获取数据 通过模板殷勤 把返回的数据 渲染到页面
//  1.3   入口函数  查询 ： 一进页面 就调用 封装的查询函数

//  2.    删 ： 给 删除按钮 委托注册点击事件 （定义一个id  找到删除按钮）
//  2.1   弹出询问框 是否删除（去layui找） 是 ：
//  2.2   发送ajax  根据 id 删除 所以要获取id（在 删除按钮 中添加一个隐藏域 用来存放id 使用this 通过attr（名）获取）
//  2.3   回调函数中：弹出框 如果请求成功 a.调用一次 查询函数 重新渲染页面 b. 清除 layer.close(index);

//  3.   增 ： 点击添加类别  然后open弹窗（使用模板写一个 通过 元素.html（）添加到弹窗中）
//       注意点 ： 弹出框 一定要用全局变量 （就像定时器） 方便成功后删除弹窗
//       注意点 ： 样式修改在行内比较好 外面找不到
//  3.1  点击确认添加 完成添加功能
//  3.2  委托注册 表单提交事件（给表单个id 获取它注册） 阻止默认事件 发送ajax
//  3.3  通过 serilize() 获取表单中 val 的值 提交  
//  3.4  回调函数 ： 弹出框  如果成功 调用一次函数 重新渲染 清除open弹窗

// 4.   改 ： 给编辑加一个类 注册委托编辑 （给编辑加三个类 id name alias 值就是 模板殷勤遍历出 的值 方便获取）
// 4.1  点击后 出现open弹窗 （全局） 使用回调函数，进行表单赋值 
// 注意点：
// 4.2 点击 确认修改 ，ajax提交数据，完成修改 
// 4.3  委托事件  阻止默认行为  获取表单的值 发送ajax
// 4.4  回调函数 ： 弹出框 成功后 ：调动函数 渲染页面 清除open弹窗
// 注意点：











function renderCateggory() { // renderCateggory : 提交种类

    $.ajax({
        url: '/my/article/cates',
        success: function(backData) {
            // 得到数据 渲染到页面 用模板殷勤
            var str = template("tpl-category", backData)
            $('tbody').html(str)
        }
    });

}

$(function() {
    var form = layui.form;
    var addIndex; // 表示添加的弹层
    var editIndex; // 表示编辑的弹层

    // // ---------------------------------- 1. 分类查询， 通过模板渲染到页面
    renderCateggory()

    // // ---------------------------------- 2. 点击 删除 
    // 在 询问之前 获取 id
    $('body').on('click', ".delete", function() {
        var id = $(this).attr('data-id')
            // 1. 弹出询问框
        layer.confirm('确定删除吗? 你好狠！<i class="layui-icon layui-icon-face-smile"></i> ', { icon: 3, title: '提示' }, function(index) {
            //  2. 发送请求 获取数据 根据id 删除
            $.ajax({
                url: '/my/article/deletecate/' + id, // 去获取 id
                success: function(backData) {
                    layer.msg(backData.message);
                    console.log(backData);
                    if (backData.status === 0) {
                        renderCateggory();
                    }
                }
            });

            layer.close(index);
        });
    })


    // //  -------------------------------- 3. 点击添加 类别 弹窗

    $('.add').on('click', function(e) {
        e.preventDefault();
        addIndex = layer.open({ // 给全局一个变量 用于删除弹窗 。。。。。。。。。。。。。。。。。。。。。。。。
            type: '1',
            title: '添加文章分类',
            content: $("#AddCate").html(),
            area: ['500px', '250px']
        });
    })



    // --------------- 3.1 点击 确认添加 ，完成添加功能 ---------------
    // 必须 使用事件委托方案注册submit事件
    // 必须 给form表单添加一个id
    $('body').on('submit', '#add-form', function(e) {
        // 阻止默认跳转事件
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(), // 检查name
            success: function(res) {
                //    提示框
                layer.msg(res.message);
                // 如果成功的话
                if (res.status === 0) {
                    // 添加成功，重新渲染
                    renderCateggory()
                        // 关闭弹层
                    layer.close(addIndex); // 渲染完成 就删除了（添加 类别 弹窗） 。。。。。。。。。。。。。。。。。。。。。
                }
            }
        });
    });

    // --------------- 4. 点击 编辑 ，弹层 -------------------------
    $('body').on('click', '.edit', function() {
        // 给编辑按钮 添加 data-id="{{val.Id}}" data-name="{{val.name}}" data-alias="{{val.alias}}" 自定义属性
        // 用来 获取三个自定义属性 
        // var id = $(this).attr('laotang-id');
        // var name = $(this).attr('zhuyunfei');
        // var alias = $(this).attr('data-alias');
        // h5中，提供了dataset属性，专门用于获取对象的data-xxx属性值
        var data = this.dataset; // dataset是dom属性，所以使用dom对象this
        // console.log(data); // DOMStringMap {id: "1", name: "体育", alias: "fdsdf"}
        // return;
        editIndex = layer.open({
            type: 1,
            title: '编辑类别',
            content: $('#tpl-edit').html(),
            area: ['500px', '250px'],
            success: function() {
                // 弹层之后，执行这个函数。
                // 在这个函数中，进行表单赋值
                // edit-form是表单的lay-filter属性值
                // form.val('edit-form', {
                //     id: id,
                //     name: name,
                //     alias: alias
                // });
                form.val('edit-form', JSON.parse(JSON.stringify(data)));
            }
        });
    });

    // --------------- 4.1 点击 确认修改 ，ajax提交数据，完成修改 ------
    $('body').on('submit', '#edit-form', function(e) {
        e.preventDefault();
        // var data = $(this).serialize();
        // data = data.replace('id=', 'Id=');
        // data = 'I' + data.substr(1);

        var data = $(this).serializeArray();
        data[0].name = 'Id';
        // console.log(data);
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCateggory()
                    layer.close(editIndex);
                }
            }
        });
    })



})
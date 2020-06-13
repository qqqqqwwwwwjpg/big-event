$(function() {
    // 需要加载 才能出现下拉框 
    var form = layui.form;
    form.render('select') // 渲染 不然下拉框不显示
        // 除非 layui 是在后面引入的 不然都需要使用  form.render()渲染
        // 两个参数 第一个 是 类型 select checkout redio
        // 第二个参数是  要跟新 渲染哪个表单



    // 设置请求参数
    var data = {
        pagenum: 1, // 页码，1 表示获取第 1 页的数据
        pagesize: 10, // 每页显示多少条数据
        // "cate_id": 3,
        // "state": 4,
    }

    function renderArticle() {
        console.log(data);
        $.ajax({
            url: '/my/article/list',
            data: data,
            success: function(backData) {
                console.log(backData);
                if (backData.status === 0) {
                    $('tbody').html(template('tpl-article', backData))
                }
            }
        });
    }



    // ------------- 获取数据 渲染页面 调用函数
    renderArticle()


})
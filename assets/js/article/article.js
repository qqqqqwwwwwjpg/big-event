$(function() {
    // 加载form模块
    var form = layui.form;
    form.render('select'); // 加入这行，更新渲染select，否则下拉框是不显示的

    // 加载laypage模块
    var laypage = layui.laypage;


    // 设置请求参数
    var data = {
        pagenum: 1, // 页码，1表示获取第1页的数据
        pagesize: 2, // 每页显示多少条数据
        // cate_id: 
        // state:
    };

    function renderArticle() {
        $.ajax({
            url: '/my/article/list',
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    // 调用模板引擎渲染文章列表
                    var str = template('tpl-article', res);
                    $('tbody').html(str);

                    // res.total 表示数据总数
                    // 这里调用showPage，因为只有这里有数据总数
                    showPage(res.total);
                }
            }
        });
    }
    // 页面加载完毕，调用函数
    renderArticle();

    // -------------------  分页  -----------------
    function showPage(t) {
        //执行一个laypage实例
        laypage.render({
            elem: 'page', // 注意，这里的 page 是 ID，不用加 # 号
            count: t, // 数据总数
            limit: data.pagesize, // 每页显示多少条
            limits: [2, 3, 4, 5, 6], // 下拉框可设置每页多少条
            curr: data.pagenum, // 当前页
            // groups: 5,
            // prev: '上一篇'
            layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'], // 自定义排版
            jump: function(obj, first) {
                // 页面刷新、点击页码、....之后，都会执行这个函数
                // console.log(first); // 第一次执行函数，first是true；后续点击页码的时候，first是undefined
                // console.log(obj); // 分页参数
                if (first === undefined) {
                    data.pagenum = obj.curr;
                    data.pagesize = obj.limit;
                    renderArticle();
                }
            }
        });
    }
    // showPage();

    // ------------------ 获取所有的分类，渲染到下拉框中 ----------------
    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            var str = template('tpl-category', res);
            $('#category').html(str);
            form.render('select');
        }
    });

    // ------------------ 搜索区 -----------------------------------
    $('#search-form').on('submit', function(e) {
            e.preventDefault();
            var p = $(this).serializeArray();
            console.log(p);
            // 判断是否选择了分类
            if (p[0].value) {
                data.cate_id = p[0].value;
            } else {
                delete data.cate_id; // delete 可以删除对象的属性
            }
            // 判断是否选择了状态
            if (p[1].value) {
                data.state = p[1].value;
            } else {
                delete data.state;
            }
            // 搜索之后，肯定要看第1页的数据
            data.pagenum = 1;
            // 调用renderArticle，重新获取数据
            renderArticle();
        })
        // ------------------------------------------ 删除

    $('body').on('click', '.delete', function(e) {
        // console.log($(this).val());
        e.preventDefault();
        $.ajax({
            url: '/my/article/delete/' + $(this).val(),
            success: function(backData) {
                layer.msg(backData.message);
                if (backData.status === 0) {
                    // 删除成功  重新渲染页面
                    renderArticle();
                }
            }
        });
    })
});
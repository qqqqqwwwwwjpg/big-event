// $(function() {
//             // 加载 form 模块
//             var form = layui.form;
//             form.render('select') // 渲染 不然下拉框不显示
//                 // 除非 layui 是在后面引入的 不然都需要使用  form.render()渲染
//                 // 两个参数 第一个 是 类型 select checkout redio
//                 //          第二个参 数是  要跟新 渲染哪个表单

//             // 加载 laypage 模块
//             var laypage = layui.laypage;



//             // ------------- 为了发送ajax 设置请求参数
//             var data = {
//                 pagenum: 1, // 页码，1 表示获取第 1 页的数据
//                 pagesize: 2, // 每页显示多少条数据
//                 // "cate_id": 3,
//                 // "state": 4,
//             }

//             // -------------- 使用 ajax 获取数据 封装成函数
//             function renderArticle() {
//                 console.log(data);
//                 $.ajax({
//                     url: '/my/article/list',
//                     data: data,
//                     success: function(backData) {
//                         console.log(backData);
//                         if (backData.status === 0) {
//                             $('tbody').html(template('tpl-article', backData))

//                             // backData.total 表示数据总数 （* 这个函数的这个变量要在下一个函数用）
//                             // 这里调用showPage 因为只有这里有数据总数
//                             showPage(backData.total) // 传参

//                         }
//                     }
//                 });
//             }

//             // ------------- 获取数据 渲染页面 调用函数 
//             renderArticle()

//             // ---------------- 分页 封装为函数 ------------
//             function showPage() {
//                 //执行一个laypage实例
//                 laypage.render({
//                     elem: 'page', //注意，这里是 ID，不用加 # 号
//                     count: t, //数据总数，从服务端得到 （* 设置一个参数）
//                     limit: data.pagesize, // 每页显示多少条 上面data定义的
//                     limits: [2, 3, 4, 5, 6, ], // 下拉框 可以设置每页显示多少条（可以自己来决定）
//                     curr: data.pagenum, // 当前页 上面data定义的
//                     // 自定义排版 layout
//                     layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'], // 自定义分页的组合，结构
//                     // prev 上一页
//                     // next 下一页
//                     // limit 自定义排版 （下拉框）
//                     // count 总条数
//                     // skip  跳转页
//                     //  页面刷新，点击页面。。。。之后，都会执行这个函数
//                     jump: function(obj, first) {
//                         console.log(first); // 第一次执行函数 first 是true ，后续点击页码是undefined
//                         console.log(obj); // 分页参数
//                         //obj包含了当前分页的所有参数，比如：
//                         // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                         // console.log(obj.limit); //得到每页显示的条数
//                         if (first === undefined) {

//                             data.pagenum = obj.curr;
//                             data.pagesize = obj.limit;

//                             renderArticle()
//                         }
//                     }
//                 });
//             }
//             // showPage() （* 就不在这里调用了）

//             // ------------------------ 筛选： 获取所有的分类，渲染到下拉框中
//             $.ajax({
//                 url: '/my/article/cates',
//                 type: 'get',
//                 dataType: 'json',
//                 data: '',
//                 success: function(backData) {
//                     $('#category').html(template('tpl-category', backData))
//                     form.render('select') // 渲染 (因为是下拉框)
//                 }
//             });

//             // // ------------------------ 筛选 : 搜索区 ---------------
//             $('#formSearch').on('submit', function(e) {
//                 //     e.preventDefault()
//                 //     //  根据 name 获取 value值 的数组
//                 //     var p = $(this).serializeArray();
//                 //     console.log(p);
//                 //     // 判断是否选择了分类
//                 //     if (p[0].value) {
//                 //         data.cate_id = p[0].value; // 判断如果有（已发布）值就加上
//                 //     } else {
//                 //         delete data.cate_id
//                 //     }
//                 //     // 判断是否选择了状态
//                 //     if (p[1].value) {
//                 //         data.state = p[1].value; // 判断如果有值（草稿）就加上
//                 //     } else {
//                 //         delete data.state
//                 //     }
//                 //     // 搜索之后，肯定要看第一页的数据
//                 //     data.pagenum = 1;
//                 //     // 调用 renderArticle(); 重新获取数据
//                 //     renderArticle();

//                 // }),

//                 // ------------------ 搜索区 -----------------------------------
//                 // $('#search-form').on('submit', function(e) {
//                 //     e.preventDefault();
//                 //     var p = $(this).serializeArray();
//                 //     console.log(p);
//                 //     // 判断是否选择了分类
//                 //     if (p[0].value) {
//                 //         data.cate_id = p[0].value;
//                 //     } else {
//                 //         delete data.cate_id; // delete 可以删除对象的属性
//                 //     }
//                 //     // 判断是否选择了状态
//                 //     if (p[1].value) {
//                 //         data.state = p[1].value;
//                 //     } else {
//                 //         delete data.state;
//                 //     }
//                 //     // 搜索之后，肯定要看第1页的数据
//                 //     data.pagenum = 1;
//                 //     // 调用renderArticle，重新获取数据
//                 //     renderArticle();
//                 // })
//             })



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
});
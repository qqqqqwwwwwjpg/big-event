$(function() {
    $.ajaxPrefilter(function(options) {
        // console.log(options);
        options.url = 'http://www.liulongbin.top:3007' + options.url;
        //请求完成之后执行的(无论是否成功)
        options.complete = function(xhr) {
                if (xhr.responseJSON.status === 1 || xhr.responseJSON.message === "身份认证失败!") {
                    //说明用户用了假的token,或者根本就没有token
                    //删除假的token
                    localStorage.removeItem('token');
                    window.parent.location.href = "/login.html"
                }
            }
            //请求头
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    })
})
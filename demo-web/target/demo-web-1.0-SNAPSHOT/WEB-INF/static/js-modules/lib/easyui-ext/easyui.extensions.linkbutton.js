(function ($) {

    $.util.namespace("$.fn.linkbutton.extensions");


    function setPlain(target, plain) {
        var t = $(target),
            state = $.data(target, "linkbutton"),
            opts = state.options;
        opts.plain = plain ? true : false;
        if (opts.plain) {
            t.addClass("l-btn-plain");
        } else {
            t.removeClass("l-btn-plain");
        }
    };


    var defaults = $.fn.linkbutton.extensions.defaults = {};

    var methods = $.fn.linkbutton.extensions.methods = {

        //  扩展 easyui-linkbutton 控件的自定义方法；设置 linkbutton 按钮的 plain 属性；该方法定义如下参数：
        //      plain:   Boolean 类型，表示要设置的按钮的 plain 属性值
        //  返回值：返回表示当前 easyui-linkbutton 控件的 jQuery 链式对象；
        setPlain: function (jq, plain) { return jq.each(function () { setPlain(this, plain); }); }
    };


    $.extend($.fn.linkbutton.defaults, defaults);
    $.extend($.fn.linkbutton.methods, methods);

})(jQuery);
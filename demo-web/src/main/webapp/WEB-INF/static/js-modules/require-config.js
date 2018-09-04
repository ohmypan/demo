var requirejs = (function () {

    var v = function (v) {
        var base_v = '0.1';
        return base_v + '.' + v;
    };

    var base = {
        baseUrl: window.ctx + '/static/js/js-modules/',
        // waitSeconds: 0, // 0：disable timeout
        paths: {
            //------------ 项目封装插件 ------------
            'emis-lib': 'lib/common/emis-lib.js?v=' + JS_VERSION,
            //------------ 扩展插件 ------------
            'serializeObject': 'lib/jquery-serialize-object/2.5.0/jquery.serialize-object.min',// 将form表单转化成Javascript
            'moment': 'lib/moment/2.13.0/moment.min',// 日期格式化
            'art-template': 'lib/art-template/3.0.0/template',// html模板
            'mathjs': 'lib/mathjs/3.17.0/math.min',//精确计算
            'jquery.timers': 'lib/jquery.timers/jquery.timers',//计时器封装
            //------------ 自己封装的插件 ------------

            'ahUtility': '../hospitalized_economy/utility',//personal utility module, authorized insertion.
            'timepicker': 'lib/jquery-timepicker/jquery-timepicker',

        },
        shim: {
            'jquery.timers': {
                deps: ['jquery'] //jquery在core项目的require-config-core.js中配置
            }
        }
    };

    return base;
})();

var RequirePromise = function (urls, errinfo) {
    return new Promise((resolve, reject) => {
        requirejs(urls, function () {
            resolve(arguments)
        }, function (err) {
            if (errinfo) {
                reject(errinfo)
            } else {
                reject(err)
            }
        });
    });
}

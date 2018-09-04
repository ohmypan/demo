(function () {
    window.viewReady = function (cb) {
        if (window.view && window.view.__ready) {
            cb(window.view);
        } else {
            var __oViewReady = window.__viewReady;

            window.__viewReady = function (view) {
                if (typeof __oViewReady === 'function') {
                    __oViewReady(view);
                } else {
                    delete window.__viewReady;
                }

                cb(view);
            };
        }
    }
})();

var CORE_JS_ROOT = CORE_HOST + 'static/js';
require.config({
    baseUrl: window.ctx + '/static/js/js-modules/',
    // waitSeconds: 0, // 0：disable timeout
    paths: {
        //------------ 核心插件 ------------
        'jquery': [
            CORE_JS_ROOT + '/lib/jquery/jquery-3.2.1'//,
            //'lib/jquery/jquery-3.2.1.min'
        ],
        'domReady': [
            CORE_JS_ROOT + '/lib/require-domReady/2.0.1/domReady'//,
            //'lib/require-domReady/2.0.1/domReady'
        ],
        'miniui': [
            CORE_JS_ROOT + '/lib/miniui/miniui'//,
            // 'lib/miniui/miniui.min'
        ],
        //------------ 项目封装插件-公共 ------------
        'miniui-wd': [
            CORE_JS_ROOT + '/lib-wd/miniui-wd'
            // ,'lib/common/miniui-wd' //如果从 上面地址 加载失败, 会从本地加载
        ],
        'View': [
            CORE_JS_ROOT + '/lib-wd/View'
            // ,'lib/common/View' //有版本号的使用方式：'lib/common/View.js?v=0.0.001'
        ],
        'ViewWithSystemInfo': CORE_JS_ROOT + '/lib-wd/ViewWithSystemInfo',
        'ViewWithMainInterface': CORE_JS_ROOT + '/lib-wd/ViewWithMainInterface',
        'Service': [
            CORE_JS_ROOT + '/lib-wd/Service'
            // , 'lib/common/Service'
        ],
        'wd-lib': [
            CORE_JS_ROOT + '/lib-wd/wd-lib'
            // , 'lib/common/wd-lib'
        ],
        'Cache': [
            CORE_JS_ROOT + '/lib-wd/Cache'
            // , 'lib/common/Cache'
        ],
        'base': CORE_JS_ROOT + '/lib-wd/base',
        'localforage': [ // localstorage 替代库
            CORE_JS_ROOT + '/lib/localforage'
            // , 'lib/localforage/localforage.min'
        ],
        'nativelib': CORE_JS_ROOT + '/lib-wd/nativelib',
        'SystemInfoService': CORE_JS_ROOT + '/service/SystemInfoService',
        'swfupload': CORE_JS_ROOT + '/lib/miniui/swfupload/swfupload',
        //------------ 项目封装插件 ------------
        'emis-lib': 'lib/common/emis-lib.js?v=' + JS_VERSION,
        //------------ 扩展插件 ------------
        'serializeObject': 'lib/jquery-serialize-object/2.5.0/jquery.serialize-object.min',// 将form表单转化成Javascript
        'moment': 'lib/moment/2.13.0/moment.min',// 日期格式化
        'art-template': 'lib/art-template/3.0.0/template',// html模板
        'mathjs': 'lib/mathjs/3.17.0/math.min',//精确计算
        //------------ 自己封装的插件 ------------
        //TODO 修改
        'ahUtility': '../hospitalized_economy/utility',//personal utility module, authorized insertion.
        //TODO 修改 @马勇
        'timepicker': 'lib/jquery-timepicker/jquery-timepicker'
    },
    map: {
        '*': {
            'css': 'lib/require-css/0.1.8/css.min'// RequireJS加载样式文件插件
        }
    },
    shim: {
        'miniui': {
            deps: [
                'jquery',
                'css!' + CORE_JS_ROOT + '/lib/miniui/themes/default/miniui.css',
                'css!' + CORE_JS_ROOT + '/lib/miniui/themes/blue2010/skin.css',
                'css!' + CORE_JS_ROOT + '/lib/miniui/themes/icons.css'
            ],
            exports: 'mini'
        },

        'base': {
            deps: ['jquery']
        },
        'View': {
            deps: ['base']
        },
        'miniui-wd': {
            deps: [
                // 'miniui',
                'css!' + CORE_JS_ROOT + '/common/miniui-wd.css',
                'css!lib/miniui/themes/custom/miniui-wd-emis.css'//TODO 封装到core项目的miniui-wd.css
            ]
        }
    }
});

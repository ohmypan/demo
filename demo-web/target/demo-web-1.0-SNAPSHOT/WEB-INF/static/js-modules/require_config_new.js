require.config({
    baseUrl: window.ctx + '/static/js/js-modules/',
    paths: {
        'domReady': 'lib/require-domReady/2.0.1/domReady',
        'jquery': 'lib/jquery/jquery-1.9.1.min',
        // 'jquery': 'lib/jquery/jquery-3.2.1.min',
        'easyui': 'lib/easyui-1.5.1/jquery.easyui.min',
        'easyui-cn': 'lib/easyui-1.5.1/locale/easyui-lang-zh_CN',
        'easyui-enhc': '../common/easyui-enhc',
        'View': '../common/View',
        'Service': '../common/Service',
        'common': '../common/common_new',
        //>------------ EasyUI 扩展插件 ------------
        'datagrid-groupview': 'lib/easyui-1.5.1/ext/datagrid-groupview.ext',
        'datagrid-defaultview': 'lib/easyui-1.5.1/ext/datagrid-defaultview',
        'datagrid-filter': 'lib/easyui-1.5.1/ext/datagrid-filter',
        //------------ EasyUI 扩展插件 ------------<
        'jquery.validate': 'lib/jquery-validation/1.13.1/jquery.validate',// 表单验证
        'jquery.validate.ex': 'lib/jquery-validation/1.13.1/localization/messages_zh.ex',// 表单验证
        'serializeObject': 'lib/jquery-serialize-object/2.5.0/jquery.serialize-object.min',// 将form表单转化成Javascript
        'moment': 'lib/moment/2.13.0/moment.min',// 日期格式化
        'art-template': 'lib/art-template/3.0.0/template',// html模板
        'kindeditor': 'lib/kindeditor-4.1.7/kindeditor-min',// 富文本编辑器
        'kindeditor.ex': 'lib/kindeditor-4.1.7/lang/zh_CN',// 富文本编辑器 中文语言包
        'plupload': 'lib/plupload/2.1.8/plupload.full.min',// 上传文件组件
        'toastr': 'lib/toastr/2.1.2/toastr.min',// 侧边栏提醒
        'ztree': 'lib/ztree/js/jquery.ztree.all.min',// 树插件
        'layer': 'lib/layer/layer',
        'city-picker.data': 'lib/city-picker/1.0.2/js/city-picker.data.mine.min',
        'city-picker': 'lib/city-picker/1.0.2/js/city-picker.mine.min',//省市区选择(扩展了方法)【推荐】
        // 'hotkeys': 'lib/jquery.hotkeys-master/jquery.hotkeys',//快捷键【效果不好，已弃用】


        'ahUtility':'../hospitalized_economy/utility'//personal utility module, authorized insertion.
    },
    map: {
        '*': {
            'css': 'lib/require-css/0.1.8/css.min'// RequireJS加载样式文件插件
        }
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'easyui': {
            deps: [
                'jquery',
                'css!lib/easyui-1.5.1/themes/metro-blue-ext/easyui.css',
                'css!lib/easyui-1.5.1/themes/icon.css'
            ],
            exports: 'jQuery'
        },
        'easyui-cn': {
            deps: [
                'easyui'
            ],
            exports: 'jQuery'
        },
        'easyui-enhc': {
            deps: [
                'easyui-cn'
            ]
        },
        'kindeditor.ex': {
            deps: [
                'css!lib/kindeditor-4.1.7/themes/default/default.css',
                'kindeditor']
        },
        'jquery-validate-ex': {
            deps: ['jquery-validate']
        },
        'toastr': ['css!lib/toastr/2.1.2/toastr.min.css'],
        'ztree': {
            deps: [
                // 'css!lib/ztree/css/zTreeStyle/zTreeStyle.css',
                'css!lib/ztree/css/metroStyle/metroStyle.css', 'jquery']
        },
        'layer': {
            deps: [
                'css!lib/layer/skin/default/layer.css']
        },
        'city-picker': {
            deps: [
                'city-picker.data',
                'css!lib/city-picker/1.0.2/css/city-picker.mine.css'
            ]
        }
    }
});

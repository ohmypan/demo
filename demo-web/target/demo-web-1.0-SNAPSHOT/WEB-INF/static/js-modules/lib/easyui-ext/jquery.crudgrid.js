(function ($) {

    var pluginName = 'crudgrid';

    function init(target) {
        var opts = $.data(target, pluginName).options;

        // 合并toolbar
        if(opts.toolbar && opts.toolbar.length){
            opts.toolbar = toolbar(target).concat(opts.toolbar);
        }else{
            opts.toolbar = toolbar(target);
        }

        $(target).datagrid(opts).datagrid('enableCellEditing').datagrid('disableCellSelecting');
    }

    function toolbar(target){
        return [{
            text: '新增(A)',
            iconCls: 'icon-add',
            handler: function () { doAdd(target); }
        }, {
            text: '删除(D)',
            iconCls: 'icon-cut',
            handler: function () { doDelete(target); }
        }, '-', {
            text: '保存(S)',
            iconCls: 'icon-save',
            handler: function () { doSave(target); }
        },{
            text: '取消(C)',
            iconCls: 'icon-cancel',
            handler: function () { doCancel(target); }
        }, '-', {
            text: '刷新(R)',
            iconCls: 'icon-reload',
            handler: function () { doRefresh(target); }
        }, '-'];
    }

    function doAdd(target){
        var dg = $(target);
        var opts = dg.datagrid('options');

        dg.datagrid('appendRow', opts.onNewRow())
            .datagrid('editCell', { index: dg.datagrid('getRows').length - 1, field: opts.columns[0][0].field });
    }
    function doDelete(target){
        var dg = $(target);
        var selections = dg.datagrid('getSelections');

        for(var i = 0; i < selections.length; i++){
            var idx = dg.datagrid('getRowIndex', selections[i]);

            dg.datagrid('deleteRow', idx);
        }
    }
    function doSave(target){
        var opts = $.data(target, pluginName).options;
        var dg = $(target);
        var inserted = dg.datagrid('getChanges', 'inserted'), 
            deleted = dg.datagrid('getChanges', 'deleted'), 
            updated = dg.datagrid('getChanges', 'updated'); 

        if(inserted.length || deleted.length || updated.length){
            opts.saveHandler.call(target, inserted, deleted, updated);
        }
    }
    function doCancel(target) {
        $(target).datagrid('rejectChanges');
    }
    function doRefresh(target){
        $(target).datagrid('reload');
    }

    $.fn[pluginName] = function (options, param) {
        if (typeof options == 'string') {
            return $.fn[pluginName].methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, {
                    options: $.extend({}, $.fn[pluginName].defaults, 
                    // 复用 datagrid 配置
                    $.fn.datagrid.parseOptions(this), 
                    $.fn[pluginName].parseOptions(this), options)
                });

                init(this);
            }
        });
    };

    $.fn[pluginName].methods = {

    }

    $.fn[pluginName].parseOptions = function(target){
		return {};
	};

    $.fn[pluginName].defaults = {
        rownumbers: true,
        ctrlSelect: true,
        singleSelect: false,
        onNewRow: function(){ return { } },
        saveHandler: function(inserted, deleted, updated) { }
    }

    if($.parser){
        $.parser.plugins.push('crudgrid');
    }

})(jQuery);
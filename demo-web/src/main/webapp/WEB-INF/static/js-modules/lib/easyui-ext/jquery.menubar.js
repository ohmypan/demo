(function ($) {

    var menuId = 1;

    function init(target){
        var opts = $.data(target, 'menubar').options;

        if(opts.url){
            $.ajax({ url: opts.url, type: opts.method, dataType: 'json' }).then(
                function(menus){ build(menus, target); }
            );
        } else if(opts.data && opts.data.length){
            build(opts.data, target);
        }
    }

    function build(menus, target){
        var opts = $.data(target, 'menubar').options;

        for(var i = 0; i < menus.length; i++){
            var root = menus[i];

            if(root.children && root.children.length){
                createMenuButton(root, target, createMenu(root.children, target).attr('id'));
            }else{
                createMenuButton(root, target);
            }
        }

        //$.parser.parse($(target).parent());
        $.parser.parse(target);

        $(target).panel({
            cls: opts.cls || {},
            bodyCls: opts.bodyCls,
            style: opts.style || {},
            border: opts.border
        });
    }

    function createMenuButton(root, target, menuId){
        var hasSub = root.children && root.children.length;
        var opts = $.data(target, 'menubar').options;
        var e = $('<span class="' + (hasSub ? 'easyui-menubutton' : 'easyui-linkbutton') + '"></span>')
                    .text(root.text)
                    .css({ 'margin-left': opts.padding / 2 + 'px', 'margin-right': opts.padding / 2 + 'px' })
                    .data('options', { 
                        menu: hasSub ? '#' + menuId : null, 
                        menuAlign: opts.menuAlign, 
                        plain: opts.plain, 
                        iconCls: root.iconCls,
                        onClick: !hasSub ? function(){ opts.onMenuItemClick.call(this, root) } : null
                    });

        $(target).append(e);
    }
    function createMenu(menuItems, target){
        var mid = 'menuid' + menuId++;
        var opts = $.data(target, 'menubar').options;
        var container = $('<div class="easyui-menu"></div>')
                            .attr('id', mid)
                            //.attr('data-options', $.parser.serialOptions({ onClick: opts.onMenuItemClick }))
                            .data('options', { onClick: opts.onMenuItemClick });

        //$(document.body).append(container);
        container.appendTo(target);

        for(var i = 0; i < menuItems.length; i++){
            var item = menuItems[i];
            
            if(item.children && item.children.length){
                createMenuItemWithSub(item).appendTo(container);
            }else{
                createMenuItem(item).appendTo(container);
            }
        }

        return container;
    }
    function createMenuItem(item){
        return $('<div></div>')
                    .html(item.text)
                    .attr('data-options', $.parser.serialOptions({ id: item.id, iconCls: item.iconCls, url: item.url }));
    }
    function createMenuItemWithSub(root){
        var c = $('<div></div>')
                    .attr({ id: root.id, iconCls: root.iconCls })
                    .append($('<span></span>').html(root.text));

        for(var i = 0; i < root.children.length; i++){
            var item = root.children[i];

            if(item.children && item.children.length){
                createMenuItemWithSub(item).appendTo(c);
            } else{
                createMenuItem(item).appendTo(c);
            }
        }

        return c;
    }

    $.fn.menubar = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.menubar.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            if (!$.data(this, 'menubar')) {
                $.data(this, 'menubar', {
                    options: $.extend({}, $.fn.menubar.defaults, $.fn.menubar.parseOptions(this), options)
                });
                init(this);
            }
        });
    };

    $.fn.menubar.methods = {

    }

    $.fn.menubar.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, [
		     { border: 'boolean', plain: 'boolean', padding: 'number' }
		]));
	};

    $.fn.menubar.defaults = {
        // for self
        url: null,
        method: 'get',
        loadingMessage: '正在加载菜单...',
        data: null,
        padding: 4,
        // for menubutton
        menuAlign: 'left',
        plain: true,
        // for panel
        cls: null,
        bodyCls: null,
        style: null,
        border: true,
        // for menu
        onMenuItemClick: function(item) { },
    }

    if($.parser){
        $.parser.plugins.push('menubar');
    }

})(jQuery);
(function ($) {

    var pluginName = 'lazytabs';

    function init(target) {
        var opts = $.data(target, pluginName).options;
        var tabs = $(target);
        var oldTabSelect = opts.onSelect;

        opts.onSelect = function onTabSelect(title, index) {
            var t = opts.tabs[index];

            if(t.href || t.content){
                var tab = tabs.tabs('getSelected');

                if(tab.is(':empty')){
                    tabs.tabs('update', {
                        tab: tab,
                        options: t
                    });
                }
            }

            oldTabSelect && oldTabSelect.call(this, title, index);
        }

        normalizeTabs(target);
        tabs.tabs(opts);
        createTabs(target);
    }
    
    function normalizeTabs(target) {
        var opts = $.data(target, pluginName).options;
        var tabs = opts.tabs || [];

        for(var i = 0; i < tabs.length; i++){
            var t = tabs[i];
            t.content = (opts.iframe && t.href) ? '<iframe scrolling="no" frameborder="0" src="' + t.href + '" style="width:100%;height:100%;"></iframe>' : t.content;
            t.href = opts.iframe ? null : t.href;
        }
    }

    function createTabs(target) {
        var tabs = $(target);
        var opts = $.data(target, pluginName).options;


        if(opts.tabs){
            var selected = -1;

            for(var i = 0; i < opts.tabs.length; i++){
                var t = opts.tabs[i];

                if(t.selected){
                    selected = i;
                    break;
                }
            }

            for(var i = 0; i < opts.tabs.length; i++){
                var t = opts.tabs[i];

                tabs.tabs('add', $.extend({}, t, {
                        href: i == selected ? t.href : null,
                        content: i == selected ? t.content : null,
                        selected: i === selected,
                        //extractor: opts.iframe ? iframeExtractor : null
                    })
                );
            }
        }
    }
    
    function update(target, newTabs) {
        if(!newTabs)
            return;

        var tabs = $(target);
        var opts = $.data(target, pluginName).options;
        var len = tabs.tabs('tabs').length;
        opts.tabs = newTabs;

        for(var i = 0; i < len; i++){
            tabs.tabs('close', 0);
        }

        normalizeTabs(target);
        createTabs(target);
    }

    $.fn[pluginName] = function (options, param) {
        if (typeof options == 'string') {
            if($.fn[pluginName].methods[options]){
                return $.fn[pluginName].methods[options](this, param);
            }else {
                return $.fn.tabs.methods[options](this, param);
            }
        }

        options = options || {};
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, {
                    options: $.extend({}, $.fn[pluginName].defaults,
                        $.fn.tabs.parseOptions(this),
                        $.fn[pluginName].parseOptions(this), options)
                });

                init(this);
            }
        });
    };

    $.fn[pluginName].methods = {
        update: function (jq, param) {
            return jq.each(function () {
                update(this, param);
            });
        }
    }

    $.fn[pluginName].parseOptions = function(target){
        return {};
    };

    $.fn[pluginName].defaults = {
        tabs: null,
        iframe: true
    }

})(jQuery);
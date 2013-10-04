var AsaCode  = {};

AsaCode.TabInterface = Class.extend({
    init: function(el) {
        this.el = el;
        this.handleTabClick();
    },

    handleTabClick : function() {
        boundLoadResults= $.proxy(this.loadResults, this);
        $(this.el).on('click', 'a', boundLoadResults);
    },

    loadResults : function (event) {
        this.getTarget();
        this.loadAjaxRequest(event);
    },

    getTarget : function() {
        currentTarget = $(this.el).data("config");
        this.updateTarget = $("div").filter(function(){
            possibles = $(this).data("target-id");
            return possibles.ajaxTarget === currentTarget.ajaxTarget;
        });
    },

    loadAjaxRequest : function(event) {
        event.preventDefault();
        if (event.target.href) {
            this.updateTarget.load(event.target.href, function(){
                AsaCode.Tabs.init();
        });
    }
}
});

AsaCode.Tabs = AsaCode.Tabs || {

    tabClass : 'ajaxClickable',

    Objects : [],

    init : function() {
        boundInitializeTabInterface = $.proxy(this.initializeTabInterface, AsaCode.Tabs);
        $('.' + this.tabClass).each(boundInitializeTabInterface);
    },
    initializeTabInterface : function(index, el) {
        this.create(el);
        this.markInitialized(el);
    },

    create : function(el) {
        Objects = this.Objects;
        (Objects).push(new AsaCode.TabInterface(el));
    },
    markInitialized: function(el){
        parentEl = $(el);
        if (parentEl.hasClass(this.tabClass)){
            parentEl.removeClass(this.tabClass);
            parentEl.addClass(this.tabClass+'-initialized');
        }
    }

};

var TabsInit = AsaCode.Tabs.init();
$(document).ready(TabsInit);


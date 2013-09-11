var AsaCode  = {};

AsaCode.TabInterface = Class.extend({
		
	init: function(el) {
	  this.getTarget(el);
	},
	getTarget : function(el) {
		parentEl = $(el).parents("ul");
		currentTarget = parentEl.data("config");
		updateTarget = $("div").filter(function(){
			possibles = $(this).data("target-id");
			return possibles.ajaxTarget === currentTarget.ajaxTarget;
		});
		this.loadAjaxRequest(el,updateTarget);
	},
	loadAjaxRequest : function(el,updateTarget) {
		updateTarget.load(el.href);
	}

});

AsaCode.Tabs = AsaCode.Tabs || {

	tabClass : 'ajaxClickable',
	
	selector : '.',
	
	Objects : [],
	
	init : function() {
		this.selector += this.tabClass;
		boundAttachEvent = $.proxy(this.attachEvent, AsaCode.Tabs)
		$(this.selector).on('click', 'a', boundAttachEvent);
	},
	attachEvent : function(event) {
		event.preventDefault();
		el = event.target;
		this.create(el);
		this.markInitialized(el);
	},
	
    create : function(el) {
		Objects = this.Objects;
        (Objects).push(new AsaCode.TabInterface(el));
    },
	markInitialized: function(el){
		parentEl = $(el).parents("ul");
        if (parentEl.hasClass(this.tabClass)){
          parentEl.removeClass(this.tabClass);
          parentEl.addClass(this.tabClass+'-initialized');
        }
    }

};

var TabsInit = AsaCode.Tabs.init();
$(document).ready(TabsInit);

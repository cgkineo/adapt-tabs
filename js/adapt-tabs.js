/*
* adapt-tabs
* Version - 0.0.0
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - kirsty hames <kirsty.hames@kineo.com>
*/
define(function(require) {

	var ComponentView = require('coreViews/componentView');
	var Adapt = require('coreJS/adapt');

    var Tabs = ComponentView.extend({

    	events: {
    		'click .tab-item': 'onTabItemClicked'
    	},
        
        preRender: function() {
        },

        postRender: function() {
        	this.setReadyStatus();
        	this.setLayout();
            this.listenTo(Adapt, 'device:resize', this.setLayout);
        	this.showContentItemAtIndex(0);
        	this.setTabSelectedAtIndex(0);
        },

        setLayout: function() {
            this.$el.removeClass("tab-layout-left tab-layout-top");
            if (Adapt.device.screenSize == 'large') {
                var tabLayout = this.model.get('_tabLayout');
                this.$el.addClass("tab-layout-" + tabLayout);
                if (tabLayout === 'top') {
                    this.setTabLayoutTop();
                } else if (tabLayout === 'left') {
                    this.setTabLayoutLeft();
                }                
            } else {
                this.$el.addClass("tab-layout-left");
                this.setTabLayoutLeft();
            }        	
        },

        setTabLayoutTop: function() {
        	var itemsLength = this.model.get('_items').length;
        	var itemWidth = 100 / itemsLength;
        	this.$('.tab-item').css({
        		width: itemWidth + '%'
        	});
            this.$('.tabs-content-items').css({
                height: 'auto'
            });
        },

        setTabLayoutLeft: function() {
            var height = this.$('.tabs-tab-items').height();
            this.$('.tabs-content-items').css({
                height: height + 'px'
            });
            this.$('.tab-item').css({
                width: 'auto'
            });
        },

        onTabItemClicked: function(event) {
        	event.preventDefault();
        	var index = $(event.currentTarget).index();
        	this.showContentItemAtIndex(index);
        	this.setTabSelectedAtIndex(index);
        	this.setVisited($(event.currentTarget).index());
        },

        showContentItemAtIndex: function(index) {
        	this.$('.tab-content').velocity({
        		opacity: 0,
        		translateY: '20px'
        	}, {
        		duration: 200,
        		display: 'none'
        	});
        	this.$('.tab-content-item-title-image').velocity({
        		scaleX: 0.9,
        		scaleY: 0.9
        	}, {
        		duration: 200
        	});

        	var contentItem = this.$('.tab-content').eq(index);
        	var $contentItem = $(contentItem);
        	$contentItem.velocity({
        		opacity: 1,
        		translateY: '0'
        	}, {
        		duration: 400,
        		display: 'block'
        	});
        	$contentItem.find('.tab-content-item-title-image').velocity({
        		scaleX: 1,
        		scaleY: 1
        	}, {
        		duration: 800
        	});
        },

        setTabSelectedAtIndex: function(index) {
        	this.$('.tab-item').removeClass('selected');
        	this.$('.tab-item').eq(index).addClass('selected');
        	this.setVisited($(event.currentTarget).index());
        },

        setVisited: function(index) {
	      	var item = this.model.get('_items')[index];
	      	item._isVisited = true;
	      	this.checkCompletionStatus();
	    },

	    getVisitedItems: function() {
	      	return _.filter(this.model.get('_items'), function(item) {
	        	return item._isVisited;
	      	});
	    },

	    checkCompletionStatus: function() {
	        if (this.getVisitedItems().length == this.model.get('_items').length) {
	          	this.setCompletionStatus();
	        }
	    }
        
    });
    
    Adapt.register("tabs", Tabs);

    return Tabs;
    
});

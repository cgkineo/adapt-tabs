define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var Tabs = ComponentView.extend({

    events: {
      'click .js-tabs-nav-item-btn-click': 'onTabItemClicked'
    },

    postRender: function() {
      this.setReadyStatus();
      this.setLayout();
      this.listenTo(Adapt, 'device:resize', this.setLayout);
      this.showContentItemAtIndex(0);
      this.setTabSelectedAtIndex(0);
      this.setVisited(0);
    },

    setLayout: function() {
      this.$el.removeClass('is-top-layout is-left-layout');
      if (Adapt.device.screenSize === 'large') {
        var tabLayout = this.model.get('_tabLayout');
        this.$el.addClass('is-' + tabLayout + '-layout');
        if (tabLayout === 'left') {
          this.setTabLayoutLeft();
          return;
        }
        this.setTabLayoutTop();
        return;
      }

      this.$el.addClass('is-top-layout');
      this.setTabLayoutLeft();
    },

    setTabLayoutTop: function() {
      var itemsLength = this.model.get('_items').length;
      var itemWidth = 100 / itemsLength;

      this.$('.tabs__nav-item-btn').css({
        width: itemWidth + '%'
      });
    },

    setTabLayoutLeft: function() {
      this.$('.tabs__nav-item-btn').css({
        width: 100 + '%'
      });
    },

    onTabItemClicked: function(e) {
      if (e && e.preventDefault) e.preventDefault();

      var index = $(e.currentTarget).index();
      this.showContentItemAtIndex(index);
      this.setTabSelectedAtIndex(index);
      this.setVisited(index);
    },

    showContentItemAtIndex: function(index) {
      this.$('.tabs__content-item')
          .removeClass('is-active')
          .eq(index)
          .addClass('is-active')
          .a11y_focus();
    },

    setTabSelectedAtIndex: function(index) {
      var ariaLabel = this.model.get('_items')[index].tabTitle + '. ' + this.model.get('_globals')._accessibility._ariaLabels.visited;
      this.$('.js-tabs-nav-item-btn-click')
          .removeClass('is-selected')
          .attr('aria-selected', 'false')
          .eq(index)
          .addClass('is-selected is-visited')
          .attr('aria-label', ariaLabel)
          .attr('aria-selected', true);
    },

    setVisited: function(index) {
      var item = this.model.get('_items')[index];
      item._isVisited = true;
      this.checkCompletionStatus();
    },

    getVisitedItems: function() {
      return this.model.get('_items').filter(function(item) {
        return item._isVisited;
      });
    },

    checkCompletionStatus: function() {
      if (this.getVisitedItems().length < this.model.get('_items').length) return;

      this.setCompletionStatus();
    }
  }, {
    template: 'tabs'
  });

  return Adapt.register('tabs', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: Tabs
  });
});

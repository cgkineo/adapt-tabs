define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/itemsComponentModel'
], function(Adapt, ComponentView, ItemsComponentModel) {

  var Tabs = ComponentView.extend({

    events: {
      'click .js-tabs-nav-item-btn-click': 'onTabItemClicked'
    },

    preRender: function() {
      this.checkIfResetOnRevisit();

      this.model.resetActiveItems();

      this.listenTo(this.model.get('_children'), {
        'change:_isActive': this.onItemsActiveChange,
        'change:_isVisited': this.onItemsVisitedChange
      });
    },

    postRender: function() {
      this.setReadyStatus();
      this.setLayout();
      this.listenTo(Adapt, 'device:resize', this.setLayout);

      this.model.setActiveItem(0);

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
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

      this.model.setActiveItem($(e.currentTarget).data('index'));
    },

    onItemsActiveChange: function(item, isActive) {
      var dataFilter = '[data-index="' + item.get('_index') +'"]';

      var $tabButton = this.$('.js-tabs-nav-item-btn-click').filter(dataFilter);
      var $tabPanel = this.$('.tabs__content-item').filter(dataFilter);

      $tabButton.toggleClass('is-selected', isActive).attr('aria-selected', isActive);
      $tabPanel.toggleClass('is-active', isActive);

      if (isActive) {
        $tabPanel.a11y_focus();
        item.toggleVisited(true);
      }
    },

    onItemsVisitedChange: function(item, isVisited) {
      if (!isVisited) return;

      var ariaLabel = item.get('tabTitle') + '. ' + this.model.get('_globals')._accessibility._ariaLabels.visited;
      var $tabButton = this.$('.js-tabs-nav-item-btn-click').filter('[data-index="' + item.get('_index') +'"]');
      $tabButton.addClass('is-visited').attr('aria-label', ariaLabel);
    },

  }, {
    template: 'tabs'
  });

  return Adapt.register('tabs', {
    model: ItemsComponentModel,
    view: Tabs
  });
});

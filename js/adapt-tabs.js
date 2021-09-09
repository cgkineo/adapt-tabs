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
      this.setLayout();
      this.listenTo(Adapt, 'device:resize', this.setLayout);

      this.model.setActiveItem(0);
      this.setReadyStatus();

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

    setLayout: function () {
      var layout = Adapt.device.screenSize === 'large' ?
        this.model.get('_tabLayout') :
        'vertical';

      var itemWidth = layout === 'horizontal' ?
        100 / this.model.get('_items').length + '%' :
        '';

      this.$el
        .removeClass('is-horizontal-layout is-vertical-layout')
        .addClass('is-' + layout + '-layout');

      this.$('.tabs__nav-item-btn').css('width', itemWidth);
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
      Adapt.a11y.toggleHidden($tabPanel, !isActive);

      if (isActive && this.model.get('_isReady')) {
        Adapt.a11y.focusFirst($tabPanel, { preventScroll: true });
      }

      if (isActive) {
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

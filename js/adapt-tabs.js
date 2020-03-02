define([
  'core/js/adapt',
  'core/js/views/componentView'
], function(Adapt, ComponentView) {

  var Tabs = ComponentView.extend({

    events: {
      'click .js-tabs-nav-item-btn-click': 'onTabItemClicked'
    },

    preRender: function() {
    },

    postRender: function() {
      this.setReadyStatus();
      this.setLayout();
      this.listenTo(Adapt, 'device:resize', this.setLayout);
      this.showContentItemAtIndex(0, true);
      this.setTabSelectedAtIndex(0);
    },

    setLayout: function() {
      this.$el.removeClass("is-top-layout is-left-layout");
      if (Adapt.device.screenSize == 'large') {
        var tabLayout = this.model.get('_tabLayout');
        this.$el.addClass("is-" + tabLayout + "-layout");
        if (tabLayout === 'left') {
          this.setTabLayoutLeft();
          return;
        }
        this.setTabLayoutTop();
      } else {
        this.$el.addClass("is-top-layout");
        this.setTabLayoutLeft();
      }
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

    onTabItemClicked: function(event) {
      event.preventDefault();
      var index = $(event.currentTarget).index();
      this.showContentItemAtIndex(index);
      this.setTabSelectedAtIndex(index);
      this.setVisited($(event.currentTarget).index());
    },

    showContentItemAtIndex: function(index, skipFocus) {
      var $contentItems = this.$('.tabs__content-item');
      $contentItems.removeClass('is-active');

      // $contentItems.removeClass('is-active').velocity({
      //   opacity: 0,
      //   translateY: '20px'
      // }, {
      //   duration: 0,
      //   display: 'none'
      // });

      var $contentItem = $contentItems.eq(index);
      $contentItem.addClass('is-active').a11y_focus();
      // $contentItem.velocity({
      //   opacity: 1,
      //   translateY: '0'
      // }, {
      //   duration: 300,
      //   display: 'block',
      //   complete: _.bind(complete,this)
      // });

      // function complete() {
      //   if (skipFocus) return;
      //     $contentItem.addClass('is-active').a11y_focus();
      // }
    },

    setTabSelectedAtIndex: function(index) {
      var $navigationItem = this.$('.tabs__nav-item-btn-inner');
      $navigationItem.removeClass('is-selected').eq(index).addClass('is-selected is-visited').attr('aria-label', this.model.get("_items")[index].tabTitle + ". Visited");
      this.setVisited(index);
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
      if (this.getVisitedItems().length === this.model.get('_items').length) {
        this.setCompletionStatus();
      }
    }
  },{
      template: 'tabs'
  });

  Adapt.register("tabs", Tabs);

  return Tabs;
});

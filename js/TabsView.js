import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import a11y from 'core/js/a11y';
import ComponentView from 'core/js/views/componentView';

class TabsView extends ComponentView {

  className() {
    return [
      super.className(),
      `is-${this.layout}-layout`
    ].join(' ');
  }

  get layout() {
    const layout = device.isScreenSizeMin('large')
      ? this.model.get('_tabLayout')
      : 'vertical';
    return layout;
  }

  preRender() {
    this.reset();
    this.setItemWidth();
    this.onTabItemClicked = this.onTabItemClicked.bind(this);
    this.onTabItemKeyUp = this.onTabItemKeyUp.bind(this);
    this.listenTo(Adapt, 'device:resize', this.setItemWidth);
    this.listenTo(this.model.getChildren(), 'change:_isActive', this.onItemsActiveChange);
  }

  reset() {
    this.model.resetActiveItems();
    const firstItem = this.model.getItem(0);
    if (!firstItem) return;
    firstItem.toggleActive(true);
    firstItem.toggleVisited(true);
  }

  setItemWidth () {
    const itemWidth = (this.layout === 'horizontal')
      ? 100 / this.model.get('_items').length + '%'
      : '';
    this.model.set('itemWidth', itemWidth);
  }

  postRender() {
    this.setReadyStatus();
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  onItemsActiveChange(item, isActive) {
    if (!isActive) return;
    item.toggleVisited(true);
  }

  onTabItemClicked(e) {
    if (e && e.preventDefault) e.preventDefault();
    const index = $(e.currentTarget).data('index');
    this.model.setActiveItem(index);
    const $tabPanel = $(e.currentTarget).parents('.tabs__widget').find('[role=tabpanel]');
    a11y.focus($tabPanel[index]);
  }

  onTabItemKeyUp(event) {
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
    const $tabs = $(event.currentTarget).parents('[role=tablist]').find('[role=tab]');
    if (!$tabs.length) return;
    let currentIndex = $tabs.toArray().findIndex(tab => tab === event.currentTarget);
    switch (event.which) {
      case 37:
        if (currentIndex === 0) currentIndex = $tabs.length;
        currentIndex--;
        break;
      case 39:
        if (currentIndex === $tabs.length - 1) currentIndex = -1;
        currentIndex++;
    }
    this.model.setActiveItem(currentIndex);
    a11y.focus($tabs[currentIndex]);
  }

}

TabsView.template = 'tabs.jsx';

export default TabsView;

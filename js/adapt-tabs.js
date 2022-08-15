import components from 'core/js/components';
import TabsView from './TabsView';
import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default components.register('tabs', {
  model: ItemsComponentModel.extend({}),
  view: TabsView
});

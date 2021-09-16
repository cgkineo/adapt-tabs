import Adapt from 'core/js/adapt';
import TabsView from './TabsView';
import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default Adapt.register('tabs', {
  model: ItemsComponentModel.extend({}),
  view: TabsView
});

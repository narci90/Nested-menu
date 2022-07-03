import { MenuItem } from './menu-item.model';
import { NestedMenuItem } from './nested-menu.model';

export class Menu {
  items: MenuItem[] = [];

  constructor(items: NestedMenuItem[]) {
    if (!!items?.length) {
      const mapMenu = this.mapItems(items, (o) => o.parentId);
      const parentsItems = mapMenu.get(null);

      this.items = parentsItems.map((item: NestedMenuItem) => new MenuItem(item, mapMenu));
    }
  }

  mapItems(items: NestedMenuItem[], keyGetter: (o: NestedMenuItem) => number | null) {
    const map = new Map();
    items.forEach((item: NestedMenuItem) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      !collection ? map.set(key, [item]) : collection.push(item);
    });

    return map;
  }
}

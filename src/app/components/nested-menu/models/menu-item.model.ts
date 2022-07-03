import { NestedMenuItem } from './nested-menu.model';

export class MenuItem {
  id!: number;
  label!: string;
  children: MenuItem[] = [];
  route?: string;
  params?: string[];
  disabled?: boolean;

  constructor(item: NestedMenuItem, mapObj: Map<number | null, NestedMenuItem[]>) {
    this.id = item.id;
    this.label = item.name;
    this.route = item.route;
    this.params = item.params;
    this.disabled = item.disabled;

    this.children = mapObj.has(this.id)
      ? (mapObj.get(this.id) || []).map((child: NestedMenuItem) => new MenuItem(child, mapObj))
      : [];
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from './models/menu.model';
import { NestedMenuItem } from './models/nested-menu.model';

@Component({
  selector: 'nested-menu',
  templateUrl: './nested-menu.component.html',
  styleUrls: ['./nested-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedMenuComponent {
  menu!: Menu;

  /**
   * Items for menu
   *
   * example: [
   * {
   *   name: 'drink',
   *   id: 1,
   *   parentId: null
   * },
   * {
   *   name: 'food',
   *   id: 2,
   *   parentId: null,
   *   route: '/detail',
   *   params: ['drink']
   * },
   *   ...
   * ]
   */
  @Input()
  get items(): NestedMenuItem[] {
    return this._items;
  }

  set items(value: NestedMenuItem[]) {
    this._items = value;
    this.menu = new Menu(this.items);
    this._changeDetectorRef.detectChanges();
  }

  private _items: NestedMenuItem[] = [];

  /**
   * Outputs the id of the touched item if it has no navigation
   */
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}

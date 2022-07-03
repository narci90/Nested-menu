import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'nested-menu-item',
  templateUrl: './nested-menu-item.component.html',
  styleUrls: ['./nested-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedMenuItemComponent {
  @Input() items: MenuItem[] = [];

  @Output() touchedItem: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(MatMenu) menu!: MatMenu;

  constructor(private _router: Router) {}

  onAction(item: MenuItem) {
    if (item.route) {
      const path = [item.route, ...(item.params || [])];
      this._router.navigate(path);
    } else {
      this.touchedItem.emit(item.id);
    }
  }
}

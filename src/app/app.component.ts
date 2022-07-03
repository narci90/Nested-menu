import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NestedMenuItem } from './components/nested-menu';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  itemsNestedMenu: NestedMenuItem[] = [
    {
      name: 'Bebidas',
      id: 1,
      parentId: null
    },
    {
      name: 'Comidas',
      id: 2,
      parentId: null
    },
    {
      name: 'Limpieza',
      id: 3,
      parentId: null,
      route: '/detail',
      params: ['Limpieza']
    },
    {
      name: 'Gaseosas',
      id: 100,
      parentId: 1
    },
    {
      name: 'Con Alcohol',
      id: 1010,
      parentId: 100
    },
    {
      name: 'Sin Alcohol',
      id: 1009,
      parentId: 100
    },
    {
      name: 'Con Azúcar',
      id: 101,
      parentId: 1009,
      disabled: true
    },
    {
      name: 'Sin Azucar',
      id: 103,
      parentId: 1009
    },
    {
      name: 'Jugos',
      id: 189,
      parentId: 103
    },
    {
      name: 'Energizantes',
      id: 1222,
      parentId: 103
    },
    {
      name: 'Fruta',
      id: 1223,
      parentId: 1222
    },
    {
      name: 'Sin grasa',
      id: 12231231,
      parentId: 1223,
      route: '/detail',
      params: ['Sin grasa']
    }
  ];

  onItemAction(id: number) {
    // eslint-disable-next-line no-console
    console.log('\x1b[42m%s\x1b[0m', 'Id item tocado:', id);
  }

  addItem() {
    const id = 12231232;
    if (!this.itemsNestedMenu.some((item: NestedMenuItem) => item.id === id)) {
      this.itemsNestedMenu = [
        ...this.itemsNestedMenu,
        {
          name: 'Con grasa',
          id,
          parentId: 1223,
          route: '/detail',
          params: ['Con grasa']
        }
      ];
    } else {
      alert('El item "Con grasa" ya ha sido añadido');
    }
  }
}

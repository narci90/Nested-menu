import { Location } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { NestedMenuItem } from './models/nested-menu.model';
import { NestedMenuComponent } from './nested-menu.component';
import { NestedMenuModule } from './nested-menu.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({ template: `<p>simple</p>` })
class SimpleComponent {}

const testRoutes: Routes = [
  { path: 'detail', component: SimpleComponent },
  { path: 'detail/:data', component: SimpleComponent }
];

@Component({
  template: `
    <nested-menu [items]="itemsMenu" (action)="onItemAction($event)">
      <button>Open Nested Menu</button>
    </nested-menu>
  `
})
class NestedMenuTestComponent {
  itemsMenu: NestedMenuItem[] = [
    {
      name: 'Drink',
      id: 1,
      parentId: null
    },
    {
      name: 'Food',
      id: 2,
      parentId: null
    },
    {
      name: 'Without alcohol',
      id: 10,
      parentId: 1,
      disabled: true
    },
    {
      name: 'With alcohol',
      id: 11,
      parentId: 1,
      route: '/detail',
      params: ['With alcohol']
    }
  ];

  @ViewChild(NestedMenuComponent) nestedMenuComponent!: NestedMenuComponent;

  onItemAction(id: number) {
    return id;
  }
}

fdescribe('NestedMenuComponent', () => {
  let componentEl: HTMLElement;
  let component: NestedMenuTestComponent;
  let fixture: ComponentFixture<NestedMenuTestComponent>;
  let overlayContainerElement: HTMLElement;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NestedMenuTestComponent, SimpleComponent],
      imports: [RouterTestingModule.withRoutes(testRoutes), NestedMenuModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    fixture = TestBed.createComponent(NestedMenuTestComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NestedMenuComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should build the menu model correctly', () => {
    expect(component.nestedMenuComponent.menu.items.length).toBe(2);
    expect(component.nestedMenuComponent.menu.items[0].id).toBe(1);
    expect(component.nestedMenuComponent.menu.items[1].id).toBe(2);

    expect(component.nestedMenuComponent.menu.items[0].children.length).toBe(2);
    expect(component.nestedMenuComponent.menu.items[0].children[0].id).toBe(10);
    expect(component.nestedMenuComponent.menu.items[0].children[1].id).toBe(11);

    expect(component.nestedMenuComponent.menu.items[0].id);
  });

  it('should build the parent and child structure correctly', () => {
    expect(component.nestedMenuComponent.menu.items[0].label).toBe('Drink');

    expect(component.nestedMenuComponent.menu.items[0].children[0].label).toBe('Without alcohol');
    expect(component.nestedMenuComponent.menu.items[0].children[1].label).toBe('With alcohol');
  });

  it('should display the menu correctly', () => {
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    expect(items.length).toBe(2);

    items[0].click();
    fixture.detectChanges();

    const childItems = overlayContainerElement.querySelectorAll('button');
    expect(childItems.length).toBe(4);
  });

  it('should display the parent and child structure correctly', () => {
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    expect(items[0].textContent).toContain('Drink');

    items[0].click();
    fixture.detectChanges();

    const childItems = overlayContainerElement.querySelectorAll('button');
    expect(childItems[2].textContent).toContain('Without alcohol');
    expect(childItems[3].textContent).toContain('With alcohol');
  });

  it('should be disabled if the item has the disabled property set to true', () => {
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    items[0].click();
    fixture.detectChanges();

    const childItems = overlayContainerElement.querySelectorAll('button');
    expect(component.nestedMenuComponent.menu.items[0].children[0].disabled).toBe(true);
    expect(childItems[2].disabled).toBe(true);
  });

  it('should update menu if input object is updated', () => {
    expect(component.nestedMenuComponent.menu.items.length).toBe(2);
    expect(component.nestedMenuComponent.menu.items[0].id).toBe(1);
    expect(component.nestedMenuComponent.menu.items[1].id).toBe(2);

    const newMenuData = [
      ...component.itemsMenu,
      {
        name: 'New',
        id: 3,
        parentId: null
      }
    ];

    component.itemsMenu = newMenuData;
    fixture.detectChanges();

    expect(component.nestedMenuComponent.menu.items.length).toBe(3);
    expect(component.nestedMenuComponent.menu.items[0].id).toBe(1);
    expect(component.nestedMenuComponent.menu.items[1].id).toBe(2);
    expect(component.nestedMenuComponent.menu.items[2].id).toBe(3);
  });

  it('should update menu view if input object is updated', () => {
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    let items = overlayContainerElement.querySelectorAll('button');
    expect(items.length).toBe(2);

    items[1].click();
    fixture.detectChanges();

    const newMenuData = [
      ...component.itemsMenu,
      {
        name: 'New',
        id: 3,
        parentId: null
      }
    ];

    component.itemsMenu = newMenuData;
    fixture.detectChanges();

    menu.click();
    fixture.detectChanges();

    items = overlayContainerElement.querySelectorAll('button');
    expect(items.length).toBe(3);
    expect(items[2].textContent).toContain('New');
  });

  it('should emit action event with id if it has no route and no more elements', () => {
    const onItemAction = spyOn(component, 'onItemAction');
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    items[0].click();
    fixture.detectChanges();

    expect(onItemAction).not.toHaveBeenCalled();

    items[1].click();
    fixture.detectChanges();

    expect(onItemAction).toHaveBeenCalledOnceWith(2);
  });

  it('should navigate to the route if it has the property route with the parameters', fakeAsync(() => {
    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    items[0].click();
    fixture.detectChanges();

    expect(location.path()).toEqual('');

    items[1].click();
    fixture.detectChanges();

    const childItems = overlayContainerElement.querySelectorAll('button');
    childItems[3].click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/detail/With%20alcohol');
  }));

  it('should navigate to the route if it has the route property without parameters', fakeAsync(() => {
    const menuData = [
      ...component.itemsMenu,
      {
        name: 'Mixto',
        id: 12,
        parentId: 1,
        route: '/detail'
      }
    ];

    component.itemsMenu = menuData;
    fixture.detectChanges();

    const menu = componentEl.querySelector<HTMLElement>('.mat-menu-trigger')!;
    menu.click();
    fixture.detectChanges();

    const items = overlayContainerElement.querySelectorAll('button');
    items[0].click();
    fixture.detectChanges();

    expect(location.path()).toEqual('');

    items[1].click();
    fixture.detectChanges();

    const childItems = overlayContainerElement.querySelectorAll('button');
    childItems[4].click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/detail');
  }));
});

import { TestBed } from '@angular/core/testing';
import { NestedMenuItemComponent } from './nested-menu-item.component';

describe('NestedMenuItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NestedMenuItemComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NestedMenuItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

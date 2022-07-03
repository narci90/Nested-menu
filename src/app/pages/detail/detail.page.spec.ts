import { TestBed } from '@angular/core/testing';
import { DetailPage } from './detail.page';

describe('DetailPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPage]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DetailPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

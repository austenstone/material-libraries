import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIconListComponent } from './material-icon-list.component';

describe('MaterialIconListComponent', () => {
  let component: MaterialIconListComponent;
  let fixture: ComponentFixture<MaterialIconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIconListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

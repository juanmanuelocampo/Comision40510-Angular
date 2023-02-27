import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNotLoggedComponent } from './layout-not-logged.component';

describe('LayoutNotLoggedComponent', () => {
  let component: LayoutNotLoggedComponent;
  let fixture: ComponentFixture<LayoutNotLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutNotLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNotLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

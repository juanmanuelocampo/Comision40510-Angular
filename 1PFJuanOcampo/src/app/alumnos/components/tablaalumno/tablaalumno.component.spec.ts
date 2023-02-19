import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaalumnoComponent } from './tablaalumno.component';

describe('TablaalumnoComponent', () => {
  let component: TablaalumnoComponent;
  let fixture: ComponentFixture<TablaalumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaalumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaalumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

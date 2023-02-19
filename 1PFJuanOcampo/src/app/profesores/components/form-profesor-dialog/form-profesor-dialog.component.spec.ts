import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfesorDialogComponent } from './form-profesor-dialog.component';

describe('FormProfesorDialogComponent', () => {
  let component: FormProfesorDialogComponent;
  let fixture: ComponentFixture<FormProfesorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProfesorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProfesorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

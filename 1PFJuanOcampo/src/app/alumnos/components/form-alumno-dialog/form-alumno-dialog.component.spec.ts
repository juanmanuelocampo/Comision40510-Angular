import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlumnoDialogComponent } from './form-alumno-dialog.component';

describe('FormAlumnoDialogComponent', () => {
  let component: FormAlumnoDialogComponent;
  let fixture: ComponentFixture<FormAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAlumnoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

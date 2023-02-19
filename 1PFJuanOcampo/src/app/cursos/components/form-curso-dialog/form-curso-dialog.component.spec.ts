import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCursoDialogComponent } from './form-curso-dialog.component';

describe('FormCursoDialogComponent', () => {
  let component: FormCursoDialogComponent;
  let fixture: ComponentFixture<FormCursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCursoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

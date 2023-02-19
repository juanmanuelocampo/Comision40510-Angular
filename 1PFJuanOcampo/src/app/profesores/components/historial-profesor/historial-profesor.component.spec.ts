import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProfesorComponent } from './historial-profesor.component';

describe('HistorialProfesorComponent', () => {
  let component: HistorialProfesorComponent;
  let fixture: ComponentFixture<HistorialProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

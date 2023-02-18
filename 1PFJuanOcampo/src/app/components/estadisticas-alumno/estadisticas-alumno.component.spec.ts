import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAlumnoComponent } from './estadisticas-alumno.component';

describe('EstadisticasAlumnoComponent', () => {
  let component: EstadisticasAlumnoComponent;
  let fixture: ComponentFixture<EstadisticasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

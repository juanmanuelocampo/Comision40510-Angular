import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/Alumno';

export const cargarAlumnoState = createAction(
  '[AlumnoState] Cargar AlumnoStates'
);

export const alumnosCargados = createAction(
  '[AlumnoState] Alumnoes cargados',
  props<{ alumnos: Alumno[] }>()
);

export const agregarAlumnoState = createAction(
  '[AlumnoState] Agregar alumno',
  props<{ alumno: Alumno }>()
);

export const editarAlumnoState = createAction(
  '[AlumnoState] Editar alumno',
  props<{ alumno: Alumno }>()
);

export const eliminarAlumnoState = createAction(
  '[AlumnoState] Eliminar alumno',
  props<{ alumno: Alumno }>()
);



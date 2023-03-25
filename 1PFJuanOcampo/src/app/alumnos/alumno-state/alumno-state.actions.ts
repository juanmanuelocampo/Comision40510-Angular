import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';

export const cargarAlumnoState = createAction(
  '[AlumnoState] Cargar Alumnos States'
);

export const alumnosCargados = createAction(
  '[AlumnoState] Alumnos cargados',
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

export const cargarCursosAlumnoState = createAction(
  '[AlumnoState] Cargar Cursos del Alumno States',
  props<{ alumno: Alumno }>()
);

export const cursosAlumnoCargados = createAction(
  '[AlumnoState] Cursos asociados al alumno',
  props<{ cursos: Curso[] }>()
);



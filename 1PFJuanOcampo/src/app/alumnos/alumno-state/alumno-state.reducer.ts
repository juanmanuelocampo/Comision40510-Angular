import { Action, createReducer, on } from '@ngrx/store';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import * as AlumnoStateActions from './alumno-state.actions';

export const alumnoStateFeatureKey = 'alumnoState';

export interface AlumnoState {
  cargando: boolean;
  alumnos: Alumno[];
  cursos: Curso[];
}

export const initialState: AlumnoState = {
  cargando: false,
  alumnos: [],
  cursos: []
};

export const reducer = createReducer(
  initialState,
  on(AlumnoStateActions.cargarAlumnoState, (state) => {
    return {...state, cargando: true};
  }),
  on(AlumnoStateActions.alumnosCargados, (state, { alumnos }) => {
    return {...state, cargando: false, alumnos};
  }),
  on(AlumnoStateActions.cargarCursosAlumnoState, (state) => {
    return {...state, cargando: true};
  }),
  on(AlumnoStateActions.cursosAlumnoCargados, (state, { cursos }) => {
    return {...state, cargando: false, cursos};
  }),
  on(AlumnoStateActions.agregarAlumnoState, (state, { alumno: Alumno }) => {
    return state;
  }),
  on(AlumnoStateActions.editarAlumnoState, (state, { alumno: Alumno }) => {
    return state;
  }),
  on(AlumnoStateActions.eliminarAlumnoState, (state, { alumno: Alumno }) => {
    return state;
  }),
);

import { Action, createReducer, on } from '@ngrx/store';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import * as AlumnoStateActions from './alumno-state.actions';

export const alumnoStateFeatureKey = 'alumnoState';

export interface AlumnoState {
  cargando: boolean;
  alumnos: Alumno[];
  inscripciones: Inscripcion[];
}

export const initialState: AlumnoState = {
  cargando: false,
  alumnos: [],
  inscripciones: []
};

export const reducer = createReducer(
  initialState,
  on(AlumnoStateActions.cargarAlumnoState, (state) => {
    return {...state, cargando: true};
  }),
  on(AlumnoStateActions.alumnosCargados, (state, { alumnos }) => {
    return {...state, cargando: false, alumnos};
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

import { Action, createReducer, on } from '@ngrx/store';
import { Inscripcion } from 'src/app/models/Inscripcion';
import * as InscripcionStateActions from './inscripciones-state.actions';

export const inscripcionStateFeatureKey = 'inscripcionState';

export interface InscripcionState {
  cargando: boolean;
  inscripciones: Inscripcion[];
}

export const initialState: InscripcionState = {
  cargando: false,
  inscripciones: []
};

export const reducer = createReducer(
  initialState,
  on(InscripcionStateActions.cargarInscripcionState, (state) => {
    return {...state, cargando: true};
  }),
  on(InscripcionStateActions.inscripcionesCargados, (state, { inscripciones }) => {
    return {...state, cargando: false, inscripciones};
  }),
  on(InscripcionStateActions.agregarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
  on(InscripcionStateActions.editarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
  on(InscripcionStateActions.eliminarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
);

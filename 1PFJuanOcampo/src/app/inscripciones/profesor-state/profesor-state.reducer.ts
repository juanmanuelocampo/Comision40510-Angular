import { Action, createReducer, on } from '@ngrx/store';
import { Profesor } from 'src/app/models/Profesor';
import * as ProfesorStateActions from './profesor-state.actions';

export const profesorStateFeatureKey = 'profesorState';

export interface ProfesorState {
  cargando: boolean;
  profesores: Profesor[];
}

export const initialState: ProfesorState = {
  cargando: false,
  profesores: []
};

export const reducer = createReducer(
  initialState,
  on(ProfesorStateActions.cargarProfesorState, (state) => {
    return {...state, cargando: true};
  }),
  on(ProfesorStateActions.profesoresCargados, (state, { profesores }) => {
    return {...state, cargando: false, profesores};
  }),
  on(ProfesorStateActions.agregarProfesorState, (state, { profesor: Profesor }) => {
    return state;
  }),
  on(ProfesorStateActions.editarProfesorState, (state, { profesor: Profesor }) => {
    return state;
  }),
  on(ProfesorStateActions.eliminarProfesorState, (state, { profesor: Profesor }) => {
    return state;
  }),
);

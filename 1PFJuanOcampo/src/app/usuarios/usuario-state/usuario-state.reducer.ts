import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/Usuario';
import * as UsuarioStateActions from './usuario-state.actions';

export const usuarioStateFeatureKey = 'usuarioState';

export interface UsuarioState {
  cargando: boolean;
  usuarios: Usuario[];
}

export const initialState: UsuarioState = {
  cargando: false,
  usuarios: []
};

export const reducer = createReducer(
  initialState,
  on(UsuarioStateActions.cargarUsuarioState, (state) => {
    return {...state, cargando: true};
  }),
  on(UsuarioStateActions.usuariosCargados, (state, { usuarios }) => {
    return {...state, cargando: false, usuarios};
  }),
  on(UsuarioStateActions.agregarUsuarioState, (state, { usuario: Usuario }) => {
    return state;
  }),
  on(UsuarioStateActions.editarUsuarioState, (state, { usuario: Usuario }) => {
    return state;
  }),
  on(UsuarioStateActions.eliminarUsuarioState, (state, { usuario: Usuario }) => {
    return state;
  }),
);

import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarioState from './usuario-state.reducer';

export const selectUsuarioState = createFeatureSelector<fromUsuarioState.UsuarioState>(
  fromUsuarioState.usuarioStateFeatureKey
);

export const selectCargandoUsuarios = createSelector(
  selectUsuarioState,
  (state: fromUsuarioState.UsuarioState) => state.cargando
);

export const selectUsuariosCargados = createSelector(
  selectUsuarioState,
  (state: fromUsuarioState.UsuarioState) => {
    return state.usuarios
  }
);

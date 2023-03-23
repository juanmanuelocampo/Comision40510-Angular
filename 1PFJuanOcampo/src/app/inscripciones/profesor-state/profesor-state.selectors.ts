import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfesorState from './profesor-state.reducer';

export const selectProfesorState = createFeatureSelector<fromProfesorState.ProfesorState>(
  fromProfesorState.profesorStateFeatureKey
);

export const selectCargandoProfesores = createSelector(
  selectProfesorState,
  (state: fromProfesorState.ProfesorState) => state.cargando
);

export const selectProfesoresCargados = createSelector(
  selectProfesorState,
  (state: fromProfesorState.ProfesorState) => {
    return state.profesores
  }
);

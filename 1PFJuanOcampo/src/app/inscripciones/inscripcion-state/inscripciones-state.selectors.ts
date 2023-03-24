import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcionState from './inscripciones-state.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcionState.InscripcionState>(
  fromInscripcionState.inscripcionStateFeatureKey
);

export const selectCargandoInscripciones = createSelector(
  selectInscripcionState,
  (state: fromInscripcionState.InscripcionState) => state.cargando
);

export const selectInscripcionesCargados = createSelector(
  selectInscripcionState,
  (state: fromInscripcionState.InscripcionState) => {
    return state.inscripciones
  }
);

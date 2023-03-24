import { createAction, props } from '@ngrx/store';
import { Inscripcion } from 'src/app/models/Inscripcion';

export const cargarInscripcionState = createAction(
  '[InscripcionState] Cargar InscripcionStates'
);

export const inscripcionesCargados = createAction(
  '[InscripcionState] Inscripciones cargados',
  props<{ inscripciones: Inscripcion[] }>()
);

export const agregarInscripcionState = createAction(
  '[InscripcionState] Agregar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);

export const editarInscripcionState = createAction(
  '[InscripcionState] Editar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);

export const eliminarInscripcionState = createAction(
  '[InscripcionState] Eliminar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);



import { createAction, props } from '@ngrx/store';
import { Profesor } from 'src/app/models/Profesor';

export const cargarProfesorState = createAction(
  '[ProfesorState] Cargar ProfesorStates'
);

export const profesoresCargados = createAction(
  '[ProfesorState] Profesores cargados',
  props<{ profesores: Profesor[] }>()
);

export const agregarProfesorState = createAction(
  '[ProfesorState] Agregar profesor',
  props<{ profesor: Profesor }>()
);

export const editarProfesorState = createAction(
  '[ProfesorState] Editar profesor',
  props<{ profesor: Profesor }>()
);

export const eliminarProfesorState = createAction(
  '[ProfesorState] Eliminar profesor',
  props<{ profesor: Profesor }>()
);



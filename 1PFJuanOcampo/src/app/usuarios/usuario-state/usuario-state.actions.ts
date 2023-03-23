import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/Usuario';

export const cargarUsuarioState = createAction(
  '[UsuarioState] Cargar UsuarioStates'
);

export const usuariosCargados = createAction(
  '[UsuarioState] Usuarios cargados',
  props<{ usuarios: Usuario[] }>()
);

export const agregarUsuarioState = createAction(
  '[UsuarioState] Agregar usuario',
  props<{ usuario: Usuario }>()
);

export const editarUsuarioState = createAction(
  '[UsuarioState] Editar usuario',
  props<{ usuario: Usuario }>()
);

export const eliminarUsuarioState = createAction(
  '[UsuarioState] Eliminar usuario',
  props<{ usuario: Usuario }>()
);



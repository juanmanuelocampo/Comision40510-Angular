import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Usuario } from "src/app/models/Usuario";
import { UsuarioService } from "../services/usuarios.service";
import { usuariosCargados, cargarUsuarioState, eliminarUsuarioState, agregarUsuarioState, editarUsuarioState } from "./usuario-state.actions";

@Injectable()
export class UsuariosEffects{
    cargarUsuarios$ = createEffect(() => {
        return this.actions$.pipe( // Obserable2
            ofType(cargarUsuarioState),
            concatMap(() => {
                return this.usuariosService.obtenerUsuariosAPI().pipe( // Observable1
                    map((c: Usuario[]) =>
                      usuariosCargados({ usuarios: c }))
                )
            })
        )
    });

    agregarUsuario$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarUsuarioState),
            concatMap(({ usuario }) => {
                return this.usuariosService.agregarUsuarioAPI(usuario).pipe(
                    map((usuario: Usuario) => {
                        alert(`${usuario.usuario} agregado correctamente.`);
                        //this.router.navigate(['usuarios/listar']);
                        return cargarUsuarioState();
                    })
                )
            })
        );
    });

    editarUsuario$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editarUsuarioState),
          concatMap(({ usuario }) => {
              return this.usuariosService.editarUsuarioAPI(usuario).pipe(
                  map((usuario: Usuario) => {
                      alert(`${usuario.usuario} editado correctamente.`);
                      return cargarUsuarioState();
                  })
              )
          })
      );
    });

    elimninarUsuario$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarUsuarioState),
            concatMap(({ usuario }) => {
                let nombreeliminado = usuario.usuario;
                return this.usuariosService.eliminarUsuarioAPI(usuario).pipe(
                    map((usuario: Usuario) => {
                        alert(`${nombreeliminado} eliminado correctamente.`);
                        return cargarUsuarioState();
                    })
                )
            })
        )
    });

    constructor(
        private usuariosService: UsuarioService,
        private actions$: Actions,
        private router: Router,
        //private snackBar: MatSnackBar
    ){}
}

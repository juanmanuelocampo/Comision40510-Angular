import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Profesor } from "src/app/models/Profesor";
import Swal from "sweetalert2";
import { ProfesorService } from "../services/profesor.service";
import { cargarProfesorState, profesoresCargados, eliminarProfesorState, editarProfesorState, agregarProfesorState } from "./profesor-state.actions";

@Injectable()
export class ProfesoresEffects{
    cargarProfesores$ = createEffect(() => {
        return this.actions$.pipe( // Obserable2
            ofType(cargarProfesorState),
            concatMap(() => {
                return this.profesoresService.obtenerProfesoresAPI().pipe( // Observable1
                    map((c: Profesor[]) =>
                      profesoresCargados({ profesores: c }))
                )
            })
        )
    });

    agregarProfesor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarProfesorState),
            concatMap(({ profesor }) => {
                return this.profesoresService.agregarProfesorAPI(profesor).pipe(
                    map((profesor: Profesor) => {
                        Swal.fire({text: `${profesor.nombre} agregado correctamente.`,icon: 'success'})
                        //this.router.navigate(['profesores/listar']);
                        return cargarProfesorState();
                    })
                )
            })
        );
    });

    editarProfesor$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editarProfesorState),
          concatMap(({ profesor }) => {
              return this.profesoresService.editarProfesorAPI(profesor).pipe(
                  map((profesor: Profesor) => {
                    Swal.fire({text: `${profesor.nombre} editado correctamente.`,icon: 'success'})
                      return cargarProfesorState();
                  })
              )
          })
      );
    });

    elimninarProfesor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarProfesorState),
            concatMap(({ profesor }) => {
                let nombreeliminado = profesor.apellido;
                return this.profesoresService.eliminarProfesorAPI(profesor).pipe(
                    map((profesor: Profesor) => {
                      Swal.fire({text: `${profesor.nombre} eliminado correctamente.`,icon: 'success'})
                        return cargarProfesorState();
                    })
                )
            })
        )
    });

    constructor(
        private profesoresService: ProfesorService,
        private actions$: Actions,
        private router: Router,
        //private snackBar: MatSnackBar
    ){}
}

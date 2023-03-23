import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Profesor } from "src/app/models/Profesor";
import { ProfesorService } from "../services/profesor.service";
import { profesoresCargados, cargarProfesorState, eliminarProfesorState, agregarProfesorState, editarProfesorState } from "./profesor-state.actions";

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
                        alert(`${profesor.nombre} agregado correctamente.`);
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
                      alert(`${profesor.nombre} editado correctamente.`);
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
                        alert(`${nombreeliminado} eliminado correctamente.`);
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

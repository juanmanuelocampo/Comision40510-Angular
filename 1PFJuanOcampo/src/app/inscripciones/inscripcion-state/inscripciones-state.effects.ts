import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Inscripcion } from "src/app/models/Inscripcion";
import Swal from "sweetalert2";
import { InscripcionService } from "../services/inscripciones.service";
import { inscripcionesCargados, cargarInscripcionState, eliminarInscripcionState, agregarInscripcionState, editarInscripcionState } from "./inscripciones-state.actions";

@Injectable()
export class InscripcionesEffects{
    cargarInscripciones$ = createEffect(() => {
        return this.actions$.pipe( // Obserable2
            ofType(cargarInscripcionState),
            concatMap(() => {
                return this.inscripcionesService.obtenerInscripcionesAPI().pipe( // Observable1
                    map((c: Inscripcion[]) =>
                      inscripcionesCargados({ inscripciones: c }))
                )
            })
        )
    });

    agregarInscripcion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarInscripcionState),
            concatMap(({ inscripcion }) => {
                return this.inscripcionesService.agregarInscripcionAPI(inscripcion).pipe(
                    map((inscripcion: Inscripcion) => {
                        Swal.fire({text: `${inscripcion.fecha} agregado correctamente.`,icon: 'success'})
                        //this.router.navigate(['inscripciones/listar']);
                        return cargarInscripcionState();
                    })
                )
            })
        );
    });

    editarInscripcion$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editarInscripcionState),
          concatMap(({ inscripcion }) => {
              return this.inscripcionesService.editarInscripcionAPI(inscripcion).pipe(
                  map((inscripcion: Inscripcion) => {
                    Swal.fire({text: `${inscripcion.fecha} editado correctamente.`,icon: 'success'})
                      return cargarInscripcionState();
                  })
              )
          })
      );
    });

    elimninarInscripcion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarInscripcionState),
            concatMap(({ inscripcion }) => {
                let nombreeliminado = inscripcion.fecha;
                return this.inscripcionesService.eliminarInscripcionAPI(inscripcion).pipe(
                    map((inscripcion: Inscripcion) => {
                      Swal.fire({text: `${inscripcion.fecha} eliminado correctamente.`,icon: 'success'})
                        return cargarInscripcionState();
                    })
                )
            })
        )
    });

    constructor(
        private inscripcionesService: InscripcionService,
        private actions$: Actions,
        private router: Router,
        //private snackBar: MatSnackBar
    ){}
}

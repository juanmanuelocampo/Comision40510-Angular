import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Alumno } from "src/app/models/Alumno";
import Swal from "sweetalert2";
import { AlumnoService } from "../services/alumno.service";
import { alumnosCargados, cargarAlumnoState, eliminarAlumnoState, agregarAlumnoState, editarAlumnoState } from "./alumno-state.actions";

@Injectable()
export class AlumnosEffects{
    cargarAlumnos$ = createEffect(() => {
        return this.actions$.pipe( // Obserable2
            ofType(cargarAlumnoState),
            concatMap(() => {
                return this.alumnosService.obtenerAlumnosAPI().pipe( // Observable1
                    map((c: Alumno[]) => alumnosCargados({ alumnos: c }))
                )
            })
        )
    });

    agregarAlumno$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarAlumnoState),
            concatMap(({ alumno }) => {
                return this.alumnosService.agregarAlumnoAPI(alumno).pipe(
                    map((Alumno: Alumno) => {
                        Swal.fire({text: `${Alumno.nombre} agregado correctamente.`,icon: 'success'})
                        //this.router.navigate(['Alumnos/listar']);
                        return cargarAlumnoState();
                    })
                )
            })
        );
    });

    editarAlumno$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editarAlumnoState),
          concatMap(({ alumno }) => {
              return this.alumnosService.editarAlumnoAPI(alumno).pipe(
                  map((Alumno: Alumno) => {
                      Swal.fire({text: `${Alumno.nombre} editado correctamente.`,icon: 'success'})
                      return cargarAlumnoState();
                  })
              )
          })
      );
    });

    elimninarAlumno$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarAlumnoState),
            concatMap(({ alumno }) => {
                let nombreeliminado = alumno.apellido;
                return this.alumnosService.eliminarAlumnoAPI(alumno).pipe(
                    map((Alumno: Alumno) => {
                        Swal.fire({text: `${nombreeliminado} eliminado correctamente.`,icon: 'success'})
                        return cargarAlumnoState();
                    })
                )
            })
        )
    });

    constructor(
        private alumnosService: AlumnoService,
        private actions$: Actions,
        private router: Router,
        //private snackBar: MatSnackBar
    ){}
}

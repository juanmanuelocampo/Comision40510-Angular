import { Injectable } from "@angular/core";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Curso } from "src/app/models/Curso";
import { CursoService } from "../services/cursos.service";
import { cursosCargados, cargarCursoState, eliminarCursoState, agregarCursoState, editarCursoState } from "./curso-state.actions";

@Injectable()
export class CursosEffects{
    cargarCursos$ = createEffect(() => {
        return this.actions$.pipe( // Obserable2
            ofType(cargarCursoState),
            concatMap(() => {
                return this.cursosService.obtenerCursosAPI().pipe( // Observable1
                    map((c: Curso[]) =>
                      cursosCargados({ cursos: c }))
                )
            })
        )
    });

    agregarCurso$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarCursoState),
            concatMap(({ curso }) => {
                return this.cursosService.agregarCursoAPI(curso).pipe(
                    map((curso: Curso) => {
                        alert(`${curso.nombre} agregado correctamente.`);
                        //this.router.navigate(['cursos/listar']);
                        return cargarCursoState();
                    })
                )
            })
        );
    });

    editarCurso$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editarCursoState),
          concatMap(({ curso }) => {
              return this.cursosService.editarCursoAPI(curso).pipe(
                  map((curso: Curso) => {
                      alert(`${curso.nombre} editado correctamente.`);
                      return cargarCursoState();
                  })
              )
          })
      );
    });

    elimninarCurso$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarCursoState),
            concatMap(({ curso }) => {
                let nombreeliminado = curso.nombre;
                return this.cursosService.eliminarCursoAPI(curso).pipe(
                    map((curso: Curso) => {
                        alert(`${nombreeliminado} eliminado correctamente.`);
                        return cargarCursoState();
                    })
                )
            })
        )
    });

    constructor(
        private cursosService: CursoService,
        private actions$: Actions,
        private router: Router,
        //private snackBar: MatSnackBar
    ){}
}

import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  constructor(private http: HttpClient) {
  }

  nuevoCurso: Curso = {
    id: 0,
    nombre: '',
    profesor: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      fecnac: new Date(),
      activo: false,
    },
    alumno: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      fecnac: new Date(),
      activo: false,
    },
  };

  obtenerCursosAPI(): Observable<Curso[]>{
      let auxObservable$ = this.http.get<Curso[]>(`${env.apiURL}/curso`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  eliminarCursoAPI(curso: Curso): Observable<Curso>{
      let auxObservable$ = this.http.delete<Curso>(`${env.apiURL}/curso/${curso.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  editarCursoAPI(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${env.apiURL}/curso/${curso.id}`, curso, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarCursoAPI(curso: Curso): Observable<Curso>{
    return this.http.post<Curso>(`${env.apiURL}/curso`, curso, {
      headers: new HttpHeaders({
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  private capturarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      Swal.fire({text: `Hubo un error del lado del cliente: ${error.message}`,icon: 'error'})
    }else{
      Swal.fire({text: `Hubo un error del lado del servidor: ${error.message}`,icon: 'error'})
    }
    return throwError(() => new Error('Error en el procesamiento de cursos'));
  }

}

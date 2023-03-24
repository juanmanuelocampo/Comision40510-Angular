import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class InscripcionService {
  constructor(private http: HttpClient) {
  }

  nuevoInscripcion: Inscripcion = {
    id: 0,
    fecha: new Date()
  };

  obtenerInscripcionesAPI(): Observable<Inscripcion[]>{
      let auxObservable$ = this.http.get<Inscripcion[]>(`${env.apiURL}/inscripcion`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  eliminarInscripcionAPI(inscripcion: Inscripcion): Observable<Inscripcion>{
      let auxObservable$ = this.http.delete<Inscripcion>(`${env.apiURL}/inscripcion/${inscripcion.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  editarInscripcionAPI(inscripcion: Inscripcion): Observable<Inscripcion>{
    return this.http.put<Inscripcion>(`${env.apiURL}/inscripcion/${inscripcion.id}`, inscripcion, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarInscripcionAPI(inscripcion: Inscripcion): Observable<Inscripcion>{
    return this.http.post<Inscripcion>(`${env.apiURL}/inscripcion`, inscripcion, {
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
    return throwError(() => new Error('Error en el procesamiento de inscripciones'));
  }

}

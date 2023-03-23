import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Profesor } from 'src/app/models/Profesor';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfesorService {
  constructor(private http: HttpClient) {
  }

  nuevoProfesor: Profesor = {
    id: 0,
    nombre: '',
    apellido:'',
    email:'',
    fecnac: new Date(1900, 1, 1),
    activo:true,
  };

  obtenerProfesoresAPI(): Observable<Profesor[]>{
      let auxObservable$ = this.http.get<Profesor[]>(`${env.apiURL}/profesor`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  eliminarProfesorAPI(profesor: Profesor): Observable<Profesor>{
      let auxObservable$ = this.http.delete<Profesor>(`${env.apiURL}/profesor/${profesor.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  editarProfesorAPI(profesor: Profesor): Observable<Profesor>{
    return this.http.put<Profesor>(`${env.apiURL}/profesor/${profesor.id}`, profesor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarProfesorAPI(profesor: Profesor): Observable<Profesor>{
    return this.http.post<Profesor>(`${env.apiURL}/profesor`, profesor, {
      headers: new HttpHeaders({
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  private capturarError(error: HttpErrorResponse){
    alert('error')
    if(error.error instanceof ErrorEvent){
      alert(`Hubo un error del lado del cliente: ${error.message}`);
    }else{
      alert(`Hubo un error del lado del servidor: ${error.message}`);
    }
    return throwError(() => new Error('Error en el procesamiento de cursos'));
  }

}

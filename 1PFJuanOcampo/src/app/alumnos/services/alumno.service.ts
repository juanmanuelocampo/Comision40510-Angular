import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  constructor(private http: HttpClient) {
  }

  nuevoAlumno: Alumno = {
    id: 0,
    nombre: '',
    apellido:'',
    email:'',
    fecnac: new Date(1900, 1, 1),
    activo:true,
  };

  obtenerAlumnosAPI(): Observable<Alumno[]>{
      let auxObservable$ = this.http.get<Alumno[]>(`${env.apiURL}/alumno`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  eliminarAlumnoAPI(alumno: Alumno): Observable<Alumno>{
      let auxObservable$ = this.http.delete<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  editarAlumnoAPI(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, alumno, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarAlumnoAPI(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(`${env.apiURL}/alumno`, alumno, {
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

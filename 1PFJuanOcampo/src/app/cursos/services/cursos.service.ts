import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../profesores/services/profesor.service';
import { AlumnoService } from 'src/app/alumnos/services/alumno.service';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  constructor(
    private http: HttpClient,
    private servicioProfesor: ProfesorService,
  ) {
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
  };

  async validacionesCursoAPI(curso: Curso): Promise<boolean> {
    const auxProfesor = await this.servicioProfesor.getProfesorAPI(curso.profesor).toPromise()
    if (auxProfesor?.activo == false){
      Swal.fire({text: `Atención: El profesor seleccionado se encuentra deshabilitado. Por lo tanto, no podrá continuar.`, icon: 'warning'})
      return false;
    }
    return true;
  }

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

  getNextIdAPI(): Observable<Curso[]>{
    let auxObservable$ = this.http.get<Curso[]>(`${env.apiURL}/curso?_sort=id&_order=desc&_limit=1`, {
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

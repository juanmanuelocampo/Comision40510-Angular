import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';
import { AlumnoService } from 'src/app/alumnos/services/alumno.service';

@Injectable({
  providedIn: 'root'
})

export class InscripcionService {
  constructor(
    private http: HttpClient,
    private servicioAlumno: AlumnoService,
    ) {}

  nuevoInscripcion: Inscripcion = {
    id: 0,
    fecha: new Date(),
    alumno: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      fecnac: new Date(),
      activo: false,
    },
    curso: {
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
    }
  };

  async validacionesInscripcionesAPI(inscripcion: Inscripcion): Promise<boolean> {
    const auxAlumno = await this.servicioAlumno.getAlumnoAPI(inscripcion.alumno).toPromise()
    if (inscripcion.alumno.activo == false){
      Swal.fire({text: `Atención: El alumno seleccionado se encuentra deshabilitado. Por lo tanto, no podrá continuar.`, icon: 'warning'})
      return false;
    }
    return true;
  }

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
  getNextIdAPI(): Observable<Inscripcion[]>{
    let auxObservable$ = this.http.get<Inscripcion[]>(`${env.apiURL}/inscripcion?_sort=id&_order=desc&_limit=1`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
    return auxObservable$;
  }

  async validacionesInscripcionAPI(inscripcion: Inscripcion): Promise<boolean> {
    const auxAlumno = await this.servicioAlumno.getAlumnoAPI(inscripcion.alumno).toPromise()
    if (auxAlumno?.activo == false){
      Swal.fire({text: `Atención: El alumno seleccionado se encuentra deshabilitado. Por lo tanto, no podrá continuar.`, icon: 'warning'})
      return false;
    }
    return true;
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

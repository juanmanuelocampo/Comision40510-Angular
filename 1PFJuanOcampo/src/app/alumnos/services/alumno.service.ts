import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  /* private alumnos: Alumno[] = [
    {id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7), activo:true},
    {id:2, nombre:'Abner', apellido:'apellido2', email:'abner@abner.com', fecnac: new Date(1981, 7, 7), activo:false},
    {id:3, nombre:'Eliseo', apellido:'apellido3', email:'Eliseo@Eliseo.com', fecnac: new Date(1981, 7, 7), activo:true},
  ];
  */
  //private alumnos$!: BehaviorSubject<Alumno[]>;

  constructor(private http: HttpClient) {
    //this.alumnos$ = new BehaviorSubject(this.alumnos); //Lo inicializo con los valores iniciales //Comento para empezar a usar APIREST
  }

  nuevoAlumno: Alumno = {
    id: 0,
    nombre: '',
    apellido:'',
    email:'',
    fecnac: new Date(1900, 1, 1),
    activo:true,
  };

  /* obtenerAlumnosPromeses(): Promise<Array<Alumno>>{
    return new Promise((resolve, reject) => {
        if(this.alumnos.length > 0){
            resolve(this.alumnos);
        }else{
            reject([]);
        }
    })
  }
 */

  /* obtenerAlumnosObservable(): Observable<Alumno[]>{
    return this.alumnos$.asObservable();
  } */

/*   getClientes() {
    return this.http.get<any>('assets/demo/data/clientes.json')
        .toPromise()
        .then(res => res.data as Cliente[])
        .then(data => data);
  } */

  obtenerAlumnosAPI(): Observable<Alumno[]>{
    //return this.http.get<Alumno[]>('assets/datosenduro/alumnos.json', {
      let auxObservable$ = this.http.get<Alumno[]>(`${env.apiURL}/alumno`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      //this.alumnos$.next(this.alumnos); //aviso a todos los subscriptores (esto no me anda)
      return auxObservable$;
  }

  eliminarAlumno(alumno: Alumno): Observable<Alumno>{
      let auxObservable$ = this.http.delete<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      //this.alumnos$.next(this.alumnos); //aviso a todos los subscriptores //Esto no me anda
      return auxObservable$;
  }

  editarAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, alumno, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );

/*  return this.http.put<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, alumno, {
      headers: new HttpHeaders({
        'usuario': 'Prueba'
      })
    }).pipe(
      catchError(this.capturarError)
    ); */
  }

  /*
   editarCurso(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${env.apiURL}/cursos/${curso.id}`, curso, {
      headers: new HttpHeaders({
        'usuario': 'Abner'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }
  */

  agregarAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(`${env.apiURL}/alumno`, alumno, {
      //headers: new HttpHeaders({
      //  'encoding': 'UTF-8'
      //})
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

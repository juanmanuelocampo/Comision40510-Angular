import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  private alumnos: Alumno[] = [
    {id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7)},
    {id:2, nombre:'Abner', apellido:'apellido2', email:'abner@abner.com', fecnac: new Date(1981, 7, 7)},
    {id:3, nombre:'Eliseo', apellido:'apellido3', email:'Eliseo@Eliseo.com', fecnac: new Date(1981, 7, 7)},
  ];
  private alumnos$!: BehaviorSubject<Alumno[]>;

  constructor() {
    this.alumnos$ = new BehaviorSubject(this.alumnos);
    // this.cursos$ = new Observable<Curso[]>((suscriptor) => {
    //   suscriptor.next(this.cursos);

    //   setTimeout(()=>{
    //     let c: Curso = {
    //       nombre: 'Angular Avanzando - Desde el Observable',
    //       comision: '34022',
    //       fechaInicio: new Date(),
    //       fechaFin: new Date(),
    //       inscripcionAbierta: true,
    //       profesor: {
    //         nombre: 'Ulises',
    //         correo: 'ulises@gmail.com',
    //         fechaRegistro: new Date()
    //       }
    //     };
    //     this.cursos.push(c);
    //     suscriptor.next(this.cursos);
    //   }, 2000);
    // });
  }

  /* obtenerAlumnosPromise(): Promise<Alumno[]>{
    return new Promise((resolve, reject) => {
      if(this.cursos.length > 0){
        resolve(this.cursos);
      }else{
        reject([]);
      }
    });
  }
 */
  obtenerAlumnosObservable(): Observable<Alumno[]>{
    return this.alumnos$.asObservable();
  }

  agregarAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
    this.alumnos$.next(this.alumnos);
    console.log('Alumno agregado', this.alumnos);
  }
}

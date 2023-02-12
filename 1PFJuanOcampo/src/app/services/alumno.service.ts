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
    this.alumnos$ = new BehaviorSubject(this.alumnos); //Lo inicializo con los valores iniciales
  }

  nuevoAlumno: Alumno = {
    id: 0,
    nombre: '',
    apellido:'',
    email:'',
    fecnac: new Date(1900, 1, 1),
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

  obtenerAlumnosObservable(): Observable<Alumno[]>{
    return this.alumnos$.asObservable();
  }

  agregarAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
    this.alumnos$.next(this.alumnos); //aviso a todos los subscriptores
    console.log('Alumno agregado', this.alumnos);
  }

  editarAlumno(alumno: Alumno){
    this.alumnos.splice(this.alumnos.findIndex(item => item.id == alumno.id), 1, alumno);
    this.alumnos$.next(this.alumnos); //aviso a todos los subscriptores
    console.log('Alumno editado', this.alumnos);
  }

  eliminarAlumno(alumno: Alumno){
    console.log('Eliminar:',alumno, this.alumnos.findIndex(item => item.id == alumno.id));
    this.alumnos.splice(this.alumnos.findIndex(item => item.id == alumno.id), 1);

    this.alumnos$.next(this.alumnos); //aviso a todos los subscriptores
  }
}

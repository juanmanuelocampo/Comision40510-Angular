import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  private alumnos: Alumno[] = [
    {id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7), activo:true},
    {id:2, nombre:'Abner', apellido:'apellido2', email:'abner@abner.com', fecnac: new Date(1981, 7, 7), activo:false},
    {id:3, nombre:'Eliseo', apellido:'apellido3', email:'Eliseo@Eliseo.com', fecnac: new Date(1981, 7, 7), activo:true},
  ];
  private alumnos$!: BehaviorSubject<Alumno[]>;

  constructor() {
    //este BehaviorSubject es una combinaci{on entre Observable y la clase que permite llamar al next(), creo que subject}
    //this.alumnos son los valores iniciales
    this.alumnos$ = new BehaviorSubject(this.alumnos);    
  }
  
  obtenerAlumnosPromeses(): Promise<Array<Alumno>>{
    return new Promise((resolve, reject) => {
        if(this.alumnos.length > 0){
            resolve(this.alumnos);
        }else{
            reject({code:1, 
                    descripcion:'No se obtuvieron datos', 
                    data:[]});
        }
    })
  }

  obtenerAlumnosObservable(): Observable<Alumno[]>{
    return this.alumnos$.asObservable();
  }

  agregarAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
    this.alumnos$.next(this.alumnos);    
  }
}

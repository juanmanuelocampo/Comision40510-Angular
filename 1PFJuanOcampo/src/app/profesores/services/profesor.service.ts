import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profesor } from 'src/app/models/Profesor';

@Injectable({
  providedIn: 'root'
})

export class ProfesorService {
  private profesores: Profesor[] = [
    {id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7), activo:true},
    {id:2, nombre:'Abner', apellido:'apellido2', email:'abner@abner.com', fecnac: new Date(1981, 7, 7), activo:false},
    {id:3, nombre:'Eliseo', apellido:'apellido3', email:'Eliseo@Eliseo.com', fecnac: new Date(1981, 7, 7), activo:true},
  ];
  private profesores$!: BehaviorSubject<Profesor[]>;

  constructor() {
    this.profesores$ = new BehaviorSubject(this.profesores); //Lo inicializo con los valores iniciales
  }

  nuevoProfesor: Profesor = {
    id: 0,
    nombre: '',
    apellido:'',
    email:'',
    fecnac: new Date(1900, 1, 1),
    activo:true,
  };

  /* obtenerProfesoresPromeses(): Promise<Array<Profesor>>{
    return new Promise((resolve, reject) => {
        if(this.profesores.length > 0){
            resolve(this.profesores);
        }else{
            reject([]);
        }
    })
  }
 */

  obtenerProfesoresObservable(): Observable<Profesor[]>{
    return this.profesores$.asObservable();
  }

  agregarProfesor(profesor: Profesor){
    this.profesores.push(profesor);
    this.profesores$.next(this.profesores); //aviso a todos los subscriptores
    console.log('Profesor agregado', this.profesores);
  }

  editarProfesor(profesor: Profesor){
    this.profesores.splice(this.profesores.findIndex(item => item.id == profesor.id), 1, profesor);
    this.profesores$.next(this.profesores); //aviso a todos los subscriptores
    console.log('Profesor editado', this.profesores);
  }

  eliminarProfesor(profesor: Profesor){
    console.log('Eliminar:',profesor, this.profesores.findIndex(item => item.id == profesor.id));
    this.profesores.splice(this.profesores.findIndex(item => item.id == profesor.id), 1);

    this.profesores$.next(this.profesores); //aviso a todos los subscriptores
  }
}

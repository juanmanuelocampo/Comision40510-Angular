import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from 'src/app/models/Curso';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private cursos: Curso[] = [
    {id:1, nombre:'Angular'},
    {id:2, nombre:'C#'},
    {id:3, nombre:'Java'},
  ];
  private cursos$!: BehaviorSubject<Curso[]>;

  constructor() {
    this.cursos$ = new BehaviorSubject(this.cursos); //Lo inicializo con los valores iniciales
  }

  nuevoCurso: Curso = {
    id: 0,
    nombre: '',
  };

  /* obtenerCursosPromeses(): Promise<Array<Curso>>{
    return new Promise((resolve, reject) => {
        if(this.cursos.length > 0){
            resolve(this.cursos);
        }else{
            reject([]);
        }
    })
  }
 */

  obtenerCursosObservable(): Observable<Curso[]>{
    return this.cursos$.asObservable();
  }

  agregarCurso(curso: Curso){
    this.cursos.push(curso);
    this.cursos$.next(this.cursos); //aviso a todos los subscriptores
    console.log('Curso agregado', this.cursos);
  }

  editarCurso(curso: Curso){
    this.cursos.splice(this.cursos.findIndex(item => item.id == curso.id), 1, curso);
    this.cursos$.next(this.cursos); //aviso a todos los subscriptores
    console.log('Curso editado', this.cursos);
  }

  eliminarCurso(curso: Curso){
    console.log('Eliminar:',curso, this.cursos.findIndex(item => item.id == curso.id));
    this.cursos.splice(this.cursos.findIndex(item => item.id == curso.id), 1);

    this.cursos$.next(this.cursos); //aviso a todos los subscriptores
  }
}

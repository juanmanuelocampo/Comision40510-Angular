import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { Pais } from 'src/app/models/Pais';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent {
  PArg: Pais = {
    id:'AR',
    nombre:'Argentina'
  };
  PCol: Pais = {
    id:'CO',
    nombre:'Colombia'
  };
  PESal: Pais = {
    id:'SL',
    nombre:'El Salvador'
  };

  listadoalumnos: Alumno[] = [
    {
      nombre: 'Eliseo',
      edad: 23,
      pais: this.PArg,
      activo: true,
    },
    {
      nombre: 'Juan',
      edad: 20,
      pais: this.PArg,
      activo: true,
    },
    {
      nombre: 'José',
      edad: 21,
      pais: this.PCol,
      activo: true,
    },
    {
      nombre: 'Tadeo',
      edad: 18,
      pais: this.PESal,
      activo: false,
    }
  ];

  mejorAlumno: Alumno = this.listadoalumnos[0];

}

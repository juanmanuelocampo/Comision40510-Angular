import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/models/Curso';


@Component({
  selector: 'app-tablaalumno',
  templateUrl: './tablaalumno.component.html',
  styleUrls: ['./tablaalumno.component.css']
})
export class TablaalumnoComponent {
  cursos: Array<Curso> = [
    {id:1, nombre:'Angular'},
    {id:2, nombre:'React'},
    {id:3, nombre:'Vue'}
  ];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>(this.cursos);
  columnas: Array<string> = ['id', 'nombre', 'acciones'];

  abrirModal(item:Curso){
    alert(JSON.stringify(item));
  }
}

import { NodeWithI18n } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/models/Alumno';
import { FormAlumnoDialogComponent } from '../form-alumno-dialog/form-alumno-dialog.component';


@Component({
  selector: 'app-tablaalumno',
  templateUrl: './tablaalumno.component.html',
  styleUrls: ['./tablaalumno.component.css']
})
export class TablaalumnoComponent {
  estadoventana :string = 'consulta';
  alumnos: Array<Alumno> = [
    {id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7)},
    {id:2, nombre:'Eliceo', apellido:'apellido2', email:'eliceo@eliceo.com', fecnac: new Date(1982, 7, 7)},
    {id:3, nombre:'Abner', apellido:'apellido3', email:'abner@abner.com', fecnac: new Date(1983, 7, 7)}
  ];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>(this.alumnos);
  columnas: Array<string> = ['id', 'nombre', 'apellido', 'email', 'fecnac', 'edad', 'acciones'];

constructor(
    private dialog: MatDialog
  ){}

  ModoEdicion(alumno:Alumno){
    this.estadoventana = 'edicion';
    const dialogRef = this.dialog.open(FormAlumnoDialogComponent, {
      data: {...alumno, estadoventana:'edicion'}
    });

    dialogRef.afterClosed().subscribe(alumno => {
      if(alumno != undefined){
          this.alumnos.splice(this.alumnos.findIndex(item => item.id == alumno.id), 1, alumno);
          this.dataSource.data = this.dataSource.data; //Revisar tutor: Esta línea no me gusta, pero es la única forma que encontré para actualizar la grilla
      }
    });
  }

  Eliminar(alumno:Alumno){
    console.log('Eliminar:',alumno, this.alumnos.findIndex(item => item.id == alumno.id));
    this.alumnos.splice(this.alumnos.findIndex(item => item.id == alumno.id), 1);
    this.dataSource.data = this.dataSource.data; //Revisar tutor: Esta línea no me gusta, pero es la única forma que encontré para actualizar la grilla
  }
  ModoAlta(){
    let item: Alumno = {
      id: 0,
      nombre: '',
      apellido:'',
      email:'',
      fecnac: new Date(1900, 1, 1),
    };

    this.estadoventana = 'alta';
    const dialogRef = this.dialog.open(FormAlumnoDialogComponent, {
      data: {...item, estadoventana:'alta'}
    });

    dialogRef.afterClosed().subscribe(item => {
      if(item != undefined){
          this.alumnos.push(item);
          this.dataSource.data = this.dataSource.data; //Revisar tutor: Esta línea no me gusta, pero es la única forma que encontré para actualizar la grilla
      }
    });
  }

  abrirModal(alumno?:Alumno){
    const dialogRef = this.dialog.open(FormAlumnoDialogComponent, {
      data: {...alumno, estadoventana:'edicion'}
    });
  }
}

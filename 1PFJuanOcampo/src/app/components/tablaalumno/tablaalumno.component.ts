
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
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

  suscripcion!: Subscription; //acacaservicio

constructor(
    private dialog: MatDialog,
    private alumnoService: AlumnoService, //acacaservicio
  ){}

  //acacaServicio desde
  ngOnInit(): void {
    console.log("Instanciando MatTAbleDataSource");
    this.dataSource = new MatTableDataSource<Alumno>();
    this.suscripcion = this.alumnoService.obtenerAlumnosObservable().subscribe((alumnos: Alumno[]) => {
      console.log("Agregando datos al MatTAbleDataSource");
      this.dataSource.data = alumnos;
    });
    console.log("Ultima linea del ngOnInit");
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
  //acacaServicio hasta

  agregarAlumnoDesdeComponente(){
    let c: Alumno = {
      id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7)
      }
      this.alumnoService.agregarAlumno(c);
  }

  ModoEdicion(alumno:Alumno){
    this.estadoventana = 'edicion';
    const dialogRef = this.dialog.open(FormAlumnoDialogComponent, {
      data: {...alumno, estadoventana:'edicion'} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
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

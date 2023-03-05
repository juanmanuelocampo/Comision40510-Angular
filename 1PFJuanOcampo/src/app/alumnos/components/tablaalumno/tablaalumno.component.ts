import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Alumno } from 'src/app/models/Alumno';
import { Sesion } from 'src/app/models/sesion';
import { AlumnoService } from '../../services/alumno.service';
import { FormAlumnoDialogComponent } from '../form-alumno-dialog/form-alumno-dialog.component';

@Component({
  selector: 'app-tablaalumno',
  templateUrl: './tablaalumno.component.html',
  styleUrls: ['./tablaalumno.component.css']
})
export class TablaalumnoComponent implements OnInit, OnDestroy{
  suscripcion!: Subscription;
  estadoventana: string = 'consulta';
  alumnos$!: Observable<Array<Alumno>>;
  dataSource!: MatTableDataSource<Alumno>;
  columnas: Array<string> = ['id', 'nombre', 'apellido', 'email', 'fecnac', 'edad', 'activo', 'acciones'];
  sesion$!: Observable<Sesion>;

  constructor(
      private dialog: MatDialog,
      private alumnoService: AlumnoService,
      private router: Router,
      private sesionService: SesionService,
  ){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Alumno>();
    this.alumnos$ = this.alumnoService.obtenerAlumnosAPI();//obtenerAlumnosObservable();
    this.sesion$ = this.sesionService.obtenerSesion();
    //Subscribo al origen de datos
    this.suscripcion = this.alumnoService.obtenerAlumnosAPI().subscribe((alumnos: Alumno[]) => {//obtenerAlumnosObservable().subscribe((alumnos: Array<Alumno>) => {
      this.dataSource.data = alumnos;
    });
  }
  eliminar(alumno:Alumno){
    this.alumnoService.eliminarAlumno(alumno).subscribe((alumno: Alumno) => {
      alert(`${alumno.nombre} eliminado correctamente.`);
      this.alumnoService.obtenerAlumnosAPI().subscribe(alumnos => { this.dataSource.data = alumnos})
    });
  }
  modoEdicion(alumno:Alumno){
    this.estadoventana = 'edicion';
    this.abrirModal(alumno);
  }
  modoAlta(){
    this.estadoventana = 'alta';
    let alumno:Alumno = this.alumnoService.nuevoAlumno;
    this.abrirModal(alumno);
  }
  redirigirEstadisticas(alumno: Alumno){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['alumno/estadisticas/' + alumno.id, alumno]);
  }
  abrirModal(alumno: Alumno){
    const dialogRef = this.dialog.open(FormAlumnoDialogComponent, {
      data: {...alumno, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
    //esto se ejecuta al cerrar la modal
    dialogRef.afterClosed().subscribe(alumno => {
      //No me gusta esta forma de actualizar la tabla, pero no encuentro otra
      this.alumnoService.obtenerAlumnosAPI().subscribe(alumnos => { this.dataSource.data = alumnos})
    });
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}

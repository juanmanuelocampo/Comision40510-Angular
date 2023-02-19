import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Profesor } from 'src/app/models/Profesor';
import { FormProfesorDialogComponent } from '../form-profesor-dialog/form-profesor-dialog.component';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-tablaprofesor',
  templateUrl: './tabla-profesor.component.html',
  styleUrls: ['./tabla-profesor.component.css']
})
export class TablaprofesorComponent {
  suscripcion!: Subscription;
  estadoventana: string = 'consulta';
  profesores$!: Observable<Array<Profesor>>;
  dataSource!: MatTableDataSource<Profesor>;
  columnas: Array<string> = ['id', 'nombre', 'apellido', 'email', 'fecnac', 'edad', 'activo', 'acciones'];

  constructor(
      private dialog: MatDialog,
      private profesorService: ProfesorService,
      private router: Router,
  ){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Profesor>();
    this.profesores$ = this.profesorService.obtenerProfesoresObservable();
    //Subscribo al origen de datos
    this.suscripcion = this.profesorService.obtenerProfesoresObservable().subscribe((profesores: Array<Profesor>) => {
      this.dataSource.data = profesores;
    });
  }
  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  eliminar(profesor:Profesor){
    this.profesorService.eliminarProfesor(profesor);
  }
  modoEdicion(profesor:Profesor){
    this.estadoventana = 'edicion';
    this.abrirModal(profesor);
  }
  modoAlta(){
    this.estadoventana = 'alta';
    let profesor:Profesor = this.profesorService.nuevoProfesor;
    this.abrirModal(profesor);
  }
  redirigirHistorial(profesor: Profesor){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['profesor/historial/' + profesor.id, profesor]);
  }

  abrirModal(profesor: Profesor){
    const dialogRef = this.dialog.open(FormProfesorDialogComponent, {
      data: {...profesor, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
    dialogRef.afterClosed().subscribe(profesor => {
      //esto se ejecuta al cerrar la modal
    });
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { FormAlumnoDialogComponent } from '../form-alumno-dialog/form-alumno-dialog.component';
import { AlumnoService } from '../../services/alumno.service';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { AlumnoState } from '../../alumno-state/alumno-state.reducer';
import { Store } from '@ngrx/store';
import { selectCargandoAlumnos, selectAlumnosCargados } from '../../alumno-state/alumno-state.selectors';
import { cargarAlumnoState, eliminarAlumnoState } from '../../alumno-state/alumno-state.actions';
import { VentanaStatsService } from 'src/app/shared/services/ventana-stats.service';
import { MisInscripcionesDialogComponent } from '../mis-inscripciones/mis-inscripciones-dialog.component';

@Component({
  selector: 'app-tablaalumno',
  templateUrl: './tablaalumno.component.html',
  styleUrls: ['./tablaalumno.component.css']
})
export class TablaalumnoComponent {
  estadoventana: string = 'consulta';
  alumnos$!: Observable<Array<Alumno>>;
  dataSource!: MatTableDataSource<Alumno>;
  columnas: Array<string> = ['id', 'nombre', 'apellido', 'email', 'fecnac', 'edad', 'activo', 'acciones'];
  sesion$!: Observable<Sesion>;
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      private dialog: MatDialog,
      private alumnoService: AlumnoService,
      private router: Router,
      private sesionService: SesionService,
      private store: Store<AlumnoState>,
      private ventanaStatsService: VentanaStatsService
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnoState());
    this.cargando$ = this.store.select(selectCargandoAlumnos);
    this.alumnos$ = this.store.select(selectAlumnosCargados);
    this.dataSource = new MatTableDataSource<Alumno>();

    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.alumnos$.subscribe((alumnos: Array<Alumno>) => {
      this.dataSource.data = alumnos;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
    this.ventanaStatsService.incrementarStatsAPI(2).subscribe(); //Incremento la cantidad de ingresos a la ventana
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }

  eliminar(alumno:Alumno){
    this.store.dispatch(eliminarAlumnoState({alumno: alumno}));
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

  redirigirHistorial(alumno: Alumno){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['alumno/historial/' + alumno.id, alumno]);
  }

  abrirModal(alumno: Alumno){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //No cierra la modal con ESC oal hacer clic fuera de la modal
    dialogConfig.data = {...alumno, estadoventana:this.estadoventana};
    const dialogRef = this.dialog.open(
      FormAlumnoDialogComponent,
      dialogConfig
    );

  }

  abrirMisCursos(alumno: Alumno){
    const dialogRef = this.dialog.open(MisInscripcionesDialogComponent, {
      data: {...alumno}
    });
  }
}

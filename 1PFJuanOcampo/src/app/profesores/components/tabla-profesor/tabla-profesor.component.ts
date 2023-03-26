import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Profesor } from 'src/app/models/Profesor';
import { FormProfesorDialogComponent } from '../form-profesor-dialog/form-profesor-dialog.component';
import { ProfesorService } from '../../services/profesor.service';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { ProfesorState } from '../../profesor-state/profesor-state.reducer';
import { Store } from '@ngrx/store';
import { selectCargandoProfesores, selectProfesoresCargados } from '../../profesor-state/profesor-state.selectors';
import { cargarProfesorState, eliminarProfesorState } from '../../profesor-state/profesor-state.actions';
import { VentanaStatsService } from '../../../shared/services/ventana-stats.service';
import { MisCursosDialogComponent } from '../mis-cursos/mis-cursos-dialog.component';

@Component({
  selector: 'app-tablaprofesor',
  templateUrl: './tabla-profesor.component.html',
  styleUrls: ['./tabla-profesor.component.css']
})
export class TablaprofesorComponent {
  estadoventana: string = 'consulta';
  profesores$!: Observable<Array<Profesor>>;
  dataSource!: MatTableDataSource<Profesor>;
  columnas: Array<string> = ['id', 'nombre', 'apellido', 'email', 'fecnac', 'edad', 'activo', 'acciones'];
  sesion$!: Observable<Sesion>;
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      private dialog: MatDialog,
      private profesorService: ProfesorService,
      private router: Router,
      private sesionService: SesionService,
      private store: Store<ProfesorState>,
      private ventanaStatsService: VentanaStatsService,
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarProfesorState());
    this.cargando$ = this.store.select(selectCargandoProfesores);
    this.profesores$ = this.store.select(selectProfesoresCargados);
    this.dataSource = new MatTableDataSource<Profesor>();

    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.profesores$.subscribe((profesores: Array<Profesor>) => {
      this.dataSource.data = profesores;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
    this.ventanaStatsService.incrementarStatsAPI(3).subscribe(); //Incremento la cantidad de ingresos a la ventana
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }

  eliminar(profesor:Profesor){
    this.store.dispatch(eliminarProfesorState({profesor: profesor}));
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

  abrirModal(profesor: Profesor){
    const dialogRef = this.dialog.open(FormProfesorDialogComponent, {
      data: {...profesor, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
  }

  abrirMisCursos(profesor: Profesor){
    const dialogRef = this.dialog.open(MisCursosDialogComponent, {
      data: {...profesor}
    });
  }
}


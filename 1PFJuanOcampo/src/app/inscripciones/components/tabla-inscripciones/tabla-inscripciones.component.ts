import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { FormInscripcionDialogComponent } from '../form-inscripciones-dialog/form-inscripciones-dialog.component';
import { InscripcionService } from '../../services/inscripciones.service';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { InscripcionState } from '../../inscripcion-state/inscripciones-state.reducer';
import { Store } from '@ngrx/store';
import { selectCargandoInscripciones, selectInscripcionesCargados } from '../../inscripcion-state/inscripciones-state.selectors';
import { cargarInscripcionState, eliminarInscripcionState } from '../../inscripcion-state/inscripciones-state.actions';
import { VentanaStatsService } from 'src/app/shared/services/ventana-stats.service';

@Component({
  selector: 'app-tablainscripcion',
  templateUrl: './tabla-inscripciones.component.html',
  styleUrls: ['./tabla-inscripciones.component.css']
})
export class TablainscripcionComponent {
  estadoventana: string = 'consulta';
  inscripciones$!: Observable<Array<Inscripcion>>;
  dataSource!: MatTableDataSource<Inscripcion>;
  columnas: Array<string> = ['id', 'fecha', 'curso', 'alumno', 'acciones'];
  sesion$!: Observable<Sesion>;
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      private dialog: MatDialog,
      private inscripcionService: InscripcionService,
      private router: Router,
      private sesionService: SesionService,
      private store: Store<InscripcionState>,
      private ventanaStatsService: VentanaStatsService,
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarInscripcionState());
    this.cargando$ = this.store.select(selectCargandoInscripciones);
    this.inscripciones$ = this.store.select(selectInscripcionesCargados);
    this.dataSource = new MatTableDataSource<Inscripcion>();

    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.inscripciones$.subscribe((inscripciones: Array<Inscripcion>) => {
      this.dataSource.data = inscripciones;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
    this.ventanaStatsService.incrementarStatsAPI(5).subscribe(); //Incremento la cantidad de ingresos a la ventana
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }

  eliminar(inscripcion:Inscripcion){
    this.store.dispatch(eliminarInscripcionState({inscripcion: inscripcion}));
  }

  modoEdicion(inscripcion:Inscripcion){
    this.estadoventana = 'edicion';
    this.abrirModal(inscripcion);
  }
  modoAlta(){
    this.estadoventana = 'alta';
    let inscripcion:Inscripcion = this.inscripcionService.nuevoInscripcion;
    this.abrirModal(inscripcion);
  }

  abrirModal(inscripcion: Inscripcion){
    const dialogRef = this.dialog.open(FormInscripcionDialogComponent, {
      data: {...inscripcion, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
  }
}

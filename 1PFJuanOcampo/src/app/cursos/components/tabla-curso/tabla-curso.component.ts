import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { FormCursoDialogComponent } from '../form-curso-dialog/form-curso-dialog.component';
import { CursoService } from '../../services/cursos.service';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { CursoState } from '../../curso-state/curso-state.reducer';
import { Store } from '@ngrx/store';
import { selectCargandoCursos, selectCursosCargados } from '../../curso-state/curso-state.selectors';
import { cargarCursoState, eliminarCursoState } from '../../curso-state/curso-state.actions';
import { VentanaStatsService } from 'src/app/shared/services/ventana-stats.service';

@Component({
  selector: 'app-tablacurso',
  templateUrl: './tabla-curso.component.html',
  styleUrls: ['./tabla-curso.component.css']
})
export class TablacursoComponent {
  estadoventana: string = 'consulta';
  cursos$!: Observable<Array<Curso>>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: Array<string> = ['id', 'nombre', 'profesor', 'acciones'];
  sesion$!: Observable<Sesion>;
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      private dialog: MatDialog,
      private cursoService: CursoService,
      private router: Router,
      private sesionService: SesionService,
      private store: Store<CursoState>,
      private ventanaStatsService: VentanaStatsService
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarCursoState());
    this.cargando$ = this.store.select(selectCargandoCursos);
    this.cursos$ = this.store.select(selectCursosCargados);
    this.dataSource = new MatTableDataSource<Curso>();

    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.cursos$.subscribe((cursos: Array<Curso>) => {
      this.dataSource.data = cursos;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
    this.ventanaStatsService.incrementarStatsAPI(4).subscribe(); //Incremento la cantidad de ingresos a la ventana
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }

  eliminar(curso:Curso){
    this.store.dispatch(eliminarCursoState({curso: curso}));
  }

  modoEdicion(curso:Curso){
    this.estadoventana = 'edicion';
    this.abrirModal(curso);
  }
  modoAlta(){
    this.estadoventana = 'alta';
    let curso:Curso = this.cursoService.nuevoCurso;
    this.abrirModal(curso);
  }

  redirigirHistorial(curso: Curso){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['curso/historial/' + curso.id, curso]);
  }

  abrirModal(curso: Curso){
      const dialogRef = this.dialog.open(FormCursoDialogComponent, {
      data: {...curso, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
  }
}

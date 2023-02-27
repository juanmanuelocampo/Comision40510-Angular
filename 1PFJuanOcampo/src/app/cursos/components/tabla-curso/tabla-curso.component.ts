import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Curso } from 'src/app/models/Curso';
import { Sesion } from 'src/app/models/sesion';
import { CursoService } from '../../services/curso.service';
import { FormCursoDialogComponent } from '../form-curso-dialog/form-curso-dialog.component';

@Component({
  selector: 'app-tablacurso',
  templateUrl: './tabla-curso.component.html',
  styleUrls: ['./tabla-curso.component.css']
})
export class TablaCursoComponent {
  suscripcion!: Subscription;
  estadoventana: string = 'consulta';
  cursos$!: Observable<Array<Curso>>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: Array<string> = ['id', 'nombre', 'acciones'];
  sesion$!: Observable<Sesion>;

  constructor(
      private dialog: MatDialog,
      private cursoService: CursoService,
      private router: Router,
      private sesionService: SesionService,
  ){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Curso>();
    this.cursos$ = this.cursoService.obtenerCursosObservable();
    //Subscribo al origen de datos
    this.suscripcion = this.cursoService.obtenerCursosObservable().subscribe((cursos: Array<Curso>) => {
      this.dataSource.data = cursos;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
  }
  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  eliminar(curso:Curso){
    this.cursoService.eliminarCurso(curso);
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
  redirigirEstadisticas(curso: Curso){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['curso/estadisticas/' + curso.id, curso]);
  }

  abrirModal(curso: Curso){
    const dialogRef = this.dialog.open(FormCursoDialogComponent, {
      data: {...curso, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
    dialogRef.afterClosed().subscribe(curso => {
      //esto se ejecuta al cerrar la modal
    });
  }
}

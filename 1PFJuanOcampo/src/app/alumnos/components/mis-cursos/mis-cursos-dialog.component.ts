import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { cargarCursosAlumnoState } from '../../alumno-state/alumno-state.actions';
import { AlumnoState } from '../../alumno-state/alumno-state.reducer';
import { selectCargandoCursosAlumno, selectCursosAlumnoCargados } from '../../alumno-state/alumno-state.selectors';

@Component({
  selector: 'app-mis-cursos-dialog',
  templateUrl: './mis-cursos-dialog.component.html',
  styleUrls: ['./mis-cursos-dialog.component.css']
})
export class MisCursosDialogComponent {
  cursos$!: Observable<Array<Curso>>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: Array<string> = ['id', 'nombre', 'profesor', 'alumno'];
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<AlumnoState>
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarCursosAlumnoState({alumno: this.data}));
    this.cargando$ = this.store.select(selectCargandoCursosAlumno);
    this.cursos$ = this.store.select(selectCursosAlumnoCargados);
    this.dataSource = new MatTableDataSource<Curso>();
    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.cursos$.subscribe((cursos: Array<Curso>) => {
      this.dataSource.data = cursos;
    });
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }
}

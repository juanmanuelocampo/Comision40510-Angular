import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-mis-cursos-dialog',
  templateUrl: './mis-inscripciones-dialog.component.html',
  styleUrls: ['./mis-inscripciones-dialog.component.css']
})
export class MisInscripcionesDialogComponent {
  inscripciones$!: Observable<Array<Inscripcion>>;
  dataSource!: MatTableDataSource<Inscripcion>;
  columnas: Array<string> = ['id', 'nombre', 'profesor'];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private servicioAlumno: AlumnoService,
  ){}

  ngOnInit(): void {
    console.log(JSON.stringify(this.data))
    this.dataSource = new MatTableDataSource<Inscripcion>();

    this.inscripciones$ = this.servicioAlumno.obtenerInscripcionesAlumnoAPI(this.data);
    this.inscripciones$.subscribe((inscripciones)=>{
      this.dataSource.data = inscripciones;
    })

  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-mis-cursos-dialog',
  templateUrl: './mis-cursos-dialog.component.html',
  styleUrls: ['./mis-cursos-dialog.component.css']
})
export class MisCursosDialogComponent {
  cursos$!: Observable<Array<Curso>>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: Array<string> = ['id', 'nombre', 'profesor'];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private servicioProfesor: ProfesorService,
  ){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Curso>();

    this.cursos$ = this.servicioProfesor.obtenerCursosProfesorAPI(this.data);
    this.cursos$.subscribe((cursos)=>{
      this.dataSource.data = cursos;
    })

  }
}

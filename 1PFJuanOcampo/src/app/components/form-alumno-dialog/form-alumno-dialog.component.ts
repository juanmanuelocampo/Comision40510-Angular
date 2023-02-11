import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-form-alumno-dialog',
  templateUrl: './form-alumno-dialog.component.html',
  styleUrls: ['./form-alumno-dialog.component.css']
})
export class FormAlumnoDialogComponent  implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Alumno ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormAlumnoDialogComponent>,
      private alumnoService: AlumnoService, //acacaservicio
      @Inject(MAT_DIALOG_DATA) public data: any,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required),
        apellido: new FormControl((this.data.estadoventana === 'edicion')?data.apellido: '', Validators.required),
        email: new FormControl((this.data.estadoventana === 'edicion')?data.email: '', Validators.email),
        fecnac: new FormControl((this.data.estadoventana === 'edicion')?data.fecnac: '', Validators.required),
      })
    }

    //acacaServicio desde
  ngOnInit(): void {
    //console.log("Instanciando MatTAbleDataSource");
    //this.dataSource = new MatTableDataSource<Alumno>();
    //this.suscripcion = this.alumnoService.obtenerAlumnosObservable().subscribe((alumnos: Alumno[]) => {
    //  console.log("Agregando datos al MatTAbleDataSource");
    //  this.dataSource.data = alumnos;
    //});
    //console.log("Ultima linea del ngOnInit");
  }

  ngOnDestroy(){
    //this.suscripcion.unsubscribe();
  }
    agregarAlumnoDesdeComponenteABM(){
      let c: Alumno = {
        id:1, nombre:'Freddy', apellido:'apellido1', email:'freddy@freddy.com', fecnac: new Date(1981, 7, 7)
        }
        this.alumnoService.agregarAlumno(c);
    }
    //acacaServicio hasta

    CerrarModal(): void {
      this.dialogRef.close();
    }
}

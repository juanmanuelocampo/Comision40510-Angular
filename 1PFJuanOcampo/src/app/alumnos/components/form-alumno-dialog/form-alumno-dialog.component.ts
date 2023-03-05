import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-form-alumno-dialog',
  templateUrl: './form-alumno-dialog.component.html',
  styleUrls: ['./form-alumno-dialog.component.css']
})
export class FormAlumnoDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Alumno ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormAlumnoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private alumnoService: AlumnoService,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required),
        apellido: new FormControl((this.data.estadoventana === 'edicion')?data.apellido: '', Validators.required),
        email: new FormControl((this.data.estadoventana === 'edicion')?data.email: '', Validators.email),
        fecnac: new FormControl((this.data.estadoventana === 'edicion')?data.fecnac: '', Validators.required),
        activo: new FormControl((this.data.estadoventana === 'edicion')?data.activo: ''),
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarAlumnoDesdeComponenteABM():this.agregarAlumnoDesdeComponenteABM());
    }

    agregarAlumnoDesdeComponenteABM(){
      this.alumnoService.agregarAlumno(this.formulario.value).subscribe((alumno: Alumno) => {
        alert(`${alumno.nombre} agregado correctamente.`);
      });
    }

    editarAlumnoDesdeComponenteABM(){
      this.alumnoService.editarAlumno(this.formulario.value).subscribe((alumno: Alumno) => {
        alert(`${alumno.nombre} editado correctamente.`);
      });
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }
}

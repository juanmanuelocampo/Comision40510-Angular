import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

    ngOnInit() {
    }

    CerrarModal(): void {
      this.dialogRef.close();
    }
}

import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/models/Alumno';

@Component({
  selector: 'app-form-alumno-dialog',
  templateUrl: './form-alumno-dialog.component.html',
  styleUrls: ['./form-alumno-dialog.component.css']
})
export class FormAlumnoDialogComponent  implements OnInit {
    formulario: FormGroup;

    constructor(
      private dialogRef: MatDialogRef<FormAlumnoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: ''),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: ''),
        apellido: new FormControl((this.data.estadoventana === 'edicion')?data.apellido: ''),
        email: new FormControl((this.data.estadoventana === 'edicion')?data.email: ''),
      })
    }

    ngOnInit() {
      console.log('nginit:')
      console.log(this.data)
    }

    CerrarModal(): void {
      this.dialogRef.close();
    }
}

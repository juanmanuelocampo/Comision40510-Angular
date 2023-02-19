import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-form-profesor-dialog',
  templateUrl: './form-profesor-dialog.component.html',
  styleUrls: ['./form-profesor-dialog.component.css']
})
export class FormProfesorDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Profesor ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormProfesorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private profesorService: ProfesorService,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required),
        apellido: new FormControl((this.data.estadoventana === 'edicion')?data.apellido: '', Validators.required),
        email: new FormControl((this.data.estadoventana === 'edicion')?data.email: '', Validators.email),
        fecnac: new FormControl((this.data.estadoventana === 'edicion')?data.fecnac: '', Validators.required),
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarProfesorDesdeComponenteABM():this.agregarProfesorDesdeComponenteABM());
    }
    agregarProfesorDesdeComponenteABM(){
        this.profesorService.agregarProfesor(this.formulario.value);
    }
    editarProfesorDesdeComponenteABM(){
      this.profesorService.editarProfesor(this.formulario.value);
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }
}

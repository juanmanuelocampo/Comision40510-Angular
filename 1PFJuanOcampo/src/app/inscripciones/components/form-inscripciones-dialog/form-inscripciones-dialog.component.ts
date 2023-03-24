import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { agregarInscripcionState, editarInscripcionState } from '../../inscripcion-state/inscripciones-state.actions';
import { InscripcionState } from '../../inscripcion-state/inscripciones-state.reducer';

@Component({
  selector: 'app-form-inscripcion-dialog',
  templateUrl: './form-inscripciones-dialog.component.html',
  styleUrls: ['./form-inscripciones-dialog.component.css']
})
export class FormInscripcionDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Inscripcion ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormInscripcionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<InscripcionState>
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        fecha: new FormControl((this.data.estadoventana === 'edicion')?data.fecha: '', Validators.required),
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarInscripcionDesdeComponenteABM():this.agregarInscripcionDesdeComponenteABM());
    }
    agregarInscripcionDesdeComponenteABM(){
      let inscripcion: Inscripcion = this.completarCampos();
      this.store.dispatch(agregarInscripcionState({inscripcion: inscripcion}));
    }
    editarInscripcionDesdeComponenteABM(){
      let inscripcion: Inscripcion = this.completarCampos();
      this.store.dispatch(editarInscripcionState({inscripcion: inscripcion}));
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }

    completarCampos():Inscripcion{
      let inscripcion: Inscripcion = {
        id: this.formulario.value.id,
        fecha: this.formulario.value.fecha
      };
      return inscripcion;
    }
}

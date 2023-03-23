import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Curso } from 'src/app/models/Curso';
import { agregarCursoState, editarCursoState } from '../../curso-state/curso-state.actions';
import { CursoState } from '../../curso-state/curso-state.reducer';

@Component({
  selector: 'app-form-curso-dialog',
  templateUrl: './form-curso-dialog.component.html',
  styleUrls: ['./form-curso-dialog.component.css']
})
export class FormCursoDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Curso ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormCursoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<CursoState>
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required)
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarCursoDesdeComponenteABM():this.agregarCursoDesdeComponenteABM());
    }
    agregarCursoDesdeComponenteABM(){
      let curso: Curso = this.completarCampos();
      this.store.dispatch(agregarCursoState({curso: curso}));
    }
    editarCursoDesdeComponenteABM(){
      let curso: Curso = this.completarCampos();
      this.store.dispatch(editarCursoState({curso: curso}));
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }

    completarCampos():Curso{
      let curso: Curso = {
        id: this.formulario.value.id,
        nombre: this.formulario.value.nombre
      };
      return curso;
    }
}

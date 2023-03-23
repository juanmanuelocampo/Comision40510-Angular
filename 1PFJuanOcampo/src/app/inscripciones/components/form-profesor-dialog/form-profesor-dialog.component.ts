import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Profesor } from 'src/app/models/Profesor';
import { agregarProfesorState, editarProfesorState } from '../../profesor-state/profesor-state.actions';
import { ProfesorState } from '../../profesor-state/profesor-state.reducer';
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
      private store: Store<ProfesorState>
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
      ((this.data.estadoventana === 'edicion')?this.editarProfesorDesdeComponenteABM():this.agregarProfesorDesdeComponenteABM());
    }
    agregarProfesorDesdeComponenteABM(){
      let profesor: Profesor = this.completarCampos();
      this.store.dispatch(agregarProfesorState({profesor: profesor}));
    }
    editarProfesorDesdeComponenteABM(){
      let profesor: Profesor = this.completarCampos();
      this.store.dispatch(editarProfesorState({profesor: profesor}));
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }

    completarCampos():Profesor{
      let profesor: Profesor = {
        id: this.formulario.value.id,
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        email: this.formulario.value.email,
        fecnac: this.formulario.value.fecnac,
        activo: this.formulario.value.activo,
      };
      return profesor;
    }
}

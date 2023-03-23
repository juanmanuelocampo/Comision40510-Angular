import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/Usuario';
import { agregarUsuarioState, editarUsuarioState } from '../../usuario-state/usuario-state.actions';
import { UsuarioState } from '../../usuario-state/usuario-state.reducer';

@Component({
  selector: 'app-form-usuario-dialog',
  templateUrl: './form-usuario-dialog.component.html',
  styleUrls: ['./form-usuario-dialog.component.css']
})
export class FormUsuarioDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Usuario ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');

    constructor(
      private dialogRef: MatDialogRef<FormUsuarioDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<UsuarioState>
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        usuario: new FormControl((this.data.estadoventana === 'edicion')?data.usuario: '', Validators.required),
        contrasena: new FormControl((this.data.estadoventana === 'edicion')?data.contrasena: '', Validators.required),
        esAdmin: new FormControl((this.data.estadoventana === 'edicion')?data.esAdmin: false),
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarUsuarioDesdeComponenteABM():this.agregarUsuarioDesdeComponenteABM());
    }
    agregarUsuarioDesdeComponenteABM(){
      let usuario: Usuario = this.completarCampos();
      this.store.dispatch(agregarUsuarioState({usuario: usuario}));
    }
    editarUsuarioDesdeComponenteABM(){
      let usuario: Usuario = this.completarCampos();
      this.store.dispatch(editarUsuarioState({usuario: usuario}));
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }

    completarCampos():Usuario{
      let _usuario: Usuario = {
        id: this.formulario.value.id,
        usuario: this.formulario.value.usuario,
        contrasena: this.formulario.value.contrasena,
        esAdmin: this.formulario.value.esAdmin,
      };
      return _usuario;
    }
}

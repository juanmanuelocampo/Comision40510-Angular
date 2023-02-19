import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoService } from '../../services/curso.service';

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
      private cursoService: CursoService,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required),
      })
    }
    ngOnInit(): void {
    }

    aceptar(){
      ((this.data.estadoventana === 'edicion')?this.editarCursoDesdeComponenteABM():this.agregarCursoDesdeComponenteABM());
    }
    agregarCursoDesdeComponenteABM(){
        this.cursoService.agregarCurso(this.formulario.value);
    }
    editarCursoDesdeComponenteABM(){
      this.cursoService.editarCurso(this.formulario.value);
    }
    cerrarModal(): void {
      this.dialogRef.close();
    }
}

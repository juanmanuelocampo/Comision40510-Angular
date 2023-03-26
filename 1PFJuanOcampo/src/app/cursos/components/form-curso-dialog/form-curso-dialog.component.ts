import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Curso } from 'src/app/models/Curso';
import { Profesor } from 'src/app/models/Profesor';
import { ProfesorService } from 'src/app/profesores/services/profesor.service';
import { agregarCursoState, editarCursoState } from '../../curso-state/curso-state.actions';
import { CursoState } from '../../curso-state/curso-state.reducer';
import { CursoService } from '../../services/cursos.service';

@Component({
  selector: 'app-form-curso-dialog',
  templateUrl: './form-curso-dialog.component.html',
  styleUrls: ['./form-curso-dialog.component.css']
})
export class FormCursoDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Curso ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');
    profesores$!: Observable<Profesor[]>;

    constructor(
      private dialogRef: MatDialogRef<FormCursoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<CursoState>,
      private profesoreService: ProfesorService,
      private cursoService: CursoService
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        nombre: new FormControl((this.data.estadoventana === 'edicion')?data.nombre: '', Validators.required),
        profesor: new FormControl(this.data.profesor),
      })
    }
    ngOnInit(): void {
        this.profesores$ = this.profesoreService.obtenerProfesoresAPI();
        this.cursoService.getNextIdAPI().subscribe((curso) => {
          if(this.data.estadoventana === 'alta') this.formulario.controls['id'].setValue((curso[0]?.id === undefined)?1:parseInt(String(curso[0]?.id))+1);
        })
    }


    async aceptar(){
      if (await this.cursoService.validacionesCursoAPI(this.formulario.value) == false) return;
      ((this.data.estadoventana === 'edicion')?this.editarCursoDesdeComponenteABM():this.agregarCursoDesdeComponenteABM());
    }

    agregarCursoDesdeComponenteABM(){
      let curso: Curso = this.completarCampos();
      this.store.dispatch(agregarCursoState({curso: curso}));
      this.cerrarModal();
    }

    editarCursoDesdeComponenteABM(){
      let curso: Curso = this.completarCampos();
      this.store.dispatch(editarCursoState({curso: curso}));
      this.cerrarModal();
    }

    cerrarModal(): void {
      this.dialogRef.close();
    }

    completarCampos():Curso{
      let curso: Curso = {
        id: this.formulario.value.id,
        nombre: this.formulario.value.nombre,
        profesor: this.formulario.value.profesor,
      };
      return curso;
    }

    setValueSelect(o1: any, o2: any) {
      return (o1.id == o2.id);
    }
}

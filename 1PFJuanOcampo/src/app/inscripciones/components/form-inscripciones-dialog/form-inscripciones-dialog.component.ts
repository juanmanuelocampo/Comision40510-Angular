import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlumnoService } from 'src/app/alumnos/services/alumno.service';
import { CursoService } from 'src/app/cursos/services/cursos.service';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { agregarInscripcionState, editarInscripcionState } from '../../inscripcion-state/inscripciones-state.actions';
import { InscripcionState } from '../../inscripcion-state/inscripciones-state.reducer';
import { InscripcionService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-form-inscripcion-dialog',
  templateUrl: './form-inscripciones-dialog.component.html',
  styleUrls: ['./form-inscripciones-dialog.component.css']
})
export class FormInscripcionDialogComponent implements OnInit {
    formulario: FormGroup;
    tituloVentana: string = 'Formulario de Inscripcion ' + ((this.data.estadoventana === 'edicion')?'(Edición)':'(Alta)');
    alumnos$!: Observable<Alumno[]>;
    cursos$!: Observable<Curso[]>;

    constructor(
      private dialogRef: MatDialogRef<FormInscripcionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store<InscripcionState>,
      private inscripcionService: InscripcionService,
      private alumnoService: AlumnoService,
      private cursoService: CursoService,
    ){
      this.formulario = new FormGroup({
        id: new FormControl((this.data.estadoventana === 'edicion')?data.id: '', Validators.required),
        fecha: new FormControl((this.data.estadoventana === 'edicion')?data.fecha: '', Validators.required),
        alumno: new FormControl(this.data.alumno),
        curso: new FormControl(this.data.curso),
      })
    }
    ngOnInit(): void {
      this.alumnos$ = this.alumnoService.obtenerAlumnosAPI();
      this.cursos$ = this.cursoService.obtenerCursosAPI();
      this.inscripcionService.getNextIdAPI().subscribe((inscripcion) => {
        if(this.data.estadoventana === 'alta') this.formulario.controls['id'].setValue((inscripcion[0]?.id === undefined)?1:parseInt(String(inscripcion[0]?.id))+1);
      })
    }

    async aceptar(){
      if (await this.inscripcionService.validacionesInscripcionAPI(this.formulario.value) == false) return;
      ((this.data.estadoventana === 'edicion')?this.editarInscripcionDesdeComponenteABM():this.agregarInscripcionDesdeComponenteABM());
      this.cerrarModal()
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
        fecha: this.formulario.value.fecha,
        alumno: this.formulario.value.alumno,
        curso: this.formulario.value.curso,
      };
      return inscripcion;
    }

    setValueSelect(o1: any, o2: any) {
      return (o1.id == o2.id);
    }
}

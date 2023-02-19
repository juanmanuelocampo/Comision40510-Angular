import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasCursoComponent } from './components/estadisticas-curso/estadisticas-curso.component';
import { FormCursoDialogComponent } from './components/form-curso-dialog/form-curso-dialog.component';
import { TablaCursoComponent } from './components/tabla-curso/tabla-curso.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TablaCursoComponent,
    EstadisticasCursoComponent,
    FormCursoDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CursosRoutingModule,
  ]
})
export class CursosModule { }

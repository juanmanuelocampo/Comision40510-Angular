import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasAlumnoComponent } from './components/estadisticas-alumno/estadisticas-alumno.component';
import { FormAlumnoDialogComponent } from './components/form-alumno-dialog/form-alumno-dialog.component';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
//import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        TablaalumnoComponent,
        FormAlumnoDialogComponent,
        EstadisticasAlumnoComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        AlumnosRoutingModule,
        //CoreModule,
    ]
})
export class AlumnosModule { }

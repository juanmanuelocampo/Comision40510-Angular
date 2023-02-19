import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { TablaprofesorComponent } from './components/tabla-profesor/tabla-profesor.component';
import { HistorialProfesorComponent } from './components/historial-profesor/historial-profesor.component';
import { FormProfesorDialogComponent } from './components/form-profesor-dialog/form-profesor-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [
        TablaprofesorComponent,
        HistorialProfesorComponent,
        FormProfesorDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        ProfesoresRoutingModule,
        CoreModule,
    ]
})
export class ProfesoresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaprofesorComponent } from './components/tabla-profesor/tabla-profesor.component';
import { HistorialProfesorComponent } from './components/historial-profesor/historial-profesor.component';
import { FormProfesorDialogComponent } from './components/form-profesor-dialog/form-profesor-dialog.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { profesorStateFeatureKey, reducer } from './profesor-state/profesor-state.reducer';;
import { ProfesoresEffects } from './profesor-state/profesor-state.effects';
import { StoreModule } from '@ngrx/store';
import { ProfesoresRoutingModule } from './profesores-routing.module';


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
        StoreModule.forFeature(profesorStateFeatureKey, reducer),
        EffectsModule.forFeature([ProfesoresEffects])
    ]
})
export class ProfesoresModule { }

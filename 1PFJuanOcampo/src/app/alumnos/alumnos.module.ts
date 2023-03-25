import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';
import { FormAlumnoDialogComponent } from './components/form-alumno-dialog/form-alumno-dialog.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { alumnoStateFeatureKey, reducer } from './alumno-state/alumno-state.reducer';;
import { AlumnosEffects } from './alumno-state/alumno-state.effects';
import { StoreModule } from '@ngrx/store';
import { MisCursosDialogComponent } from './components/mis-cursos/mis-cursos-dialog.component';


@NgModule({
    declarations: [
        TablaalumnoComponent,
        FormAlumnoDialogComponent,
        MisCursosDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        AlumnosRoutingModule,
        StoreModule.forFeature(alumnoStateFeatureKey, reducer),
        EffectsModule.forFeature([AlumnosEffects])
    ]
})
export class AlumnosModule { }

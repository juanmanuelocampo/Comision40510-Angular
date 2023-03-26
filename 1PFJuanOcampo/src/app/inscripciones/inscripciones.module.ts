import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablainscripcionComponent } from './components/tabla-inscripciones/tabla-inscripciones.component';
import { FormInscripcionDialogComponent } from './components/form-inscripciones-dialog/form-inscripciones-dialog.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { inscripcionStateFeatureKey, reducer } from './inscripcion-state/inscripciones-state.reducer';;
import { InscripcionesEffects } from './inscripcion-state/inscripciones-state.effects';
import { StoreModule } from '@ngrx/store';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';


@NgModule({
    declarations: [
        TablainscripcionComponent,
        FormInscripcionDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        InscripcionesRoutingModule,
        CoreModule,
        StoreModule.forFeature(inscripcionStateFeatureKey, reducer),
        EffectsModule.forFeature([InscripcionesEffects])
    ]
})
export class InscripcionesModule { }

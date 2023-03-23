import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablacursoComponent } from './components/tabla-curso/tabla-curso.component';
import { HistorialCursoComponent } from './components/historial-curso/historial-curso.component';
import { FormCursoDialogComponent } from './components/form-curso-dialog/form-curso-dialog.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { cursoStateFeatureKey, reducer } from './curso-state/curso-state.reducer';;
import { CursosEffects } from './curso-state/curso-state.effects';
import { StoreModule } from '@ngrx/store';
import { CursosRoutingModule } from './cursos-routing.module';


@NgModule({
    declarations: [
        TablacursoComponent,
        HistorialCursoComponent,
        FormCursoDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        CursosRoutingModule,
        CoreModule,
        StoreModule.forFeature(cursoStateFeatureKey, reducer),
        EffectsModule.forFeature([CursosEffects])
    ]
})
export class CursosModule { }

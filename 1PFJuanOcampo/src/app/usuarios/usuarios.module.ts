import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablausuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { HistorialUsuarioComponent } from './components/historial-usuario/historial-usuario.component';
import { FormUsuarioDialogComponent } from './components/form-usuario-dialog/form-usuario-dialog.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { usuarioStateFeatureKey, reducer } from './usuario-state/usuario-state.reducer';;
import { UsuariosEffects } from './usuario-state/usuario-state.effects';
import { StoreModule } from '@ngrx/store';
import { UsuariosRoutingModule } from './usuarios-routing.module';


@NgModule({
    declarations: [
        TablausuarioComponent,
        HistorialUsuarioComponent,
        FormUsuarioDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        UsuariosRoutingModule,
        CoreModule,
        StoreModule.forFeature(usuarioStateFeatureKey, reducer),
        EffectsModule.forFeature([UsuariosEffects])
    ]
})
export class UsuariosModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { HistorialUsuarioComponent } from './components/historial-usuario/historial-usuario.component';
import { TablausuarioComponent } from './components/tabla-usuario/tabla-usuario.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablausuarioComponent},
      {path: 'historial/:id', component: HistorialUsuarioComponent, canActivate: [AdminGuard] },
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule { }

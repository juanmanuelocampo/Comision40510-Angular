import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionGuard } from '../core/guards/sesion.guard';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {path: '', canActivateChild: [SesionGuard], children: [
      {path: 'inicio', component: InicioComponent},
      {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IniciosRoutingModule { }

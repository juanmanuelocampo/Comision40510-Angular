import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { SesionGuard } from '../core/guards/sesion.guard';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';

const routes: Routes = [
  {path: '', canActivateChild: [SesionGuard], children: [
      {path: 'tabla', component: TablaalumnoComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlumnosRoutingModule { }

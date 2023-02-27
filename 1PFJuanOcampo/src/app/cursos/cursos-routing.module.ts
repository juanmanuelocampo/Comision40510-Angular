import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { SesionGuard } from '../core/guards/sesion.guard';
import { EstadisticasCursoComponent } from './components/estadisticas-curso/estadisticas-curso.component';
import { TablaCursoComponent } from './components/tabla-curso/tabla-curso.component';


const routes: Routes = [
  {path: '', canActivateChild: [SesionGuard], children: [
      {path: 'tabla', component: TablaCursoComponent},
      {path: 'estadisticas/:id', component: EstadisticasCursoComponent, canActivate: [AdminGuard]},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { HistorialCursoComponent } from './components/historial-curso/historial-curso.component';
import { TablacursoComponent } from './components/tabla-curso/tabla-curso.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablacursoComponent},
      {path: 'historial/:id', component: HistorialCursoComponent, canActivate: [AdminGuard] },
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }

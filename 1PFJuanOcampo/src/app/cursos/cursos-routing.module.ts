import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasCursoComponent } from './components/estadisticas-curso/estadisticas-curso.component';
import { TablaCursoComponent } from './components/tabla-curso/tabla-curso.component';


const routes: Routes = [
  {path: 'curso', children: [
      {path: 'tabla', component: TablaCursoComponent},
      {path: 'estadisticas/:id', component: EstadisticasCursoComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }

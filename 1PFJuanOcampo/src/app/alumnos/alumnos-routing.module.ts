import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasAlumnoComponent } from './components/estadisticas-alumno/estadisticas-alumno.component';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';

const routes: Routes = [
  {path: 'alumno', children: [
      {path: 'tabla', component: TablaalumnoComponent},
      {path: 'estadisticas/:id', component: EstadisticasAlumnoComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlumnosRoutingModule { }

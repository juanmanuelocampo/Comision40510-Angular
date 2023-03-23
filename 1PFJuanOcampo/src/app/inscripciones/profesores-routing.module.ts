import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { HistorialProfesorComponent } from './components/historial-profesor/historial-profesor.component';
import { TablaprofesorComponent } from './components/tabla-profesor/tabla-profesor.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablaprofesorComponent},
      {path: 'historial/:id', component: HistorialProfesorComponent, canActivate: [AdminGuard] },
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesoresRoutingModule { }

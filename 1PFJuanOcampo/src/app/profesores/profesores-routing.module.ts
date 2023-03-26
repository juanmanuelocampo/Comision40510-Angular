import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaprofesorComponent } from './components/tabla-profesor/tabla-profesor.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablaprofesorComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesoresRoutingModule { }

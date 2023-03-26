import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { TablainscripcionComponent } from './components/tabla-inscripciones/tabla-inscripciones.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablainscripcionComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InscripcionesRoutingModule { }

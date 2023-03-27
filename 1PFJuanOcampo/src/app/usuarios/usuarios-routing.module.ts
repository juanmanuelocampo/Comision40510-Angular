import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablausuarioComponent } from './components/tabla-usuario/tabla-usuario.component';


const routes: Routes = [
  {path: '', children: [
      {path: 'tabla', component: TablausuarioComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule { }

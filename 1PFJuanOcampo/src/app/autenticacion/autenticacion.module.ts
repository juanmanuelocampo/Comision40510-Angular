import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionInicioComponent } from './components/autenticacion-inicio/autenticacion-inicio.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: AutenticacionInicioComponent, children: [ // auth
    {path: 'login', component: LoginComponent} // auth/login
  ]}
];

@NgModule({
  declarations: [
    AutenticacionInicioComponent,
    LoginComponent
  ],
  imports: [
    AutenticacionRoutingModule,
    SharedModule
  ]
})
export class AutenticacionModule { }



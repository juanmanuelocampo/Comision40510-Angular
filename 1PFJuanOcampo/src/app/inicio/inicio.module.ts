import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio.component';
import { IniciosRoutingModule } from './inicios-routing.module';

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    IniciosRoutingModule,
  ]
})
export class IniciosModule { }

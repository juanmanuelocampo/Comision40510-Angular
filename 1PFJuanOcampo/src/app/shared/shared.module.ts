import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

import { ValidacionComponent } from './components/validacion/validacion.component';
import * as CanvasJSAngularChart from './../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations:[
    CanvasJSChart,
    ValidacionComponent,
  ],
  imports: [
    PipesModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
  ],
  exports: [
    PipesModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    CanvasJSChart,
    ValidacionComponent,
  ]
})
export class SharedModule { }

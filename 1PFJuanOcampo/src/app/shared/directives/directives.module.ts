import { NgModule } from '@angular/core';
import { BooleanoEstiloDirective } from './directives/booleano-estilo.directive';


@NgModule({
  declarations: [
    BooleanoEstiloDirective
  ],
  exports: [
    BooleanoEstiloDirective
  ]
})
export class DirectivesModule { }

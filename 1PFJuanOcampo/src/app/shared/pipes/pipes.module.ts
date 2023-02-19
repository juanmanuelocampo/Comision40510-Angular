import { NgModule } from '@angular/core';
import { BooleanoATextoPipe } from './pipes/booleano-a-texto.pipe';
import { FormatoEdadPipe } from './pipes/formato-edad.pipe';

@NgModule({
  declarations: [
    FormatoEdadPipe,
    BooleanoATextoPipe,
  ],
  exports:[
    FormatoEdadPipe,
    BooleanoATextoPipe,
  ]
})
export class PipesModule { }

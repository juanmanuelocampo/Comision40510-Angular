import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ListadosComponent } from './components/listados/listados.component';
import { ListadoobservableComponent } from './components/listadoobservable/listadoobservable.component';
import { AltaalumnoComponent } from './components/altaalumno/altaalumno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadosComponent,
    ListadoobservableComponent,
    AltaalumnoComponent,    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

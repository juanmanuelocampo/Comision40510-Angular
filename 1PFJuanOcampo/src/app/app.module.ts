import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';
import { MaterialModule } from './material.module';
import { FormAlumnoDialogComponent } from './components/form-alumno-dialog/form-alumno-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ValidacionComponent } from './components/validacion/validacion.component';

import { FormatoEdadPipe } from './pipes/formato-edad.pipe';
import { BooleanoATextoPipe } from './pipes/booleano-a-texto.pipe';
import { BooleanoEstiloDirective } from './directives/booleano-estilo.directive';

@NgModule({
  declarations: [
    AppComponent,
    TablaalumnoComponent,
    FormAlumnoDialogComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    SidenavComponent,
    FormatoEdadPipe,
    BooleanoATextoPipe,
    ValidacionComponent,
    BooleanoEstiloDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

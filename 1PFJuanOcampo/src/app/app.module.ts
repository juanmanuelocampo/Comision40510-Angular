import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { FormatoEdadPipe } from './pipes/formato-edad.pipe';
import { BooleanoATextoPipe } from './pipes/booleano-a-texto.pipe';
import { BooleanoEstiloDirective } from './directives/booleano-estilo.directive';
import { AppRountingModule } from './app-rounting.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { TablaalumnoComponent } from './components/tablaalumno/tablaalumno.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { FormAlumnoDialogComponent } from './components/form-alumno-dialog/form-alumno-dialog.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { EstadisticasAlumnoComponent } from './components/estadisticas-alumno/estadisticas-alumno.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        ContentComponent,
        SidenavComponent,
        FormatoEdadPipe,
        BooleanoATextoPipe,
        BooleanoEstiloDirective,
        InicioComponent,
        TablaalumnoComponent,
        FormAlumnoDialogComponent,
        ValidacionComponent,
        PaginaNoEncontradaComponent,
        EstadisticasAlumnoComponent,
        CanvasJSChart,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        AppRountingModule,
    ]
})
export class AppModule {
 }

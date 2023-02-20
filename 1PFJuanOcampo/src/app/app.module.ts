import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { CursosModule } from './cursos/cursos.module';
import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        ContentComponent,
        SidenavComponent,
        InicioComponent,
        PaginaNoEncontradaComponent,
    ],
    providers: [SidenavService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        AlumnosModule,
        ProfesoresModule,
        CursosModule,
        AppRoutingModule,
    ]
})
export class AppModule {
 }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasAlumnoComponent } from './alumnos/components/estadisticas-alumno/estadisticas-alumno.component';
import { TablaalumnoComponent } from './alumnos/components/tablaalumno/tablaalumno.component';
//import { EstadisticasAlumnoComponent } from './alumnos/components/estadisticas-alumno/estadisticas-alumno.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
//import { TablaalumnoComponent } from './alumnos/components/tablaalumno/tablaalumno.component';

const routes: Routes = [
/*   {path: 'alumno', children: [
      {path: 'tabla', component: TablaalumnoComponent},
      {path: 'estadisticas/:id', component: EstadisticasAlumnoComponent},
      {path: '', redirectTo: 'tabla', pathMatch: 'full'},
  ]}, */
  {path: 'inicio', component: InicioComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', component: PaginaNoEncontradaComponent}
];

/* const routes: Routes = [
  {path: 'cursos', children: [
    {path: 'cards', component: ListaCursosComponent},
    {path: 'tabla', component: TablaCursosComponent},
    {path: 'agregar', component: AgregarCursoComponent}
  ]},
  {path: 'curso/:id', component: DetalleCursoComponent},
  {path: 'inicio', component: InicioComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', component: NoEncontradoComponent }
]; */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

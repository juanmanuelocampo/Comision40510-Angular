import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SesionGuard } from './core/guards/sesion.guard';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutNotLoggedComponent } from './layout-not-logged/layout-not-logged.component';
import { LayoutLoggedComponent } from './layout-logged/layout-logged.component';

const routes: Routes = [


/*{
    path: '', component: AppLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
        { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
        { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
        { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
        { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
    ]
  }, */

  {
    path: '',
    component: LayoutLoggedComponent,
    children: [
      { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then((modulo) => modulo.IniciosModule), canLoad: [SesionGuard] },
      { path: 'curso', loadChildren: () => import('./cursos/cursos.module').then((modulo) => modulo.CursosModule), canLoad: [SesionGuard] },
      { path: 'alumno', loadChildren: () => import('./alumnos/alumnos.module').then((modulo) => modulo.AlumnosModule), canLoad: [SesionGuard] },
      { path: 'profesor', loadChildren: () => import('./profesores/profesores.module').then((modulo) => modulo.ProfesoresModule), canLoad: [SesionGuard] },
      { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    ]
  },
  {
    path: '',
    component: LayoutNotLoggedComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./autenticacion/autenticacion.module').then((modulo) => modulo.AutenticacionModule) },
    ]
  },
  //{path: '', redirectTo: 'inicio', pathMatch: 'full'},
  //{path: '', redirectTo: 'auth/login', pathMatch: 'full'},
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

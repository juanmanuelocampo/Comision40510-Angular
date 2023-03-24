import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import Swal from 'sweetalert2';
import { SesionService } from '../services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private sesion: SesionService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesion.obtenerSesion().pipe(
      map((sesion: Sesion) => {
        if(sesion.usuarioActivo?.esAdmin){
          return true;
        }else{
          Swal.fire({text: 'No tiene los permisos necesarios',icon: 'warning'})
          this.router.navigate([this.router.url]); //Redirijo al mimso lugar donde está
          //return false;
          return true;
        }
      })
    );
  }

}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SesionService } from '../core/services/sesion.service';
import { SidenavService } from './sidenav.service';
import { Sesion } from '../models/sesion';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private sesionService: SesionService,
  ){}

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  redirigirInicio(){
    this.router.navigate(['inicio', { mensaje: 'hola' }])
  }

  cerrarSesion(){
    const sesionLogout: Sesion = {
      sesionActiva: false
    }
    this.sesionService.logout(sesionLogout);
  }
}

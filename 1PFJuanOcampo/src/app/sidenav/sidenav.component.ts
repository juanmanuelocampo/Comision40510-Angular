import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(private router: Router, private sidenavService: SidenavService){ }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  redirigirInicio(){
    this.router.navigate(['inicio', { mensaje: 'hola' }])
  }
}
